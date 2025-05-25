import React, { useState } from 'react';

// Simple styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    backgroundColor: '#1e293b',
    padding: '20px',
    borderBottom: '1px solid #334155'
  },
  main: {
    display: 'flex',
    height: 'calc(100vh - 80px)'
  },
  leftPanel: {
    width: '33%',
    backgroundColor: '#1e293b',
    borderRight: '1px solid #334155',
    padding: '20px'
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: '20px'
  },
  ticket: {
    backgroundColor: '#334155',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '1px solid transparent'
  },
  ticketSelected: {
    backgroundColor: '#1e40af',
    borderColor: '#3b82f6'
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    margin: '5px'
  }
};

interface Ticket {
  id: string;
  summary: string;
  company: string;
  priority: string;
  status: string;
  description: string;
}

const mockTickets: Ticket[] = [
  {
    id: 'TF-2024-001523',
    summary: 'Email server intermittently rejecting inbound messages',
    company: 'Meridian Financial Group',
    priority: 'High',
    status: 'In Progress',
    description: 'Email server intermittently rejecting inbound messages from external senders. Users report missing important emails from clients and vendors.'
  },
  {
    id: 'TF-2024-001519',
    summary: 'VPN connection dropping for remote users',
    company: 'Coastal Dental Partners',
    priority: 'Medium',
    status: 'New',
    description: 'Multiple remote users reporting VPN disconnections every 30-45 minutes. Affecting productivity for remote staff.'
  },
  {
    id: 'TF-2024-001515',
    summary: 'Critical server backup failure',
    company: 'Metropolitan Insurance',
    priority: 'High',
    status: 'In Progress',
    description: 'Nightly backup job failing for the past 3 nights. Critical data at risk.'
  }
];

function App() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(mockTickets[0]);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeTicket = async () => {
    if (!selectedTicket) return;
    
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('https://hook.us2.make.com/otqpauf9kuvpml9akwjcutay4uo89ll1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'analyze_ticket',
          ticket: selectedTicket,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysis(data.analysis || data.content || 'Analysis completed');
        alert('✅ Analysis Complete!');
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      // Show demo analysis
      const mockAnalysis = `**Issue Summary:** ${selectedTicket.summary}

**Priority:** ${selectedTicket.priority} - Requires immediate attention

**Suggested Steps:**
1. Check system logs for error patterns
2. Verify network connectivity
3. Test affected services
4. Document findings

**Estimated Resolution:** 2-4 hours`;
      
      setAnalysis(mockAnalysis);
      alert('ℹ️ Demo Analysis (Make integration ready when ConnectWise Client ID arrives)');
    }
    
    setIsAnalyzing(false);
  };

  const testIntegration = async () => {
    try {
      const response = await fetch('https://hook.us2.make.com/otqpauf9kuvpml9akwjcutay4uo89ll1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test_connection',
          timestamp: new Date().toISOString()
        })
      });
      
      const message = response.ok ? '✅ Integration working!' : '❌ Integration failed';
      alert(message);
    } catch (error) {
      alert('❌ Connection failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>TechFlow MSP - Live Integration Portal</h1>
        <div>
          <span style={{marginRight: '20px'}}>Make: Connected</span>
          <span style={{marginRight: '20px'}}>Claude: Ready</span>
          <span>ConnectWise: Pending Client ID</span>
        </div>
      </div>
      
      <div style={styles.main}>
        {/* Left Panel - Tickets */}
        <div style={styles.leftPanel}>
          <h2>Tickets</h2>
          <button style={styles.button} onClick={testIntegration}>
            🧪 Test Integration
          </button>
          
          {mockTickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                ...styles.ticket,
                ...(selectedTicket?.id === ticket.id ? styles.ticketSelected : {})
              }}
              onClick={() => setSelectedTicket(ticket)}
            >
              <div style={{fontWeight: 'bold'}}>#{ticket.id}</div>
              <div style={{fontSize: '12px', color: '#94a3b8'}}>{ticket.company}</div>
              <div style={{margin: '5px 0'}}>{ticket.summary}</div>
              <div style={{fontSize: '12px'}}>
                <span style={{marginRight: '10px'}}>Priority: {ticket.priority}</span>
                <span>Status: {ticket.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Panel - Details */}
        <div style={styles.rightPanel}>
          {selectedTicket ? (
            <>
              <h2>#{selectedTicket.id}</h2>
              <p><strong>Company:</strong> {selectedTicket.company}</p>
              <p><strong>Priority:</strong> {selectedTicket.priority}</p>
              <p><strong>Status:</strong> {selectedTicket.status}</p>
              <p><strong>Description:</strong> {selectedTicket.description}</p>
              
              <div style={{margin: '20px 0'}}>
                <button 
                  style={styles.button} 
                  onClick={analyzeTicket}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? '🤖 Analyzing...' : '🤖 Analyze Ticket'}
                </button>
              </div>

              {analysis && (
                <div style={{
                  backgroundColor: '#334155',
                  padding: '15px',
                  borderRadius: '8px',
                  whiteSpace: 'pre-wrap',
                  marginTop: '20px'
                }}>
                  <h3>🤖 Claude AI Analysis</h3>
                  {analysis}
                </div>
              )}
            </>
          ) : (
            <p>Select a ticket to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;