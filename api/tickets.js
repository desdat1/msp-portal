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
      
      // Handle different data formats from Make.com
      if (req.body && Array.isArray(req.body)) {
        // Direct array format
        connectWiseTickets = req.body;
      } else if (req.body && req.body.tickets && Array.isArray(req.body.tickets)) {
        // Nested tickets array
        connectWiseTickets = req.body.tickets;
      } else if (req.body && typeof req.body === 'object') {
        // Single ticket object - convert to array
        connectWiseTickets = [req.body];
      } else {
        console.log('❌ No valid ticket data found in request');
        res.status(400).json({ success: false, message: 'No valid ticket data found' });
        return;
      }

      console.log(`📋 Processing ${connectWiseTickets.length} tickets from Make.com`);

      // Process the ConnectWise tickets
      const processedTickets = connectWiseTickets.map((ticket, index) => ({
        id: ticket.id || `CW-${String(index + 100).padStart(3, '0')}`,
        priority: (ticket.priority || 'MEDIUM').toUpperCase(),
        title: ticket.title || ticket.summary || ticket.subject || 'ConnectWise Ticket',
        company: ticket.company || ticket.companyName || 'Unknown Company',
        time: ticket.time || ticket.dateEntered || 'Recently',
        status: ticket.status || 'New',
        assignee: ticket.assignee || ticket.owner || 'Unassigned',
        contact: {
          name: ticket.contact?.name || ticket.contactName || 'ConnectWise User',
          phone: ticket.contact?.phone || ticket.phone || '(555) 000-0000',
          email: ticket.contact?.email || ticket.email || 'support@company.com'
        },
        description: ticket.description || ticket.initialDescription || '',
        board: ticket.board || ticket.boardName || 'Service Desk',
        type: ticket.type || ticket.typeName || 'Service Request',
        severity: ticket.severity || 'Medium',
        impact: ticket.impact || 'Medium',
        urgency: ticket.urgency || 'Medium'
      }));

      // Update stored data with live ConnectWise tickets
      ticketsData = {
        tickets: processedTickets,
        count: processedTickets.length,
        total: processedTickets.length,
        timestamp: new Date().toISOString(),
        dataSource: "Live ConnectWise via Make.com",
        isLiveData: true,
        apiWorking: true,
        lastUpdate: new Date().toISOString(),
        rawDataReceived: true
      };

      console.log(`✅ Successfully updated with ${processedTickets.length} ConnectWise tickets`);
      console.log('📄 Sample ticket:', JSON.stringify(processedTickets[0], null, 2));
      
      res.status(200).json({ 
        success: true, 
        message: `ConnectWise tickets processed successfully via Vercel API!`,
        processed: processedTickets.length,
        timestamp: new Date().toISOString(),
        tickets: processedTickets
      });
      
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