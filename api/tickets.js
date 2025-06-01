// api/tickets.js - Vercel Serverless Function for Tickets & Webhooks
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Frontend requesting tickets - return demo data for now
    console.log('GET /api/tickets - Frontend requesting tickets');
    
    const demoTickets = [{
      id: 'DEMO-001',
      priority: 'MEDIUM',
      title: 'Vercel API Working - Ready for ConnectWise Data',
      company: 'Demo Company', 
      time: '1h ago',
      status: 'New',
      assignee: 'Sarah Chen',
      contact: {
        name: 'Demo User',
        phone: '(555) 000-0000',
        email: 'demo@company.com'
      },
      description: 'Vercel API is working! Update Make.com to send webhooks to /api/tickets',
      board: 'Help Desk',
      type: 'Demo',
      severity: 'Low',
      impact: 'Low', 
      urgency: 'Low'
    }];
    
    return res.status(200).json({ 
      tickets: demoTickets, 
      count: demoTickets.length,
      total: demoTickets.length,
      timestamp: new Date().toISOString(),
      dataSource: 'Demo - Update Make.com to use /api/tickets',
      isLiveData: false,
      apiWorking: true
    });

  } else if (req.method === 'POST') {
    // Webhook from Make.com
    console.log('POST /api/tickets - Webhook received');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));

    try {
      const { tickets: incomingTickets } = req.body;

      if (!incomingTickets) {
        console.log('ERROR: No tickets data received');
        return res.status(400).json({ 
          error: 'Missing tickets data',
          received: req.body 
        });
      }

      // Transform the tickets
      const transformedTickets = Array.isArray(incomingTickets) 
        ? incomingTickets.map(transformTicket) 
        : [transformTicket(incomingTickets)];

      console.log(`✅ Successfully processed ${transformedTickets.length} ConnectWise tickets`);

      // For now, just return success - we'll add storage later
      return res.status(200).json({
        success: true,
        message: 'ConnectWise tickets processed successfully via Vercel API!',
        processed: transformedTickets.length,
        timestamp: new Date().toISOString(),
        tickets: transformedTickets.slice(0, 3), // Return first 3 tickets as sample
        dataSource: 'ConnectWise Live',
        apiWorking: true
      });

    } catch (error) {
      console.error('Webhook processing error:', error);
      return res.status(500).json({
        error: 'Failed to process webhook',
        message: error.message
      });
    }

  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    return res.status(405).json({ error: 'Method ' + req.method + ' Not Allowed' });
  }
}

function transformTicket(cwTicket) {
  if (!cwTicket) return null;
  
  return {
    id: `CW-${cwTicket.id || Date.now()}`,
    priority: mapPriority(cwTicket.priority?.name || cwTicket.priority),
    title: cwTicket.summary || cwTicket.subject || 'ConnectWise Ticket',
    company: cwTicket.company?.name || cwTicket.companyName || 'My Company',
    time: formatTimeAgo(cwTicket.dateEntered || cwTicket._info?.dateEntered),
    status: mapStatus(cwTicket.status?.name || cwTicket.status),
    assignee: getAssignee(cwTicket),
    contact: {
      name: cwTicket.contact?.name || cwTicket.contactName || 'ConnectWise User',
      phone: cwTicket.contact?.phone || cwTicket.contactPhone || '(555) 000-0000',
      email: cwTicket.contact?.email || cwTicket.contactEmail || 'support@company.com'
    },
    description: cwTicket.initialDescription || cwTicket.description || '',
    board: cwTicket.board?.name || 'Service Board',
    type: cwTicket.type?.name || 'Service Request',
    severity: cwTicket.severity || 'Medium',
    impact: cwTicket.impact || 'Medium',
    urgency: cwTicket.urgency || 'Medium'
  };
}

function mapPriority(priority) {
  if (!priority) return 'MEDIUM';
  const p = priority.toString().toLowerCase();
  if (p.includes('urgent') || p.includes('critical') || p.includes('high') || p === '1') return 'HIGH';
  if (p.includes('low') || p === '4' || p === '5') return 'LOW';
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
  if (ticket?.owner?.name) return ticket.owner.name;
  if (ticket?.assignedTo?.name) return ticket.assignedTo.name;
  if (ticket?.resources && ticket.resources.length > 0) {
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