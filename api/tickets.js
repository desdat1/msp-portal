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
      console.log('📊 Request body type:', typeof req.body);
      console.log('📋 Request body keys:', Object.keys(req.body || {}));
      
      let connectWiseTickets = [];
      
      // Handle the raw string data from Make.com
      if (typeof req.body === 'string') {
        try {
          const parsedData = JSON.parse(req.body);
          if (Array.isArray(parsedData)) {
            connectWiseTickets = parsedData;
          }
        } catch (parseError) {
          console.log('❌ Failed to parse string data:', parseError);
        }
      }
      // Handle direct array format
      else if (req.body && Array.isArray(req.body)) {
        connectWiseTickets = req.body;
      } 
      // Handle nested tickets array
      else if (req.body && req.body.tickets && Array.isArray(req.body.tickets)) {
        connectWiseTickets = req.body.tickets;
      } 
      // Handle object with any array property
      else if (req.body && typeof req.body === 'object') {
        // Look for any array property in the request body
        for (const [key, value] of Object.entries(req.body)) {
          if (Array.isArray(value)) {
            console.log(`📋 Found array data in property: ${key}`);
            connectWiseTickets = value;
            break;
          }
        }
        
        // If no array found, treat as single ticket
        if (connectWiseTickets.length === 0) {
          connectWiseTickets = [req.body];
        }
      }

      if (connectWiseTickets.length === 0) {
        console.log('❌ No valid ticket data found in request');
        console.log('🔍 Full request body:', req.body);
        res.status(400).json({ 
          success: false, 
          message: 'No valid ticket data found',
          receivedData: req.body,
          debug: true
        });
        return;
      }

      console.log(`📋 Processing ${connectWiseTickets.length} tickets from Make.com`);

      // Process the ConnectWise tickets with more flexible field mapping
      const processedTickets = connectWiseTickets.map((ticket, index) => {
        console.log(`🎫 Processing ticket ${index + 1}:`, Object.keys(ticket));
        
        return {
          id: ticket.id || ticket.ticketId || ticket.number || `CW-${String(index + 100).padStart(3, '0')}`,
          priority: (ticket.priority || ticket.priorityName || 'MEDIUM').toString().toUpperCase(),
          title: ticket.title || ticket.summary || ticket.subject || ticket.description || 'ConnectWise Ticket',
          company: ticket.company || ticket.companyName || ticket.companyIdentifier || 'Unknown Company',
          time: ticket.time || ticket.dateEntered || ticket.createdDate || 'Recently',
          status: ticket.status || ticket.statusName || 'New',
          assignee: ticket.assignee || ticket.owner || ticket.assignedTo || 'Unassigned',
          contact: {
            name: ticket.contact?.name || ticket.contactName || ticket.requester || 'ConnectWise User',
            phone: ticket.contact?.phone || ticket.phone || ticket.contactPhone || '(555) 000-0000',
            email: ticket.contact?.email || ticket.email || ticket.contactEmail || 'support@company.com'
          },
          description: ticket.description || ticket.initialDescription || ticket.notes || '',
          board: ticket.board || ticket.boardName || 'Service Desk',
          type: ticket.type || ticket.typeName || ticket.workType || 'Service Request',
          severity: ticket.severity || 'Medium',
          impact: ticket.impact || 'Medium',
          urgency: ticket.urgency || 'Medium'
        };
      });

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
        sampleTicket: processedTickets[0] || null
      });
      
    } catch (error) {
      console.error('❌ Error processing POST request:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error', 
        error: error.message,
        stack: error.stack
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