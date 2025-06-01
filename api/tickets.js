// api/tickets.js or pages/api/tickets.js
let ticketsData = {
  tickets: [
    {
      id: "DEMO-001",
      priority: "MEDIUM", 
      title: "Vercel API Working - Ready for ConnectWise Data",
      company: "Demo Company",
      time: "1h ago",
      status: "New",
      assignee: "Sarah Chen",
      contact: {
        name: "Demo User",
        phone: "(555) 000-0000",
        email: "demo@company.com"
      },
      description: "Vercel API is working! Update Make.com to send webhooks to /api/tickets",
      board: "Help Desk",
      type: "Demo",
      severity: "Low",
      impact: "Low", 
      urgency: "Low"
    }
  ],
  count: 1,
  total: 1,
  dataSource: "Demo - Update Make.com to use /api/tickets",
  isLiveData: false,
  apiWorking: true
};

export default function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      console.log('📨 Received POST data from Make.com:', JSON.stringify(req.body, null, 2));
      
      // Process the incoming ConnectWise data from Make.com
      if (req.body && Array.isArray(req.body)) {
        // Make.com is sending an array of tickets directly
        const connectWiseTickets = req.body.map((ticket, index) => ({
          id: ticket.id || `CW-${index + 1}`,
          priority: ticket.priority || 'MEDIUM',
          title: ticket.title || ticket.summary || 'ConnectWise Ticket',
          company: ticket.company || 'Unknown Company',
          time: ticket.time || 'Recently',
          status: ticket.status || 'New',
          assignee: ticket.assignee || 'Unassigned',
          contact: {
            name: ticket.contact?.name || 'ConnectWise User',
            phone: ticket.contact?.phone || '(555) 000-0000',
            email: ticket.contact?.email || 'support@company.com'
          },
          description: ticket.description || '',
          board: ticket.board || 'Service Desk',
          type: ticket.type || 'Service Request',
          severity: ticket.severity || 'Medium',
          impact: ticket.impact || 'Medium',
          urgency: ticket.urgency || 'Medium'
        }));

        // Update stored data with live ConnectWise tickets
        ticketsData = {
          tickets: connectWiseTickets,
          count: connectWiseTickets.length,
          total: connectWiseTickets.length,
          timestamp: new Date().toISOString(),
          dataSource: "Live ConnectWise via Make.com",
          isLiveData: true,
          apiWorking: true,
          lastUpdate: new Date().toISOString()
        };

        console.log(`✅ Updated with ${connectWiseTickets.length} ConnectWise tickets`);
        
        res.status(200).json({ 
          success: true, 
          message: `ConnectWise tickets processed successfully via Vercel API!`,
          processed: connectWiseTickets.length,
          timestamp: new Date().toISOString()
        });
      } else {
        console.log('❌ Invalid data format received');
        res.status(400).json({ success: false, message: 'Invalid data format' });
      }
    } catch (error) {
      console.error('❌ Error processing POST request:', error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  } else if (req.method === 'GET') {
    // Return current tickets data
    res.status(200).json({
      ...ticketsData,
      timestamp: new Date().toISOString()
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}