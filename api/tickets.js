// api/tickets.js
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
      
      let connectWiseTickets = [];
      
      // Handle single ticket object from Iterator
      if (req.body && req.body.id && !Array.isArray(req.body)) {
        console.log('📋 Received single ticket from Iterator');
        connectWiseTickets = [req.body];
      }
      // Handle array format
      else if (req.body && Array.isArray(req.body)) {
        connectWiseTickets = req.body;
      } 
      // Handle nested tickets array
      else if (req.body && req.body.tickets && Array.isArray(req.body.tickets)) {
        connectWiseTickets = req.body.tickets;
      } 
      else {
        console.log('❌ No valid ticket data found');
        res.status(400).json({ 
          success: false, 
          message: 'No valid ticket data found',
          receivedData: req.body
        });
        return;
      }

      // Process the ConnectWise ticket(s)
      const processedTickets = connectWiseTickets.map((ticket, index) => ({
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
      }));

      // Add to existing tickets instead of replacing them
      const existingTickets = ticketsData.tickets.filter(t => t.id !== 'DEMO-001');
      const newTicketIds = processedTickets.map(t => t.id);
      const filteredExisting = existingTickets.filter(t => !newTicketIds.includes(t.id));
      
      const allTickets = [...filteredExisting, ...processedTickets];

      // Update stored data
      ticketsData = {
        tickets: allTickets,
        count: allTickets.length,
        total: allTickets.length,
        timestamp: new Date().toISOString(),
        dataSource: "Live ConnectWise via Make.com",
        isLiveData: true,
        apiWorking: true,
        lastUpdate: new Date().toISOString()
      };

      console.log(`✅ Successfully processed ${processedTickets.length} ticket(s). Total: ${allTickets.length}`);
      
      res.status(200).json({ 
        success: true, 
        message: `ConnectWise ticket(s) processed successfully!`,
        processed: processedTickets.length,
        total: allTickets.length,
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