// hooks/useTickets.js
import { useState, useEffect } from 'react';

const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/tickets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Transform ConnectWise data to match app format
      const transformedTickets = data.tickets?.map(ticket => ({
        id: ticket.id || ticket.ticketNumber || `CW-${ticket._id}`,
        priority: mapPriority(ticket.priority?.name || ticket.priority),
        title: ticket.summary || ticket.subject || 'No Title',
        company: ticket.company?.name || ticket.companyName || 'Unknown Company',
        time: formatTimeAgo(ticket.dateEntered || ticket.createdAt),
        status: mapStatus(ticket.status?.name || ticket.status),
        assignee: getAssignee(ticket),
        contact: {
          name: ticket.contact?.name || ticket.contactName || 'Unknown Contact',
          phone: ticket.contact?.phone || ticket.contactPhone || 'No Phone',
          email: ticket.contact?.email || ticket.contactEmail || 'No Email'
        },
        // Additional ConnectWise fields
        description: ticket.initialDescription || ticket.description || '',
        dateEntered: ticket.dateEntered,
        lastUpdated: ticket._updatedDate || ticket.lastUpdated,
        board: ticket.board?.name || 'Default',
        type: ticket.type?.name || 'Service Request',
        subType: ticket.subType?.name || '',
        severity: ticket.severity || 'Medium',
        impact: ticket.impact || 'Medium',
        urgency: ticket.urgency || 'Medium'
      })) || [];

      setTickets(transformedTickets);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions for data transformation
  const mapPriority = (priority) => {
    if (!priority) return 'MEDIUM';
    const p = priority.toLowerCase();
    if (p.includes('urgent') || p.includes('critical') || p.includes('high')) return 'HIGH';
    if (p.includes('low')) return 'LOW';
    if (p.includes('attention') || p.includes('escalat')) return 'NEEDS_ATTENTION';
    return 'MEDIUM';
  };

  const mapStatus = (status) => {
    if (!status) return 'New';
    const s = status.toLowerCase();
    if (s.includes('new') || s.includes('open')) return 'New';
    if (s.includes('assign')) return 'Assigned';
    if (s.includes('progress') || s.includes('working')) return 'In Progress';
    if (s.includes('wait') || s.includes('pending')) return 'Waiting';
    if (s.includes('escalat')) return 'Escalated';
    if (s.includes('resolv') || s.includes('complet') || s.includes('clos')) return 'Resolved';
    return 'New';
  };

  const getAssignee = (ticket) => {
    if (ticket.owner?.name) return ticket.owner.name;
    if (ticket.assignedTo?.name) return ticket.assignedTo.name;
    if (ticket.resources && ticket.resources.length > 0) {
      return ticket.resources[0].name || ticket.resources[0];
    }
    return 'Unassigned';
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ${diffMins % 60}m ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch (error) {
      console.error('Error parsing date:', error);
      return 'Unknown';
    }
  };

  // Refresh tickets every 30 seconds
  useEffect(() => {
    fetchTickets();
    
    const interval = setInterval(fetchTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  // Manual refresh function
  const refreshTickets = () => {
    fetchTickets();
  };

  return {
    tickets,
    loading,
    error,
    lastUpdated,
    refreshTickets,
    fetchTickets
  };
};

export default useTickets;