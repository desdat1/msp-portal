// pages/api/tickets.js - FIXED GET HANDLER
let tickets = [
  // Initialize with demo data that gets replaced by ConnectWise data
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
];

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
    // Check if this is a Make.com webhook (has tickets property OR is direct ticket data)
    if (req.body && (req.body.tickets || req.body.source)) {
      handleMakeWebhook(req, res);
    } else {
      handleTicketCreation(req, res);
    }
  } else if (req.method === 'GET') {
    // FIXED: Return proper format with metadata
    res.status(200).json({
      tickets,
      count: tickets.length,
      total: tickets.length,
      timestamp: lastUpdated.toISOString(),
      dataSource: isLiveData ? "Live ConnectWise via Make.com" : "Demo - Update Make.com to use /api/tickets",
      isLiveData: isLiveData,
      apiWorking: true
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).json({ error: 'Method ' + req.method + ' Not Allowed' });
  }
}

// Fixed: Handle Make.com webhook data - ACCUMULATE instead of overwrite
async function handleMakeWebhook(req, res) {
  try {
    console.log('=== MAKE.COM WEBHOOK RECEIVED (NO AUTH) ===');
    console.log('Body:', JSON.stringify(req.body, null, 2));

    let incomingTickets;
    const { timestamp, source } = req.body;

    // Handle different Make.com data formats
    if (req.body.tickets) {
      // Standard format: { tickets: [...], timestamp: "...", source: "..." }
      incomingTickets = req.body.tickets;
    } else if (req.body.source && req.body.source === "Live ConnectWise via Make.com") {
      // Direct ticket data format - the entire body IS the ticket data
      console.log('Direct ticket format detected - using entire body as ticket data');
      incomingTickets = [req.body]; // Wrap single ticket in array
    } else {
      // Fallback - look for ticket-like data in the body
      console.log('Unknown format - attempting to process as ticket data');
      incomingTickets = [req.body];
    }

    if (!incomingTickets) {
      res.status(400).json({ 
        success: false,
        error: 'Missing tickets data',
        received: req.body,
        expectedFormat: 'Array of ticket objects or single ticket object'
      });
      return;
    }

    console.log(`Processing ${Array.isArray(incomingTickets) ? incomingTickets.length : 1} tickets from ${source || 'Make.com'}`);

    // Handle both single tickets and arrays from Make.com
    let ticketsToProcess;
    if (Array.isArray(incomingTickets)) {
      ticketsToProcess = incomingTickets;
    } else if (incomingTickets && typeof incomingTickets === 'object') {
      // Single ticket object - wrap in array
      ticketsToProcess = [incomingTickets];
    } else {
      // Handle case where tickets might be the raw Data object
      ticketsToProcess = [req.body];
    }

    const transformedTickets = ticketsToProcess
      .filter(ticket => ticket && typeof ticket === 'object') // Filter out invalid tickets
      .map(transformConnectWiseTicket);

    if (transformedTickets.length === 0) {
      res.status(400).json({ 
        success: false,
        error: 'No valid ticket data found',
        received: req.body
      });
      return;
    }

    // 🛠️ FIX: Replace demo data with ConnectWise data
    if (!isLiveData) {
      // First ConnectWise data - replace demo data completely
      tickets = transformedTickets;
      isLiveData = true;
    } else {
      // Add to existing ConnectWise data
      tickets.push(...transformedTickets);
      
      // Remove duplicates based on ID
      const uniqueTickets = tickets.filter((ticket, index, self) => 
        index === self.findIndex(t => t.id === ticket.id)
      );
      tickets = uniqueTickets;
    }

    // Keep only latest 100 tickets
    if (tickets.length > 100) {
      tickets = tickets.slice(-100);
    }

    // Update metadata
    lastUpdated = new Date();

    console.log('Successfully processed ConnectWise tickets. Total:', tickets.length);

    res.status(200).json({
      success: true,
      message: 'ConnectWise tickets processed successfully!',
      processed: transformedTickets.length,
      total: tickets.length,
      timestamp: lastUpdated.toISOString(),
      isLiveData: true
    });

  } catch (error) {
    console.error('Make.com webhook error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      error: 'Failed to process webhook',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// Rest of your existing functions remain the same...
// (extractValue, transformConnectWiseTicket, mapConnectWisePriority, etc.)