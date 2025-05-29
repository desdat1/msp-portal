import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  User, 
  Phone,
  Mail,
  Building,
  Clock,
  MessageSquare,
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Star,
  ArrowRight
} from 'lucide-react';

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    backgroundColor: '#1a202c',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '16px' // Increased base font size
  },
  header: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    height: '65px', // Increased height
    backgroundColor: '#2d3748',
    borderBottom: '1px solid #4a5568',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 1000
  },
  logo: {
    fontSize: '22px', // Increased from typical 18px
    fontWeight: '700',
    color: '#e2e8f0'
  },
  userInfo: {
    fontSize: '16px', // Increased from typical 14px
    color: '#cbd5e1',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: '400px',
    margin: '0 32px'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 48px',
    backgroundColor: '#4a5568',
    border: '1px solid #718096',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '16px', // Increased
    outline: 'none'
  },
  searchIcon: {
    position: 'absolute' as const,
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0'
  },
  mainContent: {
    display: 'flex',
    marginTop: '65px',
    height: 'calc(100vh - 65px)'
  },
  ticketsSidebar: {
    width: '380px', // Increased width
    backgroundColor: '#2d3748',
    borderRight: '1px solid #4a5568',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  },
  sidebarHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #4a5568',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sidebarTitle: {
    fontSize: '20px', // Increased
    fontWeight: '600',
    color: '#e2e8f0'
  },
  filterTabs: {
    display: 'flex',
    padding: '16px 24px',
    gap: '12px',
    borderBottom: '1px solid #4a5568'
  },
  filterTab: {
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '15px', // Increased
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  filterTabActive: {
    backgroundColor: '#3182ce',
    color: 'white'
  },
  filterTabInactive: {
    backgroundColor: '#4a5568',
    color: '#cbd5e1'
  },
  ticketsList: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '0 12px'
  },
  ticketItem: {
    margin: '12px 0',
    padding: '20px 16px', // Increased padding
    backgroundColor: '#374151',
    border: '1px solid #4a5568',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  ticketItemSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#3b82f6'
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  ticketNumber: {
    fontSize: '16px', // Increased
    fontWeight: '600',
    color: '#e2e8f0'
  },
  priorityBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px', // Increased
    fontWeight: '600',
    textTransform: 'uppercase' as const
  },
  priorityHigh: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    color: '#fca5a5',
    border: '1px solid rgba(239, 68, 68, 0.3)'
  },
  priorityMedium: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    color: '#fde047',
    border: '1px solid rgba(251, 191, 36, 0.3)'
  },
  priorityLow: {
    backgroundColor: 'rgba(34, 197, 94, 0.2)',
    color: '#86efac',
    border: '1px solid rgba(34, 197, 94, 0.3)'
  },
  ticketTitle: {
    fontSize: '16px', // Increased
    fontWeight: '500',
    color: '#e2e8f0',
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  ticketCompany: {
    fontSize: '14px', // Increased
    color: '#cbd5e1',
    marginBottom: '8px'
  },
  ticketMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px', // Increased
    color: '#a0aec0'
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#1a202c',
    overflow: 'hidden'
  },
  ticketDetailsHeader: {
    padding: '24px 32px',
    borderBottom: '1px solid #4a5568',
    backgroundColor: '#2d3748'
  },
  ticketDetailsTitle: {
    fontSize: '26px', // Increased
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: '12px'
  },
  ticketDetailsSubtitle: {
    fontSize: '16px', // Increased
    color: '#cbd5e1',
    marginBottom: '16px'
  },
  ticketDetailsActions: {
    display: 'flex',
    gap: '12px'
  },
  actionButton: {
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '15px', // Increased
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s'
  },
  buttonPrimary: {
    backgroundColor: '#3182ce',
    color: 'white'
  },
  buttonSecondary: {
    backgroundColor: '#4a5568',
    color: '#e2e8f0',
    border: '1px solid #718096'
  },
  ticketContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  ticketDetails: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto' as const
  },
  sectionTitle: {
    fontSize: '20px', // Increased
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  notesSection: {
    marginBottom: '32px'
  },
  noteItem: {
    padding: '20px', // Increased
    backgroundColor: '#2d3748',
    border: '1px solid #4a5568',
    borderRadius: '8px',
    marginBottom: '16px'
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  noteAuthor: {
    fontSize: '15px', // Increased
    fontWeight: '600',
    color: '#e2e8f0'
  },
  noteTime: {
    fontSize: '13px', // Increased
    color: '#a0aec0'
  },
  noteContent: {
    fontSize: '15px', // Increased
    color: '#cbd5e1',
    lineHeight: '1.5'
  },
  aiAssistant: {
    marginBottom: '32px'
  },
  aiPanel: {
    backgroundColor: '#2d3748',
    border: '1px solid #4a5568',
    borderRadius: '8px',
    padding: '24px' // Increased
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  aiTitle: {
    fontSize: '18px', // Increased
    fontWeight: '600',
    color: '#e2e8f0'
  },
  aiActions: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px'
  },
  aiButton: {
    padding: '10px 16px',
    backgroundColor: '#4a5568',
    color: '#e2e8f0',
    border: '1px solid #718096',
    borderRadius: '6px',
    fontSize: '14px', // Increased
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  analysisResults: {
    backgroundColor: '#374151',
    borderRadius: '6px',
    padding: '20px', // Increased
    minHeight: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  analysisPlaceholder: {
    color: '#9ca3af',
    fontSize: '15px', // Increased
    textAlign: 'center' as const
  },
  rightSidebar: {
    width: '320px', // Increased width
    backgroundColor: '#2d3748',
    borderLeft: '1px solid #4a5568',
    padding: '24px', // Increased padding
    overflowY: 'auto' as const
  },
  contactInfo: {
    marginBottom: '32px'
  },
  contactTitle: {
    fontSize: '18px', // Increased
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '16px'
  },
  contactField: {
    marginBottom: '16px'
  },
  contactLabel: {
    fontSize: '14px', // Increased
    color: '#a0aec0',
    marginBottom: '4px'
  },
  contactValue: {
    fontSize: '15px', // Increased
    color: '#e2e8f0',
    fontWeight: '500'
  },
  customerPoc: {
    marginBottom: '32px'
  },
  ticketManagement: {
    marginBottom: '32px'
  },
  managementButton: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '8px',
    backgroundColor: '#4a5568',
    color: '#e2e8f0',
    border: '1px solid #718096',
    borderRadius: '6px',
    fontSize: '14px', // Increased
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left' as const
  },
  notesComm: {
    marginBottom: '32px'
  },
  timeTracking: {
    backgroundColor: '#374151',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px'
  },
  timeDisplay: {
    fontSize: '28px', // Increased
    fontWeight: '700',
    color: '#3182ce',
    textAlign: 'center' as const,
    marginBottom: '12px'
  },
  timeButtons: {
    display: 'flex',
    gap: '8px'
  },
  timeButton: {
    flex: 1,
    padding: '8px 12px',
    backgroundColor: '#4a5568',
    color: '#e2e8f0',
    border: '1px solid #718096',
    borderRadius: '6px',
    fontSize: '13px', // Increased
    fontWeight: '500',
    cursor: 'pointer'
  }
};

// Mock data
const tickets = [
  {
    id: 'TF-2024-001511',
    priority: 'NEEDS_ATTENTION',
    title: 'Workstation showing SMART errors. Proactive hard drive replacement needed.',
    company: 'Accounting Plus',
    time: '2h 15m ago',
    status: 'In Progress',
    assignee: 'Sarah Chen'
  },
  {
    id: 'TF-2024-001520',
    priority: 'HIGH',
    title: 'Ransomware detection on workstation',
    company: 'Legal Services LLC',
    time: '30 min ago',
    status: 'New',
    assignee: 'Unassigned'
  },
  {
    id: 'TF-2024-001522',
    priority: 'MEDIUM',
    title: 'New Employee Setup - Critical network outage affecting main office',
    company: 'Manufacturing Corp',
    time: '45 min ago',
    status: 'In Progress',
    assignee: 'Mike Johnson'
  },
  {
    id: 'TF-2024-001523',
    priority: 'LOW',
    title: 'Office server intermittently rejecting rebound messages',
    company: 'Tech Solutions Inc',
    time: '1h 2m ago',
    status: 'Waiting',
    assignee: 'Alex Rodriguez'
  },
  {
    id: 'TF-2024-001515',
    priority: 'MEDIUM',
    title: 'Critical server backup failure - nightly job completion error',
    company: 'Healthcare Partners',
    time: '1h 45m ago',
    status: 'In Progress',
    assignee: 'Jenny Williams'
  },
  {
    id: 'TF-2024-001519',
    priority: 'LOW',
    title: 'VPN connection dropping for remote users',
    company: 'Global Manufacturing',
    time: '2h 30m ago',
    status: 'New',
    assignee: 'Unassigned'
  },
  {
    id: 'TF-2024-001517',
    priority: 'MEDIUM',
    title: 'Printer network connectivity issues',
    company: 'Creative Services',
    time: '3h 20m ago',
    status: 'Waiting',
    assignee: 'Marcus Thompson'
  },
  {
    id: 'TF-2024-001512',
    priority: 'LOW',
    title: 'Firewall blocking legitimate business application',
    company: 'Financial Advisors LLC',
    time: '4h 15m ago',
    status: 'In Progress',
    assignee: 'Sarah Chen'
  },
  {
    id: 'TF-2024-001513',
    priority: 'HIGH',
    title: 'Software licensing compliance audit request',
    company: 'Retail Solutions Group',
    time: '5h 30m ago',
    status: 'New',
    assignee: 'Unassigned'
  }
];

const TechnicianApp = () => {
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [activeFilter, setActiveFilter] = useState('My Open');

  const getPriorityStyle = (priority: string) => {
    switch(priority) {
      case 'HIGH': return styles.priorityHigh;
      case 'MEDIUM': return styles.priorityMedium;
      case 'LOW': return styles.priorityLow;
      case 'NEEDS_ATTENTION': return styles.priorityHigh;
      default: return styles.priorityMedium;
    }
  };

  const getPriorityText = (priority: string) => {
    if (priority === 'NEEDS_ATTENTION') return 'Needs Attention';
    return priority;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>TechFlow MSP - UPDATED</div>
        
        <div style={styles.searchContainer}>
          <Search size={20} style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search tickets..." 
            style={styles.searchInput}
          />
        </div>
        
        <div style={styles.userInfo}>
          <span>Sarah Chen • L2 Support Engineer</span>
          <Settings size={20} style={{cursor: 'pointer'}} />
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Left Sidebar - Tickets List */}
        <div style={styles.ticketsSidebar}>
          <div style={styles.sidebarHeader}>
            <div style={styles.sidebarTitle}>Assigned: 8</div>
            <div style={{fontSize: '14px', color: '#a0aec0'}}>Open: 12</div>
          </div>
          
          <div style={styles.filterTabs}>
            {['My Open', 'All Clients', 'Recent'].map(filter => (
              <div 
                key={filter}
                style={{
                  ...styles.filterTab,
                  ...(activeFilter === filter ? styles.filterTabActive : styles.filterTabInactive)
                }}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
          
          <div style={styles.ticketsList}>
            {tickets.map(ticket => (
              <div 
                key={ticket.id}
                style={{
                  ...styles.ticketItem,
                  ...(selectedTicket.id === ticket.id ? styles.ticketItemSelected : {})
                }}
                onClick={() => setSelectedTicket(ticket)}
              >
                <div style={styles.ticketHeader}>
                  <div style={styles.ticketNumber}>#{ticket.id}</div>
                  <div style={{
                    ...styles.priorityBadge,
                    ...getPriorityStyle(ticket.priority)
                  }}>
                    {getPriorityText(ticket.priority)}
                  </div>
                </div>
                
                <div style={styles.ticketTitle}>{ticket.title}</div>
                <div style={styles.ticketCompany}>{ticket.company}</div>
                
                <div style={styles.ticketMeta}>
                  <span>{ticket.time}</span>
                  <span>{ticket.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={styles.contentArea}>
          {/* Ticket Header */}
          <div style={styles.ticketDetailsHeader}>
            <div style={styles.ticketDetailsTitle}>
              Issue: {selectedTicket.title}
            </div>
            <div style={styles.ticketDetailsSubtitle}>
              Last Notes
            </div>
            <div style={styles.ticketDetailsActions}>
              <button style={{...styles.actionButton, ...styles.buttonPrimary}}>
                ✓ Close Environment
              </button>
              <button style={{...styles.actionButton, ...styles.buttonSecondary}}>
                ⚡ AI Actions
              </button>
              <button style={{...styles.actionButton, ...styles.buttonSecondary}}>
                📋 Ticket Summary
              </button>
            </div>
          </div>

          {/* Ticket Content */}
          <div style={styles.ticketContent}>
            <div style={styles.ticketDetails}>
              {/* Last Notes Section */}
              <div style={styles.notesSection}>
                <div style={styles.noteItem}>
                  <div style={styles.noteHeader}>
                    <div style={styles.noteAuthor}>Sarah Chen</div>
                    <div style={styles.noteTime}>2h 15m ago</div>
                  </div>
                  <div style={styles.noteContent}>
                    Initial diagnostic started. Checking Exchange message queue and SMTP connectors. Will update in 30 minutes.
                  </div>
                </div>
                
                <div style={styles.noteItem}>
                  <div style={styles.noteHeader}>
                    <div style={styles.noteAuthor}>Michael Rodriguez</div>
                    <div style={styles.noteTime}>45m ago</div>
                  </div>
                  <div style={styles.noteContent}>
                    Client confirms issue affects emails from @vendor1.com and @supplier2.com specifically. No issues with internal emails.
                  </div>
                </div>
                
                <div style={styles.noteItem}>
                  <div style={styles.noteHeader}>
                    <div style={styles.noteAuthor}>Frank Chen</div>
                    <div style={styles.noteTime}>18m ago</div>
                  </div>
                  <div style={styles.noteContent}>
                    Found issue - modified connector configuration blocking external domains. Reverting changes now.
                  </div>
                </div>
              </div>

              {/* AI Assistant Section */}
              <div style={styles.aiAssistant}>
                <div style={styles.sectionTitle}>
                  <Brain size={20} color="#3182ce" />
                  AI Engineer Assistant
                </div>
                
                <div style={styles.aiPanel}>
                  <div style={styles.aiHeader}>
                    <div style={styles.aiTitle}>Ticket Management</div>
                  </div>
                  
                  <div style={styles.aiActions}>
                    <button style={styles.aiButton}>🔍 Client Environment</button>
                    <button style={styles.aiButton}>📈 Enterprise Search</button>
                    <button style={styles.aiButton}>⚡ AI Actions</button>
                    <button style={styles.aiButton}>📋 Ticket Summary</button>
                  </div>
                  
                  <div style={styles.sectionTitle}>Analysis Results</div>
                  <div style={styles.analysisResults}>
                    <div style={styles.analysisPlaceholder}>
                      Click any AI Assistant button above to view analysis results here.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={styles.rightSidebar}>
          {/* Contact Info */}
          <div style={styles.contactInfo}>
            <div style={styles.contactTitle}>Contact Info</div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Requestor</div>
              <div style={styles.contactValue}>Steve Wilson</div>
            </div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Company</div>
              <div style={styles.contactValue}>Accounting Plus</div>
            </div>
          </div>

          {/* Customer POC */}
          <div style={styles.customerPoc}>
            <div style={styles.contactTitle}>Customer POC</div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Requestor</div>
              <div style={styles.contactValue}>Steve Wilson</div>
            </div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Company</div>
              <div style={styles.contactValue}>Accounting Plus</div>
            </div>
          </div>

          {/* Ticket Management */}
          <div style={styles.ticketManagement}>
            <div style={styles.contactTitle}>Ticket Management</div>
            
            <button style={styles.managementButton}>
              👥 Assign/Add Teammate
            </button>
            <button style={styles.managementButton}>
              🔄 Update Priority / Status
            </button>
            <button style={styles.managementButton}>
              ➕ Add Watchers
            </button>
            <button style={styles.managementButton}>
              🚨 Request Escalation
            </button>
          </div>

          {/* Notes & Communication */}
          <div style={styles.notesComm}>
            <div style={styles.contactTitle}>Notes & Communication</div>
            
            {/* Time Tracking */}
            <div style={styles.timeTracking}>
              <div style={styles.timeDisplay}>02:15:42</div>
              <div style={styles.timeButtons}>
                <button style={styles.timeButton}>▶ Start</button>
                <button style={styles.timeButton}>⏸ Pause</button>
                <button style={styles.timeButton}>🗂 Log Time</button>
              </div>
            </div>
            
            <button style={styles.managementButton}>
              📝 Add Note
            </button>
            <button style={styles.managementButton}>
              📎 Attach Files
            </button>
            <button style={styles.managementButton}>
              💬 Share Tweet
            </button>
            <button style={styles.managementButton}>
              📧 Manual Entry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianApp;