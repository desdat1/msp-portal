// hooks/useTickets.ts - Updated to work with your API
import { useState, useEffect } from 'react';
import { Ticket } from '../types/Ticket';

interface UseTicketsReturn {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshTickets: () => void;
  fetchTickets: () => Promise<void>;
}

const useTickets = (): UseTicketsReturn => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchTickets = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Fetching tickets from API...');
      
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
      console.log('✅ API Response:', data);
      
      if (data.tickets && Array.isArray(data.tickets)) {
        setTickets(data.tickets);
        setLastUpdated(new Date());
        console.log(`📋 Loaded ${data.tickets.length} tickets`);
      } else {
        console.error('❌ Invalid API response format:', data);
        setError('Invalid data format from API');
      }
      
    } catch (err) {
      console.error('❌ Error fetching tickets:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Load tickets on mount and refresh every 30 seconds
  useEffect(() => {
    fetchTickets();
    
    const interval = setInterval(fetchTickets, 30000);
    return () => clearInterval(interval);
  }, []);

  const refreshTickets = (): void => {
    console.log('🔄 Manual refresh triggered');
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