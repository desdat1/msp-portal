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
  CheckCircle,
  X,
  Play,
  Pause,
  FileText,
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
    fontSize: '16px'
  },
  header: {
    position: 'sticky',
    top: 0,
    height: '70px',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    zIndex: 100
  },
  logo: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#e2e8f0'
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
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    color: '#e2e8f0',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8'
  },
  userInfo: {
    fontSize: '16px',
    color: '#cbd5e1',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  ticketsSidebar: {
    width: '400px',
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
    fontSize: '20px',
    fontWeight: '600',
    color: '#e2e8f0'
  },
  sidebarStats: {
    fontSize: '14px',
    color: '#94a3b8'
  },
  filterTabs: {
    display: 'flex',
    padding: '20px 24px 0',
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
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    minHeight: '32px',
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
    padding: '8px 12px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '6px',
    color: '#e2e8f0',
    fontSize: '13px',
    minHeight: '32px',
    minWidth: '120px',
    cursor: 'pointer'
  },
  filterInput: {
    padding: '8px 12px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '6px',
    color: '#e2e8f0',
    fontSize: '13px',
    minHeight: '32px',
    minWidth: '150px',
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
    padding: '20px',
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
    fontSize: '16px',
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '8px'
  },
  ticketTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#e2e8f0',
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  ticketCompany: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '12px'
  },
  ticketMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#94a3b8'
  },
  priorityBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11px',
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
    fontSize: '10px',
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
    marginLeft: '8px',
    flexShrink: 0
  },
  ticketDetails: {
    padding: '0 20px 20px',
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
    padding: '8px 12px',
    backgroundColor: '#0f172a',
    color: '#94a3b8',
    border: '1px solid #334155',
    borderRadius: '8px',
    fontSize: '12px',
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
    padding: '24px 32px',
    borderBottom: '1px solid #334155',
    backgroundColor: '#1e293b'
  },
  ticketDetailsTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: '12px',
    lineHeight: '1.3'
  },
  ticketDetailsSubtitle: {
    fontSize: '16px',
    color: '#94a3b8',
    marginBottom: '20px'
  },
  ticketDetailsActions: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  actionButton: {
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  ticketContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  mainTicketArea: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto'
  },
  sectionCard: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    border: '1px solid #334155',
    marginBottom: '24px',
    overflow: 'hidden'
  },
  sectionHeader: {
    padding: '20px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'background 0.2s'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  sectionContent: {
    padding: '20px'
  },
  noteItem: {
    padding: '20px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
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
    fontSize: '15px',
    fontWeight: '600',
    color: '#e2e8f0'
  },
  noteTime: {
    fontSize: '13px',
    color: '#94a3b8'
  },
  noteContent: {
    fontSize: '15px',
    color: '#cbd5e1',
    lineHeight: '1.5'
  },
  aiActions: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px',
    marginBottom: '24px'
  },
  aiButton: {
    padding: '12px 16px',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    border: '1px solid #334155',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  analysisResults: {
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    padding: '20px',
    minHeight: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  analysisPlaceholder: {
    color: '#94a3b8',
    fontSize: '15px',
    textAlign: 'center'
  },
  rightSidebar: {
    width: '350px',
    backgroundColor: '#1e293b',
    borderLeft: '1px solid #334155',
    padding: '24px',
    overflowY: 'auto'
  },
  sidebarSection: {
    marginBottom: '32px'
  },
  sidebarSectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '16px'
  },
  contactField: {
    marginBottom: '16px'
  },
  contactLabel: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '4px'
  },
  contactValue: {
    fontSize: '16px',
    color: '#e2e8f0',
    fontWeight: '500'
  },
  managementButton: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '12px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
    border: '1px solid #475569',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minHeight: '48px'
  },
  timeTracking: {
    backgroundColor: '#334155',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '20px',
    border: '1px solid #475569'
  },
  timeDisplay: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#3b82f6',
    textAlign: 'center',
    marginBottom: '16px'
  },
  timeButtons: {
    display: 'flex',
    gap: '8px'
  },
  timeButton: {
    flex: 1,
    padding: '10px 12px',
    backgroundColor: '#1e293b',
    color: '#e2e8f0',
    border: '1px solid #334155',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px'
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
    borderRadius: '16px',
    border: '1px solid #334155',
    width: '100%',
    maxWidth: '600px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  modalHeader: {
    padding: '24px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#e2e8f0'
  },
  modalClose: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.2s'
  },
  modalContent: {
    padding: '24px',
    overflowY: 'auto'
  },
  modalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px'
  },
  modalButton: {
    padding: '16px 20px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
    border: '1px solid #475569',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left',
    minHeight: '60px'
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
    status: 'Assigned',
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
  }
];

const engineers = ['Sarah Chen', 'Mike Johnson', 'Alex Rodriguez', 'Marcus Thompson', 'Jenny Williams', 'David Kim'];
const clients = ['Accounting Plus', 'Legal Services LLC', 'Manufacturing Corp', 'Tech Solutions Inc', 'Healthcare Partners', 'Creative Solutions'];
const statuses = ['All Statuses', 'New', 'Assigned', 'In Progress', 'Waiting', 'Escalated'];
const priorities = ['All Priorities', 'HIGH', 'MEDIUM', 'LOW', 'NEEDS_ATTENTION'];
const employees = ['David Kim (Manager)', 'Marcus Thompson (L3)', 'Lisa Wang (Senior)', 'Frank Chen (L2)', 'Tom Rodriguez (L1)'];

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
  const [actionModalContent, setActionModalContent] = useState('');
  
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

  const handleAiAction = (action: string) => {
    switch(action) {
      case 'environment':
        setActionModalType('Client Environment');
        setShowActionModal(true);
        break;
      case 'knowledge':
        setActionModalType('Enterprise Knowledge Search');
        setShowActionModal(true);
        break;
      case 'actions':
        setAiAnalysisResult(`⚡ AI Generated Action Plan:
        
1. Backup current Exchange configuration
2. Check SMTP connector "TechSolInc-Connector"
3. Verify accepted domains include vendor1.com and supplier2.com
4. Test email flow with: Test-ExchangeConnectivity
5. Monitor message queue for 15 minutes
6. Document resolution steps for knowledge base
        
Estimated resolution time: 30-45 minutes`);
        break;
      case 'summary':
        setAiAnalysisResult(`📋 Ticket Summary:
        
Issue: Exchange server rejecting emails from specific external domains
Client Impact: Medium - affecting vendor communications
Root Cause: SMTP connector configuration blocking external domains
Resolution: Modify connector settings to allow vendor1.com and supplier2.com
        
Next Steps:
• Update client on progress (ETA: 30min)
• Schedule follow-up verification call
• Update internal documentation`);
        break;
    }
  };

  const handleCommunicationAction = (action: string) => {
    setCommunicationModal(false);
    
    switch(action) {
      case 'AI Draft Response':
        setActionModalType('AI Draft Response');
        setAiDraftText(`Dear Steve Wilson,

Thank you for reporting the email delivery issues. I've identified the root cause and am implementing a solution.

Issue Summary:
Your Exchange server is currently blocking emails from vendor1.com and supplier2.com due to a recent connector configuration change.

Resolution Plan:
1. Backup current Exchange settings (In Progress)
2. Modify SMTP connector to allow external domains (Next - 15 min)
3. Test email flow with affected vendors (Final - 10 min)

Expected Resolution: Within 30 minutes
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
        setActionModalContent('Client update sent successfully! Steve Wilson has been notified of the current progress and estimated resolution time via email and SMS.');
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

  const saveTimerNotes = () => {
    console.log('Timer notes saved:', {
      notes: timerNotes,
      type: noteType,
      addToKnowledgeBase,
      statusChange: timerStatusChange,
      timeLogged: '2:15:42'
    });
    setShowActionModal(false);
  };

  const performKnowledgeSearch = () => {
    const searchSources = [];
    if (searchHistoricalTickets) searchSources.push('Historical Tickets');
    if (searchITGlue) searchSources.push('IT Glue');
    if (searchSharePoint) searchSources.push('SharePoint');
    if (searchVendorSupport) searchSources.push('Vendor Support');
    
    console.log('Knowledge search performed:', {
      keywords: searchKeywords,
      sources: searchSources
    });
    setShowActionModal(false);
  };

  const confirmAssignment = () => {
    console.log('Ticket assigned to:', assigneeSelection);
    setShowActionModal(false);
  };

  const updatePriorityStatus = () => {
    console.log('Updated:', { priority: prioritySelection, status: statusSelection });
    setShowActionModal(false);
  };

  const addWatchers = () => {
    const watchers = [];
    if (internalWatcher) watchers.push({ type: 'internal', value: internalWatcher });
    if (externalWatcherEmail) watchers.push({ type: 'external', value: externalWatcherEmail });
    
    console.log('Watchers added:', watchers);
    setShowActionModal(false);
  };

  const submitEscalation = () => {
    const escalationMethods = [];
    if (escalateViaEmail) escalationMethods.push('Email');
    if (escalateViaTeams) escalationMethods.push('Teams');
    if (escalateViaSMS) escalationMethods.push('SMS');
    
    const escalationTargets = [];
    if (escalateToManager) escalationTargets.push('Manager');
    if (escalateToExecutive) escalationTargets.push('Executive Team');
    
    console.log('Escalation submitted:', {
      reason: escalationReason,
      targets: escalationTargets,
      methods: escalationMethods
    });
    setShowActionModal(false);
  };

  const isTicketExpanded = (ticketId: string) => expandedTickets.has(ticketId);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logo}>TechFlow MSP - Engineer Portal</div>
        
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
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div style={styles.ticketHeaderLeft}>
                    <div style={styles.ticketNumber}>#{ticket.id} ({ticket.assignee})</div>
                    <div style={styles.ticketTitle}>{ticket.title}</div>
                    <div style={styles.ticketCompany}>{ticket.company}</div>
                    <div style={styles.ticketMeta}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{ticket.time}</span>
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
                      <span>{ticket.assignee}</span>
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
                      <button style={styles.quickAction}>Add Note</button>
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
                <MessageSquare size={18} />
                Ticket Update & Communications
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
                    <MessageSquare size={20} color="#3b82f6" />
                    Ticket Notes
                  </div>
                  {showNotes ? <Minus size={20} /> : <Plus size={20} />}
                </div>
                
                {showNotes && (
                  <div style={styles.sectionContent}>
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
                  </div>
                )}
              </div>

              {/* AI Assistant Section */}
              <div style={styles.sectionCard}>
                <div style={styles.sectionHeader}>
                  <div style={styles.sectionTitle}>
                    <Brain size={20} color="#3b82f6" />
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
                    {aiAnalysisResult ? (
                      <div style={{ whiteSpace: 'pre-line', textAlign: 'left', width: '100%' }}>
                        {aiAnalysisResult}
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
              <div style={styles.contactValue}>Steve Wilson</div>
            </div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Company</div>
              <div style={styles.contactValue}>{selectedTicket.company}</div>
            </div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Phone</div>
              <div style={styles.contactValue}>(555) 123-4567</div>
            </div>
            
            <div style={styles.contactField}>
              <div style={styles.contactLabel}>Email</div>
              <div style={styles.contactValue}>steve.wilson@company.com</div>
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
                  {isTimerRunning ? <Pause size={14} /> : <Play size={14} />}
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
                <button style={styles.timeButton}>
                  <Timer size={14} />
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
              <Users size={18} />
              Assign/Add Teammate
            </button>
            <button 
              style={styles.managementButton}
              onClick={() => handleQuickAction('priority')}
            >
              <AlertTriangle size={18} />
              Update Priority/Status
            </button>
            <button 
              style={styles.managementButton}
              onClick={() => handleQuickAction('watchers')}
            >
              <User size={18} />
              Add Watchers
            </button>
            <button 
              style={styles.managementButton}
              onClick={() => handleQuickAction('escalate')}
            >
              <AlertTriangle size={18} />
              Request Escalation
            </button>
          </div>
        </div>
      </div>

      {/* Communication Modal */}
      {showCommunicationModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>Ticket Update & Communications</div>
              <button 
                style={styles.modalClose}
                onClick={() => setCommunicationModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.modalGrid}>
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('AI Draft Response')}
                >
                  <Edit3 size={20} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>AI Draft Response</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>Generate smart reply</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Attach Files')}
                >
                  <Paperclip size={20} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Attach Files</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>Upload screenshots/docs</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Change Status')}
                >
                  <AlertTriangle size={20} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Change Status</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>Update ticket status</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Stop Timer')}
                >
                  <Clock size={20} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Stop Timer</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>Pause time tracking</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Manual Time Entry')}
                >
                  <Timer size={20} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Manual Time Entry</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>Log time manually</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleCommunicationAction('Share Update')}
                >
                  <Send size={20} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>Share Update</div>
                    <div style={{ fontSize: '13px', color: '#94a3b8' }}>Send client update</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContainer}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>{actionModalType}</div>
              <button 
                style={styles.modalClose}
                onClick={() => setShowActionModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div style={styles.modalContent}>
              {/* Enterprise Knowledge Search Interface */}
              {actionModalType === 'Enterprise Knowledge Search' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
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
                        padding: '12px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Search Sources
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={searchHistoricalTickets}
                          onChange={(e) => setSearchHistoricalTickets(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px' }}
                        />
                        Historical Tickets
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={searchITGlue}
                          onChange={(e) => setSearchITGlue(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px' }}
                        />
                        IT Glue
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={searchSharePoint}
                          onChange={(e) => setSearchSharePoint(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px' }}
                        />
                        SharePoint
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={searchVendorSupport}
                          onChange={(e) => setSearchVendorSupport(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px' }}
                        />
                        Vendor Support
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Draft Response Interface */}
              {actionModalType === 'AI Draft Response' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Edit AI Generated Response
                    </label>
                    <textarea
                      value={aiDraftText}
                      onChange={(e) => setAiDraftText(e.target.value)}
                      rows={12}
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        resize: 'vertical',
                        lineHeight: '1.5',
                        fontFamily: 'monospace'
                      }}
                    />
                  </div>
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#1e293b',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#94a3b8'
                  }}>
                    💡 Tip: This AI-generated response can be fully customized. Edit the content above before sending to the client.
                  </div>
                </div>
              )}

              {/* File Upload Interface */}
              {actionModalType === 'Attach Files' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Select Files to Upload
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontWeight: '600', marginBottom: '12px', color: '#e2e8f0' }}>
                        Selected Files:
                      </div>
                      {selectedFiles.map((file, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          backgroundColor: '#1e293b',
                          borderRadius: '6px',
                          marginBottom: '8px'
                        }}>
                          <span style={{ color: '#cbd5e1' }}>
                            {file.name} ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                          <button
                            onClick={() => removeFile(index)}
                            style={{
                              background: '#dc2626',
                              border: 'none',
                              color: 'white',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Stop Timer & Notes Interface */}
              {actionModalType === 'Stop Timer & Add Notes' && (
                <div>
                  <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#1e293b', 
                    borderRadius: '8px', 
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '8px' }}>
                      Timer Stopped: 02:15:42
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '14px' }}>
                      Time logged for ticket #{selectedTicket.id}
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Add Work Notes
                    </label>
                    <textarea
                      value={timerNotes}
                      onChange={(e) => setTimerNotes(e.target.value)}
                      placeholder="Describe the work completed during this time period..."
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Change Ticket Status (Optional)
                    </label>
                    <select 
                      value={timerStatusChange}
                      onChange={(e) => setTimerStatusChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">No Status Change</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Waiting">Waiting for Client</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Note Type
                    </label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="radio"
                          value="public"
                          checked={noteType === 'public'}
                          onChange={(e) => setNoteType(e.target.value)}
                          style={{ marginRight: '8px' }}
                        />
                        Public (Client can see)
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="radio"
                          value="internal"
                          checked={noteType === 'internal'}
                          onChange={(e) => setNoteType(e.target.value)}
                          style={{ marginRight: '8px' }}
                        />
                        Internal Only
                      </label>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                      <input
                        type="checkbox"
                        checked={addToKnowledgeBase}
                        onChange={(e) => setAddToKnowledgeBase(e.target.checked)}
                        style={{ marginRight: '12px', width: '16px', height: '16px' }}
                      />
                      Add to Company Knowledge Base
                    </label>
                  </div>
                </div>
              )}

              {/* Additional Action Interfaces */}
              {actionModalType === 'Assign/Add Teammate' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Assign to Engineer
                    </label>
                    <select 
                      value={assigneeSelection}
                      onChange={(e) => setAssigneeSelection(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
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

              {/* Add Watchers Interface */}
              {actionModalType === 'Add Watchers' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Internal Watcher (Employee)
                    </label>
                    <select 
                      value={internalWatcher}
                      onChange={(e) => setInternalWatcher(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Select Internal Watcher</option>
                      {employees.map(employee => (
                        <option key={employee} value={employee}>{employee}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      External Watcher (Email)
                    </label>
                    <input
                      type="email"
                      value={externalWatcherEmail}
                      onChange={(e) => setExternalWatcherEmail(e.target.value)}
                      placeholder="client@company.com"
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Request Escalation Interface */}
              {actionModalType === 'Request Escalation' && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
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
                        padding: '12px',
                        backgroundColor: '#334155',
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#e2e8f0',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Escalate To
                    </label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={escalateToManager}
                          onChange={(e) => setEscalateToManager(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px' }}
                        />
                        Manager
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={escalateToExecutive}
                          onChange={(e) => setEscalateToExecutive(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px' }}
                        />
                        Executive Team
                      </label>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '12px', 
                      fontWeight: '600',
                      color: '#e2e8f0'
                    }}>
                      Escalate Via
                    </label>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={escalateViaEmail}
                          onChange={(e) => setEscalateViaEmail(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px' }}
                        />
                        Email
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={escalateViaTeams}
                          onChange={(e) => setEscalateViaTeams(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px' }}
                        />
                        Teams Message
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}>
                        <input
                          type="checkbox"
                          checked={escalateViaSMS}
                          onChange={(e) => setEscalateViaSMS(e.target.checked)}
                          style={{ marginRight: '8px', width: '16px', height: '16px' }}
                        />
                        SMS Text
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Simple content interfaces */}
              {actionModalType === 'Client Environment' && (
                <div>
                  <h3 style={{ color: '#3b82f6', marginBottom: '16px' }}>
                    {selectedTicket.company} - Environment Overview
                  </h3>
                  <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                    Total Users: 45 • Active Licenses: 42 • Remote Workers: 18
                    <br />
                    Primary Contact: Steve Wilson (IT Manager)
                    <br />
                    Key Applications: Microsoft 365, QuickBooks, Adobe Creative Suite
                    <br />
                    Common Requests: Password resets (40%), VPN setup, Email issues
                  </p>
                </div>
              )}

              {actionModalType === 'Share Update' && (
                <div style={{ 
                  whiteSpace: 'pre-line', 
                  lineHeight: '1.6',
                  color: '#e2e8f0',
                  fontSize: '15px'
                }}>
                  {actionModalContent}
                </div>
              )}
              
              {/* Action buttons */}
              <div style={{ 
                marginTop: '24px', 
                display: 'flex', 
                justifyContent: 'flex-end',
                gap: '12px'
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
                
                {actionModalType === 'Enterprise Knowledge Search' && (
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#3b82f6',
                      color: 'white'
                    }}
                    onClick={performKnowledgeSearch}
                  >
                    Search Knowledge Base
                  </button>
                )}
                
                {actionModalType === 'Stop Timer & Add Notes' && (
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#3b82f6',
                      color: 'white'
                    }}
                    onClick={saveTimerNotes}
                  >
                    Save Notes & Log Time
                  </button>
                )}
                
                {actionModalType === 'Attach Files' && (
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#3b82f6',
                      color: 'white'
                    }}
                    onClick={() => setShowActionModal(false)}
                  >
                    Upload Files ({selectedFiles.length})
                  </button>
                )}
                
                {actionModalType === 'Assign/Add Teammate' && (
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#3b82f6',
                      color: 'white'
                    }}
                    onClick={confirmAssignment}
                  >
                    Assign Ticket
                  </button>
                )}
                
                {actionModalType === 'Add Watchers' && (
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#3b82f6',
                      color: 'white'
                    }}
                    onClick={addWatchers}
                  >
                    Add Watchers
                  </button>
                )}
                
                {actionModalType === 'Request Escalation' && (
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#dc2626',
                      color: 'white'
                    }}
                    onClick={submitEscalation}
                  >
                    Submit Escalation
                  </button>
                )}
                
                {(actionModalType === 'AI Draft Response' || actionModalType === 'Share Update') && (
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#3b82f6',
                      color: 'white'
                    }}
                    onClick={() => setShowActionModal(false)}
                  >
                    {actionModalType === 'AI Draft Response' ? 'Send Email' : 'Send'}
                  </button>
                )}
                
                {(actionModalType === 'Change Status' || actionModalType === 'Manual Time Entry') && (
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#3b82f6',
                      color: 'white'
                    }}
                    onClick={() => setShowActionModal(false)}
                  >
                    Save Changes
                  </button>
                )}
                
                {actionModalType === 'Client Environment' && (
                  <button 
                    style={{
                      ...styles.actionButton,
                      backgroundColor: '#3b82f6',
                      color: 'white'
                    }}
                    onClick={() => setShowActionModal(false)}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovedEngineerApp;