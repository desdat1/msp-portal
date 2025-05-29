// hooks/useTickets.js
import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api'
  : 'https://ai-ticket-final.vercel.app/api';

export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchTickets = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);

      const searchParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'All Engineers' && value !== 'All Statuses' && value !== 'All Priorities') {
          searchParams.append(key, value);
        }
      });

      const response = await fetch(`${API_BASE_URL}/tickets?${searchParams}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        console.warn('API returned error:', data.error);
        setError(`API Warning: ${data.error}`);
      } else {
        setError(null);
      }

      setTickets(data.tickets || []);
      setLastUpdated(new Date().toISOString());
      console.log(`Loaded ${data.tickets?.length || 0} tickets`);

    } catch (err) {
      console.error('Failed to fetch tickets:', err);
      setError(err.message);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTickets();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchTickets]);

  const updateTicket = useCallback(async (ticketId, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tickets?id=${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`Failed to update ticket: ${response.status}`);
      }

      const data = await response.json();

      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket.id === ticketId
            ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
            : ticket
        )
      );

      return data;
    } catch (err) {
      console.error('Failed to update ticket:', err);
      throw err;
    }
  }, []);

  const refresh = useCallback(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    loading,
    error,
    lastUpdated,
    refresh,
    updateTicket
  };
};

export const useTicketFilters = () => {
  const [filters, setFilters] = useState({
    assignee: 'All Engineers',
    status: 'All Statuses',
    priority: 'All Priorities',
    company: '',
    search: ''
  });

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      assignee: 'All Engineers',
      status: 'All Statuses',
      priority: 'All Priorities',
      company: '',
      search: ''
    });
  }, []);

  return { filters, updateFilter, clearFilters };
};
