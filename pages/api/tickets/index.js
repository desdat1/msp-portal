// pages/api/tickets/index.js - Use Shared ConnectWise Data

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Get ConnectWise tickets from global variable (set by cwsync endpoint)
    const connectwiseTickets = global.connectwiseTickets || [];
    const lastSync = global.lastConnectWiseSync || null;
    
    // If no ConnectWise tickets, show demo ticket
    const tickets = connectwiseTickets.length > 0 ? connectwiseTickets : [{
      id: 'DEMO-001',
      priority: 'MEDIUM',
      title: 'No ConnectWise tickets synced yet',
      company: 'Demo Company', 
      time: '1h ago',
      status: 'New',
      assignee: 'Sarah Chen',
      contact: {
        name: 'Demo User',
        phone: '(555) 000-0000',
        email: 'demo@company.com'
      },
      description: 'Run the Make.com scenario to sync ConnectWise tickets',
      board: 'Help Desk',
      type: 'Demo',
      severity: 'Low',
      impact: 'Low', 
      urgency: 'Low'
    }];

    res.status(200).json({ 
      tickets, 
      count: tickets.length,
      total: tickets.length,
      timestamp: new Date().toISOString(),
      lastSync: lastSync,
      dataSource: connectwiseTickets.length > 0 ? 'ConnectWise Live' : 'Demo',
      filters: {
        status: 'all',
        priority: 'all', 
        assignee: 'all',
        company: 'all',
        search: '',
        limit: 100
      }
    });
  } else if (req.method === 'POST') {
    // Handle webhook data (same as before)
    if (req.body && Array.isArray(req.body.tickets)) {
      console.log('Detected Make.com webhook with tickets array');
      handleMakeWebhook(req, res);
    } else if (req.body && req.body.tickets) {
      console.log('Detected Make.com webhook with tickets property');
      handleMakeWebhook(req, res);
    } else {
      console.log('Regular ticket creation detected');
      res.status(200).json({
        success: true,
        message: 'Regular ticket creation not implemented yet',
        timestamp: new Date().toISOString()
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).json({ error: 'Method ' + req.method + ' Not Allowed' });
  }
}

// Handle Make.com webhook data
async function handleMakeWebhook(req, res) {
  try {
    console.log('=== MAKE.COM WEBHOOK RECEIVED ===');
    
    const { tickets: incomingTickets, timestamp, source } = req.body;

    if (!incomingTickets) {
      res.status(400).json({ 
        error: 'Missing tickets data',
        received: req.body
      });
      return;
    }

    // Transform tickets and store globally
    const transformedTickets = Array.isArray(incomingTickets) 
      ? incomingTickets.map(transformConnectWiseTicket) 
      : [transformConnectWiseTicket(incomingTickets)];

    // Store in global variable for sharing with GET requests
    global.connectwiseTickets = transformedTickets;
    global.lastConnectWiseSync = new Date().toISOString();

    console.log('Successfully processed and stored ConnectWise tickets:', transformedTickets.length);

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
  if (!cwTicket) return null;

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