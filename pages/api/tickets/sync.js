// pages/api/tickets/sync.js
// ConnectWise Tickets Sync Endpoint - Receives data from Make.com

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests'
    });
  }

  try {
    // Optional: Add webhook authentication
    const authHeader = req.headers.authorization;
    const expectedAuth = process.env.MAKE_WEBHOOK_SECRET;
    
    if (expectedAuth && authHeader !== `Bearer ${expectedAuth}`) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Invalid webhook secret'
      });
    }

    // Get the ConnectWise data from Make.com
    const { tickets, timestamp, source } = req.body;

    if (!tickets || !Array.isArray(tickets)) {
      return res.status(400).json({ 
        error: 'Invalid data format',
        message: 'Expected tickets array in request body'
      });
    }

    console.log(`📥 Received ${tickets.length} tickets from ${source || 'Make.com'}`);

    // Transform ConnectWise data to application format
    const transformedTickets = tickets.map(ticket => {
      // Map ConnectWise priority to application format
      const mapPriority = (priority) => {
        if (!priority || !priority.name) return 'MEDIUM';
        const priorityName = priority.name.toLowerCase();
        if (priorityName.includes('priority 1') || priorityName.includes('critical')) return 'HIGH';
        if (priorityName.includes('priority 2') || priorityName.includes('high')) return 'MEDIUM';
        if (priorityName.includes('priority 3') || priorityName.includes('medium')) return 'MEDIUM';
        if (priorityName.includes('priority 4') || priorityName.includes('low')) return 'LOW';
        if (priorityName.includes('priority 5')) return 'LOW';
        return 'MEDIUM';
      };

      // Map ConnectWise status to application format
      const mapStatus = (status) => {
        if (!status || !status.name) return 'New';
        const statusName = status.name.toLowerCase();
        if (statusName.includes('new') || statusName.includes('open')) return 'New';
        if (statusName.includes('assign')) return 'Assigned';
        if (statusName.includes('progress') || statusName.includes('working')) return 'In Progress';
        if (statusName.includes('wait') || statusName.includes('pending')) return 'Waiting';
        if (statusName.includes('escalat')) return 'Escalated';
        if (statusName.includes('resolv') || statusName.includes('complet') || statusName.includes('clos')) return 'Resolved';
        return 'New';
      };

      // Calculate time ago
      const formatTimeAgo = (dateString) => {
        if (!dateString) return 'Unknown';
        try {
          const date = new Date(dateString);
          const now = new Date();
          const diffMs = now.getTime() - date.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMins / 60);
          const diffDays = Math.floor(diffHours / 24);

          if (diffMins < 60) return `${diffMins}m ago`;
          if (diffHours < 24) return `${diffHours}h ago`;
          if (diffDays < 7) return `${diffDays}d ago`;
          return date.toLocaleDateString();
        } catch (error) {
          return 'Unknown';
        }
      };

      // Get assignee from resources or default
      const getAssignee = (ticket) => {
        if (ticket.resources && ticket.resources.length > 0) {
          return ticket.resources[0].name || ticket.resources[0];
        }
        if (ticket.owner && ticket.owner.name) {
          return ticket.owner.name;
        }
        // Default assignees for demo
        const assignees = ['Sarah Chen', 'Mike Johnson', 'Alex Rodriguez', 'Marcus Thompson', 'Jenny Williams', 'David Kim'];
        return assignees[Math.floor(Math.random() * assignees.length)];
      };

      // Transform to application format
      return {
        id: ticket.id ? `CW-${ticket.id}` : `CW-${Math.random().toString().substr(2, 6)}`,
        priority: mapPriority(ticket.priority),
        title: ticket.summary || 'No Title',
        company: ticket.company?.name || 'Unknown Company',
        time: formatTimeAgo(ticket._info?.dateEntered || ticket.dateEntered),
        status: mapStatus(ticket.status),
        assignee: getAssignee(ticket),
        contact: {
          name: ticket.contact?.name || ticket.contactName || 'Unknown Contact',
          phone: ticket.contactPhoneNumber || ticket.contact?.phone || 'No Phone',
          email: ticket.contact?.email || ticket.contactEmail || 'No Email'
        },
        // Additional ConnectWise fields
        description: ticket.initialDescription || ticket.description || '',
        dateEntered: ticket._info?.dateEntered || ticket.dateEntered,
        lastUpdated: ticket._info?.lastUpdated || ticket.lastUpdated,
        board: ticket.board?.name || 'Default',
        type: ticket.type?.name || 'Service Request',
        subType: ticket.subType?.name || '',
        severity: ticket.severity || 'Medium',
        impact: ticket.impact || 'Medium',
        urgency: ticket.urgency || 'Medium',
        // ConnectWise specific
        connectWiseId: ticket.id,
        siteName: ticket.siteName,
        addressLine1: ticket.addressLine1,
        city: ticket.city,
        stateIdentifier: ticket.stateIdentifier,
        zip: ticket.zip
      };
    });

    // Store in cache/database
    // Using environment variable for Redis or in-memory for development
    let storageResult;
    
    if (process.env.REDIS_URL) {
      // Production: Store in Redis
      try {
        const { createClient } = require('redis');
        const client = createClient({ url: process.env.REDIS_URL });
        await client.connect();
        
        // Store tickets with 24 hour expiry
        await client.setEx('connectwise_tickets', 86400, JSON.stringify(transformedTickets));
        await client.setEx('connectwise_sync_timestamp', 86400, new Date().toISOString());
        await client.setEx('connectwise_tickets_count', 86400, transformedTickets.length.toString());
        
        await client.disconnect();
        storageResult = 'Redis';
        
        console.log(`✅ Stored ${transformedTickets.length} tickets in Redis`);
      } catch (redisError) {
        console.error('Redis error:', redisError);
        // Fallback to memory storage
        global.connectwiseTickets = transformedTickets;
        global.connectwiseSyncTime = new Date().toISOString();
        storageResult = 'Memory (Redis failed)';
      }
    } else {
      // Development: Store in memory
      global.connectwiseTickets = transformedTickets;
      global.connectwiseSyncTime = new Date().toISOString();
      storageResult = 'Memory';
      
      console.log(`✅ Stored ${transformedTickets.length} tickets in memory`);
    }

    // Success response
    const response = {
      success: true,
      message: 'ConnectWise tickets synced successfully',
      data: {
        ticketsReceived: tickets.length,
        ticketsProcessed: transformedTickets.length,
        timestamp: new Date().toISOString(),
        source: source || 'Make.com',
        storage: storageResult,
        sampleTickets: transformedTickets.slice(0, 3).map(t => ({
          id: t.id,
          title: t.title,
          company: t.company,
          priority: t.priority,
          status: t.status
        }))
      }
    };

    console.log('📊 Sync Summary:', response.data);

    return res.status(200).json(response);

  } catch (error) {
    console.error('❌ Sync endpoint error:', error);
    
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}