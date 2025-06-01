// pages/api/tickets.js - MODIFIED TO ACCEPT WEBHOOK DATA WITHOUT AUTH
let tickets = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // Check if this is a Make.com webhook (has tickets property OR is direct ticket data)
    if (req.body && (req.body.tickets || req.body.source)) {
      handleMakeWebhook(req, res);
    } else {
      handleTicketCreation(req, res);
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ tickets, count: tickets.length });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).json({ error: 'Method ' + req.method + ' Not Allowed' });
  }
}

// Fixed: Handle Make.com webhook data - ACCUMULATE instead of overwrite
async function handleMakeWebhook(req, res) {
  try {
    console.log('=== MAKE.COM WEBHOOK RECEIVED (NO AUTH) ===');
    console.log('Body:', JSON.stringify(req.body, null, 2));

    let incomingTickets;
    const { timestamp, source } = req.body;

    // Handle different Make.com data formats
    if (req.body.tickets) {
      // Standard format: { tickets: [...], timestamp: "...", source: "..." }
      incomingTickets = req.body.tickets;
    } else if (req.body.source && req.body.source === "Live ConnectWise via Make.com") {
      // Direct ticket data format - the entire body IS the ticket data
      console.log('Direct ticket format detected - using entire body as ticket data');
      incomingTickets = [req.body]; // Wrap single ticket in array
    } else {
      // Fallback - look for ticket-like data in the body
      console.log('Unknown format - attempting to process as ticket data');
      incomingTickets = [req.body];
    }

    if (!incomingTickets) {
      res.status(400).json({ error: 'Missing tickets data' });
      return;
    }

    console.log(`Processing ${Array.isArray(incomingTickets) ? incomingTickets.length : 1} tickets from ${source || 'Make.com'}`);

    // Handle both single tickets and arrays from Make.com
    let ticketsToProcess;
    if (Array.isArray(incomingTickets)) {
      ticketsToProcess = incomingTickets;
    } else if (incomingTickets && typeof incomingTickets === 'object') {
      // Single ticket object - wrap in array
      ticketsToProcess = [incomingTickets];
    } else {
      // Handle case where tickets might be the raw Data object
      ticketsToProcess = [req.body];
    }

    const transformedTickets = ticketsToProcess
      .filter(ticket => ticket && typeof ticket === 'object') // Filter out invalid tickets
      .map(transformConnectWiseTicket);

    if (transformedTickets.length === 0) {
      res.status(400).json({ error: 'No valid ticket data found' });
      return;
    }

    // 🛠️ FIX: Add to tickets array instead of replacing
    tickets.push(...transformedTickets);

    // Remove duplicates based on ID
    const uniqueTickets = tickets.filter((ticket, index, self) => 
      index === self.findIndex(t => t.id === ticket.id)
    );
    tickets = uniqueTickets;

    // Keep only latest 100 tickets
    if (tickets.length > 100) {
      tickets = tickets.slice(-100);
    }

    console.log('Successfully processed ConnectWise tickets. Total:', tickets.length);

    res.status(200).json({
      success: true,
      message: 'ConnectWise tickets synchronized successfully!',
      processed: transformedTickets.length,
      total: tickets.length,
      timestamp: new Date().toISOString(),
      data: transformedTickets
    });

  } catch (error) {
    console.error('Make.com webhook error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      error: 'Failed to process webhook',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// NEW: Aggressive value extraction function to handle ConnectWise objects
function extractValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  
  // Handle common object patterns
  if (typeof value === 'object') {
    // Try common properties
    if (value.name) return extractValue(value.name);
    if (value.companyName) return extractValue(value.companyName);
    if (value.text) return extractValue(value.text);
    if (value.value) return extractValue(value.value);
    if (value.displayName) return extractValue(value.displayName);
    if (value.identifier) return extractValue(value.identifier);
    
    // If it's an array, take first item
    if (Array.isArray(value) && value.length > 0) {
      return extractValue(value[0]);
    }
    
    // Last resort - stringify but clean it up
    const stringified = JSON.stringify(value);
    if (stringified === '{}' || stringified === '[]') return '';
    return stringified;
  }
  
  return String(value);
}

// Transform ConnectWise ticket to application format - UPDATED with extractValue
function transformConnectWiseTicket(cwTicket) {
  try {
    console.log('Transforming ticket:', cwTicket?.id, cwTicket?.summary);
    
    // Handle case where the ticket might have nested properties
    const ticketData = cwTicket.tickets ? cwTicket.tickets : cwTicket;
    
    return {
      id: `CW-${extractValue(ticketData.id) || Date.now()}`,
      priority: mapConnectWisePriority(ticketData.priority),
      title: extractValue(ticketData.summary) || extractValue(ticketData.subject) || 'ConnectWise Ticket',
      company: extractValue(ticketData.company) || extractValue(ticketData.companyName) || 'Unknown Company',
      time: formatConnectWiseTime(ticketData.dateEntered || ticketData._info?.dateEntered),
      status: mapConnectWiseStatus(ticketData.status),
      assignee: getConnectWiseAssignee(ticketData),
      contact: {
        name: extractValue(ticketData.contact) || extractValue(ticketData.contactName) || 'ConnectWise User',
        phone: extractValue(ticketData.contactPhone) || '(555) 000-0000',
        email: extractValue(ticketData.contactEmail) || 'support@company.com'
      },
      description: extractValue(ticketData.initialDescription) || extractValue(ticketData.description) || '',
      board: extractValue(ticketData.board) || 'Default',
      type: extractValue(ticketData.type) || 'Service Request',
      severity: extractValue(ticketData.severity) || 'Medium',
      impact: extractValue(ticketData.impact) || 'Medium',
      urgency: extractValue(ticketData.urgency) || 'Medium'
    };
  } catch (error) {
    console.error('Error transforming ticket:', error);
    console.error('Ticket data:', cwTicket);
    // Return a basic ticket if transformation fails
    return {
      id: `CW-ERROR-${Date.now()}`,
      priority: 'MEDIUM',
      title: 'Error Processing ConnectWise Ticket',
      company: 'Unknown Company',
      time: 'Unknown',
      status: 'New',
      assignee: 'Unassigned',
      contact: {
        name: 'ConnectWise User',
        phone: '(555) 000-0000',
        email: 'support@company.com'
      },
      description: 'Error processing ticket data',
      board: 'Default',
      type: 'Service Request',
      severity: 'Medium',
      impact: 'Medium',
      urgency: 'Medium'
    };
  }
}

function mapConnectWisePriority(priority) {
  const priorityStr = extractValue(priority);
  if (!priorityStr) return 'MEDIUM';
  
  const p = priorityStr.toString().toLowerCase();
  if (p.includes('urgent') || p.includes('critical') || p.includes('high') || p === '1') return 'HIGH';
  if (p.includes('low') || p === '4' || p === '5') return 'LOW';
  if (p.includes('attention') || p.includes('escalat')) return 'NEEDS_ATTENTION';
  return 'MEDIUM';
}

function mapConnectWiseStatus(status) {
  const statusStr = extractValue(status);
  if (!statusStr) return 'New';
  
  const s = statusStr.toString().toLowerCase();
  if (s.includes('new') || s.includes('open')) return 'New';
  if (s.includes('assign')) return 'Assigned';
  if (s.includes('progress') || s.includes('working')) return 'In Progress';
  if (s.includes('wait') || s.includes('pending')) return 'Waiting';
  if (s.includes('escalat')) return 'Escalated';
  if (s.includes('resolv') || s.includes('complet') || s.includes('clos')) return 'Resolved';
  return 'New';
}

function getConnectWiseAssignee(ticket) {
  // Try multiple assignee fields with extractValue
  let assignee = extractValue(ticket?.owner) || 
                extractValue(ticket?.assignedTo) || 
                extractValue(ticket?.resources?.[0]);
  
  return assignee || 'Unassigned';
}

function formatConnectWiseTime(dateString) {
  if (!dateString) return 'Unknown';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error parsing date:', error);
    return 'Unknown';
  }
}

// EXISTING: Handle regular ticket creation
async function handleTicketCreation(req, res) {
  try {
    console.log('=== Processing Regular Ticket ===');
    console.log('Content-Type:', req.headers['content-type']);

    let originalTicket, connectwiseResponse, aiAnalysis;

    if (req.headers['content-type']?.includes('multipart/form-data')) {
      // Form data - parse manually
      const body = req.body.toString();
      console.log('Raw form data received');

      const cwMatch = body.match(/name="connectwiseResponse"\s*\n\s*({.*?})\s*---/s);
      if (cwMatch) {
        try {
          connectwiseResponse = JSON.parse(cwMatch[1]);
          console.log('Parsed ConnectWise data:', connectwiseResponse.id, connectwiseResponse.summary);
        } catch (e) {
          console.log('Failed to parse ConnectWise data');
        }
      }

      const origMatch = body.match(/name="originalTicket"\s*\n\s*([^\-]+)/);
      originalTicket = origMatch ? origMatch[1].trim() : 'Unknown';

      const aiMatch = body.match(/name="aiAnalysis"\s*\n\s*([^\-]+)/);
      aiAnalysis = aiMatch ? aiMatch[1].trim() : 'No AI analysis provided';

    } else {
      // JSON data
      ({ originalTicket, connectwiseResponse, aiAnalysis } = req.body);
    }

    // Create ticket from real ConnectWise data
    const newTicket = {
      id: `CW-${connectwiseResponse?.id || Date.now()}`,
      priority: mapPriority(connectwiseResponse?.priority?.name),
      title: connectwiseResponse?.summary || 'ConnectWise Ticket',
      company: connectwiseResponse?.company?.name || 'Unknown Company',
      companyDetails: {
        name: connectwiseResponse?.company?.name,
        identifier: connectwiseResponse?.company?.identifier,
        address: formatAddress(connectwiseResponse),
        site: connectwiseResponse?.site?.name,
        location: connectwiseResponse?.location?.name
      },
      time: getTimeAgo(connectwiseResponse?._info?.dateEntered),
      status: connectwiseResponse?.status?.name || 'New',
      assignee: connectwiseResponse?.owner?.identifier || 'Unassigned',
      contact: {
        name: 'ConnectWise User',
        phone: '(555) 000-0000',
        email: 'support@company.com'
      },
      aiAnalysis: aiAnalysis || 'AI analysis pending...',
      originalDescription: connectwiseResponse?.initialDescription || 'No description provided',
      connectwiseData: {
        ticketNumber: connectwiseResponse?.id,
        board: connectwiseResponse?.board?.name,
        priority: connectwiseResponse?.priority?.name,
        severity: connectwiseResponse?.severity,
        impact: connectwiseResponse?.impact,
        source: connectwiseResponse?.source?.name,
        serviceLocation: connectwiseResponse?.serviceLocation?.name
      }
    };

    tickets.unshift(newTicket);

    if (tickets.length > 50) {
      tickets = tickets.slice(0, 50);
    }

    console.log('Ticket created successfully:', newTicket.id, newTicket.title);

    res.status(200).json({
      success: true,
      ticket: newTicket,
      totalTickets: tickets.length,
      debug: {
        hasConnectWiseData: !!connectwiseResponse,
        hasAiAnalysis: !!aiAnalysis,
        ticketId: connectwiseResponse?.id
      }
    });

  } catch (error) {
    console.error('Error processing ticket:', error);
    res.status(500).json({
      error: 'Failed to process ticket',
      message: error.message
    });
  }
}

function mapPriority(priorityName) {
  if (!priorityName) return 'MEDIUM';
  const name = priorityName.toLowerCase();
  if (name.includes('high') || name.includes('1')) return 'HIGH';
  if (name.includes('low') || name.includes('4') || name.includes('5')) return 'LOW';
  return 'MEDIUM';
}

function formatAddress(ticket) {
  if (!ticket) return '';
  const parts = [
    ticket.addressLine1,
    ticket.addressLine2,
    ticket.city,
    ticket.stateIdentifier,
    ticket.zip
  ].filter(Boolean);
  return parts.join(', ');
}

function getTimeAgo(dateString) {
  if (!dateString) return '0m ago';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}