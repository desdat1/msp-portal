// pages/api/tickets.js - FIXED VERSION FOR ACCUMULATING TICKETS
let tickets = [];
let lastUpdated = new Date();
let isLiveData = false;

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    handleTicketCreation(req, res);
  } else if (req.method === 'GET') {
    res.status(200).json({
      tickets,
      count: tickets.length,
      total: tickets.length,
      timestamp: lastUpdated.toISOString(),
      dataSource: isLiveData ? "Live ConnectWise via Make.com" : "Waiting for ConnectWise data",
      isLiveData: isLiveData,
      apiWorking: true
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).json({ error: 'Method ' + req.method + ' Not Allowed' });
  }
}

// Handle incoming tickets from Make.com
async function handleTicketCreation(req, res) {
  try {
    console.log('=== TICKET RECEIVED ===');
    console.log('Body:', JSON.stringify(req.body, null, 2));

    // Transform the incoming ticket
    const newTicket = transformConnectWiseTicket(req.body);

    // Check if ticket already exists (update) or is new (add)
    const existingIndex = tickets.findIndex(t => t.id === newTicket.id);
    
    if (existingIndex >= 0) {
      // Update existing ticket
      tickets[existingIndex] = newTicket;
      console.log(`Updated ticket: ${newTicket.id}`);
    } else {
      // Add new ticket
      tickets.push(newTicket);
      console.log(`Added new ticket: ${newTicket.id}`);
    }

    // Mark as live data once we receive first ConnectWise ticket
    if (!isLiveData && newTicket.id.startsWith('CW-')) {
      isLiveData = true;
    }

    // Keep only latest 100 tickets
    if (tickets.length > 100) {
      tickets = tickets.slice(-100);
    }

    lastUpdated = new Date();

    res.status(200).json({
      success: true,
      message: 'Ticket processed successfully!',
      processed: 1,
      total: tickets.length,
      timestamp: lastUpdated.toISOString()
    });

  } catch (error) {
    console.error('Error processing ticket:', error);
    res.status(500).json({
      error: 'Failed to process ticket',
      message: error.message
    });
  }
}

// Extract value from nested objects
function extractValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  
  if (typeof value === 'object') {
    if (value.name) return extractValue(value.name);
    if (value.identifier) return extractValue(value.identifier);
    if (value.value) return extractValue(value.value);
    if (Array.isArray(value) && value.length > 0) {
      return extractValue(value[0]);
    }
    return '';
  }
  
  return String(value);
}

// Transform ConnectWise ticket to application format
function transformConnectWiseTicket(ticketData) {
  try {
    console.log('Transforming ticket:', ticketData?.id, ticketData?.summary);
    
    return {
      id: ticketData.id ? `CW-${ticketData.id}` : `CW-${Date.now()}`,
      priority: mapConnectWisePriority(ticketData.priority),
      title: extractValue(ticketData.summary) || extractValue(ticketData.title) || 'ConnectWise Ticket',
      company: extractValue(ticketData.company) || 'Unknown Company',
      time: formatConnectWiseTime(ticketData.dateEntered || ticketData._info?.dateEntered),
      status: mapConnectWiseStatus(ticketData.status),
      assignee: extractValue(ticketData.assignee) || extractValue(ticketData.owner) || 'Unassigned',
      contact: {
        name: extractValue(ticketData.contact?.name) || extractValue(ticketData.contact) || 'ConnectWise User',
        phone: extractValue(ticketData.contact?.phone) || extractValue(ticketData.contact?.defaultPhone) || '(555) 000-0000',
        email: extractValue(ticketData.contact?.email) || 'support@company.com'
      },
      description: extractValue(ticketData.description) || extractValue(ticketData.notes) || '',
      board: extractValue(ticketData.board) || 'Service Desk',
      type: extractValue(ticketData.type) || 'Service Request',
      severity: extractValue(ticketData.severity) || 'Medium',
      impact: extractValue(ticketData.impact) || 'Medium',
      urgency: extractValue(ticketData.urgency) || 'Medium'
    };
  } catch (error) {
    console.error('Error transforming ticket:', error);
    return {
      id: `CW-ERROR-${Date.now()}`,
      priority: 'MEDIUM',
      title: 'Error Processing Ticket',
      company: 'Unknown Company',
      time: '0m ago',
      status: 'New',
      assignee: 'Unassigned',
      contact: {
        name: 'Unknown',
        phone: '(555) 000-0000',
        email: 'support@company.com'
      },
      description: 'Error processing ticket data',
      board: 'Service Desk',
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
  return statusStr || 'New';
}

function formatConnectWiseTime(dateString) {
  if (!dateString) return '0m ago';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error parsing date:', error);
    return '0m ago';
  }
}