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
  ArrowRight,
  Menu,
  X,
  BarChart3,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Brain
} from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '16px'
  },
  header: {
    position: 'sticky' as const,
    top: 0,
    height: '65px',
    backgroundColor: '#1e293b',
    borderBottom: '1px solid #334155',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    zIndex: 100
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  menuToggle: {
    background: 'none',
    border: 'none',
    color: '#e2e8f0',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'background 0.2s',
    display: 'block'
  },
  logo: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#e2e8f0'
  },
  userInfo: {
    fontSize: '14px',
    color: '#cbd5e1',
    display: 'none'
  },
  configBtn: {
    background: '#334155',
    border: '1px solid #475569',
    color: '#e2e8f0',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    position: 'relative' as const
  },
  sidebar: {
    position: 'fixed' as const,
    top: 0,
    left: '-280px',
    width: '280px',
    height: '100vh',
    backgroundColor: '#1e293b',
    borderRight: '1px solid #334155',
    padding: '24px',
    transition: 'left 0.3s ease',
    zIndex: 200,
    overflowY: 'auto' as const
  },
  sidebarOpen: {
    left: 0
  },
  sidebarHeader: {
    padding: '20px 0',
    borderBottom: '1px solid #334155',
    marginBottom: '24px'
  },
  sidebarTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#e2e8f0'
  },
  navSection: {
    marginBottom: '32px'
  },
  navSectionTitle: {
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '16px',
    textTransform: 'uppercase' as const,
    fontWeight: '600'
  },
  navItem: {
    padding: '16px',
    marginBottom: '8px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#cbd5e1',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '15px',
    minHeight: '56px'
  },
  navItemHover: {
    background: '#334155',
    transform: 'translateX(4px)'
  },
  navItemActive: {
    background: '#3b82f6',
    color: 'white',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 150,
    opacity: 0,
    pointerEvents: 'none' as const,
    transition: 'opacity 0.3s ease'
  },
  overlayShow: {
    opacity: 1,
    pointerEvents: 'all' as const
  },
  contentArea: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto' as const,
    background: '#0f172a',
    minHeight: 'calc(100vh - 65px)'
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#e2e8f0'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  metricCard: {
    background: '#1e293b',
    padding: '20px 16px',
    borderRadius: '16px',
    border: '1px solid #334155',
    textAlign: 'center' as const,
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  metricValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: '4px'
  },
  metricLabel: {
    fontSize: '11px',
    color: '#94a3b8',
    textTransform: 'uppercase' as const,
    fontWeight: '600'
  },
  sectionCard: {
    background: '#1e293b',
    borderRadius: '16px',
    border: '1px solid #334155',
    marginBottom: '24px',
    overflow: 'hidden'
  },
  sectionHeader: {
    padding: '20px',
    borderBottom: '1px solid #334155',
    fontSize: '16px',
    fontWeight: '600',
    color: '#e2e8f0',
    background: '#1e293b'
  },
  sectionContent: {
    padding: '20px'
  },
  escalationItem: {
    background: '#1e293b',
    border: '1px solid #374151',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '16px',
    transition: 'transform 0.2s'
  },
  escalationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    flexWrap: 'wrap' as const,
    gap: '8px'
  },
  escalationTitle: {
    fontWeight: '600',
    marginBottom: '8px',
    fontSize: '16px'
  },
  escalationMeta: {
    color: '#cbd5e1',
    fontSize: '13px',
    lineHeight: '1.4',
    marginBottom: '12px'
  },
  badge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase' as const
  },
  badgeAi: {
    background: '#ddd6fe',
    color: '#7c3aed'
  },
  badgeHuman: {
    background: '#fed7d7',
    color: '#e53e3e'
  },
  timeStamp: {
    fontSize: '12px',
    color: '#94a3b8'
  },
  analysisBox: {
    background: '#0f172a',
    padding: '12px',
    borderRadius: '8px',
    margin: '12px 0'
  },
  analysisLabel: {
    color: '#f59e0b',
    fontWeight: '600',
    marginBottom: '6px',
    fontSize: '12px'
  },
  analysisText: {
    fontSize: '13px',
    color: '#cbd5e1',
    lineHeight: '1.4'
  },
  btn: {
    padding: '12px 20px',
    border: '1px solid #475569',
    borderRadius: '12px',
    background: '#334155',
    color: '#e2e8f0',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '12px',
    marginBottom: '8px',
    transition: 'all 0.2s',
    minHeight: '44px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnPrimary: {
    background: '#3b82f6',
    borderColor: '#3b82f6',
    color: 'white'
  },
  btnDanger: {
    background: '#dc2626',
    borderColor: '#dc2626',
    color: 'white'
  },
  btnWarning: {
    background: '#f59e0b',
    borderColor: '#f59e0b',
    color: 'white'
  },
  engineerGrid: {
    display: 'grid',
    gap: '16px'
  },
  engineerCard: {
    background: '#334155',
    padding: '16px',
    borderRadius: '12px',
    transition: 'transform 0.2s'
  },
  engineerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap' as const,
    gap: '8px'
  },
  engineerName: {
    fontWeight: '600',
    fontSize: '15px'
  },
  status: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase' as const
  },
  statusAvailable: { 
    background: '#dcfce7', 
    color: '#16a34a' 
  },
  statusBusy: { 
    background: '#fee2e2', 
    color: '#dc2626' 
  },
  statusModerate: { 
    background: '#fef3c7', 
    color: '#d97706' 
  },
  engineerDetails: {
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '8px'
  },
  engineerSkills: {
    fontSize: '12px',
    color: '#cbd5e1'
  },
  bottomNav: {
    position: 'sticky' as const,
    bottom: 0,
    background: '#1e293b',
    borderTop: '1px solid #334155',
    padding: '8px 0',
    display: 'flex',
    justifyContent: 'space-around',
    zIndex: 50
  },
  bottomNavItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '12px 8px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: '#94a3b8',
    fontSize: '11px',
    minWidth: '60px'
  },
  bottomNavItemActive: {
    color: '#3b82f6',
    background: 'rgba(59, 130, 246, 0.1)'
  },
  bottomNavIcon: {
    fontSize: '20px',
    marginBottom: '4px'
  },
  bottomNavLabel: {
    fontWeight: '600',
    textTransform: 'uppercase' as const
  },
  configModalOverlay: {
    position: 'fixed' as const,
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
  configContainer: {
    background: '#1e293b',
    borderRadius: '16px',
    border: '1px solid #334155',
    width: '100%',
    maxWidth: '900px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  },
  configHeader: {
    padding: '24px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  configTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#e2e8f0'
  },
  configClose: {
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '8px',
    transition: 'all 0.2s'
  },
  // Assignment Grid
  assignmentGrid: {
    display: 'grid',
    gap: '24px',
    marginBottom: '24px',
    gridTemplateColumns: '1fr 1fr', // Always two columns side by side
    minHeight: '600px'
  },
  ticketList: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  ticketItem: {
    padding: '16px',
    background: '#334155',
    borderRadius: '12px',
    transition: 'all 0.2s',
    borderLeft: '4px solid transparent'
  },
  ticketItemSelected: {
    borderLeftColor: '#3b82f6',
    background: '#1e40af',
    transform: 'scale(1.02)'
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    flexWrap: 'wrap' as const,
    gap: '8px'
  },
  ticketNumber: {
    fontWeight: '600',
    color: '#e2e8f0',
    fontSize: '14px'
  },
  ticketDescription: {
    color: '#cbd5e1',
    fontSize: '13px',
    marginBottom: '12px',
    lineHeight: '1.4'
  },
  skillTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap' as const
  },
  skillTag: {
    padding: '4px 8px',
    background: '#0f172a',
    color: '#3b82f6',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600'
  },
  recommendation: {
    background: '#0f172a',
    padding: '16px',
    borderRadius: '12px',
    borderLeft: '4px solid #10b981'
  },
  recommendationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '12px'
  },
  confidenceScore: {
    fontSize: '18px',
    fontWeight: '700',
    padding: '8px 12px',
    borderRadius: '12px'
  },
  confidence: {
    color: '#10b981',
    fontSize: '12px',
    marginBottom: '12px',
    fontWeight: '600'
  },
  reason: {
    fontSize: '13px',
    marginBottom: '4px',
    lineHeight: '1.4'
  },
  filterButton: {
    padding: '10px 16px',
    background: '#334155',
    border: '1px solid #475569',
    borderRadius: '8px',
    color: '#cbd5e1',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    minHeight: '40px',
    display: 'flex',
    alignItems: 'center'
  },
  filterButtonActive: {
    background: '#3b82f6',
    borderColor: '#3b82f6',
    color: 'white',
    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)'
  },
  filterSelect: {
    padding: '12px',
    background: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    color: '#e2e8f0',
    fontSize: '14px',
    minHeight: '44px',
    flex: 1,
    minWidth: '120px'
  },
  performanceCard: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '16px',
    padding: '20px',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  performanceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap' as const,
    gap: '8px'
  },
  performanceScore: {
    fontSize: '20px',
    fontWeight: '700',
    padding: '8px 16px',
    borderRadius: '12px'
  },
  metricRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #374151'
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
  }
];

const ManagerApp = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  
  // Assignment page state
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  
  // Escalations page state
  const [filterType, setFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [selectedEscalation, setSelectedEscalation] = useState<string | null>(null);
  const [escalateToTeams, setEscalateToTeams] = useState(true);
  const [escalateToSMS, setEscalateToSMS] = useState(false);
  const [escalateToManager, setEscalateToManager] = useState('');
  const [escalationType, setEscalationType] = useState('');
  
  // Performance page state
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('overall');
  
  // Reports page state
  const [reportsPeriod, setReportsPeriod] = useState('quarter');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [sortBy, setSortBy] = useState('cbr');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const showPage = (pageId: string) => {
    setActivePage(pageId);
    // Always close sidebar when navigating (both mobile and desktop)
    closeSidebar();
  };

  const openConfig = () => {
    setConfigModalOpen(true);
  };

  const closeConfig = () => {
    setConfigModalOpen(false);
  };

  const navItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', section: 'Operations' },
    { id: 'assignments', icon: Target, label: 'Ticket Assignment', section: 'Operations' },
    { id: 'escalations', icon: AlertTriangle, label: 'Escalations', section: 'Operations' },
    { id: 'reports', icon: TrendingUp, label: 'Client Reports', section: 'Analytics' },
    { id: 'performance', icon: Users, label: 'Performance', section: 'Analytics' },
    { id: 'finance', icon: DollarSign, label: 'Finance', section: 'Analytics' }
  ];

  const renderDashboard = () => (
    <div>
      <h1 style={styles.pageTitle}>Dashboard</h1>
      
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <div style={styles.metricValue}>47</div>
          <div style={styles.metricLabel}>Total Open</div>
        </div>
        <div 
          style={{...styles.metricCard, cursor: 'pointer'}} 
          onClick={() => showPage('assignments')}
        >
          <div style={styles.metricValue}>4</div>
          <div style={styles.metricLabel}>New Tickets</div>
        </div>
        <div 
          style={{...styles.metricCard, cursor: 'pointer'}} 
          onClick={() => showPage('escalations')}
        >
          <div style={styles.metricValue}>5</div>
          <div style={styles.metricLabel}>Escalations</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricValue}>2.4h</div>
          <div style={styles.metricLabel}>Avg Resolution</div>
        </div>
        <div style={styles.metricCard}>
          <div style={styles.metricValue}>4.7</div>
          <div style={styles.metricLabel}>Team CSAT</div>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: '1fr 1fr',
        marginBottom: '24px'
      }}>
        {/* Escalations */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionHeader}>🚨 Active Escalations</div>
          <div style={styles.sectionContent}>
            <div style={styles.escalationItem}>
              <div style={styles.escalationHeader}>
                <div>
                  <strong>#TF-2024-001523</strong>
                  <span style={{...styles.badge, ...styles.badgeHuman}}>Human Requested</span>
                </div>
                <div style={styles.timeStamp}>45 min ago</div>
              </div>
              
              <div style={styles.escalationTitle}>Exchange server corruption</div>
              <div style={styles.escalationMeta}>
                Client: TechStart Solutions<br/>
                Engineer: Sarah Chen (L2)
              </div>
            </div>

            <div style={styles.escalationItem}>
              <div style={styles.escalationHeader}>
                <div>
                  <strong>#TF-2024-001529</strong>
                  <span style={{...styles.badge, ...styles.badgeAi}}>AI Generated</span>
                </div>
                <div style={styles.timeStamp}>2 hrs ago</div>
              </div>
              
              <div style={styles.escalationTitle}>Network connectivity issues</div>
              <div style={styles.escalationMeta}>
                Client: MegaCorp Industries<br/>
                Engineer: Mike Johnson (L1)
              </div>
            </div>

            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <button 
                style={{...styles.btn, ...styles.btnPrimary}} 
                onClick={() => showPage('escalations')}
              >
                View All Escalations
              </button>
            </div>
          </div>
        </div>

        {/* Engineer Workload */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionHeader}>👥 Engineer Workload</div>
          <div style={styles.sectionContent}>
            <div style={styles.engineerGrid}>
              <div style={styles.engineerCard}>
                <div style={styles.engineerHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>👨‍💻</div>
                    <div>
                      <span style={styles.engineerName}>Marcus Thompson (L3)</span>
                      <div style={styles.engineerDetails}>Open: 5 tickets</div>
                    </div>
                  </div>
                  <span style={{...styles.status, ...styles.statusModerate}}>Moderate</span>
                </div>
                <div style={styles.engineerSkills}>macOS, Apple Certified, VMware</div>
              </div>
              
              <div style={styles.engineerCard}>
                <div style={styles.engineerHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>👩‍🎓</div>
                    <div>
                      <span style={styles.engineerName}>Jenny Williams (L1)</span>
                      <div style={styles.engineerDetails}>Open: 3 tickets</div>
                    </div>
                  </div>
                  <span style={{...styles.status, ...styles.statusAvailable}}>Available</span>
                </div>
                <div style={styles.engineerSkills}>Password Reset, Basic Support</div>
              </div>
              
              <div style={styles.engineerCard}>
                <div style={styles.engineerHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>🌐</div>
                    <div>
                      <span style={styles.engineerName}>Alex Rodriguez (Network)</span>
                      <div style={styles.engineerDetails}>Open: 4 tickets</div>
                    </div>
                  </div>
                  <span style={{...styles.status, ...styles.statusAvailable}}>Available</span>
                </div>
                <div style={styles.engineerSkills}>Cisco, Firewall, VPN</div>
              </div>
              
              <div style={styles.engineerCard}>
                <div style={styles.engineerHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>👩‍💼</div>
                    <div>
                      <span style={styles.engineerName}>Sarah Chen (L2)</span>
                      <div style={styles.engineerDetails}>Open: 8 tickets</div>
                    </div>
                  </div>
                  <span style={{...styles.status, ...styles.statusBusy}}>Busy</span>
                </div>
                <div style={styles.engineerSkills}>Exchange, Email, Windows Server</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAssignmentPage = () => {
    const assignmentTickets = [
      {
        id: 'TF-2024-001535',
        priority: 'HIGH',
        title: 'MacBook Pro won\'t boot - kernel panic on startup',
        company: 'Creative Agency LLC',
        skills: ['macOS', 'Apple Certified', 'Hardware'],
        type: 'macos'
      },
      {
        id: 'TF-2024-001536',
        priority: 'LOW',
        title: 'Password reset - user locked out of domain account',
        company: 'Legal Partners',
        skills: ['Password Reset', 'Level 1', 'Active Directory'],
        type: 'password'
      },
      {
        id: 'TF-2024-001537',
        priority: 'HIGH',
        title: 'Cisco firewall blocking traffic - VPN tunnel down',
        company: 'Manufacturing Corp',
        skills: ['Cisco', 'Network', 'VPN', 'Firewall'],
        type: 'cisco'
      },
      {
        id: 'TF-2024-001538',
        priority: 'MEDIUM',
        title: 'Exchange mailbox database corruption detected',
        company: 'Healthcare Solutions',
        skills: ['Exchange', 'Level 2+', 'Database'],
        type: 'exchange'
      }
    ];

    const getRecommendations = (ticketType: string) => {
      const recommendations: { [key: string]: any[] } = {
        macos: [
          {
            name: 'Marcus Thompson (L3)',
            confidence: 98,
            level: 'excellent',
            reasons: [
              { type: 'success', text: 'Apple Certified macOS specialist' },
              { type: 'success', text: 'Level 3 for complex hardware issues' },
              { type: 'success', text: 'Moderate workload (5 tickets)' },
              { type: 'success', text: '98% success with kernel issues' }
            ],
            workload: 5,
            specialty: 'macOS Expert'
          },
          {
            name: 'Alex Rodriguez (Network)',
            confidence: 85,
            level: 'good',
            reasons: [
              { type: 'success', text: 'Cross-trained on macOS basics' },
              { type: 'success', text: 'Available immediately (4 tickets)' },
              { type: 'success', text: 'Strong troubleshooting skills' },
              { type: 'warning', text: 'May need L3 backup for complex issues' }
            ],
            workload: 4,
            specialty: 'Network Specialist'
          },
          {
            name: 'Sarah Chen (L2)',
            confidence: 72,
            level: 'fair',
            reasons: [
              { type: 'success', text: 'General hardware troubleshooting experience' },
              { type: 'success', text: 'Available for overflow support' },
              { type: 'warning', text: 'Limited macOS experience' },
              { type: 'warning', text: 'May require additional time for research' }
            ],
            workload: 8,
            specialty: 'Systems Engineer'
          }
        ],
        password: [
          {
            name: 'Jenny Williams (L1)',
            confidence: 95,
            level: 'excellent',
            reasons: [
              { type: 'success', text: 'Level 1 task - perfect match' },
              { type: 'success', text: 'Lowest workload (3 tickets)' },
              { type: 'success', text: 'Password reset specialist' },
              { type: 'success', text: 'Can resolve in under 15 minutes' }
            ],
            workload: 3,
            specialty: 'L1 Support'
          },
          {
            name: 'Mike Johnson (L1)',
            confidence: 78,
            level: 'good',
            reasons: [
              { type: 'success', text: 'L1 capable for basic password resets' },
              { type: 'success', text: 'Good training opportunity' },
              { type: 'warning', text: 'Higher workload (6 tickets)' },
              { type: 'warning', text: 'May take longer than Jenny' }
            ],
            workload: 6,
            specialty: 'L1 Support'
          },
          {
            name: 'Sarah Chen (L2)',
            confidence: 89,
            level: 'good',
            reasons: [
              { type: 'success', text: 'Can handle complex AD issues' },
              { type: 'success', text: 'Available if L1 team is swamped' },
              { type: 'success', text: 'Domain admin experience' },
              { type: 'warning', text: 'Overqualified for basic resets' }
            ],
            workload: 8,
            specialty: 'Systems Engineer'
          }
        ],
        cisco: [
          {
            name: 'Alex Rodriguez (Network)',
            confidence: 97,
            level: 'excellent',
            reasons: [
              { type: 'success', text: 'Cisco certified specialist' },
              { type: 'success', text: 'Firewall and VPN expert' },
              { type: 'success', text: 'Available workload (4 tickets)' },
              { type: 'success', text: 'High priority - prevents downtime' }
            ],
            workload: 4,
            specialty: 'Network Expert'
          },
          {
            name: 'Marcus Thompson (L3)',
            confidence: 82,
            level: 'good',
            reasons: [
              { type: 'success', text: 'Senior level troubleshooting' },
              { type: 'success', text: 'Cross-trained on network basics' },
              { type: 'success', text: 'Available if Alex is unavailable' },
              { type: 'warning', text: 'Network not his primary specialty' }
            ],
            workload: 5,
            specialty: 'L3 Senior Tech'
          },
          {
            name: 'Jenny Williams (L1)',
            confidence: 65,
            level: 'fair',
            reasons: [
              { type: 'success', text: 'Can assist with basic connectivity tests' },
              { type: 'success', text: 'Available for data gathering' },
              { type: 'warning', text: 'Limited Cisco experience' },
              { type: 'warning', text: 'Will need senior oversight' }
            ],
            workload: 3,
            specialty: 'L1 Support'
          }
        ],
        exchange: [
          {
            name: 'Sarah Chen (L2)',
            confidence: 96,
            level: 'excellent',
            reasons: [
              { type: 'success', text: 'Exchange database expert' },
              { type: 'success', text: 'Level 2+ required expertise' },
              { type: 'success', text: '94% success with database issues' },
              { type: 'warning', text: 'Busy (8 tickets) but critical skills' }
            ],
            workload: 8,
            specialty: 'Exchange Expert'
          },
          {
            name: 'Lisa Park (Database)',
            confidence: 88,
            level: 'good',
            reasons: [
              { type: 'success', text: 'Database specialist' },
              { type: 'success', text: 'SQL Server and Exchange experience' },
              { type: 'success', text: 'Available for critical issues' },
              { type: 'warning', text: 'Exchange not primary focus' }
            ],
            workload: 3,
            specialty: 'Database Expert'
          },
          {
            name: 'Marcus Thompson (L3)',
            confidence: 79,
            level: 'fair',
            reasons: [
              { type: 'success', text: 'Senior troubleshooting skills' },
              { type: 'success', text: 'Can coordinate with vendors' },
              { type: 'warning', text: 'Exchange not his specialty' },
              { type: 'warning', text: 'May need external support' }
            ],
            workload: 5,
            specialty: 'L3 Senior Tech'
          }
        ]
      };
      return recommendations[ticketType] || [];
    };

    const selectTicket = (ticketId: string) => {
      setSelectedTicket(ticketId);
    };

    const selectedTicketData = assignmentTickets.find(t => t.id === selectedTicket);
    const recommendations = selectedTicketData ? getRecommendations(selectedTicketData.type) : [];

    return (
      <div>
        <h1 style={styles.pageTitle}>AI Assignment</h1>
        
        <div style={{
          ...styles.assignmentGrid,
          // Stack on very small mobile screens
          gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr'
        }}>
          {/* Tickets Column */}
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>📋 New Tickets ({assignmentTickets.length})</div>
            <div style={styles.sectionContent}>
              <div style={styles.ticketList}>
                {assignmentTickets.map(ticket => (
                  <div 
                    key={ticket.id}
                    style={{
                      ...styles.ticketItem,
                      ...(selectedTicket === ticket.id ? styles.ticketItemSelected : {}),
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => selectTicket(ticket.id)}
                  >
                    <div style={styles.ticketHeader}>
                      <div style={styles.ticketNumber}>
                        #{ticket.id} - {ticket.priority}
                      </div>
                      <div style={{
                        ...styles.badge,
                        ...(ticket.priority === 'HIGH' ? { background: '#fee2e2', color: '#dc2626' } :
                           ticket.priority === 'MEDIUM' ? { background: '#fef3c7', color: '#d97706' } :
                           { background: '#dcfce7', color: '#16a34a' })
                      }}>
                        {ticket.priority}
                      </div>
                    </div>
                    <div style={styles.ticketDescription}>
                      {ticket.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
                      Client: {ticket.company}
                    </div>
                    <div style={styles.skillTags}>
                      {ticket.skills.map((skill, index) => (
                        <span key={index} style={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Recommendations Column */}
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>🤖 AI Recommendations</div>
            <div style={styles.sectionContent}>
              {!selectedTicket ? (
                <div style={{
                  textAlign: 'center' as const,
                  padding: '40px 20px',
                  color: '#94a3b8',
                  fontSize: '16px'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>🎯</div>
                  <div>Select a ticket to see AI recommendations</div>
                </div>
              ) : (
                <div>
                  {recommendations.map((rec, index) => (
                    <div 
                      key={index}
                      style={{
                        ...styles.recommendation,
                        borderLeftColor: rec.level === 'excellent' ? '#10b981' : 
                                       rec.level === 'good' ? '#f59e0b' : '#94a3b8',
                        marginBottom: '16px'
                      }}
                    >
                      <div style={styles.recommendationHeader}>
                        <div>
                          <div style={styles.engineerName}>{rec.name}</div>
                          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                            {rec.specialty}
                          </div>
                        </div>
                        <div style={{
                          ...styles.confidenceScore,
                          background: rec.level === 'excellent' ? '#dcfce7' : 
                                     rec.level === 'good' ? '#fef3c7' : '#f3f4f6',
                          color: rec.level === 'excellent' ? '#16a34a' : 
                                rec.level === 'good' ? '#d97706' : '#6b7280'
                        }}>
                          {rec.confidence}%
                        </div>
                      </div>
                      
                      <div style={{
                        ...styles.confidence,
                        color: rec.level === 'excellent' ? '#10b981' : 
                              rec.level === 'good' ? '#f59e0b' : '#6b7280'
                      }}>
                        {rec.confidence}% Match - {rec.level === 'excellent' ? 'Excellent' : 
                                                  rec.level === 'good' ? 'Good Alternative' : 'Fair Option'}
                      </div>
                      
                      <div style={{ marginBottom: '16px' }}>
                        {rec.reasons.map((reason: any, idx: number) => (
                          <div key={idx} style={{
                            ...styles.reason,
                            color: reason.type === 'success' ? '#10b981' : '#f59e0b'
                          }}>
                            {reason.type === 'success' ? '✓' : '⚠'} {reason.text}
                          </div>
                        ))}
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                        <button 
                          style={{
                            ...styles.btn,
                            ...(rec.level === 'excellent' ? styles.btnPrimary : 
                               rec.level === 'good' ? styles.btnWarning : 
                               { background: '#6b7280', borderColor: '#6b7280', color: 'white' })
                          }}
                        >
                          Assign to {rec.name.split(' ')[0]}
                        </button>
                        <button style={styles.btn}>
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Escalate Modal */}
        {showEscalateModal && (
          <div style={styles.configModalOverlay}>
            <div style={{
              ...styles.configContainer,
              maxWidth: '500px',
              maxHeight: '70vh'
            }}>
              <div style={styles.configHeader}>
                <h2 style={styles.configTitle}>
                  {escalationType === 'executive' ? 'Executive Escalation' : 'Standard Escalation'}
                </h2>
                <button 
                  style={styles.configClose} 
                  onClick={() => setShowEscalateModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '600' }}>
                    Escalate To
                  </label>
                  <select 
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#334155',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                      fontSize: '14px'
                    }}
                    value={escalateToManager}
                    onChange={(e) => setEscalateToManager(e.target.value)}
                  >
                    <option value="">Select Manager</option>
                    {escalationType === 'executive' ? (
                      <>
                        <option value="michael-torres">Michael Torres - CEO</option>
                        <option value="jennifer-adams">Jennifer Adams - CTO</option>
                        <option value="helen-wu">Helen Wu - Operations VP</option>
                      </>
                    ) : (
                      <>
                        <option value="david-kim">David Kim - Service Manager</option>
                        <option value="lisa-wang">Lisa Wang - Senior Engineer</option>
                        <option value="marcus-thompson">Marcus Thompson - L3 Lead</option>
                        <option value="sarah-chen">Sarah Chen - L2 Supervisor</option>
                      </>
                    )}
                  </select>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <input 
                      type="checkbox" 
                      checked={escalateToTeams}
                      onChange={(e) => setEscalateToTeams(e.target.checked)}
                      style={{ marginRight: '8px', width: '18px', height: '18px' }}
                    />
                    <label style={{ color: '#e2e8f0', fontWeight: '600' }}>
                      Send Teams Message
                    </label>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={escalateToSMS}
                      onChange={(e) => setEscalateToSMS(e.target.checked)}
                      style={{ marginRight: '8px', width: '18px', height: '18px' }}
                    />
                    <label style={{ color: '#e2e8f0', fontWeight: '600' }}>
                      Send SMS Message
                    </label>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button 
                    style={{...styles.btn}}
                    onClick={() => setShowEscalateModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    style={{...styles.btn, ...styles.btnPrimary}}
                    onClick={() => {
                      console.log(`Escalating ${selectedEscalation} to ${escalateToManager}`);
                      console.log(`Teams: ${escalateToTeams}, SMS: ${escalateToSMS}`);
                      setShowEscalateModal(false);
                      setEscalateToManager('');
                      setEscalateToTeams(true);
                      setEscalateToSMS(false);
                    }}
                  >
                    Escalate Ticket
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEscalationsPage = () => {
    const escalations = [
      {
        id: 'TF-2024-001529',
        type: 'ai',
        title: 'Network connectivity issues',
        client: 'MegaCorp Industries',
        engineer: 'Mike Johnson (L1)',
        timeAgo: '2 hrs ago',
        analysis: 'High client frustration detected. Multiple follow-ups in short timeframe. Business-critical system down affecting 50+ users.',
        severity: 'critical',
        priority: 'HIGH'
      },
      {
        id: 'TF-2024-001523',
        type: 'human',
        title: 'Exchange server corruption',
        client: 'TechStart Solutions',
        engineer: 'Sarah Chen (L2)',
        requestedBy: 'David Kim',
        timeAgo: '45 min ago',
        analysis: 'Database corruption beyond L2 capabilities. Need senior DBA involvement.',
        severity: 'high',
        priority: 'HIGH'
      },
      {
        id: 'TF-2024-001534',
        type: 'ai',
        title: 'VPN connection failures',
        client: 'Global Manufacturing',
        engineer: 'Jenny Williams (L1)',
        timeAgo: '6 hrs ago',
        analysis: 'Technical complexity exceeds L1 capabilities. Multiple failed resolution attempts.',
        severity: 'medium',
        priority: 'MEDIUM'
      },
      {
        id: 'TF-2024-001540',
        type: 'ai',
        title: 'Email delivery delays',
        client: 'Healthcare Partners',
        engineer: 'Alex Rodriguez (Network)',
        timeAgo: '3 hrs ago',
        analysis: 'Pattern recognition suggests DNS propagation issues. Client communication becoming frustrated.',
        severity: 'medium',
        priority: 'MEDIUM'
      },
      {
        id: 'TF-2024-001545',
        type: 'human',
        title: 'Critical backup failure',
        client: 'Financial Services Corp',
        engineer: 'Marcus Thompson (L3)',
        requestedBy: 'Lisa Wang',
        timeAgo: '1 hr ago',
        analysis: 'Backup system offline for 48 hours. Compliance violation imminent.',
        severity: 'critical',
        priority: 'CRITICAL'
      }
    ];

    const filteredEscalations = escalations.filter(escalation => {
      if (filterType === 'all') return true;
      if (filterType === 'ai') return escalation.type === 'ai';
      if (filterType === 'human') return escalation.type === 'human';
      if (filterType === 'critical') return escalation.severity === 'critical';
      return true;
    });

    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case 'critical': return { bg: '#fee2e2', color: '#dc2626', border: '#fca5a5' };
        case 'high': return { bg: '#fed7aa', color: '#ea580c', border: '#fdba74' };
        case 'medium': return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' };
        default: return { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' };
      }
    };

    const escalateTicket = (escalationId: string, type: string) => {
      setSelectedEscalation(escalationId);
      setEscalationType(type);
      setShowEscalateModal(true);
    };

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' as const, gap: '16px' }}>
          <h1 style={styles.pageTitle}>Escalations</h1>
          <button 
            style={{...styles.btn, ...styles.btnPrimary}}
            onClick={() => setShowCreateModal(true)}
          >
            ➕ Create Manual Escalation
          </button>
        </div>
        
        {/* Filter Bar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap' as const
        }}>
          {[
            { id: 'all', label: 'All Escalations', count: escalations.length },
            { id: 'ai', label: 'AI Generated', count: escalations.filter(e => e.type === 'ai').length },
            { id: 'human', label: 'Human Requested', count: escalations.filter(e => e.type === 'human').length },
            { id: 'critical', label: 'Critical Only', count: escalations.filter(e => e.severity === 'critical').length }
          ].map(filter => (
            <button
              key={filter.id}
              style={{
                ...styles.filterButton,
                ...(filterType === filter.id ? styles.filterButtonActive : {})
              }}
              onClick={() => setFilterType(filter.id)}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>{escalations.filter(e => e.severity === 'critical').length}</div>
            <div style={styles.metricLabel}>Critical</div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>{escalations.filter(e => e.type === 'ai').length}</div>
            <div style={styles.metricLabel}>AI Generated</div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>{escalations.filter(e => e.type === 'human').length}</div>
            <div style={styles.metricLabel}>Human Requested</div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>
              {Math.round((escalations.filter(e => e.timeAgo.includes('min')).length / escalations.length) * 100)}%
            </div>
            <div style={styles.metricLabel}>Recent (&lt; 1hr)</div>
          </div>
        </div>

        {/* Escalations Grid */}
        <div style={styles.sectionCard}>
          <div style={styles.sectionHeader}>
            🚨 Active Escalations ({filteredEscalations.length})
          </div>
          <div style={styles.sectionContent}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: '20px'
            }}>
              {filteredEscalations.map(escalation => {
                const severityStyle = getSeverityColor(escalation.severity);
                
                return (
                  <div 
                    key={escalation.id}
                    style={{
                      ...styles.escalationItem,
                      border: `1px solid ${severityStyle.border}`,
                      background: escalation.severity === 'critical' ? '#1f1215' : '#1e293b'
                    }}
                  >
                    <div style={styles.escalationHeader}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' as const }}>
                        <strong style={{ color: '#e2e8f0' }}>#{escalation.id}</strong>
                        <span style={{
                          ...styles.badge,
                          background: severityStyle.bg,
                          color: severityStyle.color
                        }}>
                          {escalation.priority}
                        </span>
                        <span style={{
                          ...styles.badge,
                          ...(escalation.type === 'ai' ? styles.badgeAi : styles.badgeHuman)
                        }}>
                          {escalation.type === 'ai' ? '🤖 AI' : '👤 Human'}
                        </span>
                      </div>
                      <div style={styles.timeStamp}>{escalation.timeAgo}</div>
                    </div>
                    
                    <div style={{
                      ...styles.escalationTitle,
                      color: escalation.severity === 'critical' ? '#fca5a5' : '#e2e8f0'
                    }}>
                      {escalation.title}
                    </div>
                    
                    <div style={styles.escalationMeta}>
                      <strong>Client:</strong> {escalation.client}<br/>
                      <strong>Engineer:</strong> {escalation.engineer}<br/>
                      {escalation.requestedBy && (
                        <>
                          <strong>Requested by:</strong> {escalation.requestedBy}<br/>
                        </>
                      )}
                    </div>
                    
                    <div style={styles.analysisBox}>
                      <div style={styles.analysisLabel}>
                        {escalation.type === 'ai' ? '🤖 AI Analysis:' : '👤 Manager Note:'}
                      </div>
                      <div style={styles.analysisText}>
                        {escalation.analysis}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                      <button 
                        style={{...styles.btn, ...styles.btnDanger, fontSize: '12px', padding: '8px 12px'}}
                        onClick={() => escalateTicket(escalation.id, 'executive')}
                      >
                        🚨 Executive Escalation
                      </button>
                      
                      <button 
                        style={{...styles.btn, ...styles.btnWarning, fontSize: '12px', padding: '8px 12px'}}
                        onClick={() => escalateTicket(escalation.id, 'standard')}
                      >
                        ⬆️ Standard Escalation
                      </button>
                      
                      <button 
                        style={{...styles.btn, fontSize: '12px', padding: '8px 12px'}}
                        onClick={() => console.log(`Viewing ticket ${escalation.id}`)}
                      >
                        📋 View Ticket
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Create Manual Escalation Modal */}
        {showCreateModal && (
          <div style={styles.configModalOverlay}>
            <div style={{
              ...styles.configContainer,
              maxWidth: '600px',
              maxHeight: '80vh'
            }}>
              <div style={styles.configHeader}>
                <h2 style={styles.configTitle}>Create Manual Escalation</h2>
                <button 
                  style={styles.configClose} 
                  onClick={() => setShowCreateModal(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '600' }}>
                    Ticket ID
                  </label>
                  <input 
                    type="text" 
                    placeholder="TF-2024-001234"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#334155',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                      fontSize: '14px'
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '600' }}>
                    Escalation Reason
                  </label>
                  <textarea 
                    placeholder="Describe why this ticket needs escalation..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#334155',
                      border: '1px solid #475569',
                      borderRadius: '8px',
                      color: '#e2e8f0',
                      fontSize: '14px',
                      resize: 'vertical' as const
                    }}
                  />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#e2e8f0', marginBottom: '8px', fontWeight: '600' }}>
                    Escalation Type
                  </label>
                  <select style={{
                    width: '100%',
                    padding: '12px',
                    background: '#334155',
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#e2e8f0',
                    fontSize: '14px'
                  }}>
                    <option>Technical Complexity</option>
                    <option>Client Escalation</option>
                    <option>SLA Breach</option>
                    <option>Resource Needed</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button 
                    style={{...styles.btn}}
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    style={{...styles.btn, ...styles.btnPrimary}}
                    onClick={() => {
                      setShowCreateModal(false);
                    }}
                  >
                    Create Escalation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderPerformancePage = () => {
    const engineers = [
      {
        id: 'marcus',
        name: 'Marcus Thompson',
        level: 'L3',
        title: 'Senior Technician',
        avatar: '👨‍💻',
        overallScore: 9.2,
        metrics: {
          ticketsResolved: 47,
          avgResolution: 1.8,
          firstCallResolution: 89,
          clientSat: 4.9,
          escalationRate: 3,
          slaCompliance: 98
        },
        specializations: ['macOS Expert', 'Apple Certified', 'VMware'],
        trends: {
          ticketsResolved: 12,
          avgResolution: -0.3,
          clientSat: 0.2
        },
        recentTickets: [
          { id: 'TF-001', priority: 'HIGH', resolved: true, satisfaction: 5 },
          { id: 'TF-002', priority: 'MEDIUM', resolved: true, satisfaction: 5 },
          { id: 'TF-003', priority: 'LOW', resolved: true, satisfaction: 4 }
        ]
      },
      {
        id: 'alex',
        name: 'Alex Rodriguez',
        level: 'Network',
        title: 'Network Specialist',
        avatar: '🌐',
        overallScore: 9.5,
        metrics: {
          ticketsResolved: 52,
          avgResolution: 1.6,
          firstCallResolution: 94,
          clientSat: 4.8,
          escalationRate: 2,
          slaCompliance: 99
        },
        specializations: ['Cisco Certified', 'Firewall Config', 'VPN'],
        trends: {
          ticketsResolved: 8,
          avgResolution: -0.2,
          clientSat: 0.1
        },
        recentTickets: [
          { id: 'TF-004', priority: 'CRITICAL', resolved: true, satisfaction: 5 },
          { id: 'TF-005', priority: 'HIGH', resolved: true, satisfaction: 5 },
          { id: 'TF-006', priority: 'MEDIUM', resolved: true, satisfaction: 4 }
        ]
      },
      {
        id: 'sarah',
        name: 'Sarah Chen',
        level: 'L2',
        title: 'Systems Engineer',
        avatar: '👩‍💼',
        overallScore: 8.4,
        metrics: {
          ticketsResolved: 39,
          avgResolution: 2.3,
          firstCallResolution: 82,
          clientSat: 4.6,
          escalationRate: 6,
          slaCompliance: 94
        },
        specializations: ['Exchange Expert', 'Email Systems', 'Windows Server'],
        trends: {
          ticketsResolved: 5,
          avgResolution: 0.1,
          clientSat: -0.1
        },
        recentTickets: [
          { id: 'TF-007', priority: 'HIGH', resolved: true, satisfaction: 4 },
          { id: 'TF-008', priority: 'MEDIUM', resolved: false, satisfaction: 0 },
          { id: 'TF-009', priority: 'LOW', resolved: true, satisfaction: 5 }
        ]
      },
      {
        id: 'jenny',
        name: 'Jenny Williams',
        level: 'L1',
        title: 'Junior Technician',
        avatar: '👩‍🎓',
        overallScore: 8.1,
        metrics: {
          ticketsResolved: 68,
          avgResolution: 1.2,
          firstCallResolution: 85,
          clientSat: 4.6,
          escalationRate: 12,
          slaCompliance: 96
        },
        specializations: ['Password Resets', 'Basic Support', 'Office 365'],
        trends: {
          ticketsResolved: 15,
          avgResolution: -0.1,
          clientSat: 0.3
        },
        recentTickets: [
          { id: 'TF-010', priority: 'LOW', resolved: true, satisfaction: 5 },
          { id: 'TF-011', priority: 'LOW', resolved: true, satisfaction: 4 },
          { id: 'TF-012', priority: 'MEDIUM', resolved: true, satisfaction: 5 }
        ]
      },
      {
        id: 'mike',
        name: 'Mike Johnson',
        level: 'L1',
        title: 'Junior Technician',
        avatar: '👨‍🎓',
        overallScore: 6.4,
        metrics: {
          ticketsResolved: 31,
          avgResolution: 3.1,
          firstCallResolution: 58,
          clientSat: 3.7,
          escalationRate: 22,
          slaCompliance: 87
        },
        specializations: ['Desktop Support', 'Software Installation'],
        trends: {
          ticketsResolved: -3,
          avgResolution: 0.2,
          clientSat: -0.2
        },
        recentTickets: [
          { id: 'TF-013', priority: 'MEDIUM', resolved: false, satisfaction: 0 },
          { id: 'TF-014', priority: 'LOW', resolved: true, satisfaction: 3 },
          { id: 'TF-015', priority: 'LOW', resolved: true, satisfaction: 4 }
        ]
      }
    ];

    const filteredEngineers = engineers.filter(engineer => {
      if (selectedLevel === 'all') return true;
      if (selectedLevel === 'l1') return engineer.level === 'L1';
      if (selectedLevel === 'l2') return engineer.level === 'L2';
      if (selectedLevel === 'l3') return engineer.level === 'L3';
      if (selectedLevel === 'specialist') return engineer.level === 'Network';
      return true;
    });

    const getScoreColor = (score: number) => {
      if (score >= 9) return { bg: '#dcfce7', color: '#16a34a', label: 'Excellent' };
      if (score >= 8) return { bg: '#fef3c7', color: '#d97706', label: 'Good' };
      if (score >= 7) return { bg: '#fed7aa', color: '#ea580c', label: 'Improving' };
      return { bg: '#fee2e2', color: '#dc2626', label: 'Needs Support' };
    };

    const getTrendIcon = (value: number) => {
      if (value > 0) return { icon: '📈', color: '#10b981', text: `+${value}` };
      if (value < 0) return { icon: '📉', color: '#dc2626', text: `${value}` };
      return { icon: '➡️', color: '#6b7280', text: '0' };
    };

    const teamStats = {
      totalTickets: engineers.reduce((sum, eng) => sum + eng.metrics.ticketsResolved, 0),
      avgResolution: engineers.reduce((sum, eng) => sum + eng.metrics.avgResolution, 0) / engineers.length,
      avgSat: engineers.reduce((sum, eng) => sum + eng.metrics.clientSat, 0) / engineers.length,
      avgSLA: engineers.reduce((sum, eng) => sum + eng.metrics.slaCompliance, 0) / engineers.length
    };

    return (
      <div>
        <h1 style={styles.pageTitle}>Performance Analytics</h1>
        
        {/* Filter Bar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap' as const
        }}>
          <select 
            style={styles.filterSelect}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <select 
            style={styles.filterSelect}
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="all">All Engineers</option>
            <option value="l1">Level 1</option>
            <option value="l2">Level 2</option>
            <option value="l3">Level 3</option>
            <option value="specialist">Specialists</option>
          </select>
          
          <select 
            style={styles.filterSelect}
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <option value="overall">Overall Performance</option>
            <option value="resolution">Resolution Time</option>
            <option value="satisfaction">Client Satisfaction</option>
            <option value="sla">SLA Compliance</option>
          </select>
        </div>

        {/* Team Overview */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>{teamStats.totalTickets}</div>
            <div style={styles.metricLabel}>Total Resolved</div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>{teamStats.avgResolution.toFixed(1)}h</div>
            <div style={styles.metricLabel}>Avg Resolution</div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>{teamStats.avgSat.toFixed(1)}/5</div>
            <div style={styles.metricLabel}>Team CSAT</div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>{teamStats.avgSLA.toFixed(0)}%</div>
            <div style={styles.metricLabel}>SLA Compliance</div>
          </div>
        </div>

        {/* Performance Cards Grid */}
        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
        }}>
          {filteredEngineers.map(engineer => {
            const scoreStyle = getScoreColor(engineer.overallScore);
            
            return (
              <div key={engineer.id} style={styles.performanceCard}>
                {/* Header */}
                <div style={styles.performanceHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ fontSize: '32px' }}>{engineer.avatar}</div>
                    <div>
                      <div style={styles.engineerName}>{engineer.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                        {engineer.title} ({engineer.level})
                      </div>
                    </div>
                  </div>
                  <div style={{
                    ...styles.performanceScore,
                    background: scoreStyle.bg,
                    color: scoreStyle.color
                  }}>
                    {engineer.overallScore}
                  </div>
                </div>

                {/* Performance Badge */}
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: scoreStyle.bg,
                  color: scoreStyle.color,
                  marginBottom: '16px'
                }}>
                  {scoreStyle.label} Performance
                </div>

                {/* Key Metrics */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px', fontWeight: '600' }}>
                    KEY METRICS
                  </div>
                  
                  <div style={styles.metricRow}>
                    <span>Tickets Resolved</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#e2e8f0' }}>{engineer.metrics.ticketsResolved}</span>
                      <span style={{ 
                        fontSize: '10px', 
                        color: getTrendIcon(engineer.trends.ticketsResolved).color 
                      }}>
                        {getTrendIcon(engineer.trends.ticketsResolved).icon} {getTrendIcon(engineer.trends.ticketsResolved).text}
                      </span>
                    </div>
                  </div>
                  
                  <div style={styles.metricRow}>
                    <span>Avg Resolution</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#e2e8f0' }}>{engineer.metrics.avgResolution}h</span>
                      <span style={{ 
                        fontSize: '10px', 
                        color: getTrendIcon(-engineer.trends.avgResolution).color 
                      }}>
                        {getTrendIcon(-engineer.trends.avgResolution).icon} {getTrendIcon(-engineer.trends.avgResolution).text}h
                      </span>
                    </div>
                  </div>
                  
                  <div style={styles.metricRow}>
                    <span>First Call Resolution</span>
                    <span style={{ color: engineer.metrics.firstCallResolution >= 85 ? '#10b981' : '#f59e0b' }}>
                      {engineer.metrics.firstCallResolution}%
                    </span>
                  </div>
                  
                  <div style={styles.metricRow}>
                    <span>Client Satisfaction</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: engineer.metrics.clientSat >= 4.5 ? '#10b981' : '#f59e0b' }}>
                        {engineer.metrics.clientSat}/5
                      </span>
                      <span style={{ 
                        fontSize: '10px', 
                        color: getTrendIcon(engineer.trends.clientSat * 10).color 
                      }}>
                        {getTrendIcon(engineer.trends.clientSat * 10).icon} {(engineer.trends.clientSat > 0 ? '+' : '')}{engineer.trends.clientSat}
                      </span>
                    </div>
                  </div>
                  
                  <div style={styles.metricRow}>
                    <span>SLA Compliance</span>
                    <span style={{ color: engineer.metrics.slaCompliance >= 95 ? '#10b981' : '#dc2626' }}>
                      {engineer.metrics.slaCompliance}%
                    </span>
                  </div>
                  
                  <div style={{ ...styles.metricRow, borderBottom: 'none' }}>
                    <span>Escalation Rate</span>
                    <span style={{ color: engineer.metrics.escalationRate <= 10 ? '#10b981' : '#f59e0b' }}>
                      {engineer.metrics.escalationRate}%
                    </span>
                  </div>
                </div>

                {/* Specializations */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}>
                    SPECIALIZATIONS
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' as const }}>
                    {engineer.specializations.map((spec, index) => (
                      <span key={index} style={{
                        ...styles.skillTag,
                        background: '#1e293b',
                        color: '#3b82f6',
                        fontSize: '10px'
                      }}>
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}>
                    RECENT TICKETS
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {engineer.recentTickets.map((ticket, index) => (
                      <div key={index} style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: '600',
                        background: ticket.resolved 
                          ? (ticket.satisfaction >= 4 ? '#dcfce7' : '#fef3c7')
                          : '#fee2e2',
                        color: ticket.resolved 
                          ? (ticket.satisfaction >= 4 ? '#16a34a' : '#d97706')
                          : '#dc2626'
                      }}>
                        {ticket.resolved ? '✓' : '⚠'}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
                  <button 
                    style={{...styles.btn, ...styles.btnPrimary, fontSize: '12px', padding: '8px 12px'}}
                    onClick={() => console.log(`Viewing details for ${engineer.name}`)}
                  >
                    📊 View Details
                  </button>
                  
                  {engineer.overallScore < 7 && (
                    <button 
                      style={{...styles.btn, ...styles.btnWarning, fontSize: '12px', padding: '8px 12px'}}
                      onClick={() => console.log(`Development plan for ${engineer.name}`)}
                    >
                      📚 Development Plan
                    </button>
                  )}
                  
                  {engineer.overallScore >= 9 && (
                    <button 
                      style={{
                        ...styles.btn, 
                        background: '#7c3aed', 
                        borderColor: '#7c3aed', 
                        color: 'white',
                        fontSize: '12px', 
                        padding: '8px 12px'
                      }}
                      onClick={() => console.log(`Recognition for ${engineer.name}`)}
                    >
                      🏆 Recognition
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Insights */}
        <div style={{...styles.sectionCard, marginTop: '24px'}}>
          <div style={styles.sectionHeader}>🎯 Performance Insights</div>
          <div style={styles.sectionContent}>
            <div style={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}>
              <div style={styles.analysisBox}>
                <div style={styles.analysisLabel}>🏆 Top Performers</div>
                <div style={styles.analysisText}>
                  Alex Rodriguez leads with 9.5 overall score and 99% SLA compliance. 
                  Marcus Thompson excels in client satisfaction (4.9/5) with specialized macOS expertise.
                </div>
              </div>
              
              <div style={styles.analysisBox}>
                <div style={styles.analysisLabel}>⚠️ Areas for Improvement</div>
                <div style={styles.analysisText}>
                  Mike Johnson needs development support - 6.4 score with 22% escalation rate. 
                  Consider pairing with Marcus for mentorship on complex tickets.
                </div>
              </div>
              
              <div style={styles.analysisBox}>
                <div style={styles.analysisLabel}>📈 Team Trends</div>
                <div style={styles.analysisText}>
                  Overall ticket volume up 12% this month. Resolution times improving across L2/L3 levels. 
                  Jenny Williams showing strong improvement in client satisfaction (+0.3).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderReportsPage = () => {
    const clients = [
      {
        id: 'megacorp',
        name: 'MegaCorp Industries',
        segment: 'Enterprise',
        cbrScore: 8.2,
        contractValue: '$250k/year',
        relationship: 'Strategic',
        metrics: {
          ticketsResolved: 142,
          avgResolution: 2.1,
          slaCompliance: 96.8,
          clientSat: 4.1,
          escalations: 3,
          budgetHours: 85,
          actualHours: 78
        },
        trends: {
          ticketsResolved: 12,
          avgResolution: -0.3,
          clientSat: 0.2,
          slaCompliance: 1.2
        },
        executiveSummary: 'Strong performance with improved resolution times. Network infrastructure refresh completed successfully. Minor satisfaction dip due to migration complexity - addressed with additional training.',
        nextQbrDate: '2024-02-15',
        healthStatus: 'good'
      },
      {
        id: 'techstart',
        name: 'TechStart Solutions',
        segment: 'Mid-Market',
        cbrScore: 6.1,
        contractValue: '$125k/year',
        relationship: 'Transactional',
        metrics: {
          ticketsResolved: 89,
          avgResolution: 4.2,
          slaCompliance: 78.3,
          clientSat: 3.2,
          escalations: 12,
          budgetHours: 60,
          actualHours: 67
        },
        trends: {
          ticketsResolved: -15,
          avgResolution: 1.1,
          clientSat: -0.3,
          slaCompliance: -5.2
        },
        executiveSummary: 'Performance declining due to complex technical issues and resource constraints. Multiple SLA breaches requiring immediate intervention. Client expressing frustration with resolution times.',
        nextQbrDate: '2024-01-20',
        healthStatus: 'critical'
      },
      {
        id: 'global',
        name: 'Global Manufacturing Corp',
        segment: 'Enterprise',
        cbrScore: 7.8,
        contractValue: '$180k/year',
        relationship: 'Partnership',
        metrics: {
          ticketsResolved: 156,
          avgResolution: 2.8,
          slaCompliance: 92.1,
          clientSat: 4.3,
          escalations: 6,
          budgetHours: 90,
          actualHours: 87
        },
        trends: {
          ticketsResolved: 8,
          avgResolution: -0.1,
          clientSat: 0.1,
          slaCompliance: 0.5
        },
        executiveSummary: 'Stable partnership with consistent service delivery. Manufacturing integration project delivered on time. Opportunity to expand into additional locations.',
        nextQbrDate: '2024-02-28',
        healthStatus: 'good'
      },
      {
        id: 'healthcare',
        name: 'Healthcare Partners',
        segment: 'Enterprise',
        cbrScore: 9.1,
        contractValue: '$320k/year',
        relationship: 'Strategic',
        metrics: {
          ticketsResolved: 198,
          avgResolution: 1.8,
          slaCompliance: 98.5,
          clientSat: 4.8,
          escalations: 2,
          budgetHours: 120,
          actualHours: 115
        },
        trends: {
          ticketsResolved: 18,
          avgResolution: -0.4,
          clientSat: 0.3,
          slaCompliance: 2.1
        },
        executiveSummary: 'Exceptional partnership with industry-leading performance. HIPAA compliance project exceeded expectations. Client advocates for our services within healthcare network.',
        nextQbrDate: '2024-03-10',
        healthStatus: 'excellent'
      },
      {
        id: 'financial',
        name: 'Financial Services Inc',
        segment: 'Mid-Market',
        cbrScore: 7.5,
        contractValue: '$95k/year',
        relationship: 'Partnership',
        metrics: {
          ticketsResolved: 67,
          avgResolution: 2.5,
          slaCompliance: 94.2,
          clientSat: 4.4,
          escalations: 4,
          budgetHours: 45,
          actualHours: 42
        },
        trends: {
          ticketsResolved: 5,
          avgResolution: -0.2,
          clientSat: 0.4,
          slaCompliance: 1.8
        },
        executiveSummary: 'Growing partnership with strong compliance focus. SOX project delivered successfully. Opportunity for expansion into trading platform modernization.',
        nextQbrDate: '2024-02-05',
        healthStatus: 'good'
      }
    ];

    const filteredClients = clients
      .filter(client => {
        if (selectedSegment === 'all') return true;
        if (selectedSegment === 'enterprise') return client.segment === 'Enterprise';
        if (selectedSegment === 'mid-market') return client.segment === 'Mid-Market';
        // Individual client selection
        if (selectedSegment === 'megacorp') return client.id === 'megacorp';
        if (selectedSegment === 'techstart') return client.id === 'techstart';
        if (selectedSegment === 'global') return client.id === 'global';
        if (selectedSegment === 'healthcare') return client.id === 'healthcare';
        if (selectedSegment === 'financial') return client.id === 'financial';
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'cbr') return b.cbrScore - a.cbrScore;
        if (sortBy === 'contract') return parseInt(b.contractValue.replace(/[^\d]/g, '')) - parseInt(a.contractValue.replace(/[^\d]/g, ''));
        if (sortBy === 'satisfaction') return b.metrics.clientSat - a.metrics.clientSat;
        if (sortBy === 'tickets') return b.metrics.ticketsResolved - a.metrics.ticketsResolved;
        return a.name.localeCompare(b.name);
      });

    const getCbrColor = (score: number) => {
      if (score >= 9) return { bg: '#dcfce7', color: '#16a34a', label: 'Excellent' };
      if (score >= 8) return { bg: '#fef3c7', color: '#d97706', label: 'Good' };
      if (score >= 7) return { bg: '#fed7aa', color: '#ea580c', label: 'Fair' };
      return { bg: '#fee2e2', color: '#dc2626', label: 'Poor' };
    };

    const getHealthIcon = (status: string) => {
      switch (status) {
        case 'excellent': return '🌟';
        case 'good': return '✅';
        case 'fair': return '⚠️';
        case 'critical': return '🚨';
        default: return '📊';
      }
    };

    const getTrendIcon = (value: number) => {
      if (value > 0) return { icon: '📈', color: '#10b981', text: `+${value}` };
      if (value < 0) return { icon: '📉', color: '#dc2626', text: `${value}` };
      return { icon: '➡️', color: '#6b7280', text: '0' };
    };

    return (
      <div>
        <h1 style={styles.pageTitle}>Client Reports</h1>
        
        {/* Filter Bar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap' as const
        }}>
          <select 
            style={styles.filterSelect}
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <select 
            style={styles.filterSelect}
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
          >
            <option value="all">All Clients</option>
            <option value="enterprise">Enterprise</option>
            <option value="mid-market">Mid-Market</option>
            <option value="megacorp">MegaCorp Industries</option>
            <option value="techstart">TechStart Solutions</option>
            <option value="global">Global Manufacturing Corp</option>
            <option value="healthcare">Healthcare Partners</option>
            <option value="financial">Financial Services Inc</option>
          </select>
          
          <select 
            style={styles.filterSelect}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="cbr">CBR Score</option>
            <option value="contract">Contract Value</option>
            <option value="satisfaction">Satisfaction</option>
            <option value="tickets">Ticket Volume</option>
          </select>
        </div>

        {/* Summary Stats */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>{clients.length}</div>
            <div style={styles.metricLabel}>Active Clients</div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>
              {(clients.reduce((sum, c) => sum + c.cbrScore, 0) / clients.length).toFixed(1)}
            </div>
            <div style={styles.metricLabel}>Avg CBR Score</div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>
              ${(clients.reduce((sum, c) => sum + parseInt(c.contractValue.replace(/[^\d]/g, '')), 0) / 1000).toFixed(0)}k
            </div>
            <div style={styles.metricLabel}>Total ARR</div>
          </div>
          <div style={styles.metricCard}>
            <div style={styles.metricValue}>
              {clients.filter(c => c.healthStatus === 'critical').length}
            </div>
            <div style={styles.metricLabel}>At Risk</div>
          </div>
        </div>

        {/* Client Cards Grid */}
        <div style={{
          display: 'grid',
          gap: '24px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))'
        }}>
          {filteredClients.map(client => {
            const cbrStyle = getCbrColor(client.cbrScore);
            
            return (
              <div key={client.id} style={{
                ...styles.performanceCard,
                border: client.healthStatus === 'critical' ? '2px solid #dc2626' : '1px solid #334155'
              }}>
                {/* Header */}
                <div style={styles.performanceHeader}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}>
                      <span style={{ fontSize: '20px' }}>{getHealthIcon(client.healthStatus)}</span>
                      <div style={styles.engineerName}>{client.name}</div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                      {client.segment} • {client.relationship} • {client.contractValue}
                    </div>
                  </div>
                  <div style={{
                    ...styles.performanceScore,
                    background: cbrStyle.bg,
                    color: cbrStyle.color
                  }}>
                    {client.cbrScore}
                  </div>
                </div>

                {/* CBR Badge */}
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: cbrStyle.bg,
                  color: cbrStyle.color,
                  marginBottom: '16px'
                }}>
                  {cbrStyle.label} CBR Score
                </div>

                {/* Key Metrics */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px', fontWeight: '600' }}>
                    KEY PERFORMANCE METRICS
                  </div>
                  
                  <div style={styles.metricRow}>
                    <span>Tickets Resolved</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#e2e8f0' }}>{client.metrics.ticketsResolved}</span>
                      <span style={{ 
                        fontSize: '10px', 
                        color: getTrendIcon(client.trends.ticketsResolved).color 
                      }}>
                        {getTrendIcon(client.trends.ticketsResolved).icon} {getTrendIcon(client.trends.ticketsResolved).text}
                      </span>
                    </div>
                  </div>
                  
                  <div style={styles.metricRow}>
                    <span>Client Satisfaction</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: client.metrics.clientSat >= 4.0 ? '#10b981' : '#dc2626' }}>
                        {client.metrics.clientSat}/5
                      </span>
                      <span style={{ 
                        fontSize: '10px', 
                        color: getTrendIcon(client.trends.clientSat * 10).color 
                      }}>
                        {getTrendIcon(client.trends.clientSat * 10).icon} {client.trends.clientSat > 0 ? '+' : ''}{client.trends.clientSat}
                      </span>
                    </div>
                  </div>
                  
                  <div style={styles.metricRow}>
                    <span>Budget vs Actual Hours</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: client.metrics.actualHours <= client.metrics.budgetHours ? '#10b981' : '#dc2626' }}>
                        {client.metrics.actualHours}h / {client.metrics.budgetHours}h
                      </span>
                      <span style={{ 
                        fontSize: '10px', 
                        color: client.metrics.actualHours <= client.metrics.budgetHours ? '#10b981' : '#dc2626'
                      }}>
                        ({Math.round((client.metrics.actualHours / client.metrics.budgetHours) * 100)}%)
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ ...styles.metricRow, borderBottom: 'none' }}>
                    <span>Escalations</span>
                    <span style={{ color: client.metrics.escalations <= 5 ? '#10b981' : '#dc2626' }}>
                      {client.metrics.escalations}
                    </span>
                  </div>
                </div>

                {/* Executive Summary */}
                <div style={styles.analysisBox}>
                  <div style={styles.analysisLabel}>📋 EXECUTIVE SUMMARY</div>
                  <div style={styles.analysisText}>
                    {client.executiveSummary}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const, marginTop: '16px' }}>
                  <button 
                    style={{...styles.btn, ...styles.btnPrimary, fontSize: '12px', padding: '8px 12px'}}
                    onClick={() => console.log(`Generating full report for ${client.name}`)}
                  >
                    📊 Full Report
                  </button>
                  
                  {client.healthStatus === 'critical' && (
                    <button 
                      style={{...styles.btn, ...styles.btnDanger, fontSize: '12px', padding: '8px 12px'}}
                      onClick={() => console.log(`Action required for ${client.name}`)}
                    >
                      🚨 Action Required
                    </button>
                  )}
                </div>

                {/* Next QBR Date */}
                <div style={{
                  marginTop: '12px',
                  padding: '8px',
                  background: '#0f172a',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: '#94a3b8'
                }}>
                  <strong>Next QBR:</strong> {client.nextQbrDate}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderPlaceholderPage = (title: string) => (
    <div>
      <h1 style={styles.pageTitle}>{title}</h1>
      <div style={{
        textAlign: 'center' as const,
        padding: '40px 20px',
        color: '#94a3b8',
        fontSize: '16px',
        border: '2px dashed #334155',
        borderRadius: '12px'
      }}>
        <div style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}>🚧</div>
        <div>{title} page coming soon...</div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch(activePage) {
      case 'dashboard':
        return renderDashboard();
      case 'assignments':
        return renderAssignmentPage();
      case 'escalations':
        return renderEscalationsPage();
      case 'reports':
        return renderReportsPage();
      case 'performance':
        return renderPerformancePage();
      case 'finance':
        return renderPlaceholderPage('Finance');
      default:
        return renderDashboard();
    }
  };

  // Group nav items by section
  const navSections = navItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <button 
            style={styles.menuToggle} 
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div style={styles.logo}>TechFlow MSP</div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userInfo}>David Kim - Manager</div>
          <button style={styles.configBtn} onClick={openConfig}>
            <Settings size={16} />
            <span style={{display: window.innerWidth > 480 ? 'block' : 'none'}}>Settings</span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div 
        style={{
          ...styles.overlay,
          ...(sidebarOpen ? styles.overlayShow : {})
        }}
        onClick={closeSidebar}
      />

      <div style={styles.mainContent}>
        {/* Sidebar */}
        <nav style={{
          ...styles.sidebar,
          ...(sidebarOpen ? styles.sidebarOpen : {})
        }}>
          <div style={styles.sidebarHeader}>
            <div style={styles.sidebarTitle}>Team Dashboard</div>
          </div>
          
          {Object.entries(navSections).map(([sectionName, items]) => (
            <div key={sectionName} style={styles.navSection}>
              <div style={styles.navSectionTitle}>{sectionName}</div>
              {items.map(item => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={item.id}
                    style={{
                      ...styles.navItem,
                      ...(activePage === item.id ? styles.navItemActive : {})
                    }}
                    onClick={() => showPage(item.id)}
                  >
                    <IconComponent size={20} />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </nav>
        
        {/* Main Content */}
        <main style={styles.contentArea}>
          {renderCurrentPage()}
        </main>
      </div>
      
      {/* Bottom Navigation (Mobile) */}
      <nav style={styles.bottomNav}>
        {navItems.slice(0, 5).map(item => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.id}
              style={{
                ...styles.bottomNavItem,
                ...(activePage === item.id ? styles.bottomNavItemActive : {})
              }}
              onClick={() => showPage(item.id)}
            >
              <div style={styles.bottomNavIcon}>
                <IconComponent size={20} />
              </div>
              <div style={styles.bottomNavLabel}>
                {item.id === 'assignments' ? 'Assign' : 
                 item.id === 'escalations' ? 'Escalate' : 
                 item.id === 'reports' ? 'Reports' : 
                 item.id === 'performance' ? 'Team' : 
                 item.label}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Configuration Modal */}
      {configModalOpen && (
        <div style={styles.configModalOverlay}>
          <div style={styles.configContainer}>
            <div style={styles.configHeader}>
              <h2 style={styles.configTitle}>System Configuration</h2>
              <button style={styles.configClose} onClick={closeConfig}>
                <X size={24} />
              </button>
            </div>
            <div style={{
              padding: '40px',
              textAlign: 'center' as const,
              color: '#94a3b8'
            }}>
              <div style={{fontSize: '48px', marginBottom: '16px'}}>⚙️</div>
              <div>Configuration system coming soon...</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerApp;