import React, { useState, useEffect } from 'react';

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
  headerTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px'
  },
  headerSubtitle: {
    fontSize: '14px',
    opacity: 0.9,
    marginBottom: '12px'
  },
  stats: {
    display: 'flex',
    gap: '16px',
    fontSize: '12px'
  },
  stat: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '4px 8px',
    borderRadius: '4px'
  },
  main: {
    display: 'flex',
    height: 'calc(100vh - 120px)'
  },
  leftPanel: {
    width: '33%',
    backgroundColor: '#1e293b',
    borderRight: '1px solid #334155',
    display: 'flex' as const,
    flexDirection: 'column' as const
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#0f172a',
    display: 'flex' as const,
    flexDirection: 'column' as const
  },
  filtersSection: {
    padding: '16px',
    borderBottom: '1px solid #334155'
  },
  searchBar: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #475569',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '12px',
    backgroundColor: '#334155',
    color: '#e2e8f0'
  },
  controlsRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '12px'
  },
  select: {
    padding: '6px 12px',
    border: '1px solid #475569',
    borderRadius: '4px',
    fontSize: '12px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
    minWidth: '100px'
  },
  tabsRow: {
    display: 'flex',
    gap: '8px'
  },
  tab: {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #475569',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    textAlign: 'center' as const,
    transition: 'all 0.2s',
    backgroundColor: 'transparent',
    color: '#cbd5e1'
  },
  tabActive: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6'
  },
  ticketsList: {
    flex: 1,
    overflowY: 'auto' as const
  },
  ticket: {
    padding: '16px',
    borderBottom: '1px solid #334155',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  ticketSelected: {
    backgroundColor: '#1e40af',
    borderLeft: '4px solid #3b82f6'
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  },
  ticketNumber: {
    fontWeight: '600',
    fontSize: '14px'
  },
  priority: {
    padding: '2px 6px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase' as const
  },
  priorityHigh: {
    backgroundColor: '#fee2e2',
    color: '#dc2626'
  },
  priorityMedium: {
    backgroundColor: '#fef3c7',
    color: '#d97706'
  },
  priorityLow: {
    backgroundColor: '#dcfce7',
    color: '#16a34a'
  },
  clientName: {
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '4px'
  },
  ticketSubject: {
    fontSize: '13px',
    color: '#cbd5e1',
    marginBottom: '8px',
    lineHeight: 1.3
  },
  ticketMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
    color: '#64748b'
  },
  status: {
    padding: '2px 8px',
    borderRadius: '10px',
    fontWeight: '500'
  },
  statusNew: {
    backgroundColor: '#dbeafe',
    color: '#2563eb'
  },
  statusInProgress: {
    backgroundColor: '#fef3c7',
    color: '#d97706'
  },
  statusPending: {
    backgroundColor: '#f3e8ff',
    color: '#7c3aed'
  },
  ticketOverview: {
    backgroundColor: '#1e293b',
    padding: '20px',
    borderBottom: '1px solid #334155',
    height: '32%',
    overflowY: 'auto' as const
  },
  ticketTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '12px'
  },
  ticketId: {
    fontSize: '24px',
    fontWeight: '700'
  },
  badge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600'
  },
  badgeRed: {
    backgroundColor: '#dc2626',
    color: 'white'
  },
  ticketDescription: {
    backgroundColor: '#334155',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    lineHeight: 1.5,
    marginBottom: '12px'
  },
  contactInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    fontSize: '14px'
  },
  contactField: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px'
  },
  contactLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    fontWeight: '500'
  },
  contactValue: {
    color: '#e2e8f0'
  },
  link: {
    color: '#3b82f6',
    textDecoration: 'none'
  },
  infoGathering: {
    backgroundColor: '#1e293b',
    padding: '20px',
    borderBottom: '1px solid #334155',
    height: '23%',
    display: 'flex',
    gap: '20px'
  },
  aiColumn: {
    flex: 1
  },
  managementColumn: {
    flex: 1
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '16px'
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px'
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '12px',
    fontWeight: '500',
    color: '#e2e8f0'
  },
  buttonHover: {
    backgroundColor: '#475569',
    borderColor: '#3b82f6'
  },
  ticketActions: {
    backgroundColor: '#1e293b',
    padding: '20px',
    height: '45%',
    overflowY: 'auto' as const
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  },
  actionGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '8px'
  },
  actionGroupTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: '8px'
  },
  smallButton: {
    padding: '6px 12px',
    border: '1px solid #475569',
    borderRadius: '4px',
    backgroundColor: '#334155',
    cursor: 'pointer',
    fontSize: '11px',
    transition: 'all 0.2s',
    color: '#e2e8f0'
  },
  timer: {
    backgroundColor: '#1e40af',
    border: '1px solid #3b82f6',
    borderRadius: '6px',
    padding: '8px 12px',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#dbeafe',
    textAlign: 'center' as const,
    marginBottom: '8px'
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    border: '1px solid #475569',
    borderRadius: '6px',
    fontFamily: 'inherit',
    fontSize: '14px',
    resize: 'vertical' as const,
    marginBottom: '12px',
    backgroundColor: '#334155',
    color: '#e2e8f0'
  },
  noteControls: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    fontSize: '14px'
  },
  analysisBox: {
    backgroundColor: '#334155',
    padding: '16px',
    borderRadius: '8px',
    fontSize: '14px',
    whiteSpace: 'pre-wrap' as const,
    maxHeight: '200px',
    overflowY: 'auto' as const,
    marginBottom: '16px',
    lineHeight: 1.6
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6'
  }
};

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
    initialDescription: 'Email server intermittently rejecting inbound messages from external senders. Users report missing important emails from clients and vendors. Issue started this morning around 9 AM EST.',
    dateEntered: '2025-05-25T09:00:00Z',
    assignedEngineer: 'Sarah Chen'
  },
  {
    id: 'TF-2024-001519',
    summary: 'VPN connection dropping for remote users',
    company: { name: 'Coastal Dental Partners' },
    status: { name: 'New' },
    priority: { name: 'Medium' },
    contact: { name: 'Sarah Kim' },
    initialDescription: 'Multiple remote users reporting VPN disconnections every 30-45 minutes. Affecting productivity for remote staff.',
    dateEntered: '2025-05-25T08:15:00Z',
    assignedEngineer: 'Sarah Chen'
  },
  {
    id: 'TF-2024-001518',
    summary: 'Request to install Adobe Creative Suite',
    company: { name: 'Premier Legal Services' },
    status: { name: 'Pending' },
    priority: { name: 'Low' },
    contact: { name: 'Jennifer Walsh' },
    initialDescription: 'Request to install Adobe Creative Suite on 3 workstations for design work.',
    dateEntered: '2025-05-24T14:30:00Z',
    assignedEngineer: 'Sarah Chen'
  },
  {
    id: 'TF-2024-001515',
    summary: 'Critical server backup failure - nightly job not completing',
    company: { name: 'Metropolitan Insurance' },
    status: { name: 'In Progress' },
    priority: { name: 'High' },
    contact: { name: 'David Chen' },
    initialDescription: 'Nightly backup job failing for the past 3 nights. Critical data at risk. Backup logs show timeout errors.',
    dateEntered: '2025-05-25T06:30:00Z',
    assignedEngineer: 'Sarah Chen'
  }
];

const MSPPortal: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(mockTickets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('client');
  const [sortFilter, setSortFilter] = useState('');
  const [activeTab, setActiveTab] = useState('my-open');
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [timerDisplay, setTimerDisplay] = useState('02:15:30');
  const [noteText, setNoteText] = useState('');
  const [noteType, setNoteType] = useState('Internal Note');
  const [analysisText, setAnalysisText] = useState('');

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning) return;
    
    const interval = setInterval(() => {
      setTimerDisplay(prev => {
        const [hours, minutes, seconds] = prev.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSecs = totalSeconds % 60;
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSecs.toString().padStart(2, '0')}`;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h ago`;
    if (diffHours > 0) return `${diffHours}h ${Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))}m ago`;
    return 'Recent';
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return { ...styles.priority, ...styles.priorityHigh };
      case 'medium': return { ...styles.priority, ...styles.priorityMedium };
      case 'low': return { ...styles.priority, ...styles.priorityLow };
      default: return styles.priority;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase().replace(' ', '-')) {
      case 'new': return { ...styles.status, ...styles.statusNew };
      case 'in-progress': return { ...styles.status, ...styles.statusInProgress };
      case 'pending': return { ...styles.status, ...styles.statusPending };
      default: return styles.status;
    }
  };

  const getSortOptions = () => {
    switch (sortBy) {
      case 'client':
        return [
          { value: '', label: 'All Clients' },
          { value: 'meridian', label: 'Meridian Financial Group' },
          { value: 'coastal', label: 'Coastal Dental Partners' },
          { value: 'premier', label: 'Premier Legal Services' },
          { value: 'metro', label: 'Metropolitan Insurance' }
        ];
      case 'engineer':
        return [
          { value: '', label: 'All Engineers' },
          { value: 'sarah', label: 'Sarah Chen' },
          { value: 'mike', label: 'Mike Johnson' },
          { value: 'alex', label: 'Alex Rodriguez' }
        ];
      case 'priority':
        return [
          { value: '', label: 'All Priorities' },
          { value: 'high', label: 'High' },
          { value: 'medium', label: 'Medium' },
          { value: 'low', label: 'Low' }
        ];
      case 'status':
        return [
          { value: '', label: 'All Statuses' },
          { value: 'new', label: 'New' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'pending', label: 'Pending' }
        ];
      default:
        return [];
    }
  };

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!sortFilter) return matchesSearch;
    
    switch (sortBy) {
      case 'client':
        return matchesSearch && ticket.company.name.toLowerCase().includes(sortFilter);
      case 'priority':
        return matchesSearch && ticket.priority.name.toLowerCase() === sortFilter;
      case 'status':
        return matchesSearch && ticket.status.name.toLowerCase().replace(' ', '-') === sortFilter;
      default:
        return matchesSearch;
    }
  });

  const showClientEnvironment = () => {
    setAnalysisText(`CLIENT ENVIRONMENT - ${selectedTicket?.company.name}

Infrastructure Overview:
• 45 Active Users
• 2 Office Locations  
• 52 Managed Devices
• Exchange 2019 Email Server
• Windows Server 2019 Domain Controller

Key Applications:
• QuickBooks Enterprise 2024
• Microsoft 365 Business Premium
• Sage CRM Professional
• DocuSign Business Pro

Recent Issues (Last 30 Days):
• Email delivery delays (3 tickets)
• VPN connectivity issues (2 tickets)
• Backup verification failures (1 ticket)

Key Contacts:
• IT Manager: Michael Rodriguez
• Office Manager: Sarah Kim
• CEO: David Chen`);
  };

  const showEnterpriseSearch = () => {
    setAnalysisText(`ENTERPRISE SEARCH RESULTS

Search Query: "email server rejecting inbound messages"

Historical Tickets:
✓ #TF-2024-001324 - Similar Issue (Resolved)
  Client: Meridian Financial Group
  Resolution: Exchange server rejecting emails due to recipient policy misconfiguration. Updated recipient filtering rules and restarted SMTP service.

IT Glue Documentation:
✓ Exchange Configuration Guide
  Standard operating procedure for troubleshooting Exchange email delivery issues including common causes and step-by-step diagnostics.

Knowledge Base Articles:
✓ Email Delivery Troubleshooting
✓ Exchange Server Best Practices
✓ SMTP Connector Configuration`);
  };

  const showAIActions = () => {
    setAnalysisText(`AI-SUGGESTED ACTIONS

High Confidence Suggestions:

1. Check Exchange Message Queue
   Confidence: 92%
   Based on similar resolved tickets, intermittent rejection often indicates queue issues. Check for backed-up messages or transport rule conflicts.

2. Review SMTP Receive Connector Logs  
   Confidence: 87%
   Pattern analysis suggests receive connector authentication or IP restrictions may be causing selective rejections.

3. Verify Anti-Spam Filter Settings
   Confidence: 78%
   Recent updates to spam filtering rules may be incorrectly flagging legitimate external emails. Review whitelist and SCL thresholds.

Why these suggestions? AI analysis of 247 similar tickets shows 94% resolution rate when following this sequence. Current ticket symptoms match pattern cluster #7.`);
  };

  const showTicketSummary = () => {
    setAnalysisText(`AI TICKET SUMMARY & ANALYSIS

⚠️ TICKET NEEDS ATTENTION
Overall Assessment: High priority ticket with potential SLA risk. Similar issues took average 4.2 hours to resolve. Current time elapsed: 2h 15m.

AI Analysis by Category:
✓ Tech Skills: On track - following proper diagnostic procedures
⚠️ Sentiment: Client frustration detected in recent communications  
🚨 Cadence: Last update 2h 15m ago - exceeds recommended 1h interval
✓ Empathy: Good - acknowledging business impact appropriately
🚨 Disruption: High business impact - email system critical for operations
⚠️ Clarity: Need more specific details about affected domains

Current Situation Summary:
Meridian Financial Group experiencing intermittent email delivery failures since 9 AM EST. Issue affects inbound messages from external senders, impacting business-critical communications.

Actions Taken So Far:
• Initial diagnosis started at 10:30 AM
• Client contacted for additional details
• Timer active - 2h 15m elapsed

Outstanding Questions:
• Which external domains are being rejected?
• Are error messages logged in Exchange?
• Has recent configuration changed?`);
  };

  const generateAIDraft = () => {
    const aiDraftText = `Hi ${selectedTicket?.contact.name},

Thank you for reporting the email delivery issue. I've begun investigating the intermittent rejection of inbound messages on your Exchange server.

Based on my initial analysis, this appears to be related to either message queue processing or SMTP receive connector configuration. I'm currently:

• Reviewing the Exchange message queue for any backed-up or stuck messages
• Checking SMTP receive connector logs for authentication or IP restriction issues  
• Verifying anti-spam filter settings to ensure legitimate emails aren't being blocked

I estimate this will take approximately 1-2 hours to fully diagnose and resolve. I'll keep you updated every 30 minutes with my progress.

In the meantime, please let me know:
1. Are there specific external domains that seem to be affected more than others?
2. Have you noticed any error messages when sending test emails?

I'll have this resolved as quickly as possible to minimize impact on your business communications.

Best regards,
Sarah Chen
TechFlow MSP - L2 Support Engineer`;

    setNoteText(aiDraftText);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>TechFlow MSP</div>
        <div style={styles.headerSubtitle}>Sarah Chen - L2 Support Engineer</div>
        <div style={styles.stats}>
          <div style={styles.stat}>Assigned: 8</div>
          <div style={styles.stat}>Open: 12</div>
          <div style={styles.stat}>SLA: 2</div>
        </div>
      </div>

      <div style={styles.main}>
        {/* Left Panel */}
        <div style={styles.leftPanel}>
          {/* Filters Section */}
          <div style={styles.filtersSection}>
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchBar}
            />
            
            <div style={styles.controlsRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 'medium' }}>Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={styles.select}
                >
                  <option value="client">Client</option>
                  <option value="engineer">Engineer</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                </select>
              </div>
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
                style={{ ...styles.select, minWidth: '140px' }}
              >
                {getSortOptions().map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div style={styles.tabsRow}>
              <button
                onClick={() => setActiveTab('my-open')}
                style={{
                  ...styles.tab,
                  ...(activeTab === 'my-open' ? styles.tabActive : {})
                }}
              >
                My Open Tickets
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                style={{
                  ...styles.tab,
                  ...(activeTab === 'recent' ? styles.tabActive : {})
                }}
              >
                Recently Viewed
              </button>
            </div>
          </div>

          {/* Tickets List */}
          <div style={styles.ticketsList}>
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                style={{
                  ...styles.ticket,
                  ...(selectedTicket?.id === ticket.id ? styles.ticketSelected : {})
                }}
              >
                <div style={styles.ticketHeader}>
                  <span style={styles.ticketNumber}>#{ticket.id}</span>
                  <span style={getPriorityStyle(ticket.priority.name)}>
                    {ticket.priority.name.toUpperCase()}
                  </span>
                </div>
                <div style={styles.clientName}>{ticket.company.name}</div>
                <div style={styles.ticketSubject}>{ticket.summary}</div>
                <div style={styles.ticketMeta}>
                  <span style={getStatusStyle(ticket.status.name)}>
                    {ticket.status.name}
                  </span>
                  <span>{formatDate(ticket.dateEntered)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div style={styles.rightPanel}>
          {/* Ticket Overview - 32% */}
          <div style={styles.ticketOverview}>
            <div style={styles.ticketTitle}>
              <span style={styles.ticketId}>
                {selectedTicket ? `#${selectedTicket.id}` : 'Select a Ticket'}
              </span>
              {selectedTicket && (
                <>
                  <span style={{ ...styles.badge, ...getPriorityStyle(selectedTicket.priority.name) }}>
                    {selectedTicket.priority.name} Priority
                  </span>
                  <span style={{ ...styles.badge, ...getStatusStyle(selectedTicket.status.name) }}>
                    {selectedTicket.status.name}
                  </span>
                  <span style={{ ...styles.badge, ...styles.badgeRed }}>
                    ⚠️ Needs Attention
                  </span>
                </>
              )}
            </div>
            
            {selectedTicket ? (
              <>
                <div style={styles.ticketDescription}>
                  <strong>Issue:</strong> {selectedTicket.initialDescription}
                </div>
                
                <div style={styles.contactInfo}>
                  <div style={styles.contactField}>
                    <span style={styles.contactLabel}>Requester:</span>
                    <span style={styles.contactValue}>{selectedTicket.contact.name}</span>
                  </div>
                  <div style={styles.contactField}>
                    <span style={styles.contactLabel}>Client Company:</span>
                    <span style={styles.contactValue}>{selectedTicket.company.name}</span>
                  </div>
                  {selectedTicket.contact.phone && (
                    <div style={styles.contactField}>
                      <span style={styles.contactLabel}>Mobile Phone:</span>
                      <a href={`tel:${selectedTicket.contact.phone}`} style={styles.link}>
                        {selectedTicket.contact.phone}
                      </a>
                    </div>
                  )}
                  {selectedTicket.contact.email && (
                    <div style={styles.contactField}>
                      <span style={styles.contactLabel}>Email Address:</span>
                      <a href={`mailto:${selectedTicket.contact.email}`} style={styles.link}>
                        {selectedTicket.contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ color: '#94a3b8' }}>
                Select a ticket from the left panel to view details.
              </div>
            )}
          </div>

          {/* AI Engineer Assistant & Ticket Management - 23% */}
          <div style={styles.infoGathering}>
            {/* Left Column - AI Engineer Assistant */}
            <div style={styles.aiColumn}>
              <div style={styles.sectionTitle}>AI Engineer Assistant</div>
              <div style={styles.buttonGrid}>
                <button onClick={showClientEnvironment} style={styles.button}>
                  📊 Client Environment
                </button>
                <button onClick={showEnterpriseSearch} style={styles.button}>
                  🔍 Enterprise Search
                </button>
                <button onClick={showAIActions} style={styles.button}>
                  🤖 AI Actions
                </button>
                <button onClick={showTicketSummary} style={styles.button}>
                  📋 Ticket Summary
                </button>
              </div>
            </div>

            {/* Right Column - Ticket Management */}
            <div style={styles.managementColumn}>
              <div style={styles.sectionTitle}>Ticket Management</div>
              <div style={styles.buttonGrid}>
                <button style={styles.button}>Assign/Add Teammate</button>
                <button style={styles.button}>Request Escalation</button>
                <button style={styles.button}>Update Priority</button>
                <button style={styles.button}>Add Watchers</button>
              </div>
            </div>
          </div>

          {/* Notes & Communication - 45% */}
          <div style={styles.ticketActions}>
            <div style={styles.sectionTitle}>Notes & Communication</div>
            
            {/* Timer Display */}
            <div style={{ marginBottom: '16px' }}>
              <div style={styles.actionGroupTitle}>Time Tracking</div>
              <div style={styles.timer}>{timerDisplay}</div>
            </div>

            {/* Analysis Display */}
            {analysisText && (
              <div style={{ marginBottom: '20px' }}>
                <div style={styles.actionGroupTitle}>Analysis Results</div>
                <div style={styles.analysisBox}>
                  {analysisText}
                </div>
              </div>
            )}

            <div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add notes about your investigation or actions taken..."
                style={styles.textarea}
              />
              <div style={styles.noteControls}>
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value)}
                  style={styles.select}
                >
                  <option>Internal Note</option>
                  <option>Public Note</option>
                  <option>Resolution Note</option>
                </select>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                  <input type="checkbox" /> Request KB Article
                </label>
              </div>
              
              {/* Action Buttons Row */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                <button onClick={generateAIDraft} style={styles.smallButton}>
                  🤖 AI Draft
                </button>
                <button style={styles.smallButton}>
                  📝 Add Note
                </button>
                <button style={styles.smallButton}>
                  📎 Attach Files
                </button>
                <button style={{ ...styles.smallButton, ...styles.primaryButton }}>
                  ✅ Change Status / Close
                </button>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  style={styles.smallButton}
                >
                  {isTimerRunning ? '⏸️ Stop Timer' : '▶️ Start Timer'}
                </button>
                <button style={styles.smallButton}>
                  ⏱️ Manual Entry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MSPPortal;