// pages/api/tickets/index.js
// Updated to serve ConnectWise tickets from cache

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts GET requests'
    });
  }

  try {
    let tickets = [];
    let syncTimestamp = null;
    let dataSource = 'none';

    // Try to get tickets from Redis first (production)
    if (process.env.REDIS_URL) {
      try {
        const { createClient } = require('redis');
        const client = createClient({ url: process.env.REDIS_URL });
        await client.connect();
        
        const cachedTickets = await client.get('connectwise_tickets');
        const cachedTimestamp = await client.get('connectwise_sync_timestamp');
        
        await client.disconnect();
        
        if (cachedTickets) {
          tickets = JSON.parse(cachedTickets);
          syncTimestamp = cachedTimestamp;
          dataSource = 'Redis';
          console.log(`📊 Serving ${tickets.length} tickets from Redis cache`);
        }
      } catch (redisError) {
        console.error('Redis read error:', redisError);
        // Fall through to memory check
      }
    }

    // Fallback to memory storage (development)
    if (tickets.length === 0 && global.connectwiseTickets) {
      tickets = global.connectwiseTickets;
      syncTimestamp = global.connectwiseSyncTime;
      dataSource = 'Memory';
      console.log(`📊 Serving ${tickets.length} tickets from memory`);
    }

    // If no cached tickets, return demo data or empty
    if (tickets.length === 0) {
      // Return sample demo ticket to show the structure
      tickets = [{
        id: 'DEMO-001',
        priority: 'MEDIUM',
        title: 'No ConnectWise tickets synced yet',
        company: 'Demo Company',
        time: '1h ago',
        status: 'New',
        assignee: 'Sarah Chen',
        contact: {
          name: 'Demo Contact',
          phone: '(555) 123-4567',
          email: 'demo@company.com'
        },
        description: 'Run the Make.com scenario to sync ConnectWise tickets',
        board: 'Help Desk',
        type: 'Demo',
        severity: 'Low',
        impact: 'Low',
        urgency: 'Low'
      }];
      dataSource = 'Demo';
      console.log('📋 No ConnectWise tickets found, serving demo data');
    }

    // Apply query filters if provided
    let filteredTickets = tickets;
    const { 
      status, 
      priority, 
      assignee, 
      company, 
      search,
      limit = 100 
    } = req.query;

    // Filter by status
    if (status && status !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Filter by priority
    if (priority && priority !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.priority.toLowerCase() === priority.toLowerCase()
      );
    }

    // Filter by assignee
    if (assignee && assignee !== 'all') {
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.assignee.toLowerCase().includes(assignee.toLowerCase())
      );
    }

    // Filter by company
    if (company) {
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.company.toLowerCase().includes(company.toLowerCase())
      );
    }

    // Search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredTickets = filteredTickets.filter(ticket => 
        ticket.title.toLowerCase().includes(searchTerm) ||
        ticket.company.toLowerCase().includes(searchTerm) ||
        ticket.assignee.toLowerCase().includes(searchTerm) ||
        ticket.id.toLowerCase().includes(searchTerm)
      );
    }

    // Limit results
    const limitNum = parseInt(limit);
    if (limitNum > 0) {
      filteredTickets = filteredTickets.slice(0, limitNum);
    }

    // Response
    const response = {
      tickets: filteredTickets,
      count: filteredTickets.length,
      total: tickets.length,
      timestamp: new Date().toISOString(),
      lastSync: syncTimestamp,
      dataSource: dataSource,
      filters: {
        status: status || 'all',
        priority: priority || 'all',
        assignee: assignee || 'all',
        company: company || 'all',
        search: search || '',
        limit: limitNum
      }
    };

    // Add cache headers for better performance
    res.setHeader('Cache-Control', 'public, max-age=30, stale-while-revalidate=60');
    
    return res.status(200).json(response);

  } catch (error) {
    console.error('❌ Tickets endpoint error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString(),
      tickets: [],
      count: 0
    });
  }
}