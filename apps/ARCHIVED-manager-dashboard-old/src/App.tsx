import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Target, 
  AlertTriangle, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  CheckCircle,
  Clock,
  TrendingUp,
  Brain,
  User,
  Zap,
  Star,
  MessageSquare,
  ArrowRight,
  Activity
} from 'lucide-react';

// Enhanced styles using the design system
const styles = {
  // Core Layout
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  
  // Header Component
  header: {
    backgroundColor: '#1e293b',
    padding: '16px 24px',
    borderBottom: '1px solid #334155',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
  },
  
  logo: {
    fontSize: '19px',
    fontWeight: '700',
    color: '#e2e8f0'
  },
  
  userInfo: {
    fontSize: '15px',
    color: '#cbd5e1',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  
  // Sidebar Navigation
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '280px',
    height: '100vh',
    backgroundColor: '#1e293b',
    borderRight: '1px solid #334155',
    padding: '24px',
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    zIndex: 200,
    boxShadow: '4px 0 20px rgba(0, 0, 0, 0.3)',
    overflowY: 'auto'
  },
  
  sidebarOpen: {
    transform: 'translateX(0)'
  },
  
  sidebarHeader: {
    padding: '20px 0',
    borderBottom: '1px solid #334155',
    marginBottom: '24px'
  },
  
  sidebarTitle: {
    fontSize: '17px',
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
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '0.05em'
  },
  
  navItem: {
    padding: '16px',
    marginBottom: '8px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#cbd5e1',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '15px',
    fontWeight: '500',
    position: 'relative',
    overflow: 'hidden'
  },
  
  navItemActive: {
    backgroundColor: '#3b82f6',
    color: 'white',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
    fontWeight: '600'
  },
  
  navItemHover: {
    backgroundColor: '#334155',
    color: '#ffffff',
    transform: 'translateX(4px)'
  },
  
  // Main Content
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '0',
    transition: 'margin-left 0.3s ease'
  },
  
  mainContentShifted: {
    marginLeft: '280px'
  },
  
  contentArea: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto',
    backgroundColor: '#0f172a'
  },
  
  // Typography
  pageTitle: {
    fontSize: '25px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#e2e8f0'
  },
  
  sectionTitle: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  
  // Card Components
  card: {
    backgroundColor: '#1e293b',
    borderRadius: '16px',
    border: '1px solid #334155',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    marginBottom: '24px'
  },
  
  cardHover: {
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
    transform: 'translateY(-2px)'
  },
  
  cardHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #334155',
    background: 'linear-gradient(135deg, #1e293b, #334155)',
    fontSize: '16px',
    fontWeight: '600',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center'
  },
  
  cardContent: {
    padding: '24px'
  },
  
  // Metric Cards
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  
  metricCard: {
    background: 'linear-gradient(145deg, #1e293b, #334155)',
    border: '1px solid #475569',
    borderRadius: '16px',
    padding: '20px 16px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  
  metricCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    borderColor: '#64748b'
  },
  
  metricValue: {
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, #e2e8f0, #94a3b8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  
  metricLabel: {
    fontSize: '11px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '0.5px'
  },
  
  // Engineer Cards
  engineerGrid: {
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))'
  },
  
  engineerCard: {
    background: 'linear-gradient(145deg, #334155, #475569)',
    border: '1px solid #64748b',
    borderRadius: '12px',
    padding: '20px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  },
  
  engineerCardHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    borderColor: '#94a3b8'
  },
  
  engineerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px'
  },
  
  engineerPhoto: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3b82f6, #10b981)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    color: 'white',
    fontSize: '18px',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    marginRight: '16px'
  },
  
  engineerInfo: {
    flex: 1
  },
  
  engineerName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '4px'
  },
  
  engineerTitle: {
    fontSize: '14px',
    color: '#94a3b8',
    marginBottom: '8px'
  },
  
  // Status Badges
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  
  statusAvailable: {
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))',
    color: '#86efac',
    border: '1px solid rgba(34, 197, 94, 0.3)'
  },
  
  statusModerate: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1))',
    color: '#fde047',
    border: '1px solid rgba(251, 191, 36, 0.3)'
  },
  
  statusBusy: {
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
    color: '#fca5a5',
    border: '1px solid rgba(239, 68, 68, 0.3)'
  },
  
  // Buttons
  btn: {
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden'
  },
  
  btnPrimary: {
    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    color: '#ffffff',
    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
    border: '1px solid #1d4ed8'
  },
  
  btnPrimaryHover: {
    background: 'linear-gradient(135deg, #1d4ed8, #1e40af)',
    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
    transform: 'translateY(-2px)'
  },
  
  btnSecondary: {
    backgroundColor: '#475569',
    color: '#ffffff',
    border: '1px solid #64748b',
    fontWeight: '600'
  },
  
  btnSecondaryHover: {
    backgroundColor: '#64748b',
    borderColor: '#94a3b8',
    color: '#ffffff'
  },
  
  btnDanger: {
    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
  },
  
  btnDangerHover: {
    background: 'linear-gradient(135deg, #b91c1c, #991b1b)',
    transform: 'translateY(-2px)'
  },
  
  // Escalation Items
  escalationItem: {
    background: 'linear-gradient(145deg, #334155, #475569)',
    border: '1px solid #64748b',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    borderLeft: '4px solid #dc2626'
  },
  
  escalationItemHover: {
    transform: 'translateX(4px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
  },
  
  escalationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '8px'
  },
  
  escalationTitle: {
    fontWeight: '600',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#e2e8f0'
  },
  
  escalationMeta: {
    color: '#cbd5e1',
    fontSize: '13px',
    lineHeight: 1.4,
    marginBottom: '12px'
  },
  
  // Analysis Box
  analysisBox: {
    background: 'linear-gradient(145deg, #475569, #64748b)',
    borderRadius: '8px',
    padding: '16px',
    margin: '12px 0',
    borderLeft: '4px solid #fcd34d'
  },
  
  analysisLabel: {
    color: '#fcd34d',
    fontWeight: '600',
    marginBottom: '6px',
    fontSize: '12px'
  },
  
  analysisText: {
    fontSize: '13px',
    color: '#e2e8f0',
    lineHeight: 1.4
  },
  
  // Priority Badges
  priorityBadge: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  
  priorityHigh: {
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
    color: '#fca5a5',
    border: '1px solid rgba(239, 68, 68, 0.3)'
  },
  
  priorityMedium: {
    background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1))',
    color: '#fde047',
    border: '1px solid rgba(251, 191, 36, 0.3)'
  },
  
  priorityLow: {
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1))',
    color: '#86efac',
    border: '1px solid rgba(34, 197, 94, 0.3)'
  },
  
  // Ticket Grid
  ticketGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px',
    height: 'calc(100vh - 200px)'
  },
  
  ticketList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    overflowY: 'auto',
    paddingRight: '8px'
  },
  
  ticketItem: {
    padding: '16px',
    backgroundColor: '#334155',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderLeft: '4px solid transparent',
    border: '1px solid #475569'
  },
  
  ticketSelected: {
    borderLeftColor: '#3b82f6',
    backgroundColor: '#1e40af',
    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
  },
  
  ticketItemHover: {
    backgroundColor: '#475569',
    borderColor: '#64748b',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  
  // Overlays
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 150,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.3s ease'
  },
  
  overlayShow: {
    opacity: 1,
    pointerEvents: 'all'
  }
};

// Mock data for engineers
const engineers = [
  {
    id: 1,
    name: "Marcus Thompson",
    level: "L3",
    title: "Senior Technician",
    currentTickets: 5,
    maxTickets: 6,
    status: "moderate",
    skills: ["macOS", "Apple Certified", "VMware", "Hardware"],
    performance: {
      fcr: 89,
      avgResolution: 1.8,
      csat: 4.9,
      escalationRate: 3
    },
    specializations: ["Apple Certified", "VMware Expert"],
    photo: "MT"
  },
  {
    id: 2,
    name: "Alex Rodriguez",
    level: "Network",
    title: "Network Specialist",
    currentTickets: 4,
    maxTickets: 5,
    status: "available",
    skills: ["Cisco", "Firewall", "VPN", "Network"],
    performance: {
      fcr: 94,
      avgResolution: 1.6,
      csat: 4.8,
      escalationRate: 2
    },
    specializations: ["Cisco Certified", "Firewall Config"],
    photo: "AR"
  },
  {
    id: 3,
    name: "Sarah Chen",
    level: "L2",
    title: "Technician",
    currentTickets: 8,
    maxTickets: 8,
    status: "busy",
    skills: ["Exchange", "Email", "Windows Server", "Active Directory"],
    performance: {
      fcr: 78,
      avgResolution: 2.4,
      csat: 4.2,
      escalationRate: 8
    },
    specializations: ["Exchange Expert", "Email Systems"],
    photo: "SC"
  },
  {
    id: 4,
    name: "Jenny Williams",
    level: "L1",
    title: "Junior Technician",
    currentTickets: 3,
    maxTickets: 8,
    status: "available",
    skills: ["Password Reset", "Basic Support", "Office 365", "Desktop"],
    performance: {
      fcr: 85,
      avgResolution: 1.2,
      csat: 4.6,
      escalationRate: 12
    },
    specializations: ["Password Resets", "Office 365"],
    photo: "JW"
  },
  {
    id: 5,
    name: "Mike Johnson",
    level: "L1",
    title: "Junior Technician",
    currentTickets: 6,
    maxTickets: 8,
    status: "moderate",
    skills: ["Desktop Support", "Software Install", "Basic Network"],
    performance: {
      fcr: 58,
      avgResolution: 3.1,
      csat: 3.7,
      escalationRate: 18
    },
    specializations: ["Desktop Support"],
    photo: "MJ"
  }
];

// Mock data for new tickets
const newTickets = [
  {
    id: "TF-2024-001535",
    priority: "HIGH",
    title: "MacBook Pro won't boot - kernel panic on startup",
    client: "TechStart Solutions",
    requiredSkills: ["macOS", "Apple Certified", "Hardware"],
    complexity: "high",
    timeAgo: "5 min ago"
  },
  {
    id: "TF-2024-001536",
    priority: "LOW",
    title: "Password reset - user locked out of domain account",
    client: "MegaCorp Industries",
    requiredSkills: ["Password Reset", "Active Directory"],
    complexity: "low",
    timeAgo: "8 min ago"
  },
  {
    id: "TF-2024-001537",
    priority: "HIGH",
    title: "Cisco firewall blocking traffic - VPN tunnel down",
    client: "Global Manufacturing",
    requiredSkills: ["Cisco", "Firewall", "VPN"],
    complexity: "high",
    timeAgo: "12 min ago"
  },
  {
    id: "TF-2024-001538",
    priority: "MEDIUM",
    title: "Exchange mailbox database corruption detected",
    client: "Healthcare Partners",
    requiredSkills: ["Exchange", "Database", "Email"],
    complexity: "medium",
    timeAgo: "15 min ago"
  }
];

// Mock escalations data
const escalations = [
  {
    id: "TF-2024-001529",
    title: "Network connectivity issues",
    client: "MegaCorp Industries",
    engineer: "Mike Johnson (L1)",
    type: "ai",
    timeAgo: "2 hrs ago",
    analysis: {
      sentiment: "High client frustration detected",
      reason: "Business-critical system down affecting 50+ users",
      followUpCadence: "Multiple follow-ups in short timeframe",
      disruption: "High - entire office offline"
    }
  },
  {
    id: "TF-2024-001523",
    title: "Exchange server corruption",
    client: "TechStart Solutions",
    engineer: "Sarah Chen (L2)",
    requestedBy: "David Kim",
    type: "human",
    timeAgo: "45 min ago",
    analysis: {
      reason: "Database corruption beyond L2 capabilities. Need senior DBA involvement.",
      note: "Client is our largest contract - needs immediate attention"
    }
  }
];

const MSPManagerApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Calculate AI recommendations for ticket assignment
  const calculateRecommendations = (ticket) => {
    if (!ticket) return [];

    const scored = engineers.map(engineer => {
      // Skills matching (70% weight)
      const skillMatches = ticket.requiredSkills.filter((skill) => 
        engineer.skills.some(engineerSkill => 
          engineerSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(engineerSkill.toLowerCase())
        )
      ).length;
      const skillScore = (skillMatches / ticket.requiredSkills.length) * 70;

      // Performance history (20% weight)
      const performanceScore = (engineer.performance.fcr / 100) * 20;

      // Workload factor (10% weight) - inverted so lower workload = higher score
      const workloadFactor = ((engineer.maxTickets - engineer.currentTickets) / engineer.maxTickets) * 10;

      const totalScore = skillScore + performanceScore + workloadFactor;
      
      // Determine confidence level
      let confidence = Math.min(Math.round(totalScore), 99);
      let matchLevel = confidence >= 90 ? "excellent" : confidence >= 75 ? "good" : "fair";

      return {
        engineer,
        score: totalScore,
        confidence,
        matchLevel,
        skillMatches,
        reasons: generateReasons(engineer, ticket, skillMatches, workloadFactor)
      };
    }).sort((a, b) => b.score - a.score);

    return scored.slice(0, 3); // Top 3 recommendations
  };

  const generateReasons = (engineer, ticket, skillMatches, workloadFactor) => {
    const reasons = [];
    
    if (skillMatches > 0) {
      reasons.push(`✓ ${skillMatches}/${ticket.requiredSkills.length} required skills match`);
    }
    
    if (engineer.performance.fcr >= 85) {
      reasons.push(`✓ High first-call resolution (${engineer.performance.fcr}%)`);
    }
    
    if (engineer.currentTickets <= engineer.maxTickets * 0.6) {
      reasons.push(`✓ Available capacity (${engineer.currentTickets}/${engineer.maxTickets} tickets)`);
    } else if (engineer.currentTickets >= engineer.maxTickets * 0.9) {
      reasons.push(`⚠ Near capacity (${engineer.currentTickets}/${engineer.maxTickets} tickets)`);
    }
    
    if (engineer.performance.escalationRate <= 5) {
      reasons.push(`✓ Low escalation rate (${engineer.performance.escalationRate}%)`);
    }
    
    if (engineer.level === "L3" && ticket.priority === "HIGH") {
      reasons.push(`✓ Senior level for high priority issue`);
    }
    
    return reasons;
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
    const recs = calculateRecommendations(ticket);
    setRecommendations(recs);
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'available': return styles.statusAvailable;
      case 'moderate': return styles.statusModerate;
      case 'busy': return styles.statusBusy;
      default: return {};
    }
  };

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'HIGH': return styles.priorityHigh;
      case 'MEDIUM': return styles.priorityMedium;
      case 'LOW': return styles.priorityLow;
      default: return {};
    }
  };

  const Dashboard = () => (
    <div>
      <h2 style={styles.pageTitle}>Dashboard</h2>
      
      {/* Enhanced Metrics Grid */}
      <div style={styles.metricsGrid}>
        {[
          { label: 'Total Open', value: '47', color: '#e2e8f0' },
          { label: 'New Tickets', value: '12', color: '#60a5fa' },
          { label: 'Escalations', value: '3', color: '#f87171' },
          { label: 'Avg Resolution', value: '2.4h', color: '#4ade80' },
          { label: 'Team CSAT', value: '4.7', color: '#c084fc' }
        ].map((metric, idx) => (
          <div 
            key={idx} 
            style={{
              ...styles.metricCard,
              ...(hoveredCard === `metric-${idx}` ? styles.metricCardHover : {})
            }}
            onMouseEnter={() => setHoveredCard(`metric-${idx}`)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{...styles.metricValue, color: metric.color}}>{metric.value}</div>
            <div style={styles.metricLabel}>{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Enhanced Active Escalations */}
      <div style={{
        ...styles.card,
        ...(hoveredCard === 'escalations' ? styles.cardHover : {})
      }}
      onMouseEnter={() => setHoveredCard('escalations')}
      onMouseLeave={() => setHoveredCard(null)}>
        <div style={styles.cardHeader}>
          <AlertTriangle style={{marginRight: '8px', color: '#f87171'}} size={20} />
          Active Escalations
        </div>
        <div style={styles.cardContent}>
          {escalations.slice(0, 2).map((escalation, idx) => (
            <div 
              key={idx} 
              style={{
                ...styles.escalationItem,
                ...(hoveredCard === `escalation-${idx}` ? styles.escalationItemHover : {})
              }}
              onMouseEnter={() => setHoveredCard(`escalation-${idx}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.escalationHeader}>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px'}}>
                    <span style={{fontWeight: '600', color: '#e2e8f0'}}>#{escalation.id}</span>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      ...(escalation.type === 'ai' 
                        ? {backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe'} 
                        : {backgroundColor: 'rgba(251, 146, 60, 0.2)', color: '#fdba74'})
                    }}>
                      {escalation.type === 'ai' ? 'AI Generated' : 'Human Requested'}
                    </span>
                  </div>
                  <h4 style={styles.escalationTitle}>{escalation.title}</h4>
                  <p style={styles.escalationMeta}>
                    Client: {escalation.client}<br />
                    Engineer: {escalation.engineer}
                  </p>
                </div>
                <span style={{fontSize: '12px', color: '#94a3b8'}}>{escalation.timeAgo}</span>
              </div>
              
              <div style={styles.analysisBox}>
                <div style={styles.analysisLabel}>
                  {escalation.type === 'ai' ? '🤖 AI Analysis:' : '👤 Manager Note:'}
                </div>
                <p style={styles.analysisText}>
                  {escalation.analysis.reason || escalation.analysis.sentiment}
                </p>
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => setActiveTab('escalations')}
            style={{
              ...styles.btn,
              ...styles.btnPrimary,
              ...(hoveredButton === 'view-escalations' ? styles.btnPrimaryHover : {}),
              width: '100%',
              marginTop: '16px'
            }}
            onMouseEnter={() => setHoveredButton('view-escalations')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            View All Escalations
          </button>
        </div>
      </div>

      {/* Enhanced Engineer Status Grid */}
      <div style={{
        ...styles.card,
        ...(hoveredCard === 'engineers' ? styles.cardHover : {})
      }}
      onMouseEnter={() => setHoveredCard('engineers')}
      onMouseLeave={() => setHoveredCard(null)}>
        <div style={styles.cardHeader}>
          <Users style={{marginRight: '8px', color: '#60a5fa'}} size={20} />
          Engineer Status
        </div>
        <div style={styles.cardContent}>
          <div style={styles.engineerGrid}>
            {engineers.slice(0, 4).map((engineer, idx) => (
              <div 
                key={idx} 
                style={{
                  ...styles.engineerCard,
                  ...(hoveredCard === `engineer-${idx}` ? styles.engineerCardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(`engineer-${idx}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={styles.engineerHeader}>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={styles.engineerPhoto}>
                      {engineer.photo}
                    </div>
                    <div style={styles.engineerInfo}>
                      <div style={styles.engineerName}>{engineer.name}</div>
                      <div style={styles.engineerTitle}>{engineer.title} ({engineer.level})</div>
                    </div>
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    ...getStatusStyle(engineer.status)
                  }}>
                    {engineer.status}
                  </span>
                </div>
                
                <div style={{marginBottom: '16px'}}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0',
                    borderBottom: '1px solid #374151'
                  }}>
                    <span style={{fontSize: '12px', color: '#94a3b8', fontWeight: '600'}}>Open Tickets</span>
                    <span style={{fontSize: '13px', color: '#e2e8f0'}}>{engineer.currentTickets}/{engineer.maxTickets}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '6px 0'
                  }}>
                    <span style={{fontSize: '12px', color: '#94a3b8', fontWeight: '600'}}>Specializations</span>
                    <span style={{fontSize: '13px', color: '#e2e8f0'}}>{engineer.specializations.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const TicketAssignment = () => (
    <div>
      <h2 style={styles.pageTitle}>AI-Powered Ticket Assignment</h2>
      
      <div style={styles.ticketGrid}>
        {/* New Tickets */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            📋 New Tickets ({newTickets.length})
          </div>
          <div style={styles.cardContent}>
            <div style={styles.ticketList}>
              {newTickets.map((ticket, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleTicketSelect(ticket)}
                  style={{
                    ...styles.ticketItem,
                    ...(selectedTicket?.id === ticket.id ? styles.ticketSelected : {}),
                    ...(hoveredCard === `ticket-${idx}` && selectedTicket?.id !== ticket.id ? styles.ticketItemHover : {})
                  }}
                  onMouseEnter={() => setHoveredCard(`ticket-${idx}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{fontWeight: '600', color: '#e2e8f0', fontSize: '14px'}}>#{ticket.id}</span>
                      <span style={{
                        ...styles.priorityBadge,
                        ...getPriorityStyle(ticket.priority)
                      }}>
                        {ticket.priority}
                      </span>
                    </div>
                    <span style={{fontSize: '12px', color: '#94a3b8'}}>{ticket.timeAgo}</span>
                  </div>
                  
                  <h4 style={{fontSize: '14px', fontWeight: '500', color: '#e2e8f0', marginBottom: '8px', lineHeight: '1.4'}}>{ticket.title}</h4>
                  <p style={{fontSize: '13px', color: '#cbd5e1', marginBottom: '12px'}}>Client: {ticket.client}</p>
                  
                  <div style={{display: 'flex', gap: '6px', flexWrap: 'wrap'}}>
                    {ticket.requiredSkills.map((skill, skillIdx) => (
                      <span key={skillIdx} style={{
                        padding: '4px 8px',
                        background: 'linear-gradient(135deg, #475569, #64748b)',
                        color: '#e2e8f0',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: '600',
                        border: '1px solid #94a3b8'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div style={{...styles.card, height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column'}}>
          <div style={styles.cardHeader}>
            <Brain style={{marginRight: '8px', color: '#c084fc'}} size={20} />
            AI Recommendations
          </div>
          <div style={{...styles.cardContent, flex: 1, overflowY: 'auto'}}>
            {!selectedTicket ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#94a3b8',
                fontSize: '16px',
                border: '2px dashed #334155',
                borderRadius: '12px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{fontSize: '48px', marginBottom: '16px', opacity: 0.5}}>🎯</div>
                Select a ticket to see AI recommendations
              </div>
            ) : (
              <div>
                {recommendations.map((rec, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#334155',
                    padding: '16px',
                    borderRadius: '12px',
                    borderLeft: '4px solid #10b981',
                    marginBottom: '12px'
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px'}}>
                      <div>
                        <h4 style={{fontWeight: '600', color: '#e2e8f0'}}>{rec.engineer.name}</h4>
                        <p style={{fontSize: '12px', color: '#94a3b8'}}>{rec.engineer.title} ({rec.engineer.level})</p>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: rec.matchLevel === 'excellent' ? '#4ade80' : 
                                 rec.matchLevel === 'good' ? '#fde047' : '#94a3b8'
                        }}>
                          {rec.confidence}% Match
                        </div>
                        <div style={{fontSize: '10px', color: '#94a3b8', textTransform: 'capitalize'}}>
                          {rec.matchLevel}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{marginBottom: '16px'}}>
                      {rec.reasons.map((reason, reasonIdx) => (
                        <div key={reasonIdx} style={{
                          color: '#cbd5e1',
                          fontSize: '13px',
                          marginBottom: '4px',
                          lineHeight: 1.4
                        }}>
                          {reason}
                        </div>
                      ))}
                    </div>
                    
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button style={{
                        ...styles.btn,
                        ...(rec.matchLevel === 'excellent' ? 
                            {backgroundColor: '#16a34a', borderColor: '#16a34a', color: 'white'} :
                            {backgroundColor: '#ca8a04', borderColor: '#ca8a04', color: 'white'}),
                        flex: 1
                      }}>
                        Assign to {rec.engineer.name.split(' ')[0]}
                      </button>
                      <button style={{...styles.btn, ...styles.btnSecondary}}>
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
    </div>
  );

  const EscalationsTab = () => (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h2 style={styles.pageTitle}>Escalations</h2>
        <button style={{...styles.btn, ...styles.btnPrimary}}>
          Create Manual Escalation
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          🚨 Active Escalations ({escalations.length})
        </div>
        <div style={styles.cardContent}>
          {escalations.map((escalation, idx) => (
            <div key={idx} style={{...styles.escalationItem, padding: '24px', marginBottom: '24px'}}>
              <div style={styles.escalationHeader}>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px'}}>
                    <span style={{fontSize: '18px', fontWeight: '600', color: '#e2e8f0'}}>#{escalation.id}</span>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      ...(escalation.type === 'ai' 
                        ? {backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#d8b4fe'} 
                        : {backgroundColor: 'rgba(251, 146, 60, 0.2)', color: '#fdba74'})
                    }}>
                      {escalation.type === 'ai' ? 'AI Generated' : 'Human Requested'}
                    </span>
                  </div>
                  <h4 style={{...styles.escalationTitle, fontSize: '20px', marginBottom: '8px'}}>{escalation.title}</h4>
                  <div style={styles.escalationMeta}>
                    <p>Client: <span style={{fontWeight: '500', color: '#e2e8f0'}}>{escalation.client}</span></p>
                    <p>Engineer: <span style={{fontWeight: '500', color: '#e2e8f0'}}>{escalation.engineer}</span></p>
                    {escalation.requestedBy && (
                      <p>Requested by: <span style={{fontWeight: '500', color: '#e2e8f0'}}>{escalation.requestedBy}</span></p>
                    )}
                  </div>
                </div>
                <span style={{fontSize: '12px', color: '#94a3b8'}}>{escalation.timeAgo}</span>
              </div>
              
              <div style={styles.analysisBox}>
                <div style={styles.analysisLabel}>
                  {escalation.type === 'ai' ? '🤖 AI Analysis:' : '👤 Manager Note:'}
                </div>
                <p style={styles.analysisText}>{escalation.analysis.reason}</p>
                {escalation.analysis.sentiment && (
                  <p style={styles.analysisText}>{escalation.analysis.sentiment}</p>
                )}
                {escalation.analysis.note && (
                  <p style={{...styles.analysisText, fontStyle: 'italic'}}>{escalation.analysis.note}</p>
                )}
              </div>
              
              <div style={{display: 'flex', gap: '12px', marginTop: '16px'}}>
                <button style={{...styles.btn, ...styles.btnDanger}}>
                  Escalate to L3
                </button>
                <button style={{...styles.btn, ...styles.btnSecondary}}>
                  View Ticket
                </button>
                <button style={{...styles.btn, ...styles.btnSecondary}}>
                  Contact Client
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PerformanceTab = () => (
    <div>
      <h2 style={styles.pageTitle}>Team Performance</h2>
      
      <div style={styles.engineerGrid}>
        {engineers.map((engineer, idx) => (
          <div key={idx} style={styles.engineerCard}>
            <div style={styles.engineerHeader}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <div style={styles.engineerPhoto}>
                  {engineer.photo}
                </div>
                <div style={styles.engineerInfo}>
                  <h3 style={{fontSize: '18px', fontWeight: '600', color: '#e2e8f0'}}>{engineer.name}</h3>
                  <p style={{color: '#94a3b8'}}>{engineer.title} ({engineer.level})</p>
                </div>
              </div>
              <div style={{
                padding: '8px 12px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '18px',
                ...(engineer.performance.csat >= 4.5 ? {backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#86efac'} :
                   engineer.performance.csat >= 4.0 ? {backgroundColor: 'rgba(251, 191, 36, 0.2)', color: '#fde047'} :
                   {backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5'})
              }}>
                {engineer.performance.csat.toFixed(1)}
              </div>
            </div>
            
            <div style={{marginBottom: '16px'}}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: '1px solid #374151'
              }}>
                <span style={{fontSize: '12px', color: '#94a3b8', fontWeight: '600'}}>First Call Resolution</span>
                <span style={{fontSize: '13px', color: '#e2e8f0'}}>{engineer.performance.fcr}%</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: '1px solid #374151'
              }}>
                <span style={{fontSize: '12px', color: '#94a3b8', fontWeight: '600'}}>Avg Resolution Time</span>
                <span style={{fontSize: '13px', color: '#e2e8f0'}}>{engineer.performance.avgResolution}h</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 0',
                borderBottom: '1px solid #374151'
              }}>
                <span style={{fontSize: '12px', color: '#94a3b8', fontWeight: '600'}}>Escalation Rate</span>
                <span style={{fontSize: '13px', color: '#e2e8f0'}}>{engineer.performance.escalationRate}%</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 0'
              }}>
                <span style={{fontSize: '12px', color: '#94a3b8', fontWeight: '600'}}>Current Workload</span>
                <span style={{fontSize: '13px', color: '#e2e8f0'}}>{engineer.currentTickets}/{engineer.maxTickets}</span>
              </div>
            </div>
            
            <div style={{marginBottom: '16px'}}>
              <p style={{fontSize: '12px', color: '#94a3b8', marginBottom: '8px'}}>Specializations:</p>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
                {engineer.specializations.map((spec, specIdx) => (
                  <span key={specIdx} style={{
                    padding: '4px 8px',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    color: '#93c5fd',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: '600'
                  }}>
                    {spec}
                  </span>
                ))}
              </div>
            </div>
            
            <button style={{...styles.btn, ...styles.btnSecondary, width: '100%'}}>
              View Detailed Performance
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'assignments': return <TicketAssignment />;
      case 'escalations': return <EscalationsTab />;
      case 'performance': return <PerformanceTab />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#e2e8f0',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
          >
            <Menu size={24} />
          </button>
          <div style={styles.logo}>TechFlow MSP Manager</div>
        </div>
        
        <div style={styles.userInfo}>
          <span>David Kim - Manager</span>
          <button style={{
            backgroundColor: '#334155',
            border: '1px solid #475569',
            color: '#e2e8f0',
            padding: '8px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'all 0.2s'
          }}>
            <Settings size={20} />
          </button>
        </div>
      </div>
      
      {/* Overlay */}
      <div 
        style={{
          ...styles.overlay,
          ...(sidebarOpen ? styles.overlayShow : {})
        }}
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div style={{
        ...styles.sidebar,
        ...(sidebarOpen ? styles.sidebarOpen : {})
      }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.sidebarTitle}>Team Dashboard</div>
        </div>
        
        <div style={styles.navSection}>
          <div style={styles.navSectionTitle}>Operations</div>
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'assignments', icon: Target, label: 'Ticket Assignment' },
            { id: 'escalations', icon: AlertTriangle, label: 'Escalations' },
          ].map(item => (
            <div
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              style={{
                ...styles.navItem,
                ...(activeTab === item.id ? styles.navItemActive : {}),
                ...(hoveredCard === `nav-${item.id}` && activeTab !== item.id ? styles.navItemHover : {})
              }}
              onMouseEnter={() => setHoveredCard(`nav-${item.id}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <item.icon size={20} />
              {item.label}
            </div>
          ))}
        </div>
        
        <div style={styles.navSection}>
          <div style={styles.navSectionTitle}>Analytics</div>
          {[
            { id: 'performance', icon: TrendingUp, label: 'Performance' },
            { id: 'reports', icon: Activity, label: 'Client Reports' },
          ].map(item => (
            <div
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              style={{
                ...styles.navItem,
                ...(activeTab === item.id ? styles.navItemActive : {}),
                ...(hoveredCard === `nav-${item.id}` && activeTab !== item.id ? styles.navItemHover : {})
              }}
              onMouseEnter={() => setHoveredCard(`nav-${item.id}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <item.icon size={20} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{
        ...styles.mainContent,
        ...(sidebarOpen ? styles.mainContentShifted : {})
      }}>
        <div style={styles.contentArea}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MSPManagerApp;