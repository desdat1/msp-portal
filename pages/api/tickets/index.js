// pages/api/tickets/index.js - FIXED WEBHOOK DETECTION
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
    // Debug logging
    console.log('POST request received');
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('Has tickets property:', !!req.body?.tickets);
    console.log('Body type:', typeof req.body);
    
    // Check if this is a Make.com webhook (has tickets array)
    if (req.body && Array.isArray(req.body.tickets)) {
      console.log('Detected Make.com webhook with tickets array');
      handleMakeWebhook(req, res);
    } else if (req.body && req.body.tickets) {
      console.log('Detected Make.com webhook with tickets property');
      handleMakeWebhook(req, res);
    } else {
      console.log('Regular ticket creation detected');
      handleTicketCreation(req, res);
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ 
      tickets, 
      count: tickets.length,
      total: tickets.length,
      timestamp: new Date().toISOString(),
      lastSync: null,
      dataSource: tickets.length > 0 ? 'ConnectWise' : 'Demo',
      filters: {
        status: 'all',
        priority: 'all', 
        assignee: 'all',
        company: 'all',
        search: '',
        limit: 100
      }
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).json({ error: 'Method ' + req.method + ' Not Allowed' });
  }
}

// NEW: Handle Make.com webhook data
async function handleMakeWebhook(req, res) {
  try {
    console.log('=== MAKE.COM WEBHOOK RECEIVED (NO AUTH) ===');
    console.log('Full body:', JSON.stringify(req.body, null, 2));

    const { tickets: incomingTickets, timestamp, source } = req.body;

    if (!incomingTickets) {
      console.log('ERROR: No tickets found in webhook data');
      res.status(400).json({ 
        error: 'Missing tickets data',
        received: req.body,
        help: 'Expected format: {"tickets": [...], "timestamp": "...", "source": "..."}'
      });
      return;
    }

    console.log(`Processing ${Array.isArray(incomingTickets) ? incomingTickets.length : 1} tickets from ${source || 'unknown'}`);

    // Transform and add ConnectWise tickets
    const transformedTickets = Array.isArray(incomingTickets) 
      ? incomingTickets.map(transformConnectWiseTicket) 
      : [transformConnectWiseTicket(incomingTickets)];

    // Replace existing tickets to avoid duplicates
    tickets = transformedTickets;

    console.log('Successfully processed ConnectWise tickets:', tickets.length);

    res.status(200).json({
      success: true,
      message: 'ConnectWise tickets synchronized successfully!',
      processed: transformedTickets.length,
      timestamp: new Date().toISOString(),
      data: transformedTickets,
      debug: {
        originalTicketsCount: Array.isArray(incomingTickets) ? incomingTickets.length : 1,
        source: source || 'unknown',
        webhookDetected: true
      }
    });

  } catch (error) {
    console.error('Make.com webhook error:', error);
    res.status(500).json({
      error: 'Failed to process webhook',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// Transform ConnectWise ticket to application format
function transformConnectWiseTicket(cwTicket) {
  if (!cwTicket) {
    console.log('Warning: Empty ticket received');
    return null;
  }

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
  if (p.includes('attention') || p.includes('escalat') || p.includes('4')) return 'NEEDS_ATTENTION';
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

// Handle regular ticket creation (legacy)
async function handleTicketCreation(req, res) {
  try {
    console.log('=== Processing Regular Ticket ===');
    
    res.status(200).json({
      success: true,
      message: 'Regular ticket creation not implemented yet',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing ticket:', error);
    res.status(500).json({
      error: 'Failed to process ticket',
      message: error.message
    });
  }
}