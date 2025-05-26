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
    padding: '12px 20px',
    borderBottom: '1px solid #334155',
    position: 'relative' as const
  },
  headerToggle: {
    position: 'absolute' as const,
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#475569',
    border: '1px solid #64748b',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#e2e8f0',
    transition: 'all 0.2s'
  },
  headerContent: {
    marginLeft: '0px',
    transition: 'margin-left 0.3s ease'
  },
  headerContentShifted: {
    marginLeft: '40px'
  },
  headerTitle: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '4px'
  },
  headerSubtitle: {
    fontSize: '12px',
    opacity: 0.9,
    marginBottom: '8px'
  },
  stats: {
    display: 'flex',
    gap: '16px',
    fontSize: '11px'
  },
  stat: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: '3px 6px',
    borderRadius: '3px'
  },
  main: {
    display: 'flex',
    height: 'calc(100vh - 80px)'
  },
  leftPanel: {
    width: '28%',
    backgroundColor: '#1e293b',
    borderRight: '1px solid #334155',
    display: 'flex' as const,
    flexDirection: 'column' as const,
    transition: 'all 0.3s ease',
    position: 'relative' as const
  },
  leftPanelHidden: {
    width: '0',
    overflow: 'hidden'
  },
  toggleButton: {
    position: 'absolute' as const,
    right: '-15px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '0 6px 6px 0',
    padding: '8px 4px',
    cursor: 'pointer',
    fontSize: '12px',
    color: '#e2e8f0',
    zIndex: 10,
    transition: 'all 0.2s'
  },
  toggleButtonHidden: {
    display: 'none'
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#0f172a',
    display: 'flex' as const,
    flexDirection: 'column' as const
  },
  filtersSection: {
    padding: '12px',
    borderBottom: '1px solid #334155'
  },
  searchBar: {
    width: '100%',
    padding: '6px 10px',
    border: '1px solid #475569',
    borderRadius: '4px',
    fontSize: '12px',
    marginBottom: '8px',
    backgroundColor: '#334155',
    color: '#e2e8f0'
  },
  controlsRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '8px'
  },
  select: {
    padding: '4px 8px',
    border: '1px solid #475569',
    borderRadius: '3px',
    fontSize: '10px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
    minWidth: '80px'
  },
  tabsRow: {
    display: 'flex',
    gap: '6px'
  },
  tab: {
    flex: 1,
    padding: '6px 10px',
    border: '1px solid #475569',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '10px',
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
    overflowY: 'scroll' as const
  },
  ticket: {
    padding: '12px',
    borderBottom: '1px solid #334155',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  ticketSelected: {
    backgroundColor: '#1e40af',
    borderLeft: '4px solid #3b82f6'
  },
  ticketEscalated: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderLeft: '4px solid #ef4444'
  },
  ticketHighPriority: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)'
  },
  ticketMediumPriority: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)'
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  ticketNumber: {
    fontWeight: '600',
    fontSize: '12px'
  },
  priority: {
    padding: '1px 4px',
    borderRadius: '8px',
    fontSize: '8px',
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
    fontSize: '10px',
    color: '#94a3b8',
    marginBottom: '3px'
  },
  ticketSubject: {
    fontSize: '11px',
    color: '#cbd5e1',
    marginBottom: '6px',
    lineHeight: 1.2
  },
  ticketMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '9px',
    color: '#64748b'
  },
  status: {
    padding: '1px 6px',
    borderRadius: '8px',
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
  statusEscalated: {
    backgroundColor: '#fef2f2',
    color: '#dc2626'
  },
  topSection: {
    backgroundColor: '#1e293b',
    padding: '16px',
    borderBottom: '1px solid #334155',
    minHeight: '200px',
    display: 'flex',
    gap: '20px'
  },
  bottomSplitSection: {
    backgroundColor: '#1e293b',
    flex: 1,
    display: 'flex',
    height: 'calc(100vh - 260px)'
  },
  analysisHalf: {
    width: '50%',
    padding: '16px',
    borderRight: '1px solid #334155',
    overflowY: 'auto' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%'
  },
  notesHalf: {
    width: '50%',
    padding: '16px',
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%'
  },
  lastNotesSection: {
    marginTop: '12px',
    marginBottom: '8px'
  },
  lastNotesTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: '8px'
  },
  lastNotesContainer: {
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '6px',
    maxHeight: '120px',
    overflowY: 'scroll' as const
  },
  noteItem: {
    padding: '8px 10px',
    borderBottom: '1px solid #475569',
    fontSize: '11px',
    lineHeight: 1.4
  },
  noteItemLast: {
    borderBottom: 'none'
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px'
  },
  noteAuthor: {
    fontWeight: '600',
    color: '#e2e8f0'
  },
  noteDate: {
    color: '#94a3b8',
    fontSize: '10px'
  },
  noteText: {
    color: '#cbd5e1'
  },
  analysisHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px'
  },
  cloneButton: {
    padding: '4px 8px',
    backgroundColor: '#475569',
    border: '1px solid #64748b',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '10px',
    color: '#e2e8f0',
    transition: 'all 0.2s'
  },
  analysisPlaceholder: {
    backgroundColor: '#334155',
    padding: '40px',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#94a3b8',
    textAlign: 'center' as const,
    fontStyle: 'italic'
  },
  ticketOverview: {
    flex: 2,
    paddingRight: '20px'
  },
  contactSummary: {
    flex: 1,
    paddingLeft: '20px',
    borderLeft: '1px solid #334155',
    display: 'flex',
    gap: '20px'
  },
  contactLeft: {
    flex: 1
  },
  contactRight: {
    flex: 1
  },
  ticketTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px'
  },
  ticketId: {
    fontSize: '20px',
    fontWeight: '700'
  },
  badge: {
    padding: '3px 6px',
    borderRadius: '3px',
    fontSize: '10px',
    fontWeight: '600'
  },
  badgeRed: {
    backgroundColor: '#dc2626',
    color: 'white'
  },
  ticketDescription: {
    backgroundColor: '#334155',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '15px',
    fontWeight: '600',
    lineHeight: 1.4,
    marginBottom: '10px'
  },
  contactInfo: {
    fontSize: '12px'
  },
  contactField: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
    marginBottom: '8px'
  },
  contactLabel: {
    fontSize: '10px',
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
  actionButtonsSection: {
    backgroundColor: '#1e293b',
    padding: '12px 16px',
    borderBottom: '1px solid #334155',
    minHeight: '100px',
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
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '10px'
  },
  buttonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '6px'
  },
  button: {
    padding: '6px 10px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '10px',
    fontWeight: '600',
    color: '#e2e8f0'
  },
  timer: {
    backgroundColor: '#1e40af',
    border: '1px solid #3b82f6',
    borderRadius: '4px',
    padding: '6px 10px',
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#dbeafe',
    textAlign: 'center' as const,
    marginBottom: '10px'
  },
  textarea: {
    width: '100%',
    minHeight: '160px',
    padding: '10px',
    border: '1px solid #475569',
    borderRadius: '4px',
    fontFamily: 'inherit',
    fontSize: '12px',
    resize: 'vertical' as const,
    marginBottom: '10px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
    boxSizing: 'border-box' as const,
    overflowX: 'hidden' as const,
    wordWrap: 'break-word' as const
  },
  noteControls: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    fontSize: '12px',
    marginBottom: '10px'
  },
  analysisBox: {
    backgroundColor: '#334155',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '12px',
    whiteSpace: 'pre-wrap' as const,
    maxHeight: '250px',
    overflowY: 'auto' as const,
    lineHeight: 1.5
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6'
  },
  smallButton: {
    padding: '4px 8px',
    border: '1px solid #475569',
    borderRadius: '3px',
    backgroundColor: '#334155',
    cursor: 'pointer',
    fontSize: '10px',
    transition: 'all 0.2s',
    color: '#e2e8f0'
  },
  actionGroupTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: '6px'
  },
  modal: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modalContent: {
    backgroundColor: '#1e293b',
    padding: '24px',
    borderRadius: '8px',
    width: '600px',
    maxHeight: '80vh',
    overflowY: 'auto' as const,
    border: '1px solid #334155'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600'
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '20px'
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #475569',
    borderRadius: '4px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
    fontSize: '14px',
    marginBottom: '16px'
  },
  checkboxGroup: {
    marginBottom: '20px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  searchResults: {
    backgroundColor: '#334155',
    padding: '16px',
    borderRadius: '6px',
    minHeight: '200px',
    fontSize: '13px',
    lineHeight: 1.5
  },
  draggableModal: {
    position: 'absolute' as const,
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    minWidth: '700px',
    minHeight: '500px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    cursor: 'move'
  },
  modalTitleBar: {
    padding: '12px 16px',
    backgroundColor: '#334155',
    borderBottom: '1px solid #475569',
    borderRadius: '8px 8px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'move'
  },
  modalBody: {
    padding: '16px',
    height: 'calc(100% - 50px)',
    overflow: 'auto'
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

interface Note {
  id: number;
  author: string;
  date: string;
  text: string;
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
    id: 'TF-2024-001522',
    summary: 'Critical network outage affecting main office',
    company: { name: 'Apex Manufacturing' },
    status: { name: 'Escalated' },
    priority: { name: 'High' },
    contact: { name: 'Jennifer Torres', phone: '(555) 987-6543' },
    initialDescription: 'Complete network outage in main office building. 120+ users affected. Production systems down.',
    dateEntered: '2025-05-25T07:30:00Z',
    assignedEngineer: 'Mike Johnson'
  },
  {
    id: 'TF-2024-001521',
    summary: 'Database server performance degradation',
    company: { name: 'TechStart Solutions' },
    status: { name: 'Escalated' },
    priority: { name: 'High' },
    contact: { name: 'Robert Kim' },
    initialDescription: 'SQL Server responding slowly. Query timeouts occurring frequently. Business operations impacted.',
    dateEntered: '2025-05-25T06:45:00Z',
    assignedEngineer: 'Alex Rodriguez'
  },
  {
    id: 'TF-2024-001520',
    summary: 'Ransomware detection on workstation',
    company: { name: 'Legal Partners LLC' },
    status: { name: 'Escalated' },
    priority: { name: 'High' },
    contact: { name: 'Patricia Wilson', phone: '(555) 555-0123' },
    initialDescription: 'Antivirus detected ransomware attempt on accounting workstation. Isolated immediately.',
    dateEntered: '2025-05-25T08:00:00Z',
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
    id: 'TF-2024-001517',
    summary: 'Printer network connectivity issues',
    company: { name: 'Green Valley Medical' },
    status: { name: 'In Progress' },
    priority: { name: 'Medium' },
    contact: { name: 'Dr. Lisa Park' },
    initialDescription: 'Main office printer not responding. Network connectivity appears normal.',
    dateEntered: '2025-05-24T16:20:00Z',
    assignedEngineer: 'Mike Johnson'
  },
  {
    id: 'TF-2024-001516',
    summary: 'Office 365 sync errors for multiple users',
    company: { name: 'Financial Advisors Inc' },
    status: { name: 'New' },
    priority: { name: 'Medium' },
    contact: { name: 'Mark Thompson', email: 'mark@fainc.com' },
    initialDescription: 'Several users unable to sync emails and calendar items with Office 365.',
    dateEntered: '2025-05-24T10:15:00Z',
    assignedEngineer: 'Alex Rodriguez'
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
  },
  {
    id: 'TF-2024-001514',
    summary: 'WiFi connectivity issues in conference rooms',
    company: { name: 'Design Studio Pro' },
    status: { name: 'Pending' },
    priority: { name: 'Low' },
    contact: { name: 'Amanda Foster' },
    initialDescription: 'Intermittent WiFi drops in conference rooms during client presentations.',
    dateEntered: '2025-05-24T09:30:00Z',
    assignedEngineer: 'Mike Johnson'
  },
  {
    id: 'TF-2024-001513',
    summary: 'Software licensing compliance audit request',
    company: { name: 'Construction Partners' },
    status: { name: 'New' },
    priority: { name: 'Medium' },
    contact: { name: 'James Miller', phone: '(555) 234-5678' },
    initialDescription: 'Need comprehensive audit of all software licenses for compliance review.',
    dateEntered: '2025-05-24T11:45:00Z',
    assignedEngineer: 'Alex Rodriguez'
  },
  {
    id: 'TF-2024-001512',
    summary: 'Firewall blocking legitimate business application',
    company: { name: 'Retail Solutions LLC' },
    status: { name: 'In Progress' },
    priority: { name: 'Medium' },
    contact: { name: 'Karen Davis' },
    initialDescription: 'New CRM application being blocked by firewall. Need to configure appropriate rules.',
    dateEntered: '2025-05-24T13:20:00Z',
    assignedEngineer: 'Sarah Chen'
  },
  {
    id: 'TF-2024-001511',
    summary: 'Hard drive replacement for aging workstation',
    company: { name: 'Accounting Plus' },
    status: { name: 'Pending' },
    priority: { name: 'Low' },
    contact: { name: 'Steve Wilson' },
    initialDescription: 'Workstation showing SMART errors. Proactive hard drive replacement needed.',
    dateEntered: '2025-05-24T08:00:00Z',
    assignedEngineer: 'Mike Johnson'
  },
  {
    id: 'TF-2024-001510',
    summary: 'Email archive migration to new system',
    company: { name: 'Healthcare Associates' },
    status: { name: 'New' },
    priority: { name: 'Medium' },
    contact: { name: 'Dr. Michelle Lee', email: 'mlee@healthcare.com' },
    initialDescription: 'Need to migrate 5 years of email archives to new compliance system.',
    dateEntered: '2025-05-23T15:30:00Z',
    assignedEngineer: 'Alex Rodriguez'
  },
  {
    id: 'TF-2024-001509',
    summary: 'User account lockout issues',
    company: { name: 'Digital Marketing Pro' },
    status: { name: 'In Progress' },
    priority: { name: 'Medium' },
    contact: { name: 'Ryan Johnson' },
    initialDescription: 'Multiple users experiencing frequent account lockouts. AD policies may need adjustment.',
    dateEntered: '2025-05-23T14:15:00Z',
    assignedEngineer: 'Sarah Chen'
  },
  {
    id: 'TF-2024-001508',
    summary: 'New employee workstation setup',
    company: { name: 'Consulting Group Elite' },
    status: { name: 'Pending' },
    priority: { name: 'Low' },
    contact: { name: 'HR Department' },
    initialDescription: 'Setup workstation and accounts for new hire starting Monday.',
    dateEntered: '2025-05-23T12:00:00Z',
    assignedEngineer: 'Mike Johnson'
  },
  {
    id: 'TF-2024-001507',
    summary: 'SharePoint site permissions review',
    company: { name: 'Real Estate Partners' },
    status: { name: 'New' },
    priority: { name: 'Low' },
    contact: { name: 'Tony Garcia' },
    initialDescription: 'Annual review and cleanup of SharePoint site permissions and access levels.',
    dateEntered: '2025-05-23T10:45:00Z',
    assignedEngineer: 'Alex Rodriguez'
  },
  {
    id: 'TF-2024-001506',
    summary: 'Phone system voicemail configuration',
    company: { name: 'Insurance Brokers United' },
    status: { name: 'In Progress' },
    priority: { name: 'Medium' },
    contact: { name: 'Linda Brown', phone: '(555) 345-6789' },
    initialDescription: 'Configure voicemail-to-email functionality for executive team.',
    dateEntered: '2025-05-23T09:20:00Z',
    assignedEngineer: 'Mike Johnson'
  },
  {
    id: 'TF-2024-001505',
    summary: 'Antivirus policy update deployment',
    company: { name: 'Manufacturing Solutions' },
    status: { name: 'Pending' },
    priority: { name: 'Medium' },
    contact: { name: 'Security Team' },
    initialDescription: 'Deploy updated antivirus policies to all managed endpoints.',
    dateEntered: '2025-05-23T08:30:00Z',
    assignedEngineer: 'Sarah Chen'
  },
  {
    id: 'TF-2024-001504',
    summary: 'Cloud storage quota increase request',
    company: { name: 'Architecture Firm Plus' },
    status: { name: 'New' },
    priority: { name: 'Low' },
    contact: { name: 'Project Manager' },
    initialDescription: 'OneDrive storage approaching limit. Need to increase quota for design team.',
    dateEntered: '2025-05-22T16:45:00Z',
    assignedEngineer: 'Alex Rodriguez'
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
  const [showEnterpriseModal, setShowEnterpriseModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSources, setSearchSources] = useState({
    historicalTickets: true,
    clientDocumentation: true,
    sharepoint: false,
    externalSources: false
  });
  const [searchResults, setSearchResults] = useState('');
  const [analysisWindows, setAnalysisWindows] = useState<Array<{id: string, title: string, content: string, position: {x: number, y: number}}>>([]);
  const [dragState, setDragState] = useState<{isDragging: boolean, windowId: string | null, offset: {x: number, y: number}}>({
    isDragging: false,
    windowId: null,
    offset: { x: 0, y: 0 }
  });
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [tempPriority, setTempPriority] = useState('');
  const [tempStatus, setTempStatus] = useState('');

  const [customerPOCs] = useState<{[key: string]: {name: string, phone?: string, email?: string, title?: string}}>({
    'TF-2024-001523': { name: 'David Rodriguez', phone: '(555) 123-4500', email: 'david.rodriguez@meridianfg.com', title: 'IT Director' },
    'TF-2024-001522': { name: 'Jennifer Torres', phone: '(555) 987-6500', email: 'j.torres@apexmfg.com', title: 'Operations Manager' },
    'TF-2024-001521': { name: 'Robert Kim', phone: '(555) 456-7890', email: 'rkim@techstart.com', title: 'CTO' },
    'TF-2024-001520': { name: 'Patricia Wilson', phone: '(555) 555-0100', email: 'pwilson@legalpartners.com', title: 'Managing Partner' },
    'TF-2024-001519': { name: 'Dr. Mark Stevens', phone: '(555) 789-0123', email: 'mstevens@coastaldental.com', title: 'Practice Manager' },
    'TF-2024-001518': { name: 'Jennifer Walsh', phone: '(555) 234-5670', email: 'jwalsh@premierlegal.com', title: 'Office Manager' }
  });

  const [lastNotes] = useState<Note[]>([
    {
      id: 1,
      author: 'Sarah Chen',
      date: '2h 15m ago',
      text: 'Initial diagnosis started. Checking Exchange message queue and SMTP connectors. Will update in 30 minutes.'
    },
    {
      id: 2,
      author: 'Michael Rodriguez',
      date: '45m ago',
      text: 'Client confirms issue affects emails from @vendor1.com and @supplier2.com specifically. No issues with internal emails.'
    },
    {
      id: 3,
      author: 'Sarah Chen',
      date: '30m ago',
      text: 'Found suspicious entries in receive connector logs. Investigating IP restriction policies and authentication settings.'
    },
    {
      id: 4,
      author: 'System',
      date: '15m ago',
      text: 'Ticket priority escalated to High due to business impact. SLA timer: 4h 45m remaining.'
    }
  ]);

  const openAnalysisWindow = (content: string) => {
    const newWindow = {
      id: Date.now().toString(),
      title: 'Analysis Results',
      content: content,
      position: { x: 100 + (analysisWindows.length * 30), y: 100 + (analysisWindows.length * 30) }
    };
    setAnalysisWindows(prev => [...prev, newWindow]);
  };

  const closeAnalysisWindow = (id: string) => {
    setAnalysisWindows(prev => prev.filter(window => window.id !== id));
  };

  const handleMouseDown = (e: React.MouseEvent, windowId: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDragState({
      isDragging: true,
      windowId,
      offset: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragState.isDragging && dragState.windowId) {
      const newX = e.clientX - dragState.offset.x;
      const newY = e.clientY - dragState.offset.y;
      
      setAnalysisWindows(prev => 
        prev.map(window => 
          window.id === dragState.windowId 
            ? { ...window, position: { x: newX, y: newY } }
            : window
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      windowId: null,
      offset: { x: 0, y: 0 }
    });
  };

  const handleUpdatePriorityStatus = () => {
    if (selectedTicket) {
      setTempPriority(selectedTicket.priority.name);
      setTempStatus(selectedTicket.status.name);
      setShowUpdateModal(true);
    }
  };

  const saveUpdates = () => {
    console.log('Updating ticket:', selectedTicket?.id, 'Priority:', tempPriority, 'Status:', tempStatus);
    setShowUpdateModal(false);
  };

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
      case 'escalated': return { ...styles.status, ...styles.statusEscalated };
      default: return styles.status;
    }
  };

  const getTicketBackgroundStyle = (ticket: Ticket) => {
    if (ticket.status.name === 'Escalated') {
      return styles.ticketEscalated;
    }
    
    switch (ticket.priority.name.toLowerCase()) {
      case 'high':
        return styles.ticketHighPriority;
      case 'medium':
        return styles.ticketMediumPriority;
      default:
        return {};
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
          { value: 'pending', label: 'Pending' },
          { value: 'escalated', label: 'Escalated' }
        ];
      default:
        return [];
    }
  };

  const getPriorityWeight = (priority: string): number => {
    switch (priority.toLowerCase()) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const getStatusWeight = (status: string): number => {
    if (status.toLowerCase() === 'escalated') return 100;
    return 0;
  };

  const filteredTickets = mockTickets
    .filter(ticket => {
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
    })
    .sort((a, b) => {
      const statusDiff = getStatusWeight(b.status.name) - getStatusWeight(a.status.name);
      if (statusDiff !== 0) return statusDiff;
      
      const priorityDiff = getPriorityWeight(b.priority.name) - getPriorityWeight(a.priority.name);
      if (priorityDiff !== 0) return priorityDiff;
      
      return new Date(b.dateEntered).getTime() - new Date(a.dateEntered).getTime();
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

  const handleEnterpriseSearch = () => {
    if (!searchQuery.trim()) return;
    
    let results = `ENTERPRISE SEARCH RESULTS\nQuery: "${searchQuery}"\n\n`;
    
    if (searchSources.historicalTickets) {
      results += `HISTORICAL TICKETS:\n`;
      results += `✓ #TF-2024-001324 - Similar Issue (Resolved)\n`;
      results += `  Client: Meridian Financial Group\n`;
      results += `  Resolution: Exchange server rejecting emails due to recipient policy misconfiguration.\n\n`;
    }
    
    if (searchSources.clientDocumentation) {
      results += `CLIENT DOCUMENTATION:\n`;
      results += `✓ Exchange Configuration Guide\n`;
      results += `✓ Network Topology Diagram\n`;
      results += `✓ Backup Procedures Manual\n\n`;
    }
    
    if (searchSources.sharepoint) {
      results += `SHAREPOINT DOCUMENTS:\n`;
      results += `✓ IT Policies and Procedures\n`;
      results += `✓ Change Management Process\n\n`;
    }
    
    if (searchSources.externalSources) {
      results += `EXTERNAL SOURCES:\n`;
      results += `✓ Microsoft TechNet Articles\n`;
      results += `✓ Vendor Documentation\n\n`;
    }
    
    setSearchResults(results);
    setAnalysisText(results);
    setShowEnterpriseModal(false);
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
    setAnalysisText(`**AI TICKET SUMMARY & ANALYSIS**

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
    <div 
      style={styles.container}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div style={styles.header}>
        {!isLeftPanelVisible && (
          <button
            onClick={() => setIsLeftPanelVisible(true)}
            style={styles.headerToggle}
            title="Show ticket list"
          >
            ▶
          </button>
        )}
        <div style={{
          ...styles.headerContent,
          ...(!isLeftPanelVisible ? styles.headerContentShifted : {})
        }}>
          <div style={styles.headerTitle}>TechFlow MSP</div>
          <div style={styles.headerSubtitle}>Sarah Chen - L2 Support Engineer</div>
          <div style={styles.stats}>
            <div style={styles.stat}>Assigned: 8</div>
            <div style={styles.stat}>Open: 12</div>
            <div style={styles.stat}>SLA: 2</div>
          </div>
        </div>
      </div>

      <div style={styles.main}>
        <div style={{
          ...styles.leftPanel,
          ...(isLeftPanelVisible ? {} : styles.leftPanelHidden)
        }}>
          <button
            onClick={() => setIsLeftPanelVisible(!isLeftPanelVisible)}
            style={{
              ...styles.toggleButton,
              ...(isLeftPanelVisible ? {} : styles.toggleButtonHidden)
            }}
            title={isLeftPanelVisible ? "Hide ticket list" : "Show ticket list"}
          >
            {isLeftPanelVisible ? '◀' : '▶'}
          </button>
          
          <div style={styles.filtersSection}>
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchBar}
            />
            
            <div style={styles.controlsRow}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'medium' }}>Sort:</span>
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
                style={{ ...styles.select, minWidth: '100px' }}
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
                My Open
              </button>
              <button
                onClick={() => setActiveTab('recent')}
                style={{
                  ...styles.tab,
                  ...(activeTab === 'recent' ? styles.tabActive : {})
                }}
              >
                Recent
              </button>
            </div>
          </div>

          <div style={styles.ticketsList}>
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                style={{
                  ...styles.ticket,
                  ...(selectedTicket?.id === ticket.id ? styles.ticketSelected : {}),
                  ...getTicketBackgroundStyle(ticket)
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

        <div style={styles.rightPanel}>
          <div style={styles.topSection}>
            <div style={styles.ticketOverview}>
              <div style={styles.ticketTitle}>
                <span style={styles.ticketId}>
                  {selectedTicket ? `#${selectedTicket.id}` : 'Select a Ticket'}
                </span>
                {selectedTicket && (
                  <>
                    <span style={{ ...styles.badge, ...getPriorityStyle(selectedTicket.priority.name) }}>
                      {selectedTicket.priority.name}
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
              
              {selectedTicket && (
                <>
                  <div style={styles.ticketDescription}>
                    <strong>Issue:</strong> {selectedTicket.initialDescription}
                  </div>

                  <div style={styles.lastNotesSection}>
                    <div style={styles.lastNotesTitle}>Last Notes</div>
                    <div style={styles.lastNotesContainer}>
                      {lastNotes.map((note, index) => (
                        <div 
                          key={note.id} 
                          style={{
                            ...styles.noteItem,
                            ...(index === lastNotes.length - 1 ? styles.noteItemLast : {})
                          }}
                        >
                          <div style={styles.noteHeader}>
                            <span style={styles.noteAuthor}>{note.author}</span>
                            <span style={styles.noteDate}>{note.date}</span>
                          </div>
                          <div style={styles.noteText}>{note.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div style={styles.contactSummary}>
              <div style={styles.contactLeft}>
                <div style={styles.sectionTitle}>Contact Info</div>
                {selectedTicket && (
                  <div style={styles.contactInfo}>
                    <div style={styles.contactField}>
                      <span style={styles.contactLabel}>Requester:</span>
                      <span style={styles.contactValue}>{selectedTicket.contact.name}</span>
                    </div>
                    <div style={styles.contactField}>
                      <span style={styles.contactLabel}>Company:</span>
                      <span style={styles.contactValue}>{selectedTicket.company.name}</span>
                    </div>
                    {selectedTicket.contact.phone && (
                      <div style={styles.contactField}>
                        <span style={styles.contactLabel}>Phone:</span>
                        <a href={`tel:${selectedTicket.contact.phone}`} style={styles.link}>
                          {selectedTicket.contact.phone}
                        </a>
                      </div>
                    )}
                    {selectedTicket.contact.email && (
                      <div style={styles.contactField}>
                        <span style={styles.contactLabel}>Email:</span>
                        <a href={`mailto:${selectedTicket.contact.email}`} style={styles.link}>
                          {selectedTicket.contact.email}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div style={styles.contactRight}>
                <div style={styles.sectionTitle}>Customer POC</div>
                {selectedTicket && customerPOCs[selectedTicket.id] && (
                  <div style={styles.contactInfo}>
                    <div style={styles.contactField}>
                      <span style={styles.contactLabel}>Name:</span>
                      <span style={styles.contactValue}>{customerPOCs[selectedTicket.id].name}</span>
                    </div>
                    <div style={styles.contactField}>
                      <span style={styles.contactLabel}>Title:</span>
                      <span style={styles.contactValue}>{customerPOCs[selectedTicket.id].title}</span>
                    </div>
                    {customerPOCs[selectedTicket.id].phone && (
                      <div style={styles.contactField}>
                        <span style={styles.contactLabel}>Phone:</span>
                        <a href={`tel:${customerPOCs[selectedTicket.id].phone}`} style={styles.link}>
                          {customerPOCs[selectedTicket.id].phone}
                        </a>
                      </div>
                    )}
                    {customerPOCs[selectedTicket.id].email && (
                      <div style={styles.contactField}>
                        <span style={styles.contactLabel}>Email:</span>
                        <a href={`mailto:${customerPOCs[selectedTicket.id].email}`} style={styles.link}>
                          {customerPOCs[selectedTicket.id].email}
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={styles.actionButtonsSection}>
            <div style={styles.aiColumn}>
              <div style={styles.sectionTitle}>AI Engineer Assistant</div>
              <div style={styles.buttonGrid}>
                <button onClick={showClientEnvironment} style={styles.button}>
                  📊 Client Environment
                </button>
                <button onClick={() => setShowEnterpriseModal(true)} style={styles.button}>
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

            <div style={styles.managementColumn}>
              <div style={styles.sectionTitle}>Ticket Management</div>
              <div style={styles.buttonGrid}>
                <button style={styles.button}>Assign/Add Teammate</button>
                <button style={styles.button}>Request Escalation</button>
                <button onClick={handleUpdatePriorityStatus} style={styles.button}>Update Priority / Status</button>
                <button style={styles.button}>Add Watchers</button>
              </div>
            </div>
          </div>

          <div style={styles.bottomSplitSection}>
            <div style={styles.analysisHalf}>
              <div style={styles.analysisHeader}>
                <div style={styles.sectionTitle}>Analysis Results</div>
                {analysisText && (
                  <button 
                    onClick={() => openAnalysisWindow(analysisText)}
                    style={styles.cloneButton}
                  >
                    📋 Clone Window
                  </button>
                )}
              </div>
              {analysisText ? (
                <div style={{ ...styles.analysisBox, flex: 1 }}>
                  {analysisText}
                </div>
              ) : (
                <div style={{ ...styles.analysisPlaceholder, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Click any AI Assistant button above to view analysis results here.
                </div>
              )}
            </div>

            <div style={styles.notesHalf}>
              <div style={styles.sectionTitle}>Notes & Communication</div>
              
              <div style={{ marginBottom: '12px' }}>
                <div style={styles.actionGroupTitle}>Time Tracking</div>
                <div style={styles.timer}>{timerDisplay}</div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
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
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px' }}>
                  <input type="checkbox" /> Request KB Article
                </label>
              </div>

              <div style={{ flex: 1 }}>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add notes about your investigation or actions taken..."
                  style={{ ...styles.textarea, height: '100%', minHeight: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>Update Priority & Status</div>
              <button 
                onClick={() => setShowUpdateModal(false)}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                Priority:
              </label>
              <select
                value={tempPriority}
                onChange={(e) => setTempPriority(e.target.value)}
                style={{ ...styles.searchInput, marginBottom: '0' }}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                Status:
              </label>
              <select
                value={tempStatus}
                onChange={(e) => setTempStatus(e.target.value)}
                style={{ ...styles.searchInput, marginBottom: '0' }}
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
                <option value="Escalated">Escalated</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowUpdateModal(false)}
                style={{ ...styles.button, backgroundColor: '#6b7280' }}
              >
                Cancel
              </button>
              <button 
                onClick={saveUpdates}
                style={{ ...styles.button, ...styles.primaryButton }}
              >
                Update Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {showEnterpriseModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <div style={styles.modalTitle}>Enterprise Search</div>
              <button 
                onClick={() => setShowEnterpriseModal(false)}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>
            
            <input
              type="text"
              placeholder="Enter search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            
            <div style={styles.checkboxGroup}>
              <div style={styles.sectionTitle}>Search Sources:</div>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={searchSources.historicalTickets}
                  onChange={(e) => setSearchSources({...searchSources, historicalTickets: e.target.checked})}
                />
                Historical Tickets
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={searchSources.clientDocumentation}
                  onChange={(e) => setSearchSources({...searchSources, clientDocumentation: e.target.checked})}
                />
                Client Documentation
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={searchSources.sharepoint}
                  onChange={(e) => setSearchSources({...searchSources, sharepoint: e.target.checked})}
                />
                SharePoint
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={searchSources.externalSources}
                  onChange={(e) => setSearchSources({...searchSources, externalSources: e.target.checked})}
                />
                External Sources
              </label>
            </div>
            
            <button 
              onClick={handleEnterpriseSearch}
              style={{ ...styles.button, ...styles.primaryButton, width: '100%', marginBottom: '16px' }}
            >
              Search
            </button>
            
            {searchResults && (
              <div>
                <div style={styles.sectionTitle}>Search Results:</div>
                <div style={styles.searchResults}>
                  {searchResults}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {analysisWindows.map((window, index) => (
        <div 
          key={window.id} 
          style={{
            ...styles.draggableModal,
            left: window.position.x,
            top: window.position.y,
            zIndex: 1100 + index
          }}
        >
          <div 
            style={styles.modalTitleBar}
            onMouseDown={(e) => handleMouseDown(e, window.id)}
          >
            <div style={styles.modalTitle}>{window.title}</div>
            <button 
              onClick={() => closeAnalysisWindow(window.id)}
              style={styles.closeButton}
            >
              ×
            </button>
          </div>
          <div style={styles.modalBody}>
            <div style={{
              ...styles.analysisBox,
              height: '100%',
              maxHeight: 'none',
              margin: 0
            }}>
              {window.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MSPPortal;