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
    // Check if this is a Make.com webhook (has tickets array)
    if (req.body && req.body.tickets) {
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

// NEW: Handle Make.com webhook data
async function handleMakeWebhook(req, res) {
  try {
    console.log('=== MAKE.COM WEBHOOK RECEIVED (NO AUTH) ===');
    console.log('Body:', JSON.stringify(req.body, null, 2));

    const { tickets: incomingTickets, timestamp, source } = req.body;

    if (!incomingTickets) {
      res.status(400).json({ error: 'Missing tickets data' });
      return;
    }

    console.log(`Processing ${Array.isArray(incomingTickets) ? incomingTickets.length : 1} tickets from ${source}`);

    // Transform and add ConnectWise tickets
    const transformedTickets = Array.isArray(incomingTickets) 
      ? incomingTickets.map(transformConnectWiseTicket) 
      : [transformConnectWiseTicket(incomingTickets)];

    // Add to tickets array (replace existing to avoid duplicates)
    tickets = transformedTickets;

    console.log('Successfully processed ConnectWise tickets:', tickets.length);

    res.status(200).json({
      success: true,
      message: 'ConnectWise tickets synchronized successfully!',
      processed: transformedTickets.length,
      timestamp: new Date().toISOString(),
      data: transformedTickets
    });

  } catch (error) {
    console.error('Make.com webhook error:', error);
    res.status(500).json({
      error: 'Failed to process webhook',
      message: error.message
    });
  }
}

// Transform ConnectWise ticket to application format
function transformConnectWiseTicket(cwTicket) {
  console.log('Transforming ticket:', cwTicket?.id, cwTicket?.summary);
  
  return {
    id: `CW-${cwTicket.id || Date.now()}`,
    priority: mapConnectWisePriority(cwTicket.priority?.name || cwTicket.priority),
    title: cwTicket.summary || cwTicket.subject || 'ConnectWise Ticket',
    company: cwTicket.company?.name || cwTicket.companyName || 'Unknown Company',
    time: formatConnectWiseTime(cwTicket.dateEntered || cwTicket._info?.dateEntered),
    status: mapConnectWiseStatus(cwTicket.status?.name || cwTicket.status),
    assignee: getConnectWiseAssignee(cwTicket),
    contact: {
      name: cwTicket.contact?.name || cwTicket.contactName || 'ConnectWise User',
      phone: cwTicket.contact?.phone || cwTicket.contactPhone || '(555) 000-0000',
      email: cwTicket.contact?.email || cwTicket.contactEmail || 'support@company.com'
    },
    description: cwTicket.initialDescription || cwTicket.description || '',
    board: cwTicket.board?.name || 'Default',
    type: cwTicket.type?.name || 'Service Request',
    severity: cwTicket.severity || 'Medium',
    impact: cwTicket.impact || 'Medium',
    urgency: cwTicket.urgency || 'Medium'
  };
}

function mapConnectWisePriority(priority) {
  if (!priority) return 'MEDIUM';
  const p = priority.toString().toLowerCase();
  if (p.includes('urgent') || p.includes('critical') || p.includes('high') || p === '1') return 'HIGH';
  if (p.includes('low') || p === '4' || p === '5') return 'LOW';
  if (p.includes('attention') || p.includes('escalat')) return 'NEEDS_ATTENTION';
  return 'MEDIUM';
}

function mapConnectWiseStatus(status) {
  if (!status) return 'New';
  const s = status.toString().toLowerCase();
  if (s.includes('new') || s.includes('open')) return 'New';
  if (s.includes('assign')) return 'Assigned';
  if (s.includes('progress') || s.includes('working')) return 'In Progress';
  if (s.includes('wait') || s.includes('pending')) return 'Waiting';
  if (s.includes('escalat')) return 'Escalated';
  if (s.includes('resolv') || s.includes('complet') || s.includes('clos')) return 'Resolved';
  return 'New';
}

function getConnectWiseAssignee(ticket) {
  if (ticket?.owner?.name) return ticket.owner.name;
  if (ticket?.assignedTo?.name) return ticket.assignedTo.name;
  if (ticket?.resources && ticket.resources.length > 0) {
    return ticket.resources[0].name || ticket.resources[0];
  }
  return 'Unassigned';
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