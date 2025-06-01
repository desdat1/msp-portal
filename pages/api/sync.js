// pages/api/tickets/sync.js - FIXED VERSION - Stores data in global variable

export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    res.status(405).json({ error: 'Method ' + req.method + ' Not Allowed' });
    return;
  }

  try {
    // AUTHENTICATION DISABLED FOR TESTING
    console.log('=== AUTHENTICATION BYPASSED FOR TESTING ===');
    console.log('Environment variable exists:', !!process.env.MAKE_WEBHOOK_SECRET);
    console.log('Auth header received:', req.headers.authorization || 'None');

    console.log('=== Make.com Webhook Received ===');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));

    const { tickets, timestamp, source } = req.body;

    if (!tickets) {
      console.log('ERROR: Missing tickets data in request body');
      res.status(400).json({ error: 'Missing tickets data', received: req.body });
      return;
    }

    console.log(`Processing ${Array.isArray(tickets) ? tickets.length : 1} tickets from ${source}`);

    // Transform ConnectWise tickets to application format
    const transformedTickets = Array.isArray(tickets) ? tickets.map(transformTicket) : [transformTicket(tickets)];

    console.log('Transformed tickets:', JSON.stringify(transformedTickets, null, 2));

    // 🚀 CRITICAL FIX: Store the transformed tickets in global variable
    // This is what your index.js endpoint is looking for!
    global.connectwiseTickets = transformedTickets;
    global.lastConnectWiseSync = new Date().toISOString();
    
    console.log(`✅ STORED ${transformedTickets.length} tickets in global.connectwiseTickets`);
    console.log('Global tickets now contains:', global.connectwiseTickets?.length || 0, 'tickets');
    
    res.status(200).json({
      success: true,
      message: 'Tickets synchronized and stored successfully!',
      processed: transformedTickets.length,
      timestamp: new Date().toISOString(),
      data: transformedTickets,
      debug: {
        originalTicketsCount: Array.isArray(tickets) ? tickets.length : 1,
        hasEnvironmentVariable: !!process.env.MAKE_WEBHOOK_SECRET,
        source: source,
        storedInGlobal: true,
        globalTicketsCount: global.connectwiseTickets?.length || 0
      }
    });

  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({
      error: 'Failed to sync tickets',
      message: error.message,
      stack: error.stack
    });
  }
}

function transformTicket(cwTicket) {
  console.log('Transforming ticket:', cwTicket?.id || 'Unknown ID');
  
  return {
    id: cwTicket.id || `CW-${Date.now()}`,
    priority: mapPriority(cwTicket.priority?.name || cwTicket.priority),
    title: cwTicket.summary || cwTicket.subject || 'ConnectWise Ticket',
    company: cwTicket.company?.name || cwTicket.companyName || 'Unknown Company',
    time: formatTimeAgo(cwTicket.dateEntered || cwTicket._info?.dateEntered),
    status: mapStatus(cwTicket.status?.name || cwTicket.status),
    assignee: getAssignee(cwTicket),
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

function mapPriority(priority) {
  if (!priority) return 'MEDIUM';
  const p = priority.toString().toLowerCase();
  if (p.includes('urgent') || p.includes('critical') || p.includes('high') || p.includes('1')) return 'HIGH';
  if (p.includes('low') || p.includes('4') || p.includes('5')) return 'LOW';
  if (p.includes('attention') || p.includes('escalat')) return 'NEEDS_ATTENTION';
  return 'MEDIUM';
}

function mapStatus(status) {
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

function getAssignee(ticket) {
  if (ticket.owner?.name) return ticket.owner.name;
  if (ticket.assignedTo?.name) return ticket.assignedTo.name;
  if (ticket.resources && ticket.resources.length > 0) {
    return ticket.resources[0].name || ticket.resources[0];
  }
  return 'Unassigned';
}

function formatTimeAgo(dateString) {
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