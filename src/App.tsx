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
  User,
  Phone,
  Mail,
  MessageCircle,
  FileText,
  Clipboard,
  RefreshCw
} from 'lucide-react';
import useTickets from '../hooks/useTickets'; // Import the live data hook

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
  refreshButton: {
    padding: '8px 12px',
    backgroundColor: 'transparent',
    border: '1px solid #475569',
    borderRadius: '8px',
    color: '#94a3b8',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px'
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200
  },
  errorBanner: {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '12px 24px',
    textAlign: 'center',
    fontSize: '16px'
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
  statusResolved: {
    backgroundColor: '#dcfce7',
    color: '#16a34a'
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
    padding: '16px 20px',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    border: '1px solid #334155',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
    minHeight: '70px',
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
    maxWidth: '900px',
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
  },
  formField: {
    marginBottom: '24px'
  },
  formLabel: {
    display: 'block',
    marginBottom: '12px',
    fontWeight: '600',
    color: '#e2e8f0',
    fontSize: '18px'
  },
  formInput: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    color: '#e2e8f0',
    fontSize: '18px',
    outline: 'none'
  },
  formTextarea: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    color: '#e2e8f0',
    fontSize: '18px',
    resize: 'vertical',
    outline: 'none'
  },
  formSelect: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    color: '#e2e8f0',
    fontSize: '18px',
    cursor: 'pointer'
  },
  checkboxGroup: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    color: '#cbd5e1',
    fontSize: '16px'
  },
  checkbox: {
    marginRight: '12px',
    width: '20px',
    height: '20px'
  },
  fileDropZone: {
    border: '2px dashed #475569',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
    backgroundColor: '#334155',
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  fileList: {
    marginTop: '16px'
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    marginBottom: '8px'
  },
  removeButton: {
    background: '#dc2626',
    border: 'none',
    color: 'white',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};

const engineers = ['Sarah Chen', 'Mike Johnson', 'Alex Rodriguez', 'Marcus Thompson', 'Jenny Williams', 'David Kim'];
const statuses = ['All Statuses', 'New', 'Assigned', 'In Progress', 'Waiting', 'Escalated', 'Resolved'];
const priorities = ['All Priorities', 'HIGH', 'MEDIUM', 'LOW', 'NEEDS_ATTENTION'];
const employees = ['David Kim (Manager)', 'Marcus Thompson (L3)', 'Lisa Wang (Senior)', 'Frank Chen (L2)', 'Tom Rodriguez (L1)', 'Sarah Chen (L2)', 'Mike Johnson (L2)', 'Alex Rodriguez (L1)', 'Jenny Williams (L2)'];

const ImprovedEngineerApp = () => {
  // Replace static tickets with live data hook
  const { tickets, loading, error, lastUpdated, refreshTickets } = useTickets();
  
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [activeFilter, setActiveFilter] = useState('My Open');
  const [selectedEngineer, setSelectedEngineer] = useState('All Engineers');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTickets, setExpandedTickets] = useState<Set<string>>(new Set());
  const [showNotes, setShowNotes] = useState(false);
  const [showTakeActionModal, setShowTakeActionModal] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalType, setActionModalType] = useState('');
  const [ticketSummaryContent, setTicketSummaryContent] = useState('');
  
  // Form states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [timerNotes, setTimerNotes] = useState('');
  const [noteType, setNoteType] = useState('public');
  const [addToKnowledgeBase, setAddToKnowledgeBase] = useState(false);
  const [timerStatusChange, setTimerStatusChange] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [searchHistoricalTickets, setSearchHistoricalTickets] = useState(true);
  const [searchITGlue, setSearchITGlue] = useState(false);
  const [searchSharePoint, setSearchSharePoint] = useState(false);
  const [searchVendorSupport, setSearchVendorSupport] = useState(false);
  const [searchResults, setSearchResults] = useState('');
  const [timeHours, setTimeHours] = useState('');
  const [timeMinutes, setTimeMinutes] = useState('');
  const [workDescription, setWorkDescription] = useState('');
  const [timeEntryNoteType, setTimeEntryNoteType] = useState('public');
  const [assigneeSelection, setAssigneeSelection] = useState('');
  const [isAssignTicket, setIsAssignTicket] = useState(true);
  const [escalationReason, setEscalationReason] = useState('');
  const [escalateToManager, setEscalateToManager] = useState(false);
  const [escalateToExecutive, setEscalateToExecutive] = useState(false);
  const [escalateViaEmail, setEscalateViaEmail] = useState(true);
  const [escalateViaTeams, setEscalateViaTeams] = useState(false);
  const [escalateViaSMS, setEscalateViaSMS] = useState(false);
  const [aiDraftText, setAiDraftText] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [sendTextMessage, setSendTextMessage] = useState(false);
  const [internalWatcher, setInternalWatcher] = useState('');
  const [externalWatcherEmail, setExternalWatcherEmail] = useState('');
  const [shareUpdateStaff, setShareUpdateStaff] = useState('');
  const [shareUpdateNotes, setShareUpdateNotes] = useState('');
  const [shareViaEmail, setShareViaEmail] = useState(true);
  const [shareViaTeams, setShareViaTeams] = useState(false);
  const [shareViaSMS, setShareViaSMS] = useState(false);

  // Set initial selected ticket when tickets load
  React.useEffect(() => {
    if (tickets.length > 0 && !selectedTicket) {
      setSelectedTicket(tickets[0]);
    }
  }, [tickets, selectedTicket]);

  // Enhanced filtering with live data
  const filteredTickets = tickets.filter(ticket => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!ticket.assignee.toLowerCase().includes(query) &&
          !ticket.title.toLowerCase().includes(query) &&
          !ticket.company.toLowerCase().includes(query) &&
          !ticket.id.toLowerCase().includes(query)) {
        return false;
      }
    }
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
      case 'Resolved': return styles.statusResolved;
      default: return styles.statusNew;
    }
  };

  const formatTimeAgo = (timeString: string) => {
    if (!timeString) return 'Unknown';
    
    if (timeString.includes('h')) {
      const hours = parseInt(timeString);
      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (timeString.includes('min') || timeString.includes('m')) {
      const minutes = parseInt(timeString);
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      }
      return timeString;
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

  // Enhanced AI actions with live ticket data
  const handleAiAction = (action: string) => {
    if (!selectedTicket) return;

    switch(action) {
      case 'environment':
        setAiAnalysisResult(`🏢 Client Environment - ${selectedTicket.company}:
        
📊 Environment Overview:
• Company: ${selectedTicket.company}
• Contact: ${selectedTicket.contact.name}
• Phone: ${selectedTicket.contact.phone}
• Email: ${selectedTicket.contact.email}
• Current Assignee: ${selectedTicket.assignee}

🔍 Current Ticket Details:
• Ticket ID: ${selectedTicket.id}
• Priority: ${getPriorityText(selectedTicket.priority)}
• Status: ${selectedTicket.status}
• Created: ${selectedTicket.time}
• Board: ${selectedTicket.board || 'Service Board'}
• Type: ${selectedTicket.type || 'Service Request'}

💻 Technical Information:
• Severity: ${selectedTicket.severity || 'Medium'}
• Impact: ${selectedTicket.impact || 'Medium'}  
• Urgency: ${selectedTicket.urgency || 'Medium'}

📋 ConnectWise Integration:
✅ Live data from ConnectWise API
✅ Real-time updates every 30 seconds
✅ Full ticket synchronization active`);
        break;
        
      case 'knowledge':
        setActionModalType('Enterprise Knowledge Search');
        setShowActionModal(true);
        break;
        
      case 'actions':
        const actionPlan = `⚡ AI Generated Action Plan for Ticket #${selectedTicket.id}:

🎯 Issue: ${selectedTicket.title}
🏢 Client: ${selectedTicket.company}
⚡ Priority: ${getPriorityText(selectedTicket.priority)}

🔍 Analysis:
${selectedTicket.title.toLowerCase().includes('smart') || selectedTicket.title.toLowerCase().includes('drive') ?
  '• Hardware failure detected - SMART errors indicate imminent drive failure\n• Immediate backup and replacement required\n• Estimated downtime: 1-2 hours' :
  selectedTicket.title.toLowerCase().includes('network') || selectedTicket.title.toLowerCase().includes('outage') ?
  '• Network connectivity issue affecting multiple users\n• Check network infrastructure and ISP connectivity\n• Estimated resolution: 2-4 hours' :
  selectedTicket.title.toLowerCase().includes('email') || selectedTicket.title.toLowerCase().includes('exchange') ?
  '• Email system configuration issue\n• Check Exchange connectors and mail flow\n• Estimated resolution: 30-60 minutes' :
  '• Standard service request\n• Follow established procedures\n• Estimated resolution: 1-2 hours'}

🛠️ Recommended Actions:
1. Contact client to confirm issue details
2. Remote into affected system(s)
3. Perform diagnostic assessment
4. Implement solution with minimal downtime
5. Test functionality and confirm resolution
6. Document solution in knowledge base

⏱️ Next Steps:
• Update ticket status to "In Progress"
• Contact ${selectedTicket.contact.name} at ${selectedTicket.contact.phone}
• Schedule maintenance window if required
• Follow up within 24 hours`;
        
        setAiAnalysisResult(actionPlan);
        break;
        
      case 'summary':
        setTicketSummaryContent(`📋 ConnectWise Ticket Summary - #${selectedTicket.id}

🎯 Issue Overview:
${selectedTicket.title}

🏢 Client Information:
• Company: ${selectedTicket.company}
• Contact: ${selectedTicket.contact.name}
• Phone: ${selectedTicket.contact.phone}
• Email: ${selectedTicket.contact.email}

📊 Ticket Details:
• Priority: ${getPriorityText(selectedTicket.priority)}
• Status: ${selectedTicket.status}
• Assignee: ${selectedTicket.assignee}
• Created: ${selectedTicket.time}
• Board: ${selectedTicket.board || 'Service Board'}
• Type: ${selectedTicket.type || 'Service Request'}

🔧 Technical Classification:
• Severity: ${selectedTicket.severity || 'Medium'}
• Impact: ${selectedTicket.impact || 'Medium'}
• Urgency: ${selectedTicket.urgency || 'Medium'}

💼 Business Impact:
${selectedTicket.priority === 'HIGH' || selectedTicket.priority === 'NEEDS_ATTENTION' ?
  '• High priority - critical business operations may be affected\n• Immediate attention required' :
  selectedTicket.priority === 'MEDIUM' ?
  '• Medium priority - normal business impact\n• Standard response time applies' :
  '• Low priority - minimal business impact\n• Can be scheduled during normal business hours'}

📝 Description:
${selectedTicket.description || 'No detailed description available'}

🔗 ConnectWise Integration:
✅ Live sync with ConnectWise system
✅ Real-time status updates
✅ Automated workflow triggers`);
        break;
    }
  };

  const handleTakeAction = (action: string) => {
    setShowTakeActionModal(false);
    
    switch(action) {
      case 'AI Draft Response':
        setActionModalType('AI Draft Response');
        setAiDraftText(`Dear ${selectedTicket?.contact?.name || 'Client'},

Thank you for reporting the issue. I've identified the root cause and am implementing a solution.

Issue Summary:
${selectedTicket?.title || 'Service Request'}

Resolution Plan:
1. Initial assessment and diagnosis (In Progress)
2. Implement recommended solution (Next - 15-30 min)
3. Test and verify functionality (Final - 10-15 min)

Expected Resolution: Within ${selectedTicket?.title?.toLowerCase().includes('smart') ? '2-3 hours' : selectedTicket?.title?.toLowerCase().includes('ransomware') ? '6-8 hours' : selectedTicket?.title?.toLowerCase().includes('network') ? '2-6 hours' : '45 minutes'}
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
        setTimerStatusChange(selectedTicket?.status || '');
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
        setTimeHours('');
        setTimeMinutes('');
        setWorkDescription('');
        setTimeEntryNoteType('public');
        setShowActionModal(true);
        break;
      case 'Share Update':
        setActionModalType('Share Update');
        setShareUpdateStaff('');
        setShareUpdateNotes('');
        setShareViaEmail(true);
        setShareViaTeams(false);
        setShareViaSMS(false);
        setShowActionModal(true);
        break;
    }
  };

  const handleQuickAction = (action: string) => {
    switch(action) {
      case 'assign':
        setActionModalType('Assign/Add Teammate');
        setAssigneeSelection('');
        setIsAssignTicket(true);
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

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files) {
      setSelectedFiles(Array.from(event.dataTransfer.files));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(files => files.filter((_, i) => i !== index));
  };

  const handlePasteScreenshot = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            const blob = await clipboardItem.getType(type);
            const file = new File([blob], `screenshot-${Date.now()}.png`, { type });
            setSelectedFiles(prev => [...prev, file]);
            break;
          }
        }
      }
    } catch (err) {
      console.log('Clipboard access not available');
    }
  };

  const isTicketExpanded = (ticketId: string) => expandedTickets.has(ticketId);

  // Show loading state
  if (loading && tickets.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingOverlay}>
          <div style={{ textAlign: 'center', color: '#e2e8f0' }}>
            <RefreshCw size={48} style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
            <div style={{ fontSize: '20px', fontWeight: '600' }}>Loading ConnectWise Tickets...</div>
            <div style={{ fontSize: '16px', color: '#94a3b8', marginTop: '8px' }}>
              Connecting to live data
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Error Banner */}
      {error && (
        <div style={styles.errorBanner}>
          ⚠️ Connection Error: {error} - Showing cached data
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>TechFlow MSP - Engineer Portal</div>
        
        <div style={styles.searchContainer}>
          <Search size={24} style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search live ConnectWise tickets..." 
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div style={styles.userInfo}>
          <button 
            onClick={refreshTickets}
            style={styles.refreshButton}
            disabled={loading}
          >
            <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            {lastUpdated && (
              <span style={{ fontSize: '14px' }}>
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </button>
          <span>Sarah Chen • L2 Support Engineer</span>
          <Settings size={24} style={{cursor: 'pointer'}} />
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Left Sidebar - Live Tickets List */}
        <div style={styles.ticketsSidebar}>
          <div style={styles.sidebarHeader}>
            <div>
              <div style={styles.sidebarTitle}>
                ConnectWise Tickets {loading && <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />}
              </div>
              <div style={styles.sidebarStats}>
                Showing: {filteredTickets.length} • Total: {tickets.length} • Live Data ✅
              </div>
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
            {filteredTickets.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8' }}>
                {loading ? 'Loading tickets...' : 'No tickets match your filters'}
              </div>
            ) : (
              filteredTickets.map(ticket => (
                <div 
                  key={ticket.id}
                  style={{
                    ...styles.ticketCard,
                    ...(selectedTicket?.id === ticket.id ? styles.ticketCardSelected : {})
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
              ))
            )}
          </div>
        </div>

        {/* Main Content Area - Show selected ticket or placeholder */}
        {selectedTicket ? (
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
                  onClick={() => setShowTakeActionModal(true)}
                >
                  <MessageSquare size={24} />
                  Take Action
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
                      ConnectWise Ticket Notes
                    </div>
                    {showNotes ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                  
                  {showNotes && (
                    <div style={styles.sectionContent}>
                      <div style={styles.noteItem}>
                        <div style={styles.noteHeader}>
                          <div style={styles.noteAuthor}>ConnectWise System</div>
                          <div style={styles.noteTime}>{selectedTicket.time}</div>
                        </div>
                        <div style={styles.noteContent}>
                          {selectedTicket.description || 'Initial ticket description from ConnectWise system.'}
                        </div>
                      </div>
                      
                      <div style={styles.noteItem}>
                        <div style={styles.noteHeader}>
                          <div style={styles.noteAuthor}>AI Assistant</div>
                          <div style={styles.noteTime}>Live Analysis</div>
                        </div>
                        <div style={styles.noteContent}>
                          Ticket automatically imported from ConnectWise. Priority: {getPriorityText(selectedTicket.priority)}, 
                          Status: {selectedTicket.status}. Ready for AI-assisted resolution.
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
                      AI Engineer Assistant - ConnectWise Integration
                    </div>
                  </div>
                  
                  <div style={styles.sectionContent}>
                    <div style={styles.aiActions}>
                      <button 
                        style={styles.aiButton}
                        onClick={() => handleAiAction('environment')}
                      >
                        🔍 Live Client Environment
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
                        📋 ConnectWise Summary
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
                          Click any AI Assistant button above to analyze this ConnectWise ticket.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.contentArea}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                <MessageSquare size={64} style={{ marginBottom: '20px' }} />
                <h2>Select a ConnectWise Ticket</h2>
                <p>Choose a ticket from the sidebar to view details and AI analysis</p>
              </div>
            </div>
          </div>
        )}

        {/* Right Sidebar */}
        {selectedTicket && (
          <div style={styles.rightSidebar}>
            {/* Contact Info */}
            <div style={styles.sidebarSection}>
              <div style={styles.sidebarSectionTitle}>ConnectWise Contact Info</div>
              
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

              <div style={styles.contactField}>
                <div style={styles.contactLabel}>Ticket Board</div>
                <div style={styles.contactValue}>{selectedTicket.board || 'Service Board'}</div>
              </div>

              <div style={styles.contactField}>
                <div style={styles.contactLabel}>Type</div>
                <div style={styles.contactValue}>{selectedTicket.type || 'Service Request'}</div>
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
                onClick={() => handleQuickAction('watchers')}
              >
                <User size={24} />
                Add Watchers
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Take Action Modal */}
      {showTakeActionModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>Take Action</div>
              <button 
                style={styles.modalClose}
                onClick={() => setShowTakeActionModal(false)}
              >
                <X size={32} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.modalGrid}>
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('AI Draft Response')}
                >
                  <Edit3 size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>AI Draft Response</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Generate smart reply</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Attach Files')}
                >
                  <Paperclip size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Attach Files</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Upload screenshots/docs</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Change Status')}
                >
                  <AlertTriangle size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Change Status</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Update ticket status</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Stop Timer')}
                >
                  <Clock size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Stop Timer</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Pause time tracking</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Manual Time Entry')}
                >
                  <Timer size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Manual Time Entry</div>
                    <div style={{ fontSize: '16px', color: '#94a3b8' }}>Log time manually</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Share Update')}
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

      {/* Action Modals */}
      {showActionModal && (
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
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Search Keywords</label>
                    <input
                      type="text"
                      value={searchKeywords}
                      onChange={(e) => setSearchKeywords(e.target.value)}
                      placeholder="Enter search terms (e.g., 'Exchange SMTP connector')"
                      style={styles.formInput}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Search Sources</label>
                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={searchITGlue}
                          onChange={(e) => setSearchITGlue(e.target.checked)}
                          style={styles.checkbox}
                        />
                        IT Glue
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={searchSharePoint}
                          onChange={(e) => setSearchSharePoint(e.target.checked)}
                          style={styles.checkbox}
                        />
                        SharePoint
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={searchVendorSupport}
                          onChange={(e) => setSearchVendorSupport(e.target.checked)}
                          style={styles.checkbox}
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
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Edit AI Generated Response</label>
                    <textarea
                      value={aiDraftText}
                      onChange={(e) => setAiDraftText(e.target.value)}
                      rows={12}
                      style={styles.formTextarea}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Send Options</label>
                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={sendEmail}
                          onChange={(e) => setSendEmail(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Send Email
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={sendTextMessage}
                          onChange={(e) => setSendTextMessage(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Send Text Message
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Attach Files */}
              {actionModalType === 'Attach Files' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Upload Files</label>
                    <div 
                      style={styles.fileDropZone}
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                      onClick={() => document.getElementById('fileInput')?.click()}
                    >
                      <Paperclip size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
                      <p>Click to select files or drag and drop</p>
                      <p style={{ fontSize: '16px', color: '#94a3b8' }}>Supports images, documents, and screenshots</p>
                    </div>
                    <input
                      id="fileInput"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <button
                      onClick={handlePasteScreenshot}
                      style={{
                        ...styles.actionButton,
                        backgroundColor: '#334155',
                        color: '#e2e8f0',
                        border: '1px solid #475569',
                        width: '100%'
                      }}
                    >
                      <Clipboard size={20} />
                      Paste Screenshot from Clipboard
                    </button>
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <div style={styles.formField}>
                      <label style={styles.formLabel}>Selected Files</label>
                      <div style={styles.fileList}>
                        {selectedFiles.map((file, index) => (
                          <div key={index} style={styles.fileItem}>
                            <span style={{ color: '#cbd5e1' }}>
                              {file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                            <button
                              onClick={() => removeFile(index)}
                              style={styles.removeButton}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Change Status */}
              {actionModalType === 'Change Status' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>New Status</label>
                    <select 
                      value={timerStatusChange}
                      onChange={(e) => setTimerStatusChange(e.target.value)}
                      style={styles.formSelect}
                    >
                      <option value="">Select Status</option>
                      <option value="New">New</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Waiting">Waiting for Client</option>
                      <option value="Escalated">Escalated</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Status Change Notes</label>
                    <textarea
                      value={timerNotes}
                      onChange={(e) => setTimerNotes(e.target.value)}
                      placeholder="Describe the reason for status change..."
                      rows={4}
                      style={styles.formTextarea}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Note Type</label>
                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="radio"
                          value="public"
                          checked={noteType === 'public'}
                          onChange={(e) => setNoteType(e.target.value)}
                          style={styles.checkbox}
                        />
                        Public (Client can see)
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="radio"
                          value="internal"
                          checked={noteType === 'internal'}
                          onChange={(e) => setNoteType(e.target.value)}
                          style={styles.checkbox}
                        />
                        Internal Only
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Stop Timer & Add Notes */}
              {actionModalType === 'Stop Timer & Add Notes' && (
                <div>
                  <div style={{ 
                    padding: '24px', 
                    backgroundColor: '#1e293b', 
                    borderRadius: '16px', 
                    marginBottom: '24px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#3b82f6', marginBottom: '12px' }}>
                      Timer Stopped: 02:15:42
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '18px' }}>
                      Time logged for ticket #{selectedTicket?.id}
                    </div>
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Add Work Notes</label>
                    <textarea
                      value={timerNotes}
                      onChange={(e) => setTimerNotes(e.target.value)}
                      placeholder="Describe the work completed during this time period..."
                      rows={4}
                      style={styles.formTextarea}
                    />
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Change Ticket Status (Optional)</label>
                    <select 
                      value={timerStatusChange}
                      onChange={(e) => setTimerStatusChange(e.target.value)}
                      style={styles.formSelect}
                    >
                      <option value="">No Status Change</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Waiting">Waiting for Client</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Note Type</label>
                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="radio"
                          value="public"
                          checked={noteType === 'public'}
                          onChange={(e) => setNoteType(e.target.value)}
                          style={styles.checkbox}
                        />
                        Public (Client can see)
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="radio"
                          value="internal"
                          checked={noteType === 'internal'}
                          onChange={(e) => setNoteType(e.target.value)}
                          style={styles.checkbox}
                        />
                        Internal Only
                      </label>
                    </div>
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={addToKnowledgeBase}
                        onChange={(e) => setAddToKnowledgeBase(e.target.checked)}
                        style={styles.checkbox}
                      />
                      Add to Company Knowledge Base
                    </label>
                  </div>
                </div>
              )}

              {/* Manual Time Entry */}
              {actionModalType === 'Manual Time Entry' && (
                <div>
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={styles.formLabel}>Hours</label>
                      <input
                        type="number"
                        value={timeHours}
                        onChange={(e) => setTimeHours(e.target.value)}
                        placeholder="0"
                        min="0"
                        max="24"
                        style={styles.formInput}
                      />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <label style={styles.formLabel}>Minutes</label>
                      <input
                        type="number"
                        value={timeMinutes}
                        onChange={(e) => setTimeMinutes(e.target.value)}
                        placeholder="0"
                        min="0"
                        max="59"
                        style={styles.formInput}
                      />
                    </div>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Work Description</label>
                    <textarea
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                      placeholder="Describe the work performed..."
                      rows={4}
                      style={styles.formTextarea}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Note Type</label>
                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="radio"
                          value="public"
                          checked={timeEntryNoteType === 'public'}
                          onChange={(e) => setTimeEntryNoteType(e.target.value)}
                          style={styles.checkbox}
                        />
                        Public (Client can see)
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="radio"
                          value="internal"
                          checked={timeEntryNoteType === 'internal'}
                          onChange={(e) => setTimeEntryNoteType(e.target.value)}
                          style={styles.checkbox}
                        />
                        Internal Only
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Share Update */}
              {actionModalType === 'Share Update' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Share With</label>
                    <select 
                      value={shareUpdateStaff}
                      onChange={(e) => setShareUpdateStaff(e.target.value)}
                      style={styles.formSelect}
                    >
                      <option value="">Select Staff Member</option>
                      {employees.map(employee => (
                        <option key={employee} value={employee}>{employee}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Update Notes</label>
                    <textarea
                      value={shareUpdateNotes}
                      onChange={(e) => setShareUpdateNotes(e.target.value)}
                      placeholder="Add notes about the update..."
                      rows={4}
                      style={styles.formTextarea}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Send Via</label>
                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={shareViaEmail}
                          onChange={(e) => setShareViaEmail(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Email
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={shareViaTeams}
                          onChange={(e) => setShareViaTeams(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Teams Message
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={shareViaSMS}
                          onChange={(e) => setShareViaSMS(e.target.checked)}
                          style={styles.checkbox}
                        />
                        SMS
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Assign/Add Teammate */}
              {actionModalType === 'Assign/Add Teammate' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Action Type</label>
                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="radio"
                          checked={isAssignTicket}
                          onChange={() => setIsAssignTicket(true)}
                          style={styles.checkbox}
                        />
                        Assign Ticket (transfer ownership)
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="radio"
                          checked={!isAssignTicket}
                          onChange={() => setIsAssignTicket(false)}
                          style={styles.checkbox}
                        />
                        Add Resource (keep as collaborator)
                      </label>
                    </div>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Select Engineer</label>
                    <select 
                      value={assigneeSelection}
                      onChange={(e) => setAssigneeSelection(e.target.value)}
                      style={styles.formSelect}
                    >
                      <option value="">Select Engineer</option>
                      {engineers.map(engineer => (
                        <option key={engineer} value={engineer}>{engineer}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Add Watchers */}
              {actionModalType === 'Add Watchers' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Internal Watcher (Colleague)</label>
                    <select 
                      value={internalWatcher}
                      onChange={(e) => setInternalWatcher(e.target.value)}
                      style={styles.formSelect}
                    >
                      <option value="">Select Internal Watcher</option>
                      {employees.map(employee => (
                        <option key={employee} value={employee}>{employee}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>External Watcher (Email)</label>
                    <input
                      type="email"
                      value={externalWatcherEmail}
                      onChange={(e) => setExternalWatcherEmail(e.target.value)}
                      placeholder="client@company.com"
                      style={styles.formInput}
                    />
                  </div>
                </div>
              )}

              {/* Request Escalation */}
              {actionModalType === 'Request Escalation' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Escalation Reason</label>
                    <textarea
                      value={escalationReason}
                      onChange={(e) => setEscalationReason(e.target.value)}
                      placeholder="Explain why this ticket needs escalation..."
                      rows={4}
                      style={styles.formTextarea}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Escalate To</label>
                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={escalateToManager}
                          onChange={(e) => setEscalateToManager(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Manager
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={escalateToExecutive}
                          onChange={(e) => setEscalateToExecutive(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Executive Team
                      </label>
                    </div>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Escalate Via</label>
                    <div style={styles.checkboxGroup}>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={escalateViaEmail}
                          onChange={(e) => setEscalateViaEmail(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Email
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={escalateViaTeams}
                          onChange={(e) => setEscalateViaTeams(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Teams Message
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={escalateViaSMS}
                          onChange={(e) => setEscalateViaSMS(e.target.checked)}
                          style={styles.checkbox}
                        />
                        SMS / Text
                      </label>
                    </div>
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
                    backgroundColor: actionModalType === 'Request Escalation' ? '#dc2626' : '#3b82f6',
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
                   actionModalType === 'AI Draft Response' ? 'Send Communication' :
                   actionModalType === 'Attach Files' ? `Upload Files (${selectedFiles.length})` :
                   actionModalType === 'Change Status' ? 'Update Status' :
                   actionModalType === 'Stop Timer & Add Notes' ? 'Save Notes & Log Time' :
                   actionModalType === 'Manual Time Entry' ? 'Log Time Entry' :
                   actionModalType === 'Share Update' ? 'Send Update' :
                   actionModalType === 'Assign/Add Teammate' ? (isAssignTicket ? 'Assign Ticket' : 'Add Resource') :
                   actionModalType === 'Add Watchers' ? 'Add Watchers' :
                   actionModalType === 'Request Escalation' ? 'Submit Escalation' :
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
                          type="checkbox"
                          checked={searchHistoricalTickets}
                          onChange={(e) => setSearchHistoricalTickets(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Historical Tickets
                      </label>
                      <label style={styles.checkboxLabel}>
                        <input