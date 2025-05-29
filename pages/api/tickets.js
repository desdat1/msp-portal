// pages/api/tickets.js - CLEANED VERSION
let tickets = [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    handleTicketCreation(req, res);
  } else if (req.method === 'GET') {
    res.status(200).json({ tickets, count: tickets.length });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).json({ error: 'Method ' + req.method + ' Not Allowed' });
  }
}

async function handleTicketCreation(req, res) {
  try {
    console.log('=== Processing Ticket ===');
    console.log('Content-Type:', req.headers['content-type']);

    let originalTicket, connectwiseResponse, aiAnalysis;

    if (req.headers['content-type']?.includes('multipart/form-data')) {
      // Form data - parse manually
      const body = req.body.toString();
      console.log('Raw form data received');

      const cwMatch = body.match(/name="connectwiseResponse"\s*\n\s*({.*?})\s*---/s);
      if (cwMatch) {
        try {
          connectwiseResponse = JSON.parse(cwMatch[1]);
          console.log('Parsed ConnectWise data:', connectwiseResponse.id, connectwiseResponse.summary);
        } catch (e) {
          console.log('Failed to parse ConnectWise data');
        }
      }

      const origMatch = body.match(/name="originalTicket"\s*\n\s*([^\-]+)/);
      originalTicket = origMatch ? origMatch[1].trim() : 'Unknown';

      const aiMatch = body.match(/name="aiAnalysis"\s*\n\s*([^\-]+)/);
      aiAnalysis = aiMatch ? aiMatch[1].trim() : 'No AI analysis provided';

    } else {
      // JSON data
      ({ originalTicket, connectwiseResponse, aiAnalysis } = req.body);
    }

    // Create ticket from real ConnectWise data
    const newTicket = {
      id: `CW-${connectwiseResponse?.id || Date.now()}`,
      priority: mapPriority(connectwiseResponse?.priority?.name),
      title: connectwiseResponse?.summary || 'ConnectWise Ticket',
      company: connectwiseResponse?.company?.name || 'Unknown Company',
      companyDetails: {
        name: connectwiseResponse?.company?.name,
        identifier: connectwiseResponse?.company?.identifier,
        address: formatAddress(connectwiseResponse),
        site: connectwiseResponse?.site?.name,
        location: connectwiseResponse?.location?.name
      },
      time: getTimeAgo(connectwiseResponse?._info?.dateEntered),
      status: connectwiseResponse?.status?.name || 'New',
      assignee: connectwiseResponse?.owner?.identifier || 'Unassigned',
      contact: {
        name: 'ConnectWise User',
        phone: '(555) 000-0000',
        email: 'support@company.com'
      },
      aiAnalysis: aiAnalysis || 'AI analysis pending...',
      originalDescription: connectwiseResponse?.initialDescription || 'No description provided',
      connectwiseData: {
        ticketNumber: connectwiseResponse?.id,
        board: connectwiseResponse?.board?.name,
        priority: connectwiseResponse?.priority?.name,
        severity: connectwiseResponse?.severity,
        impact: connectwiseResponse?.impact,
        source: connectwiseResponse?.source?.name,
        serviceLocation: connectwiseResponse?.serviceLocation?.name
      }
    };

    tickets.unshift(newTicket);

    if (tickets.length > 50) {
      tickets = tickets.slice(0, 50);
    }

    console.log('Ticket created successfully:', newTicket.id, newTicket.title);

    res.status(200).json({
      success: true,
      ticket: newTicket,
      totalTickets: tickets.length,
      debug: {
        hasConnectWiseData: !!connectwiseResponse,
        hasAiAnalysis: !!aiAnalysis,
        ticketId: connectwiseResponse?.id
      }
    });

  } catch (error) {
    console.error('Error processing ticket:', error);
    res.status(500).json({
      error: 'Failed to process ticket',
      message: error.message
    });
  }
}

function mapPriority(priorityName) {
  if (!priorityName) return 'MEDIUM';
  const name = priorityName.toLowerCase();
  if (name.includes('high') || name.includes('1')) return 'HIGH';
  if (name.includes('low') || name.includes('4') || name.includes('5')) return 'LOW';
  return 'MEDIUM';
}

function formatAddress(ticket) {
  if (!ticket) return '';
  const parts = [
    ticket.addressLine1,
    ticket.addressLine2,
    ticket.city,
    ticket.stateIdentifier,
    ticket.zip
  ].filter(Boolean);
  return parts.join(', ');
}

function getTimeAgo(dateString) {
  if (!dateString) return '0m ago';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
