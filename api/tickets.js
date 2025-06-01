// api/tickets.js - Fixed version for ConnectWise integration
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
      console.log('📨 Received POST data:', JSON.stringify(req.body, null, 2));
      
      let connectWiseTickets = [];
      
      // Handle array of tickets (what we're receiving)
      if (req.body && Array.isArray(req.body)) {
        console.log('📋 Processing array of tickets:', req.body.length);
        connectWiseTickets = req.body;
      } 
      // Handle single ticket
      else if (req.body && typeof req.body === 'object' && req.body.id) {
        console.log('📋 Processing single ticket');
        connectWiseTickets = [req.body];
      }
      // Handle nested format
      else if (req.body && req.body.tickets && Array.isArray(req.body.tickets)) {
        console.log('📋 Processing nested tickets array');
        connectWiseTickets = req.body.tickets;
      }
      else {
        console.log('❌ No valid ticket data found');
        console.log('🔍 Received data type:', typeof req.body);
        console.log('🔍 Received data:', req.body);
        
        res.status(400).json({ 
          success: false, 
          error: "Missing tickets data",
          received: req.body,
          expectedFormat: "Array of ticket objects or single ticket object"
        });
        return;
      }

      // Process the ConnectWise tickets
      const processedTickets = connectWiseTickets.map((ticket, index) => {
        console.log(`🎫 Processing ticket ${index + 1}:`, ticket.id || 'No ID');
        
        return {
          id: ticket.id || `CW-${String(index + 100).padStart(3, '0')}`,
          priority: (ticket.priority?.name || ticket.priority || 'MEDIUM').toString().toUpperCase(),
          title: ticket.summary || ticket.title || ticket.subject || 'ConnectWise Ticket',
          company: ticket.company?.companyName || ticket.company || 'Unknown Company',
          time: ticket.dateEntered || ticket.time || 'Recently',
          status: ticket.status?.name || ticket.status || 'New',
          assignee: ticket.owner?.identifier || ticket.assignee || 'Unassigned',
          contact: {
            name: ticket.contact?.name || ticket.contactName || 'ConnectWise User',
            phone: ticket.contact?.phone || ticket.phone || '(555) 000-0000',
            email: ticket.contact?.email || ticket.email || 'support@company.com'
          },
          description: ticket.summary || ticket.description || '',
          board: ticket.board?.name || ticket.board || 'Service Desk',
          type: ticket.type?.name || ticket.type || 'Service Request',
          severity: ticket.severity || 'Medium',
          impact: ticket.impact || 'Medium',
          urgency: ticket.urgency || 'Medium'
        };
      });

      // Replace demo data with live ConnectWise tickets
      ticketsData = {
        tickets: processedTickets,
        count: processedTickets.length,
        total: processedTickets.length,
        timestamp: new Date().toISOString(),
        dataSource: "Live ConnectWise via Make.com",
        isLiveData: true,
        apiWorking: true,
        lastUpdate: new Date().toISOString()
      };

      console.log(`✅ Successfully processed ${processedTickets.length} ConnectWise tickets`);
      
      res.status(200).json({ 
        success: true, 
        message: `ConnectWise tickets processed successfully!`,
        processed: processedTickets.length,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Error processing POST request:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error', 
        error: error.message
      });
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