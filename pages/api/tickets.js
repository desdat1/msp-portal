// pages/api/tickets.js

let tickets = []; // In-memory storage (temporary)

export default function handler(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request from Make.com
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // Receive webhook from Make.com
    const { originalTicket, aiAnalysis, connectwiseResponse } = req.body;
    
    // Transform the data to match your React app format
    const newTicket = {
      id: connectwiseResponse?.id || AI-,
      priority: determinePriority(originalTicket.subject),
      title: originalTicket.subject,
      company: 'AI Analysis',
      time: '0m ago',
      status: 'New',
      assignee: 'AI Assistant',
      contact: {
        name: 'Auto Generated',
        phone: '(555) 000-0000',
        email: 'ai@techflow.com'
      },
      aiAnalysis: aiAnalysis,
      originalDescription: originalTicket.description
    };

    // Add to beginning of array (newest first)
    tickets.unshift(newTicket);
    
    // Keep only last 50 tickets
    if (tickets.length > 50) {
      tickets = tickets.slice(0, 50);
    }

    console.log('New ticket received:', newTicket);
    res.status(200).json({ success: true, ticket: newTicket });
    
  } else if (req.method === 'GET') {
    // Serve tickets to React app
    res.status(200).json({ tickets });
    
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'OPTIONS']);
    res.status(405).json({ error: Method  Not Allowed });
  }
}

function determinePriority(subject) {
  const urgentKeywords = ['critical', 'down', 'error', 'emergency', 'urgent'];
  const highKeywords = ['problem', 'issue', 'not working', 'broken'];
  
  const subjectLower = subject.toLowerCase();
  
  if (urgentKeywords.some(keyword => subjectLower.includes(keyword))) {
    return 'HIGH';
  } else if (highKeywords.some(keyword => subjectLower.includes(keyword))) {
    return 'MEDIUM';
  } else {
    return 'LOW';
  }
}
