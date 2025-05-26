import React, { useState, useEffect } from 'react';

interface Ticket {
  id: string;
  summary: string;
  company: { name: string };
  status: { name: string };
  priority: { name: string };
  contact: { name: string; phone?: string; email?: string };
  initialDescription: string;
  dateEntered: string;
  assignedEngineer?: string;
}

const mockTickets: Ticket[] = [
  {
    id: 'TF-2024-001523',
    summary: 'Email server intermittently rejecting inbound messages',
    company: { name: 'Meridian Financial Group' },
    status: { name: 'In Progress' },
    priority: { name: 'High' },
    contact: { 
      name: 'Michael Rodriguez',
      phone: '(555) 123-4567',
      email: 'michael.rodriguez@meridianfg.com'
    },
    initialDescription: 'Email server intermittently rejecting inbound messages from external senders.',
    dateEntered: '2025-05-25T09:00:00Z',
    assignedEngineer: 'Sarah Chen'
  }
];

const MSPPortal: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(mockTickets[0]);
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0', fontFamily: 'system-ui' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '12px 20px', borderBottom: '1px solid #334155' }}>
        <div style={{ fontSize: '20px', fontWeight: '700' }}>TechFlow MSP</div>
        <div style={{ fontSize: '12px', opacity: 0.9 }}>Sarah Chen - L2 Support Engineer</div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        {isLeftPanelVisible && (
          <div style={{ width: '28%', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '16px' }}>
            <h3>Tickets</h3>
            {mockTickets.map(ticket => (
              <div key={ticket.id} style={{ padding: '12px', borderBottom: '1px solid #334155', cursor: 'pointer' }}>
                <div style={{ fontWeight: '600' }}>#{ticket.id}</div>
                <div style={{ fontSize: '14px', color: '#cbd5e1' }}>{ticket.summary}</div>
              </div>
            ))}
          </div>
        )}

        <div style={{ flex: 1, backgroundColor: '#0f172a', padding: '16px' }}>
          <button 
            onClick={() => setIsLeftPanelVisible(!isLeftPanelVisible)}
            style={{ marginBottom: '16px', padding: '8px 16px', backgroundColor: '#334155', color: '#e2e8f0', border: 'none', borderRadius: '4px' }}
          >
            {isLeftPanelVisible ? 'Hide Panel' : 'Show Panel'}
          </button>
          
          {selectedTicket && (
            <div>
              <h2>#{selectedTicket.id}</h2>
              <p>{selectedTicket.summary}</p>
              <p><strong>Company:</strong> {selectedTicket.company.name}</p>
              <p><strong>Contact:</strong> {selectedTicket.contact.name}</p>
              <p><strong>Status:</strong> {selectedTicket.status.name}</p>
              <p><strong>Priority:</strong> {selectedTicket.priority.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MSPPortal;