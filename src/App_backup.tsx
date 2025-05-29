import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  Brain,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  MessageSquare,
  Clock,
  Users,
  AlertTriangle,
  X,
  Play,
  Pause,
  Paperclip,
  Send,
  Edit3,
  Timer,
  User
} from 'lucide-react';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '18px'
  },
  header: {
    position: 'sticky',
    top: 0,
    height: '80px',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    zIndex: 100
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#e2e8f0'
  },
  searchContainer: {
    position: 'relative',
    flex: 1,
    maxWidth: '500px',
    margin: '0 40px'
  },
  searchInput: {
    width: '100%',
    padding: '16px 20px 16px 56px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    color: '#e2e8f0',
    fontSize: '18px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  searchIcon: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8'
  },
  userInfo: {
    fontSize: '18px',
    color: '#cbd5e1',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  ticketsSidebar: {
    width: '420px',
    backgroundColor: '#1e293b',
    borderRight: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  sidebarHeader: {
    padding: '24px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sidebarTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#e2e8f0'
  },
  sidebarStats: {
    fontSize: '16px',
    color: '#94a3b8'
  },
  filterTabs: {
    display: 'flex',
    padding: '16px 24px 0',
    gap: '12px',
    borderBottom: '1px solid #334155',
    flexDirection: 'column'
  },
  filterRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  filterTab: {
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap'
  },
  filterTabActive: {
    backgroundColor: '#3b82f6',
    color: 'white'
  },
  filterTabInactive: {
    backgroundColor: '#334155',
    color: '#cbd5e1'
  },
  filterSelect: {
    padding: '10px 14px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '15px',
    minHeight: '44px',
    minWidth: '130px',
    cursor: 'pointer'
  },
  filterInput: {
    padding: '10px 14px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '15px',
    minHeight: '44px',
    minWidth: '160px',
    outline: 'none'
  },
  ticketsList: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 16px'
  },
  ticketCard: {
    margin: '16px 0',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.2s'
  },
  ticketCardSelected: {
    backgroundColor: '#1e40af',
    borderColor: '#3b82f6',
    transform: 'scale(1.02)'
  },
  ticketHeader: {
    padding: '18px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px'
  },
  ticketHeaderLeft: {
    flex: 1,
    minWidth: 0
  },
  ticketNumber: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '10px'
  },
  ticketTitle: {
    fontSize: '17px',
    fontWeight: '500',
    color: '#e2e8f0',
    marginBottom: '10px',
    lineHeight: '1.3'
  },
  ticketCompany: {
    fontSize: '15px',
    color: '#94a3b8',
    marginBottom: '12px'
  },
  ticketMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '15px',
    color: '#94a3b8'
  },
  priorityBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    flexShrink: 0
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
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginLeft: '8px'
  },
  statusNew: {
    backgroundColor: '#ddd6fe',
    color: '#7c3aed'
  },
  statusAssigned: {
    backgroundColor: '#fef3c7',
    color: '#d97706'
  },
  statusInProgress: {
    backgroundColor: '#bfdbfe',
    color: '#1d4ed8'
  },
  statusWaiting: {
    backgroundColor: '#fed7aa',
    color: '#ea580c'
  },
  statusEscalated: {
    backgroundColor: '#fee2e2',
    color: '#dc2626'
  },
  expandIcon: {
    color: '#94a3b8',
    marginLeft: '12px',
    flexShrink: 0
  },
  ticketDetails: {
    padding: '0 18px 18px',
    borderTop: '1px solid #475569',
    backgroundColor: '#1e293b'
  },
  quickActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '16px',
    flexWrap: 'wrap'
  },
  quickAction: {
    padding: '10px 14px',
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    border: '1px solid #334155',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#0f172a',
    overflow: 'hidden'
  },
  ticketDetailsHeader: {
    padding: '32px 40px',
    borderBottom: '1px solid #334155',
    backgroundColor: '#1e293b'
  },
  ticketDetailsTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: '16px',
    lineHeight: '1.3'
  },
  ticketDetailsSubtitle: {
    fontSize: '20px',
    color: '#94a3b8',
    marginBottom: '24px'
  },
  ticketDetailsActions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  actionButton: {
    padding: '16px 24px',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
    minHeight: '56px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  ticketContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  mainTicketArea: {
    flex: 1,
    padding: '40px',
    overflowY: 'auto'
  },
  sectionCard: {
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    border: '1px solid #334155',
    marginBottom: '32px',
    overflow: 'hidden'
  },
  sectionHeader: {
    padding: '24px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  sectionContent: {
    padding: '24px'
  },
  noteItem: {
    padding: '24px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    marginBottom: '20px'
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  noteAuthor: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#e2e8f0'
  },
  noteTime: {
    fontSize: '16px',
    color: '#94a3b8'
  },
  noteContent: {
    fontSize: '18px',
    color: '#cbd5e1',
    lineHeight: '1.6'
  },
  aiActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '32px'
  },
  aiButton: {
    padding: '20px 24px',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    border: '1px solid #334155',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
    minHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  analysisResults: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '24px',
    minHeight: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  analysisPlaceholder: {
    color: '#94a3b8',
    fontSize: '18px',
    textAlign: 'center'
  },
  rightSidebar: {
    width: '400px',
    backgroundColor: '#1e293b',
    borderLeft: '1px solid #334155',
    padding: '32px',
    overflowY: 'auto'
  },
  sidebarSection: {
    marginBottom: '40px'
  },
  sidebarSectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '20px'
  },
  contactField: {
    marginBottom: '20px'
  },
  contactLabel: {
    fontSize: '16px',
    color: '#94a3b8',
    marginBottom: '8px'
  },
  contactValue: {
    fontSize: '20px',
    color: '#e2e8f0',
    fontWeight: '500'
  },
  managementButton: {
    width: '100%',
    padding: '20px 24px',
    marginBottom: '16px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
    border: '1px solid #475569',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    minHeight: '64px'
  },
  timeTracking: {
    backgroundColor: '#334155',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid #475569'
  },
  timeDisplay: {
    fontSize: '40px',
    fontWeight: '700',
    color: '#3b82f6',
    textAlign: 'center',
    marginBottom: '20px'
  },
  timeButtons: {
    display: 'flex',
    gap: '12px'
  },
  timeButton: {
    flex: 1,
    padding: '16px 20px',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    border: '1px solid #334155',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    zIndex: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  modalContainer: {
    background: '#1e293b',
    borderRadius: '20px',
    border: '1px solid #334155',
    width: '100%',
    maxWidth: '800px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  modalHeader: {
    padding: '32px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#e2e8f0'
  },
  modalClose: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '32px',
    cursor: 'pointer',
    padding: '12px',
    borderRadius: '12px',
    transition: 'all 0.2s'
  },
  modalContent: {
    padding: '32px',
    overflowY: 'auto'
  },
  modalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  modalButton: {
    padding: '24px 32px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
    border: '1px solid #475569',
    borderRadius: '16px',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'left',
    minHeight: '80px'
  }
};

// Mock data with contact information
const tickets = [
  {
    id: 'TF-2024-001511',
    priority: 'NEEDS_ATTENTION',
    title: 'Workstation showing SMART errors. Proactive hard drive replacement needed.',
    company: 'Accounting Plus',
    time: '2h 15m ago',
    status: 'In Progress',
    assignee: 'Sarah Chen',
    contact: {
      name: 'Steve Wilson',
      phone: '(555) 123-4567',
      email: 'steve.wilson@accountingplus.com'
    }
  },
  {
    id: 'TF-2024-001520',
    priority: 'HIGH',
    title: 'Ransomware detection on workstation',
    company: 'Legal Services LLC',
    time: '30 min ago',
    status: 'New',
    assignee: 'Unassigned',
    contact: {
      name: 'Jennifer Adams',
      phone: '(555) 234-5678',
      email: 'jadams@legalservices.com'
    }
  },
  {
    id: 'TF-2024-001522',
    priority: 'MEDIUM',
    title: 'New Employee Setup - Critical network outage affecting main office',
    company: 'Manufacturing Corp',
    time: '45 min ago',
    status: 'Assigned',
    assignee: 'Mike Johnson',
    contact: {
      name: 'Robert Chen',
      phone: '(555) 345-6789',
      email: 'rchen@manufacturing.com'
    }
  },
  {
    id: 'TF-2024-001523',
    priority: 'LOW',
    title: 'Office server intermittently rejecting rebound messages',
    company: 'Tech Solutions Inc',
    time: '1h 2m ago',
    status: 'Waiting',
    assignee: 'Alex Rodriguez',
    contact: {
      name: 'Maria Garcia',
      phone: '(555) 456-7890',
      email: 'mgarcia@techsolutions.com'
    }
  }
];

const engineers = ['Sarah Chen', 'Mike Johnson', 'Alex Rodriguez', 'Marcus Thompson', 'Jenny Williams', 'David Kim'];
const statuses = ['All Statuses', 'New', 'Assigned', 'In Progress', 'Waiting', 'Escalated'];
const priorities = ['All Priorities', 'HIGH', 'MEDIUM', 'LOW', 'NEEDS_ATTENTION'];

const ImprovedEngineerApp = () => {
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const [activeFilter, setActiveFilter] = useState('My Open');
  const [selectedEngineer, setSelectedEngineer] = useState('All Engineers');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [expandedTickets, setExpandedTickets] = useState<Set<string>>(new Set());
  const [showNotes, setShowNotes] = useState(false);
  const [showCommunicationModal, setCommunicationModal] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalType, setActionModalType] = useState('');
  const [ticketSummaryContent, setTicketSummaryContent] = useState('');
  
  // File upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Stop timer notes state
  const [timerNotes, setTimerNotes] = useState('');
  const [noteType, setNoteType] = useState('public');
  const [addToKnowledgeBase, setAddToKnowledgeBase] = useState(false);
  const [timerStatusChange, setTimerStatusChange] = useState('');
  
  // Enterprise search state
  const [searchKeywords, setSearchKeywords] = useState('');
  const [searchHistoricalTickets, setSearchHistoricalTickets] = useState(true);
  const [searchITGlue, setSearchITGlue] = useState(false);
  const [searchSharePoint, setSearchSharePoint] = useState(false);
  const [searchVendorSupport, setSearchVendorSupport] = useState(false);
  const [searchResults, setSearchResults] = useState('');
  
  // Manual time entry state
  const [timeHours, setTimeHours] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [timeEntryNoteType, setTimeEntryNoteType] = useState('public');
  
  // Watchers state
  const [internalWatcher, setInternalWatcher] = useState('');
  const [externalWatcherEmail, setExternalWatcherEmail] = useState('');
  
  // Escalation state
  const [escalateToManager, setEscalateToManager] = useState(false);
  const [escalateToExecutive, setEscalateToExecutive] = useState(false);
  const [escalateViaEmail, setEscalateViaEmail] = useState(true);
  const [escalateViaTeams, setEscalateViaTeams] = useState(false);
  const [escalateViaSMS, setEscalateViaSMS] = useState(false);
  
  // Quick actions state
  const [assigneeSelection, setAssigneeSelection] = useState('');
  const [prioritySelection, setPrioritySelection] = useState(selectedTicket.priority);
  const [statusSelection, setStatusSelection] = useState(selectedTicket.status);
  const [escalationReason, setEscalationReason] = useState('');
  const [aiDraftText, setAiDraftText] = useState('');
  const [shareWith, setShareWith] = useState('');

  const filteredTickets = tickets.filter(ticket => {
    if (selectedEngineer !== 'All Engineers' && ticket.assignee !== selectedEngineer) {
      return false;
    }
    if (selectedClient && !ticket.company.toLowerCase().includes(selectedClient.toLowerCase())) {
      return false;
    }
    if (selectedStatus !== 'All Statuses' && ticket.status !== selectedStatus) {
      return false;
    }
    if (selectedPriority !== 'All Priorities' && ticket.priority !== selectedPriority) {
      return false;
    }
    return true;
  });

  const toggleTicketExpansion = (ticketId: string) => {
    const newExpanded = new Set(expandedTickets);
    if (newExpanded.has(ticketId)) {
      newExpanded.delete(ticketId);
    } else {
      newExpanded.add(ticketId);
    }
    setExpandedTickets(newExpanded);
  };

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

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'New': return styles.statusNew;
      case 'Assigned': return styles.statusAssigned;
      case 'In Progress': return styles.statusInProgress;
      case 'Waiting': return styles.statusWaiting;
      case 'Escalated': return styles.statusEscalated;
      default: return styles.statusNew;
    }
  };

  const formatTimeAgo = (timeString: string) => {
    if (timeString.includes('h')) {
      const hours = parseInt(timeString);
      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (timeString.includes('min')) {
      const minutes = parseInt(timeString);
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      }
      return '1 hour ago';
    }
    return timeString;
  };

  const handleTicketSelect = (ticket: any) => {
    setSelectedTicket(ticket);
    setExpandedTickets(new Set());
    setShowNotes(false);
    setAiAnalysisResult('');
    setTicketSummaryContent('');
    setSearchResults('');
  };

  const handleAiAction = (action: string) => {
    switch(action) {
      case 'environment':
        setAiAnalysisResult(`🏢 Client Environment - ${selectedTicket.company}:
        
📊 Environment Overview:
• Total Users: ${selectedTicket.company === 'Accounting Plus' ? '45 active licenses, 42 in use' : 
                 selectedTicket.company === 'Legal Services LLC' ? '28 active licenses, 25 in use' :
                 selectedTicket.company === 'Manufacturing Corp' ? '156 active licenses, 148 in use' :
                 '73 active licenses, 68 in use'}
• Remote Workers: ${selectedTicket.company === 'Accounting Plus' ? '18 (40% of workforce)' :
                    selectedTicket.company === 'Legal Services LLC' ? '22 (88% of workforce)' :
                    selectedTicket.company === 'Manufacturing Corp' ? '25 (16% of workforce)' :
                    '45 (65% of workforce)'}
• Primary Contact: ${selectedTicket.contact.name} (IT Manager)
• Phone: ${selectedTicket.contact.phone} | Email: ${selectedTicket.contact.email}

💻 Technology Stack:
${selectedTicket.company === 'Accounting Plus' ? 
  '• Microsoft 365 (E3 licenses)\n• QuickBooks Enterprise 2024\n• Adobe Creative Suite (5 licenses)\n• Windows 11 Pro (38 workstations)\n• Windows Server 2019 (primary domain controller)' :
  selectedTicket.company === 'Legal Services LLC' ?
  '• Microsoft 365 (E5 licenses)\n• Clio Legal Practice Management\n• Adobe Acrobat Pro DC\n• Windows 11 Pro (25 workstations)\n• Azure AD (cloud-only)' :
  selectedTicket.company === 'Manufacturing Corp' ?
  '• Microsoft 365 (E3 licenses)\n• SAP Business One\n• AutoCAD 2024\n• Windows 10/11 Mixed (140 workstations)\n• Windows Server 2022 (domain controller)' :
  '• Google Workspace Enterprise\n• Salesforce CRM\n• Slack Business+\n• MacOS/Windows Mixed (65 workstations)\n• AWS Cloud Infrastructure'}

🔧 Common Service Requests:
${selectedTicket.company === 'Accounting Plus' ?
  '• Password resets: 40% of tickets\n• VPN configuration: 25% of tickets\n• Email issues: 20% of tickets\n• Software installation: 15% of tickets' :
  selectedTicket.company === 'Legal Services LLC' ?
  '• Document access issues: 45% of tickets\n• VPN/Remote access: 35% of tickets\n• Email security questions: 15% of tickets\n• Software licensing: 5% of tickets' :
  selectedTicket.company === 'Manufacturing Corp' ?
  '• Network connectivity: 35% of tickets\n• SAP system issues: 25% of tickets\n• Hardware replacement: 20% of tickets\n• Email problems: 20% of tickets' :
  '• CRM data sync issues: 30% of tickets\n• Slack integration problems: 25% of tickets\n• Mobile device setup: 25% of tickets\n• Cloud access issues: 20% of tickets'}

⚠️ Known Issues:
${selectedTicket.company === 'Accounting Plus' ?
  '• Legacy printer drivers cause occasional conflicts\n• VPN timeout issues for remote users (known workaround documented)\n• QuickBooks multi-user database locks require monthly maintenance' :
  selectedTicket.company === 'Legal Services LLC' ?
  '• Clio sync delays during peak hours (2-3pm)\n• Azure AD conditional access policy conflicts\n• Document versioning issues in SharePoint' :
  selectedTicket.company === 'Manufacturing Corp' ?
  '• SAP performance degrades during shift changes\n• Legacy CAD workstations need hardware refresh\n• Network congestion during backup windows' :
  '• Salesforce API rate limiting during bulk operations\n• AWS cost optimization needed for dev environments\n• Google Drive sync conflicts with large files'}`);
        break;
      case 'knowledge':
        setActionModalType('Enterprise Knowledge Search');
        setShowActionModal(true);
        break;
      case 'actions':
        const actionPlan = selectedTicket.title.toLowerCase().includes('smart') || selectedTicket.title.toLowerCase().includes('drive') ?
          `⚡ AI Generated Action Plan for Ticket #${selectedTicket.id}:
        
🔍 Initial Assessment:
1. Review SMART error logs from Event Viewer (10 minutes)
2. Run Windows built-in disk check: chkdsk /f /r
3. Use manufacturer's diagnostic tool (Seagate SeaTools/WD Data Lifeguard)
4. Check warranty status and replacement eligibility

🛠️ Resolution Steps:
5. Backup critical data before replacement (30 minutes)
6. Clone drive to new replacement drive using Clonezilla
7. Install new drive and restore system
8. Test system functionality and performance

⏱️ Estimated Timeline:
• Total resolution time: 2-3 hours
• Client downtime: 1 hour (during replacement)
• Follow-up: 24-hour monitoring for stability

📋 Next Actions:
• Order replacement drive (same day delivery available)
• Schedule maintenance window with client
• Prepare backup and cloning tools` :

          selectedTicket.title.toLowerCase().includes('ransomware') ?
          `⚡ AI Generated Action Plan for Ticket #${selectedTicket.id}:
        
🚨 IMMEDIATE CONTAINMENT:
1. ISOLATE affected workstation from network (URGENT)
2. Preserve evidence - do NOT power down
3. Notify management and security team
4. Document current system state

🔍 Assessment Phase:
5. Identify ransomware variant using ID Ransomware tool
6. Check network for lateral movement indicators
7. Verify backup integrity and availability
8. Assess scope of encryption damage

🛠️ Recovery Steps:
9. Wipe and rebuild affected system from clean image
10. Restore data from verified clean backups
11. Apply latest security patches and updates
12. Implement additional monitoring

⏱️ Critical Timeline:
• Immediate isolation: COMPLETED
• Assessment: 2-4 hours
• Full recovery: 6-8 hours
• Security hardening: 2 hours

📋 Next Actions:
• Contact cyber insurance provider
• File incident report with appropriate authorities
• Review and update security policies` :

          selectedTicket.title.toLowerCase().includes('network') || selectedTicket.title.toLowerCase().includes('outage') ?
          `⚡ AI Generated Action Plan for Ticket #${selectedTicket.id}:
        
🔍 Network Diagnosis:
1. Check physical connections and switch status lights
2. Test internet connectivity from multiple locations
3. Review router/firewall logs for error messages
4. Ping test to gateway, DNS, and external sites

🛠️ Resolution Steps:
5. Restart network equipment in proper sequence
6. Check ISP status and contact if needed
7. Verify DHCP scope and IP allocation
8. Test wireless and wired connections separately

⏱️ Estimated Timeline:
• Initial diagnosis: 15-30 minutes
• Basic troubleshooting: 30-45 minutes
• ISP coordination (if needed): 1-4 hours
• Full restoration: 2-6 hours

📋 Next Actions:
• Update all affected users on status
• Document root cause for future prevention
• Review network redundancy options` :

          `⚡ AI Generated Action Plan for Ticket #${selectedTicket.id}:
        
🔍 Initial Assessment:
1. Backup current Exchange configuration (5 minutes)
2. Check SMTP connector settings and logs
3. Verify accepted domains and mail flow rules
4. Review transport rules for external domain blocking

🛠️ Resolution Steps:
5. Test email flow with: Test-ExchangeConnectivity -ClientAccessServer
6. Monitor message queue for 15 minutes post-change
7. Verify successful delivery to test addresses
8. Document resolution steps for knowledge base

⏱️ Estimated Timeline:
• Total resolution time: 30-45 minutes
• Client impact: Minimal (no downtime required)
• Follow-up: 24-hour monitoring recommended

📋 Next Actions:
• Update client on progress (ETA: 30min)
• Schedule follow-up verification call for tomorrow
• Update internal documentation with new configuration`;
        
        setAiAnalysisResult(actionPlan);
        break;
      case 'summary':
        setTicketSummaryContent(`📋 Ticket Summary - #${selectedTicket.id}

🎯 Issue Overview:
${selectedTicket.title}

🏢 Client: ${selectedTicket.company}
👤 Contact: ${selectedTicket.contact.name}
📞 Phone: ${selectedTicket.contact.phone}
✉️ Email: ${selectedTicket.contact.email}

⚡ Priority: ${getPriorityText(selectedTicket.priority)}
📊 Status: ${selectedTicket.status}
👨‍💻 Assigned: ${selectedTicket.assignee}
🕐 Created: ${formatTimeAgo(selectedTicket.time)}

🔍 Technical Details:
${selectedTicket.title.toLowerCase().includes('smart') || selectedTicket.title.toLowerCase().includes('drive') ?
  '• Workstation showing SMART disk errors in Event Viewer\n• Error codes: 51, 153, 154 indicating imminent drive failure\n• User reports occasional system freezes and slow boot times\n• Drive is 3.2 years old, still under warranty' :
  selectedTicket.title.toLowerCase().includes('ransomware') ?
  '• Workstation infected with suspected Conti ransomware variant\n• Files encrypted with .conti extension\n• Ransom note detected in multiple directories\n• System isolated from network immediately' :
  selectedTicket.title.toLowerCase().includes('network') || selectedTicket.title.toLowerCase().includes('outage') ?
  '• Complete network connectivity loss at main office location\n• Affects approximately 148 users\n• Started during normal business hours\n• Both wired and wireless connections affected' :
  '• Exchange server intermittently rejecting external emails\n• Specific domains affected: vendor1.com, supplier2.com\n• Internal email flow working normally\n• Issue started approximately ' + selectedTicket.time}

💼 Business Impact:
${selectedTicket.priority === 'HIGH' || selectedTicket.priority === 'NEEDS_ATTENTION' ?
  '• High priority - critical business operations affected' :
  selectedTicket.priority === 'MEDIUM' ?
  '• Medium priority - affecting productivity and communications' :
  '• Low priority - minimal business impact'}

⏱️ Estimated Resolution: ${selectedTicket.title.toLowerCase().includes('smart') || selectedTicket.title.toLowerCase().includes('drive') ?
  '2-3 hours' :
  selectedTicket.title.toLowerCase().includes('ransomware') ?
  '6-8 hours' :
  selectedTicket.title.toLowerCase().includes('network') || selectedTicket.title.toLowerCase().includes('outage') ?
  '2-6 hours' :
  '30-45 minutes'}`);
        break;
    }
  };

  const handleCommunicationAction = (action: string) => {
    setCommunicationModal(false);
    
    switch(action) {
      case 'AI Draft Response':
        setActionModalType('AI Draft Response');
        setAiDraftText(`Dear ${selectedTicket.contact.name},

Thank you for reporting the issue. I've identified the root cause and am implementing a solution.

Issue Summary:
${selectedTicket.title}

Resolution Plan:
1. Initial assessment and diagnosis (In Progress)
2. Implement recommended solution (Next - 15-30 min)
3. Test and verify functionality (Final - 10-15 min)

Expected Resolution: Within ${selectedTicket.title.toLowerCase().includes('smart') ? '2-3 hours' : selectedTicket.title.toLowerCase().includes('ransomware') ? '6-8 hours' : selectedTicket.title.toLowerCase().includes('network') ? '2-6 hours' : '45 minutes'}
I'll send an update once testing is complete.

Best regards,
Sarah Chen - L2 Support Engineer
TechFlow MSP`);
        setShowActionModal(true);
        break;
      case 'Attach Files':
        setActionModalType('Attach Files');
        setSelectedFiles([]);
        setShowActionModal(true);
        break;
      case 'Change Status':
        setActionModalType('Change Status');
        setStatusSelection(selectedTicket.status);
        setShowActionModal(true);
        break;
      case 'Stop Timer':
        setIsTimerRunning(false);
        setActionModalType('Stop Timer & Add Notes');
        setTimerNotes('');
        setNoteType('public');
        setAddToKnowledgeBase(false);
        setTimerStatusChange('');
        setShowActionModal(true);
        break;
      case 'Manual Time Entry':
        setActionModalType('Manual Time Entry');
        setShowActionModal(true);
        break;
      case 'Share Update':
        setActionModalType('Share Update');
        setShareWith('');
        setShowActionModal(true);
        break;
    }
  };

  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'assign':
        setActionModalType('Assign/Add Teammate');
        setAssigneeSelection('');
        setShowActionModal(true);
        break;
      case 'priority':
        setActionModalType('Update Priority/Status');
        setPrioritySelection(selectedTicket.priority);
        setStatusSelection(selectedTicket.status);
        setShowActionModal(true);
        break;
      case 'watchers':
        setActionModalType('Add Watchers');
        setInternalWatcher('');
        setExternalWatcherEmail('');
        setShowActionModal(true);
        break;
      case 'escalate':
        setActionModalType('Request Escalation');
        setEscalationReason('');
        setEscalateToManager(false);
        setEscalateToExecutive(false);
        setEscalateViaEmail(true);
        setEscalateViaTeams(false);
        setEscalateViaSMS(false);
        setShowActionModal(true);
        break;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const isTicketExpanded = (ticketId: string) => expandedTickets.has(ticketId);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>TechFlow MSP - Engineer Portal</div>
        
        <div style={styles.searchContainer}>
          <Search size={24} style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search tickets..." 
            style={styles.searchInput}
          />
        </div>
        
        <div style={styles.userInfo}>
          <span>Sarah Chen • L2 Support Engineer</span>
          <Settings size={24} style={{cursor: 'pointer'}} />
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Left Sidebar - Tickets List */}
        <div style={styles.ticketsSidebar}>
          <div style={styles.sidebarHeader}>
            <div>
              <div style={styles.sidebarTitle}>My Tickets</div>
              <div style={styles.sidebarStats}>Assigned: {filteredTickets.length} • Total: {tickets.length}</div>
            </div>
          </div>
          
          <div style={styles.filterTabs}>
            <div style={styles.filterRow}>
              <div 
                style={{
                  ...styles.filterTab,
                  ...(activeFilter === 'My Open' ? styles.filterTabActive : styles.filterTabInactive)
                }}
                onClick={() => setActiveFilter('My Open')}
              >
                My Open
              </div>
            </div>
            
            <div style={styles.filterRow}>
              <select 
                style={styles.filterSelect}
                value={selectedEngineer}
                onChange={(e) => setSelectedEngineer(e.target.value)}
              >
                <option value="All Engineers">All Engineers</option>
                {engineers.sort().map(engineer => (
                  <option key={engineer} value={engineer}>{engineer}</option>
                ))}
              </select>
              
              <input
                type="text"
                placeholder="Search clients..."
                style={styles.filterInput}
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
              />
            </div>
            
            <div style={styles.filterRow}>
              <select 
                style={styles.filterSelect}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <select 
                style={styles.filterSelect}
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div style={styles.ticketsList}>
            {filteredTickets.map(ticket => (
              <div 
                key={ticket.id}
                style={{
                  ...styles.ticketCard,
                  ...(selectedTicket.id === ticket.id ? styles.ticketCardSelected : {})
                }}
              >
                <div 
                  style={styles.ticketHeader}
                  onClick={() => handleTicketSelect(ticket)}
                >
                  <div style={styles.ticketHeaderLeft}>
                    <div style={styles.ticketNumber}>#{ticket.id} ({ticket.assignee})</div>
                    <div style={styles.ticketTitle}>{ticket.title}</div>
                    <div style={styles.ticketCompany}>
                      <strong>{ticket.company}</strong> - {formatTimeAgo(ticket.time)}
                    </div>
                    <div style={styles.ticketMeta}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          ...styles.priorityBadge,
                          ...getPriorityStyle(ticket.priority)
                        }}>
                          {getPriorityText(ticket.priority)}
                        </span>
                        <span style={{
                          ...styles.statusBadge,
                          ...getStatusStyle(ticket.status)
                        }}>
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                    <div 
                      style={styles.expandIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTicketExpansion(ticket.id);
                      }}
                    >
                      {isTicketExpanded(ticket.id) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>
                
                {isTicketExpanded(ticket.id) && (
                  <div style={styles.ticketDetails}>
                    <div style={styles.quickActions}>
                      <button style={styles.quickAction}>View Details</button>
                      <button style={styles.quickAction}>Take Ownership</button>
                      <button style={styles.quickAction}>Escalate</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={styles.contentArea}>
          {/* Ticket Header */}
          <div style={styles.ticketDetailsHeader}>
            <div style={styles.ticketDetailsTitle}>
              {selectedTicket.title}
            </div>
            <div style={styles.ticketDetailsSubtitle}>
              #{selectedTicket.id} ({selectedTicket.assignee}) • {selectedTicket.company}
            </div>
            <div style={styles.ticketDetailsActions}>
              <button 
                style={{...styles.actionButton, backgroundColor: '#3b82f6', borderColor: '#3b82f6', color: 'white'}}
                onClick={() => setCommunicationModal(true)}
              >
                <MessageSquare size={24} />
                Notes & Communications
              </button>
              <button 
                style={{...styles.actionButton, backgroundColor: '#dc2626', borderColor: '#dc2626', color: 'white'}}
                onClick={() => handleQuickAction('escalate')}
              >
                <AlertTriangle size={24} />
                Request Escalation
              </button>
            </div>
          </div>

          {/* Ticket Content */}
          <div style={styles.ticketContent}>
            <div style={styles.mainTicketArea}>
              {/* Notes Section */}
              <div style={styles.sectionCard}>
                <div 
                  style={styles.sectionHeader}
                  onClick={() => setShowNotes(!showNotes)}
                >
                  <div style={styles.sectionTitle}>
                    <MessageSquare size={24} color="#3b82f6" />
                    Ticket Notes
                  </div>
                  {showNotes ? <Minus size={24} /> : <Plus size={24} />}
                </div>
                
                {showNotes && (
                  <div style={styles.sectionContent}>
                    <div style={styles.noteItem}>
                      <div style={styles.noteHeader}>
                        <div style={styles.noteAuthor}>Sarah Chen</div>
                        <div style={styles.noteTime}>2h 15m ago</div>
                      </div>
                      <div style={styles.noteContent}>
                        Initial diagnostic started. Checking system logs and running hardware diagnostics. Will update in 30 minutes.
                      </div>
                    </div>
                    
                    <div style={styles.noteItem}>
                      <div style={styles.noteHeader}>
                        <div style={styles.noteAuthor}>Michael Rodriguez</div>
                        <div style={styles.noteTime}>45m ago</div>
                      </div>
                      <div style={styles.noteContent}>
                        Client confirms system has been freezing intermittently. SMART errors visible in Event Viewer. Recommending immediate backup and drive replacement.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* AI Assistant Section */}
              <div style={styles.sectionCard}>
                <div style={styles.sectionHeader}>
                  <div style={styles.sectionTitle}>
                    <Brain size={24} color="#3b82f6" />
                    AI Engineer Assistant
                  </div>
                </div>
                
                <div style={styles.sectionContent}>
                  <div style={styles.aiActions}>
                    <button 
                      style={styles.aiButton}
                      onClick={() => handleAiAction('environment')}
                    >
                      🔍 Client Environment
                    </button>
                    <button 
                      style={styles.aiButton}
                      onClick={() => handleAiAction('knowledge')}
                    >
                      📈 Enterprise Knowledge Search
                    </button>
                    <button 
                      style={styles.aiButton}
                      onClick={() => handleAiAction('actions')}
                    >
                      ⚡ Generate AI Actions
                    </button>
                    <button 
                      style={styles.aiButton}
                      onClick={() => handleAiAction('summary')}
                    >
                      📋 Ticket Summary
                    </button>
                  </div>
                  
                  <div style={styles.analysisResults}>
                    {ticketSummaryContent ? (
                      <div style={{ whiteSpace: 'pre-line', textAlign: 'left', width: '100%', fontSize: '18px', lineHeight: '1.6' }}>
                        {ticketSummaryContent}
                      </div>
                    ) : aiAnalysisResult ? (
                      <div style={{ whiteSpace: 'pre-line', textAlign: 'left', width: '100%', fontSize: '18px', lineHeight: '1.6' }}>
                        {aiAnalysisResult}
                      </div>
                    ) : searchResults ? (
                      <div style={{ whiteSpace: 'pre-line', textAlign: 'left', width: '100%', fontSize: '18px', lineHeight: '1.6' }}>
                        {searchResults}
                      </div>
                    ) : (
                      <div style={styles.analysisPlaceholder}>
                        Click any AI Assistant button above to view analysis results here.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={styles.rightSidebar}>
          {/* Contact Info */}
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarSectionTitle}>Contact Information</div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Requestor</div>
              <div style={styles.contactValue}>{selectedTicket.contact.name}</div>
            </div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Company</div>
              <div style={styles.contactValue}>{selectedTicket.company}</div>
            </div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Phone</div>
              <div style={styles.contactValue}>{selectedTicket.contact.phone}</div>
            </div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Email</div>
              <div style={styles.contactValue}>{selectedTicket.contact.email}</div>
            </div>
          </div>

          {/* Time Tracking */}
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarSectionTitle}>Time Tracking</div>
            
            <div style={styles.timeTracking}>
              <div style={styles.timeDisplay}>02:15:42</div>
              <div style={styles.timeButtons}>
                <button 
                  style={styles.timeButton}
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                >
                  {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
                <button style={styles.timeButton}>
                  <Timer size={18} />
                  Log Time
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarSectionTitle}>Quick Actions</div>
            
            <button 
              style={styles.managementButton}
              onClick={() => handleQuickAction('assign')}
            >
              <Users size={24} />
              Assign/Add Teammate
            </button>
            <button 
              style={styles.managementButton}
              onClick={() => handleQuickAction('priority')}
            >
              <AlertTriangle size={24} />
              Update Priority/Status
            </button>
            <button 
              style={styles.managementButton}
              onClick={() => handleQuickAction('watchers')}
            >
              <User size={24} />
              Add Watchers
            </button>
          </div>
        </div>
      </div>

      {/* Communication Modal */}
      {showCommunicationModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>Notes & Communications</div>
              <button 
                style={styles.modalClose}
                onClick={() => setCommunicationModal(false)}
              >
                <X size={32} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.modalGrid}>
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('AI Draft Response')}
                >
                  <Edit3 size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>AI Draft Response</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Generate smart reply</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Attach Files')}
                >
                  <Paperclip size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Attach Files</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Upload screenshots/docs</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Change Status')}
                >
                  <AlertTriangle size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Change Status</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Update ticket status</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Stop Timer')}
                >
                  <Clock size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Stop Timer</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Pause time tracking</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Manual Time Entry')}
                >
                  <Timer size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Manual Time Entry</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Log time manually</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Share Update')}
                >
                  <Send size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Share Update</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Send colleague update</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Escalation Modal */}
      {showActionModal && actionModalType === 'Request Escalation' && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>Request Escalation</div>
              <button 
                style={styles.modalClose}
                onClick={() => setShowActionModal(false)}
              >
                <X size={32} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '12px', 
                  fontWeight: '600',
                  color: '#e2e8f0',
                  fontSize: '18px'
                }}>
                  Escalation Reason
                </label>
                <textarea
                  value={escalationReason}
                  onChange={(e) => setEscalationReason(e.target.value)}
                  placeholder="Explain why this ticket needs escalation..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: '#334155',
                    border: '1px solid #475569',
                    borderRadius: '12px',
                    color: '#e2e8f0',
                    fontSize: '18px',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '16px', 
                  fontWeight: '600',
                  color: '#e2e8f0',
                  fontSize: '18px'
                }}>
                  Escalate To
                </label>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                    <input
                      type="checkbox"
                      checked={escalateToManager}
                      onChange={(e) => setEscalateToManager(e.target.checked)}
                      style={{ marginRight: '12px', width: '20px', height: '20px' }}
                    />
                    Manager
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                    <input
                      type="checkbox"
                      checked={escalateToExecutive}
                      onChange={(e) => setEscalateToExecutive(e.target.checked)}
                      style={{ marginRight: '12px', width: '20px', height: '20px' }}
                    />
                    Executive Team
                  </label>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '16px', 
                  fontWeight: '600',
                  color: '#e2e8f0',
                  fontSize: '18px'
                }}>
                  Escalate Via
                </label>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                    <input
                      type="checkbox"
                      checked={escalateViaEmail}
                      onChange={(e) => setEscalateViaEmail(e.target.checked)}
                      style={{ marginRight: '12px', width: '20px', height: '20px' }}
                    />
                    Email
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                    <input
                      type="checkbox"
                      checked={escalateViaTeams}
                      onChange={(e) => setEscalateViaTeams(e.target.checked)}
                      style={{ marginRight: '12px', width: '20px', height: '20px' }}
                    />
                    Teams Message
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                    <input
                      type="checkbox"
                      checked={escalateViaSMS}
                      onChange={(e) => setEscalateViaSMS(e.target.checked)}
                      style={{ marginRight: '12px', width: '20px', height: '20px' }}
                    />
                    SMS Text
                  </label>
                </div>
              </div>
              
              <div style={{ 
                marginTop: '32px', 
                display: 'flex', 
                justifyContent: 'flex-end',
                gap: '16px'
              }}>
                <button 
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#334155',
                    color: '#e2e8f0',
                    border: '1px solid #475569'
                  }}
                  onClick={() => setShowActionModal(false)}
                >
                  Cancel
                </button>
                
                <button 
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#dc2626',
                    color: 'white'
                  }}
                  onClick={() => {
                    console.log('Escalation submitted:', {
                      reason: escalationReason,
                      toManager: escalateToManager,
                      toExecutive: escalateToExecutive,
                      viaEmail: escalateViaEmail,
                      viaTeams: escalateViaTeams,
                      viaSMS: escalateViaSMS
                    });
                    setShowActionModal(false);
                  }}
                >
                  Submit Escalation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Action Modals */}
      {showActionModal && actionModalType !== 'Request Escalation' && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>{actionModalType}</div>
              <button 
                style={styles.modalClose}
                onClick={() => setShowActionModal(false)}
              >
                <X size={32} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              {/* Enterprise Knowledge Search */}
              {actionModalType === 'Enterprise Knowledge Search' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#e2e8f0',
                      fontSize: '18px'
                    }}>
                      Search Keywords
                    </label>
                    <input
                      type="text"
                      value={searchKeywords}
                      onChange={(e) => setSearchKeywords(e.target.value)}
                      placeholder="Enter search terms (e.g., 'Exchange SMTP connector')"
                      style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        fontSize: '18px'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '16px', 
                      fontWeight: '600',
                      color: '#e2e8f0',
                      fontSize: '18px'
                    }}>
                      Search Sources
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                        <input
                          type="checkbox"
                          checked={searchHistoricalTickets}
                          onChange={(e) => setSearchHistoricalTickets(e.target.checked)}
                          style={{ marginRight: '12px', width: '20px', height: '20px' }}
                        />
                        Historical Tickets
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                        <input
                          type="checkbox"
                          checked={searchITGlue}
                          onChange={(e) => setSearchITGlue(e.target.checked)}
                          style={{ marginRight: '12px', width: '20px', height: '20px' }}
                        />
                        IT Glue
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                        <input
                          type="checkbox"
                          checked={searchSharePoint}
                          onChange={(e) => setSearchSharePoint(e.target.checked)}
                          style={{ marginRight: '12px', width: '20px', height: '20px' }}
                        />
                        SharePoint
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                        <input
                          type="checkbox"
                          checked={searchVendorSupport}
                          onChange={(e) => setSearchVendorSupport(e.target.checked)}
                          style={{ marginRight: '12px', width: '20px', height: '20px' }}
                        />
                        Vendor Support
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Draft Response */}
              {actionModalType === 'AI Draft Response' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#e2e8f0',
                      fontSize: '18px'
                    }}>
                      Edit AI Generated Response
                    </label>
                    <textarea
                      value={aiDraftText}
                      onChange={(e) => setAiDraftText(e.target.value)}
                      rows={12}
                      style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        fontSize: '16px',
                        resize: 'vertical',
                        lineHeight: '1.5',
                        fontFamily: 'monospace'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Manual Time Entry */}
              {actionModalType === 'Manual Time Entry' && (
                <div>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px', 
                        fontWeight: '600',
                        color: '#e2e8f0',
                        fontSize: '18px'
                      }}>
                        Hours
                      </label>
                      <input
                        type="number"
                        value={timeHours}
                        onChange={(e) => setTimeHours(e.target.value)}
                        placeholder="0"
                        min="0"
                        max="24"
                        style={{
                          width: '100%',
                          padding: '16px',
                          backgroundColor: '#334155',
                          border: '1px solid #475569',
                          borderRadius: '12px',
                          color: '#e2e8f0',
                          fontSize: '18px'
                        }}
                      />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '12px', 
                        fontWeight: '600',
                        color: '#e2e8f0',
                        fontSize: '18px'
                      }}>
                        Minutes
                      </label>
                      <input
                        type="number"
                        value={timeMinutes}
                        onChange={(e) => setTimeMinutes(e.target.value)}
                        placeholder="0"
                        min="0"
                        max="59"
                        style={{
                          width: '100%',
                          padding: '16px',
                          backgroundColor: '#334155',
                          border: '1px solid #475569',
                          borderRadius: '12px',
                          color: '#e2e8f0',
                          fontSize: '18px'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#e2e8f0',
                      fontSize: '18px'
                    }}>
                      Work Description
                    </label>
                    <textarea
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                      placeholder="Describe the work performed..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        fontSize: '18px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '16px', 
                      fontWeight: '600',
                      color: '#e2e8f0',
                      fontSize: '18px'
                    }}>
                      Note Type
                    </label>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                        <input
                          type="checkbox"
                          checked={timeEntryNoteType === 'internal'}
                          onChange={(e) => setTimeEntryNoteType(e.target.checked ? 'internal' : 'public')}
                          style={{ marginRight: '12px', width: '20px', height: '20px' }}
                        />
                        Internal Note
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1', fontSize: '16px' }}>
                        <input
                          type="checkbox"
                          checked={timeEntryNoteType === 'public'}
                          onChange={(e) => setTimeEntryNoteType(e.target.checked ? 'public' : 'internal')}
                          style={{ marginRight: '12px', width: '20px', height: '20px' }}
                        />
                        Public Note (Client Visible)
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Simple interfaces for other modals */}
              {actionModalType === 'Assign/Add Teammate' && (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#e2e8f0',
                      fontSize: '18px'
                    }}>
                      Assign to Engineer
                    </label>
                    <select 
                      value={assigneeSelection}
                      onChange={(e) => setAssigneeSelection(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        fontSize: '18px'
                      }}
                    >
                      <option value="">Select Engineer</option>
                      {engineers.map(engineer => (
                        <option key={engineer} value={engineer}>{engineer}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              
              {/* Action buttons */}
              <div style={{ 
                marginTop: '32px', 
                display: 'flex', 
                justifyContent: 'flex-end',
                gap: '16px'
              }}>
                <button 
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#334155',
                    color: '#e2e8f0',
                    border: '1px solid #475569'
                  }}
                  onClick={() => setShowActionModal(false)}
                >
                  Cancel
                </button>
                
                <button 
                  style={{
                    ...styles.actionButton,
                    backgroundColor: '#3b82f6',
                    color: 'white'
                  }}
                  onClick={() => {
                    if (actionModalType === 'Enterprise Knowledge Search') {
                      // Demo search functionality
                      if (searchKeywords.toLowerCase().includes('exchange')) {
                        setSearchResults(`🔍 Enterprise Knowledge Search Results for "${searchKeywords}":

📚 Found 8 relevant articles:

📄 Historical Tickets (3 results):
• Ticket #TF-2024-001245: "Exchange connector blocking external domains" 
  → Resolution: Modified SMTP connector settings | Time: 45 min | Success rate: 100%
• Ticket #TF-2024-000892: "Exchange message queue backup after domain change"
  → Resolution: Cleared queue + restart transport service | Time: 20 min 
• Ticket #TF-2024-000654: "Similar vendor email blocking issue"
  → Resolution: Added domain to accepted list | Time: 15 min

📋 IT Glue Documentation (2 results):
• "Exchange SMTP Connector Configuration Guide"
  → Step-by-step instructions for domain whitelisting
• "Common Exchange Email Flow Issues"
  → Troubleshooting guide with PowerShell commands

💡 Recommended Next Steps:
1. Follow Historical Ticket #TF-2024-001245 resolution steps
2. Reference IT Glue SMTP Configuration Guide
3. Use PowerShell commands from Common Issues doc`);
                      } else {
                        setSearchResults(`🔍 Enterprise Knowledge Search Results for "${searchKeywords}":

📚 Found 3 relevant articles:

💡 Try searching for more specific terms like:
• "Exchange" for email server issues
• "VPN" for remote access problems  
• "QuickBooks" for accounting software issues
• "Password" for authentication problems`);
                      }
                    }
                    setShowActionModal(false);
                  }}
                >
                  {actionModalType === 'Enterprise Knowledge Search' ? 'Search Knowledge Base' :
                   actionModalType === 'AI Draft Response' ? 'Send Email' :
                   actionModalType === 'Manual Time Entry' ? 'Log Time Entry' :
                   actionModalType === 'Assign/Add Teammate' ? 'Assign Ticket' :
                   'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovedEngineerApp;