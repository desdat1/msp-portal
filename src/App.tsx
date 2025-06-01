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
  RefreshCw,
  Clipboard,
  Phone,
  Mail,
  Building2,
  FileText,
  CheckCircle,
  Circle,
  Zap,
  Target,
  Eye,
  Share2,
  Flag,
  Wrench,
  Monitor,
  Database,
  Building,
  Tag
} from 'lucide-react';
import useTickets from '../hooks/useTickets';
import { Ticket } from '../types/Ticket';

// 🛠️ DEFENSIVE RENDERING FUNCTIONS FOR CONNECTWISE OBJECTS
const safeString = (value: any): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'object' && value.name) return value.name;
  if (typeof value === 'object' && value.text) return value.text;
  if (typeof value === 'object' && value.value) return value.value;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const safeContact = (contact: any) => {
  if (!contact) return { name: 'Unknown', phone: '', email: '' };
  if (typeof contact === 'string') return { name: contact, phone: '', email: '' };
  return {
    name: safeString(contact.name || contact.displayName || contact),
    phone: safeString(contact.phone || contact.phoneNumber || ''),
    email: safeString(contact.email || contact.emailAddress || '')
  };
};

const safePriority = (priority: any): string => {
  const priorityStr = safeString(priority);
  const upperPriority = priorityStr.toUpperCase();
  if (['HIGH', 'MEDIUM', 'LOW', 'NEEDS_ATTENTION'].includes(upperPriority)) {
    return upperPriority;
  }
  if (priorityStr.toLowerCase().includes('high') || priorityStr.includes('1')) return 'HIGH';
  if (priorityStr.toLowerCase().includes('medium') || priorityStr.includes('2')) return 'MEDIUM';
  if (priorityStr.toLowerCase().includes('low') || priorityStr.includes('3')) return 'LOW';
  if (priorityStr.toLowerCase().includes('attention')) return 'NEEDS_ATTENTION';
  return 'MEDIUM'; // Default fallback
};

const safeStatus = (status: any): string => {
  const statusStr = safeString(status);
  const validStatuses = ['New', 'Assigned', 'In Progress', 'Waiting', 'Escalated', 'Resolved'];
  const foundStatus = validStatuses.find(s => statusStr.toLowerCase().includes(s.toLowerCase()));
  return foundStatus || 'New'; // Default fallback
};

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
  quickFilterChips: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
    flexWrap: 'wrap'
  },
  quickFilterChip: {
    padding: '6px 12px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '20px',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  quickFilterChipActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    color: 'white'
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
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  ticketCardSelected: {
    backgroundColor: '#1e40af',
    borderColor: '#3b82f6',
    transform: 'scale(1.02)',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)'
  },
  ticketCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
  },
  ticketHeader: {
    padding: '18px',
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
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  ticketTitle: {
    fontSize: '17px',
    fontWeight: '500',
    color: '#e2e8f0',
    marginBottom: '10px',
    lineHeight: '1.3',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  ticketCompany: {
    fontSize: '15px',
    color: '#94a3b8',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  ticketMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '15px',
    color: '#94a3b8',
    flexWrap: 'wrap',
    gap: '8px'
  },
  ticketTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '8px'
  },
  ticketTag: {
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#475569',
    color: '#e2e8f0'
  },
  priorityBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
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
  priorityNeedsAttention: {
    backgroundColor: '#fce7f3',
    color: '#be185d'
  },
  statusBadge: {
    padding: '4px 10px',
    borderRadius: '50px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginLeft: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
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
    flexShrink: 0,
    transition: 'transform 0.2s'
  },
  ticketDetails: {
    padding: '0 18px 18px',
    borderTop: '1px solid #475569',
    backgroundColor: '#1e293b'
  },
  ticketDescription: {
    fontSize: '15px',
    color: '#cbd5e1',
    lineHeight: '1.5',
    marginBottom: '16px',
    padding: '12px',
    backgroundColor: '#334155',
    borderRadius: '8px',
    border: '1px solid #475569'
  },
  ticketMetaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
    marginBottom: '16px'
  },
  ticketMetaItem: {
    padding: '8px 12px',
    backgroundColor: '#334155',
    borderRadius: '6px',
    border: '1px solid #475569'
  },
  ticketMetaLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '4px'
  },
  ticketMetaValue: {
    fontSize: '14px',
    color: '#e2e8f0',
    fontWeight: '500'
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
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  quickActionPrimary: {
    backgroundColor: '#3b82f6',
    color: 'white',
    borderColor: '#3b82f6'
  },
  quickActionDanger: {
    backgroundColor: '#dc2626',
    color: 'white',
    borderColor: '#dc2626'
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
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
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
  actionButtonPrimary: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    color: 'white'
  },
  actionButtonSecondary: {
    backgroundColor: '#334155',
    border: '1px solid #475569',
    color: '#e2e8f0'
  },
  actionButtonDanger: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
    color: 'white'
  },
  actionButtonSuccess: {
    backgroundColor: '#16a34a',
    borderColor: '#16a34a',
    color: 'white'
  },
  actionButtonWarning: {
    backgroundColor: '#d97706',
    borderColor: '#d97706',
    color: 'white'
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
  sectionHeaderHover: {
    backgroundColor: '#334155'
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  sectionBadge: {
    padding: '4px 8px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  sectionContent: {
    padding: '24px'
  },
  noteItem: {
    padding: '24px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    marginBottom: '20px',
    transition: 'all 0.2s'
  },
  noteItemHover: {
    backgroundColor: '#3f4a5a',
    borderColor: '#5a6b7c'
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
    color: '#e2e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
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
  noteType: {
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  noteTypePublic: {
    backgroundColor: '#dcfce7',
    color: '#16a34a'
  },
  noteTypeInternal: {
    backgroundColor: '#fef3c7',
    color: '#d97706'
  },
  addNoteSection: {
    padding: '24px',
    backgroundColor: '#334155',
    border: '2px dashed #475569',
    borderRadius: '12px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  addNoteSectionHover: {
    borderColor: '#3b82f6',
    backgroundColor: '#3f4a5a'
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
    justifyContent: 'center',
    gap: '8px'
  },
  aiButtonHover: {
    backgroundColor: '#334155',
    borderColor: '#3b82f6',
    transform: 'translateY(-2px)'
  },
  aiButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    color: 'white'
  },
  analysisResults: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '24px',
    minHeight: '160px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #334155'
  },
  analysisPlaceholder: {
    color: '#94a3b8',
    fontSize: '18px',
    textAlign: 'center'
  },
  analysisContent: {
    whiteSpace: 'pre-line',
    textAlign: 'left',
    width: '100%',
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#e2e8f0'
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
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  contactField: {
    marginBottom: '20px'
  },
  contactLabel: {
    fontSize: '16px',
    color: '#94a3b8',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  contactValue: {
    fontSize: '20px',
    color: '#e2e8f0',
    fontWeight: '500',
    padding: '12px',
    backgroundColor: '#334155',
    borderRadius: '8px',
    border: '1px solid #475569',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  contactValueHover: {
    backgroundColor: '#3f4a5a',
    borderColor: '#5a6b7c'
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
  managementButtonHover: {
    backgroundColor: '#3f4a5a',
    borderColor: '#5a6b7c',
    transform: 'translateY(-2px)'
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
    marginBottom: '20px',
    fontFamily: 'monospace'
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
  timeButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    color: 'white'
  },
  timeButtonDanger: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
    color: 'white'
  },
  timeStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginTop: '16px'
  },
  timeStat: {
    padding: '12px',
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    border: '1px solid #334155',
    textAlign: 'center'
  },
  timeStatLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: '4px'
  },
  timeStatValue: {
    fontSize: '18px',
    color: '#e2e8f0',
    fontWeight: '600'
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
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
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
  modalCloseHover: {
    backgroundColor: '#334155',
    color: '#e2e8f0'
  },
  modalContent: {
    padding: '32px',
    overflowY: 'auto',
    flex: 1
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
  modalButtonHover: {
    backgroundColor: '#3f4a5a',
    borderColor: '#5a6b7c',
    transform: 'translateY(-2px)'
  },
  modalButtonDescription: {
    fontSize: '16px',
    color: '#94a3b8',
    marginTop: '8px'
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
    outline: 'none',
    transition: 'all 0.2s'
  },
  formInputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
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
    outline: 'none',
    minHeight: '120px',
    lineHeight: '1.5',
    transition: 'all 0.2s'
  },
  formSelect: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#334155',
    border: '1px solid #475569',
    borderRadius: '12px',
    color: '#e2e8f0',
    fontSize: '18px',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all 0.2s'
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
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  checkboxLabelHover: {
    color: '#e2e8f0'
  },
  checkbox: {
    marginRight: '12px',
    width: '20px',
    height: '20px',
    cursor: 'pointer'
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    color: '#cbd5e1',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  radio: {
    marginRight: '12px',
    width: '20px',
    height: '20px',
    cursor: 'pointer'
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
  fileDropZoneActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#1e40af',
    transform: 'scale(1.02)'
  },
  fileDropZoneHover: {
    borderColor: '#94a3b8',
    backgroundColor: '#3f4a5a'
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
    marginBottom: '8px',
    border: '1px solid #334155'
  },
  fileName: {
    color: '#cbd5e1',
    fontSize: '16px'
  },
  fileSize: {
    color: '#94a3b8',
    fontSize: '14px'
  },
  removeButton: {
    background: '#dc2626',
    border: 'none',
    color: 'white',
    borderRadius: '6px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  removeButtonHover: {
    backgroundColor: '#b91c1c'
  },
  timerStoppedInfo: {
    textAlign: 'center',
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: '#334155',
    borderRadius: '12px',
    border: '1px solid #475569'
  },
  timerStoppedTime: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#3b82f6',
    marginBottom: '8px',
    fontFamily: 'monospace'
  },
  timerStoppedSubtext: {
    fontSize: '16px',
    color: '#94a3b8'
  },
  modalActions: {
    marginTop: '32px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
    paddingTop: '24px',
    borderTop: '1px solid #334155'
  },
  buttonCancel: {
    padding: '16px 24px',
    backgroundColor: '#334155',
    color: '#e2e8f0',
    border: '1px solid #475569',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  buttonPrimary: {
    padding: '16px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  buttonDanger: {
    padding: '16px 24px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  buttonSuccess: {
    padding: '16px 24px',
    backgroundColor: '#16a34a',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 40px',
    textAlign: 'center',
    color: '#94a3b8'
  },
  emptyStateIcon: {
    marginBottom: '20px',
    color: '#475569'
  },
  emptyStateTitle: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: '12px'
  },
  emptyStateDescription: {
    fontSize: '18px',
    lineHeight: '1.6',
    maxWidth: '400px'
  }
};

const engineers = ['Sarah Chen', 'Mike Johnson', 'Alex Rodriguez', 'Marcus Thompson', 'Jenny Williams', 'David Kim'];
const statuses = ['All Statuses', 'New', 'Assigned', 'In Progress', 'Waiting', 'Escalated', 'Resolved'];
const priorities = ['All Priorities', 'HIGH', 'MEDIUM', 'LOW', 'NEEDS_ATTENTION'];
const employees = ['David Kim (Manager)', 'Marcus Thompson (L3)', 'Lisa Wang (Senior)', 'Frank Chen (L2)', 'Tom Rodriguez (L1)', 'Sarah Chen (L2)', 'Mike Johnson (L2)', 'Alex Rodriguez (L1)', 'Jenny Williams (L2)'];

const ImprovedEngineerApp = () => {
  const { tickets, loading, error, lastUpdated, refreshTickets } = useTickets();
  
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
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
  const [timerSeconds, setTimerSeconds] = useState(8142); // 02:15:42
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionModalType, setActionModalType] = useState('');
  const [ticketSummaryContent, setTicketSummaryContent] = useState('');
  const [activeAiButton, setActiveAiButton] = useState('');
  
  // Quick filter states
  const [quickFilters, setQuickFilters] = useState({
    highPriority: false,
    myTickets: false,
    newTickets: false,
    overdue: false
  });
  
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

  // Timer effect
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Format timer display
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Set initial selected ticket when tickets load
  React.useEffect(() => {
    if (tickets.length > 0 && !selectedTicket) {
      setSelectedTicket(tickets[0]);
    }
  }, [tickets, selectedTicket]);

  // Enhanced filtering with live data
  const filteredTickets = tickets.filter(ticket => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const assignee = safeString(ticket.assignee).toLowerCase();
      const title = safeString(ticket.title).toLowerCase();
      const company = safeString(ticket.company).toLowerCase();
      const id = safeString(ticket.id).toLowerCase();
      
      if (!assignee.includes(query) &&
          !title.includes(query) &&
          !company.includes(query) &&
          !id.includes(query)) {
        return false;
      }
    }
    
    // Quick filters
    const priority = safePriority(ticket.priority);
    if (quickFilters.highPriority && priority !== 'HIGH' && priority !== 'NEEDS_ATTENTION') {
      return false;
    }
    if (quickFilters.myTickets && safeString(ticket.assignee) !== 'Sarah Chen') {
      return false;
    }
    if (quickFilters.newTickets && safeStatus(ticket.status) !== 'New') {
      return false;
    }
    if (quickFilters.overdue) {
      // Simple overdue logic - tickets older than 2 days
      const timeStr = safeString(ticket.time);
      const ticketHours = parseInt(timeStr);
      if (isNaN(ticketHours) || ticketHours < 48) {
        return false;
      }
    }
    
    // Standard filters
    if (selectedEngineer !== 'All Engineers' && safeString(ticket.assignee) !== selectedEngineer) {
      return false;
    }
    if (selectedClient && !safeString(ticket.company).toLowerCase().includes(selectedClient.toLowerCase())) {
      return false;
    }
    if (selectedStatus !== 'All Statuses' && safeStatus(ticket.status) !== selectedStatus) {
      return false;
    }
    if (selectedPriority !== 'All Priorities' && safePriority(ticket.priority) !== selectedPriority) {
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

  const toggleQuickFilter = (filter: keyof typeof quickFilters) => {
    setQuickFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const getPriorityStyle = (priority: string) => {
    const safePrio = safePriority(priority);
    switch(safePrio) {
      case 'HIGH': return styles.priorityHigh;
      case 'MEDIUM': return styles.priorityMedium;
      case 'LOW': return styles.priorityLow;
      case 'NEEDS_ATTENTION': return styles.priorityNeedsAttention;
      default: return styles.priorityMedium;
    }
  };

  const getPriorityIcon = (priority: string) => {
    const safePrio = safePriority(priority);
    switch(safePrio) {
      case 'HIGH': return <AlertTriangle size={16} />;
      case 'NEEDS_ATTENTION': return <Flag size={16} />;
      case 'MEDIUM': return <Circle size={16} />;
      case 'LOW': return <Minus size={16} />;
      default: return <Circle size={16} />;
    }
  };

  const getPriorityText = (priority: any) => {
    const safePrio = safePriority(priority);
    if (safePrio === 'NEEDS_ATTENTION') return 'Needs Attention';
    return safePrio;
  };

  const getStatusStyle = (status: any) => {
    const safeStatusValue = safeStatus(status);
    switch(safeStatusValue) {
      case 'New': return styles.statusNew;
      case 'Assigned': return styles.statusAssigned;
      case 'In Progress': return styles.statusInProgress;
      case 'Waiting': return styles.statusWaiting;
      case 'Escalated': return styles.statusEscalated;
      case 'Resolved': return styles.statusResolved;
      default: return styles.statusNew;
    }
  };

  const getStatusIcon = (status: any) => {
    const safeStatusValue = safeStatus(status);
    switch(safeStatusValue) {
      case 'New': return <Circle size={12} />;
      case 'Assigned': return <User size={12} />;
      case 'In Progress': return <Play size={12} />;
      case 'Waiting': return <Clock size={12} />;
      case 'Escalated': return <AlertTriangle size={12} />;
      case 'Resolved': return <CheckCircle size={12} />;
      default: return <Circle size={12} />;
    }
  };

  const formatTimeAgo = (timeString: any) => {
    const timeStr = safeString(timeString);
    if (!timeStr) return 'Unknown';
    
    if (timeStr.includes('h')) {
      const hours = parseInt(timeStr);
      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        return `${days} day${days > 1 ? 's' : ''} ago`;
      }
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (timeStr.includes('min') || timeStr.includes('m')) {
      const minutes = parseInt(timeStr);
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      }
      return timeStr;
    }
    return timeStr;
  };

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setExpandedTickets(new Set());
    setShowNotes(false);
    setAiAnalysisResult('');
    setTicketSummaryContent('');
    setSearchResults('');
    setActiveAiButton('');
  };

  const handleAiAction = (action: string) => {
    if (!selectedTicket) return;

    setActiveAiButton(action);
    
    switch(action) {
      case 'environment':
        const contact = safeContact(selectedTicket.contact);
        setAiAnalysisResult(`🏢 Client Environment - ${safeString(selectedTicket.company)}:
        
📊 Environment Overview:
• Company: ${safeString(selectedTicket.company)}
• Contact: ${contact.name}
• Phone: ${contact.phone}
• Email: ${contact.email}
• Current Assignee: ${safeString(selectedTicket.assignee)}

🔍 Current Ticket Details:
• Ticket ID: ${safeString(selectedTicket.id)}
• Priority: ${getPriorityText(selectedTicket.priority)}
• Status: ${safeStatus(selectedTicket.status)}
• Created: ${safeString(selectedTicket.time)}
• Board: ${safeString(selectedTicket.board) || 'Service Board'}
• Type: ${safeString(selectedTicket.type) || 'Service Request'}

💻 Technical Information:
• Severity: ${safeString(selectedTicket.severity) || 'Medium'}
• Impact: ${safeString(selectedTicket.impact) || 'Medium'}  
• Urgency: ${safeString(selectedTicket.urgency) || 'Medium'}

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
        const title = safeString(selectedTicket.title);
        const actionPlan = `⚡ AI Generated Action Plan for Ticket #${safeString(selectedTicket.id)}:

🎯 Issue: ${title}
🏢 Client: ${safeString(selectedTicket.company)}
⚡ Priority: ${getPriorityText(selectedTicket.priority)}

🔍 Analysis:
${title.toLowerCase().includes('smart') || title.toLowerCase().includes('drive') ?
  '• Hardware failure detected - SMART errors indicate imminent drive failure\n• Immediate backup and replacement required\n• Estimated downtime: 1-2 hours' :
  title.toLowerCase().includes('network') || title.toLowerCase().includes('outage') ?
  '• Network connectivity issue affecting multiple users\n• Check network infrastructure and ISP connectivity\n• Estimated resolution: 2-4 hours' :
  title.toLowerCase().includes('email') || title.toLowerCase().includes('exchange') ?
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
• Contact ${safeContact(selectedTicket.contact).name} at ${safeContact(selectedTicket.contact).phone}
• Schedule maintenance window if required
• Follow up within 24 hours`;
        
        setAiAnalysisResult(actionPlan);
        break;
        
      case 'summary':
        const summaryContact = safeContact(selectedTicket.contact);
        setTicketSummaryContent(`📋 ConnectWise Ticket Summary - #${safeString(selectedTicket.id)}

🎯 Issue Overview:
${safeString(selectedTicket.title)}

🏢 Client Information:
• Company: ${safeString(selectedTicket.company)}
• Contact: ${summaryContact.name}
• Phone: ${summaryContact.phone}
• Email: ${summaryContact.email}

📊 Ticket Details:
• Priority: ${getPriorityText(selectedTicket.priority)}
• Status: ${safeStatus(selectedTicket.status)}
• Assignee: ${safeString(selectedTicket.assignee)}
• Created: ${safeString(selectedTicket.time)}
• Board: ${safeString(selectedTicket.board) || 'Service Board'}
• Type: ${safeString(selectedTicket.type) || 'Service Request'}

🔧 Technical Classification:
• Severity: ${safeString(selectedTicket.severity) || 'Medium'}
• Impact: ${safeString(selectedTicket.impact) || 'Medium'}
• Urgency: ${safeString(selectedTicket.urgency) || 'Medium'}

💼 Business Impact:
${safePriority(selectedTicket.priority) === 'HIGH' || safePriority(selectedTicket.priority) === 'NEEDS_ATTENTION' ?
  '• High priority - critical business operations may be affected\n• Immediate attention required' :
  safePriority(selectedTicket.priority) === 'MEDIUM' ?
  '• Medium priority - normal business impact\n• Standard response time applies' :
  '• Low priority - minimal business impact\n• Can be scheduled during normal business hours'}

📝 Description:
${safeString(selectedTicket.description) || 'No detailed description available'}

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
        const contact = safeContact(selectedTicket?.contact);
        setAiDraftText(`Dear ${contact.name || 'Client'},

Thank you for reporting the issue. I've identified the root cause and am implementing a solution.

Issue Summary:
${safeString(selectedTicket?.title) || 'Service Request'}

Resolution Plan:
1. Initial assessment and diagnosis (In Progress)
2. Implement recommended solution (Next - 15-30 min)
3. Test and verify functionality (Final - 10-15 min)

Expected Resolution: Within ${safeString(selectedTicket?.title)?.toLowerCase().includes('smart') ? '2-3 hours' : safeString(selectedTicket?.title)?.toLowerCase().includes('ransomware') ? '6-8 hours' : safeString(selectedTicket?.title)?.toLowerCase().includes('network') ? '2-6 hours' : '45 minutes'}
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
        setTimerStatusChange(safeStatus(selectedTicket?.status) || '');
        setTimerNotes('');
        setNoteType('public');
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
      {error && (
        <div style={styles.errorBanner}>
          ⚠️ Connection Error: {error} - Showing cached data
        </div>
      )}

      <div style={styles.header}>
        <div style={styles.logo}>
          <Building2 style={{ marginRight: '12px', display: 'inline' }} />
          TechFlow MSP - Engineer Portal
        </div>
        
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <User size={20} />
            <span>Sarah Chen • L2 Support Engineer</span>
          </div>
          <Settings size={24} style={{cursor: 'pointer'}} />
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.ticketsSidebar}>
          <div style={styles.sidebarHeader}>
            <div>
              <div style={styles.sidebarTitle}>
                <MessageSquare style={{ marginRight: '12px', display: 'inline' }} />
                ConnectWise Tickets 
                {loading && <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite', marginLeft: '8px' }} />}
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
                <User size={16} style={{ marginRight: '6px' }} />
                My Open
              </div>
              <div 
                style={{
                  ...styles.filterTab,
                  ...(activeFilter === 'All Open' ? styles.filterTabActive : styles.filterTabInactive)
                }}
                onClick={() => setActiveFilter('All Open')}
              >
                <Users size={16} style={{ marginRight: '6px' }} />
                All Open
              </div>
            </div>

            <div style={styles.quickFilterChips}>
              <div 
                style={{
                  ...styles.quickFilterChip,
                  ...(quickFilters.highPriority ? styles.quickFilterChipActive : {})
                }}
                onClick={() => toggleQuickFilter('highPriority')}
              >
                <AlertTriangle size={14} />
                High Priority
              </div>
              <div 
                style={{
                  ...styles.quickFilterChip,
                  ...(quickFilters.myTickets ? styles.quickFilterChipActive : {})
                }}
                onClick={() => toggleQuickFilter('myTickets')}
              >
                <User size={14} />
                My Tickets
              </div>
              <div 
                style={{
                  ...styles.quickFilterChip,
                  ...(quickFilters.newTickets ? styles.quickFilterChipActive : {})
                }}
                onClick={() => toggleQuickFilter('newTickets')}
              >
                <Circle size={14} />
                New
              </div>
              <div 
                style={{
                  ...styles.quickFilterChip,
                  ...(quickFilters.overdue ? styles.quickFilterChipActive : {})
                }}
                onClick={() => toggleQuickFilter('overdue')}
              >
                <Clock size={14} />
                Overdue
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
              <div style={styles.emptyState}>
                <MessageSquare size={64} style={styles.emptyStateIcon} />
                <div style={styles.emptyStateTitle}>
                  {loading ? 'Loading tickets...' : 'No tickets match your filters'}
                </div>
                <div style={styles.emptyStateDescription}>
                  {loading ? 'Connecting to ConnectWise...' : 'Try adjusting your filters or search terms to see more tickets.'}
                </div>
              </div>
            ) : (
              filteredTickets.map(ticket => (
                <div 
                  key={safeString(ticket.id)}
                  style={{
                    ...styles.ticketCard,
                    ...(selectedTicket?.id === ticket.id ? styles.ticketCardSelected : {})
                  }}
                  onClick={() => handleTicketSelect(ticket)}
                >
                  <div style={styles.ticketHeader}>
                    <div style={styles.ticketHeaderLeft}>
                      <div style={styles.ticketNumber}>
                        <FileText size={16} />
                        #{safeString(ticket.id)} ({safeString(ticket.assignee)})
                      </div>
                      <div style={styles.ticketTitle}>{safeString(ticket.title)}</div>
                      <div style={styles.ticketCompany}>
                        <Building size={14} />
                        <strong>{safeString(ticket.company)}</strong> - {formatTimeAgo(ticket.time)}
                      </div>
                      <div style={styles.ticketMeta}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{
                            ...styles.priorityBadge,
                            ...getPriorityStyle(ticket.priority)
                          }}>
                            {getPriorityIcon(ticket.priority)}
                            {getPriorityText(ticket.priority)}
                          </span>
                          <span style={{
                            ...styles.statusBadge,
                            ...getStatusStyle(ticket.status)
                          }}>
                            {getStatusIcon(ticket.status)}
                            {safeStatus(ticket.status)}
                          </span>
                        </div>
                      </div>
                      {(ticket.severity || ticket.type) && (
                        <div style={styles.ticketTags}>
                          {ticket.severity && (
                            <span style={styles.ticketTag}>
                              <Target size={12} style={{ marginRight: '4px', display: 'inline' }} />
                              {safeString(ticket.severity)}
                            </span>
                          )}
                          {ticket.type && (
                            <span style={styles.ticketTag}>
                              <Tag size={12} style={{ marginRight: '4px', display: 'inline' }} />
                              {safeString(ticket.type)}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                      <div 
                        style={{
                          ...styles.expandIcon,
                          transform: isTicketExpanded(safeString(ticket.id)) ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTicketExpansion(safeString(ticket.id));
                        }}
                      >
                        <ChevronDown size={20} />
                      </div>
                    </div>
                  </div>
                  
                  {isTicketExpanded(safeString(ticket.id)) && (
                    <div style={styles.ticketDetails}>
                      {ticket.description && (
                        <div style={styles.ticketDescription}>
                          <strong>Description:</strong><br />
                          {safeString(ticket.description)}
                        </div>
                      )}
                      
                      <div style={styles.ticketMetaGrid}>
                        {ticket.board && (
                          <div style={styles.ticketMetaItem}>
                            <div style={styles.ticketMetaLabel}>Board</div>
                            <div style={styles.ticketMetaValue}>{safeString(ticket.board)}</div>
                          </div>
                        )}
                        {ticket.type && (
                          <div style={styles.ticketMetaItem}>
                            <div style={styles.ticketMetaLabel}>Type</div>
                            <div style={styles.ticketMetaValue}>{safeString(ticket.type)}</div>
                          </div>
                        )}
                        {ticket.severity && (
                          <div style={styles.ticketMetaItem}>
                            <div style={styles.ticketMetaLabel}>Severity</div>
                            <div style={styles.ticketMetaValue}>{safeString(ticket.severity)}</div>
                          </div>
                        )}
                        {ticket.impact && (
                          <div style={styles.ticketMetaItem}>
                            <div style={styles.ticketMetaLabel}>Impact</div>
                            <div style={styles.ticketMetaValue}>{safeString(ticket.impact)}</div>
                          </div>
                        )}
                        {ticket.urgency && (
                          <div style={styles.ticketMetaItem}>
                            <div style={styles.ticketMetaLabel}>Urgency</div>
                            <div style={styles.ticketMetaValue}>{safeString(ticket.urgency)}</div>
                          </div>
                        )}
                      </div>
                      
                      <div style={styles.quickActions}>
                        <button 
                          style={{...styles.quickAction, ...styles.quickActionPrimary}}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTicketSelect(ticket);
                          }}
                        >
                          <Eye size={16} />
                          View Details
                        </button>
                        <button 
                          style={styles.quickAction}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAction('assign');
                          }}
                        >
                          <User size={16} />
                          Take Ownership
                        </button>
                        <button 
                          style={{...styles.quickAction, ...styles.quickActionDanger}}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAction('escalate');
                          }}
                        >
                          <AlertTriangle size={16} />
                          Escalate
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {selectedTicket ? (
          <div style={styles.contentArea}>
            <div style={styles.ticketDetailsHeader}>
              <div style={styles.ticketDetailsTitle}>
                {safeString(selectedTicket.title)}
              </div>
              <div style={styles.ticketDetailsSubtitle}>
                <FileText size={20} />
                #{safeString(selectedTicket.id)} ({safeString(selectedTicket.assignee)})
                <Building size={20} />
                {safeString(selectedTicket.company)}
                <Clock size={20} />
                {formatTimeAgo(selectedTicket.time)}
              </div>
              <div style={styles.ticketDetailsActions}>
                <button 
                  style={{...styles.actionButton, ...styles.actionButtonPrimary}}
                  onClick={() => setShowTakeActionModal(true)}
                >
                  <MessageSquare size={24} />
                  Take Action
                </button>
                <button 
                  style={{...styles.actionButton, ...styles.actionButtonSecondary}}
                  onClick={() => handleQuickAction('assign')}
                >
                  <Users size={24} />
                  Assign/Add Teammate
                </button>
                <button 
                  style={{...styles.actionButton, ...styles.actionButtonDanger}}
                  onClick={() => handleQuickAction('escalate')}
                >
                  <AlertTriangle size={24} />
                  Request Escalation
                </button>
                <button 
                  style={{...styles.actionButton, ...styles.actionButtonSuccess}}
                  onClick={() => {
                    setActionModalType('Change Status');
                    setTimerStatusChange('Resolved');
                    setTimerNotes('');
                    setNoteType('public');
                    setShowActionModal(true);
                  }}
                >
                  <CheckCircle size={24} />
                  Mark Resolved
                </button>
              </div>
            </div>

            <div style={styles.ticketContent}>
              <div style={styles.mainTicketArea}>
                <div style={styles.sectionCard}>
                  <div 
                    style={styles.sectionHeader}
                    onClick={() => setShowNotes(!showNotes)}
                  >
                    <div style={styles.sectionTitle}>
                      <MessageSquare size={24} color="#3b82f6" />
                      ConnectWise Ticket Notes
                      <span style={styles.sectionBadge}>3</span>
                    </div>
                    {showNotes ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                  
                  {showNotes && (
                    <div style={styles.sectionContent}>
                      <div style={styles.noteItem}>
                        <div style={styles.noteHeader}>
                          <div style={styles.noteAuthor}>
                            <User size={16} />
                            ConnectWise System
                            <span style={{...styles.noteType, ...styles.noteTypePublic}}>Public</span>
                          </div>
                          <div style={styles.noteTime}>
                            <Clock size={14} style={{ marginRight: '4px', display: 'inline' }} />
                            {safeString(selectedTicket.time)}
                          </div>
                        </div>
                        <div style={styles.noteContent}>
                          {safeString(selectedTicket.description) || 'Initial ticket description from ConnectWise system.'}
                        </div>
                      </div>
                      
                      <div style={styles.noteItem}>
                        <div style={styles.noteHeader}>
                          <div style={styles.noteAuthor}>
                            <Brain size={16} />
                            AI Assistant
                            <span style={{...styles.noteType, ...styles.noteTypeInternal}}>Internal</span>
                          </div>
                          <div style={styles.noteTime}>
                            <Clock size={14} style={{ marginRight: '4px', display: 'inline' }} />
                            Live Analysis
                          </div>
                        </div>
                        <div style={styles.noteContent}>
                          Ticket automatically imported from ConnectWise. Priority: {getPriorityText(selectedTicket.priority)}, 
                          Status: {safeStatus(selectedTicket.status)}. Ready for AI-assisted resolution.
                        </div>
                      </div>

                      <div style={styles.noteItem}>
                        <div style={styles.noteHeader}>
                          <div style={styles.noteAuthor}>
                            <User size={16} />
                            Sarah Chen
                            <span style={{...styles.noteType, ...styles.noteTypePublic}}>Public</span>
                          </div>
                          <div style={styles.noteTime}>
                            <Clock size={14} style={{ marginRight: '4px', display: 'inline' }} />
                            5 min ago
                          </div>
                        </div>
                        <div style={styles.noteContent}>
                          I've reviewed the ticket and am beginning investigation. Will provide an update within 30 minutes.
                        </div>
                      </div>

                      <div 
                        style={styles.addNoteSection}
                        onClick={() => {
                          setActionModalType('Add Note');
                          setTimerNotes('');
                          setNoteType('public');
                          setShowActionModal(true);
                        }}
                      >
                        <Plus size={24} style={{ marginBottom: '8px', color: '#3b82f6' }} />
                        <div style={{ fontSize: '16px', fontWeight: '500' }}>Add New Note</div>
                        <div style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>
                          Click to add a note to this ticket
                        </div>
                      </div>
                    </div>
                  )}
                </div>

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
                        style={{
                          ...styles.aiButton,
                          ...(activeAiButton === 'environment' ? styles.aiButtonActive : {})
                        }}
                        onClick={() => handleAiAction('environment')}
                      >
                        <Monitor size={20} />
                        🔍 Live Client Environment
                      </button>
                      <button 
                        style={{
                          ...styles.aiButton,
                          ...(activeAiButton === 'knowledge' ? styles.aiButtonActive : {})
                        }}
                        onClick={() => handleAiAction('knowledge')}
                      >
                        <Database size={20} />
                        📈 Enterprise Knowledge Search
                      </button>
                      <button 
                        style={{
                          ...styles.aiButton,
                          ...(activeAiButton === 'actions' ? styles.aiButtonActive : {})
                        }}
                        onClick={() => handleAiAction('actions')}
                      >
                        <Zap size={20} />
                        ⚡ Generate AI Actions
                      </button>
                      <button 
                        style={{
                          ...styles.aiButton,
                          ...(activeAiButton === 'summary' ? styles.aiButtonActive : {})
                        }}
                        onClick={() => handleAiAction('summary')}
                      >
                        <FileText size={20} />
                        📋 ConnectWise Summary
                      </button>
                    </div>
                    
                    <div style={styles.analysisResults}>
                      {ticketSummaryContent ? (
                        <div style={styles.analysisContent}>
                          {ticketSummaryContent}
                        </div>
                      ) : aiAnalysisResult ? (
                        <div style={styles.analysisContent}>
                          {aiAnalysisResult}
                        </div>
                      ) : searchResults ? (
                        <div style={styles.analysisContent}>
                          {searchResults}
                        </div>
                      ) : (
                        <div style={styles.analysisPlaceholder}>
                          <Brain size={48} style={{ marginBottom: '16px', color: '#475569' }} />
                          <div>Click any AI Assistant button above to analyze this ConnectWise ticket.</div>
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
            <div style={styles.emptyState}>
              <MessageSquare size={64} style={styles.emptyStateIcon} />
              <div style={styles.emptyStateTitle}>Select a ConnectWise Ticket</div>
              <div style={styles.emptyStateDescription}>
                Choose a ticket from the sidebar to view details and AI analysis
              </div>
            </div>
          </div>
        )}

        {selectedTicket && (
          <div style={styles.rightSidebar}>
            <div style={styles.sidebarSection}>
              <div style={styles.sidebarSectionTitle}>
                <Phone size={20} />
                ConnectWise Contact Info
              </div>
              
              <div style={styles.contactField}>
                <div style={styles.contactLabel}>
                  <User size={16} />
                  Requestor
                </div>
                <div style={styles.contactValue}>{safeContact(selectedTicket.contact).name}</div>
              </div>
              
              <div style={styles.contactField}>
                <div style={styles.contactLabel}>
                  <Building size={16} />
                  Company
                </div>
                <div style={styles.contactValue}>{safeString(selectedTicket.company)}</div>
              </div>
              
              <div style={styles.contactField}>
                <div style={styles.contactLabel}>
                  <Phone size={16} />
                  Phone
                </div>
                <div 
                  style={styles.contactValue}
                  onClick={() => window.open(`tel:${safeContact(selectedTicket.contact).phone}`)}
                >
                  {safeContact(selectedTicket.contact).phone}
                </div>
              </div>
              
              <div style={styles.contactField}>
                <div style={styles.contactLabel}>
                  <Mail size={16} />
                  Email
                </div>
                <div 
                  style={styles.contactValue}
                  onClick={() => window.open(`mailto:${safeContact(selectedTicket.contact).email}`)}
                >
                  {safeContact(selectedTicket.contact).email}
                </div>
              </div>

              <div style={styles.contactField}>
                <div style={styles.contactLabel}>
                  <FileText size={16} />
                  Ticket Board
                </div>
                <div style={styles.contactValue}>{safeString(selectedTicket.board) || 'Service Board'}</div>
              </div>

              <div style={styles.contactField}>
                <div style={styles.contactLabel}>
                  <Tag size={16} />
                  Type
                </div>
                <div style={styles.contactValue}>{safeString(selectedTicket.type) || 'Service Request'}</div>
              </div>
            </div>

            <div style={styles.sidebarSection}>
              <div style={styles.sidebarSectionTitle}>
                <Timer size={20} />
                Time Tracking
              </div>
              
              <div style={styles.timeTracking}>
                <div style={styles.timeDisplay}>{formatTime(timerSeconds)}</div>
                <div style={styles.timeButtons}>
                  <button 
                    style={{
                      ...styles.timeButton,
                      ...(isTimerRunning ? styles.timeButtonActive : {})
                    }}
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                  >
                    {isTimerRunning ? <Pause size={18} /> : <Play size={18} />}
                    {isTimerRunning ? 'Pause' : 'Start'}
                  </button>
                  <button 
                    style={{...styles.timeButton, ...styles.timeButtonDanger}}
                    onClick={() => handleTakeAction('Stop Timer')}
                  >
                    <Timer size={18} />
                    Stop & Log
                  </button>
                </div>
                
                <div style={styles.timeStats}>
                  <div style={styles.timeStat}>
                    <div style={styles.timeStatLabel}>Today</div>
                    <div style={styles.timeStatValue}>6h 42m</div>
                  </div>
                  <div style={styles.timeStat}>
                    <div style={styles.timeStatLabel}>This Week</div>
                    <div style={styles.timeStatValue}>34h 18m</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.sidebarSection}>
              <div style={styles.sidebarSectionTitle}>
                <Wrench size={20} />
                Quick Actions
              </div>
              
              <button 
                style={styles.managementButton}
                onClick={() => handleQuickAction('assign')}
              >
                <Users size={24} />
                <div>
                  <div style={{ fontWeight: '600' }}>Assign/Add Teammate</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Collaborate on this ticket</div>
                </div>
              </button>
              
              <button 
                style={styles.managementButton}
                onClick={() => handleQuickAction('watchers')}
              >
                <Eye size={24} />
                <div>
                  <div style={{ fontWeight: '600' }}>Add Watchers</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Get notifications on updates</div>
                </div>
              </button>

              <button 
                style={styles.managementButton}
                onClick={() => handleTakeAction('Manual Time Entry')}
              >
                <Clock size={24} />
                <div>
                  <div style={{ fontWeight: '600' }}>Manual Time Entry</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Log time worked offline</div>
                </div>
              </button>

              <button 
                style={styles.managementButton}
                onClick={() => handleTakeAction('Share Update')}
              >
                <Share2 size={24} />
                <div>
                  <div style={{ fontWeight: '600' }}>Share Update</div>
                  <div style={{ fontSize: '14px', color: '#94a3b8' }}>Notify team of progress</div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

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
                    <div style={styles.modalButtonDescription}>Generate smart reply using AI</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Attach Files')}
                >
                  <Paperclip size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Attach Files</div>
                    <div style={styles.modalButtonDescription}>Upload screenshots and documents</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Change Status')}
                >
                  <AlertTriangle size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Change Status</div>
                    <div style={styles.modalButtonDescription}>Update ticket status and add notes</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Stop Timer')}
                >
                  <Clock size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Stop Timer</div>
                    <div style={styles.modalButtonDescription}>Stop time tracking and add work notes</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Manual Time Entry')}
                >
                  <Timer size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Manual Time Entry</div>
                    <div style={styles.modalButtonDescription}>Log time worked manually</div>
                  </div>
                </button>
                
                <button 
                  style={styles.modalButton}
                  onClick={() => handleTakeAction('Share Update')}
                >
                  <Send size={24} />
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '8px' }}>Share Update</div>
                    <div style={styles.modalButtonDescription}>Send update to colleagues</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                      <option value="Waiting">Waiting</option>
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
                    <div style={styles.radioGroup}>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="noteType"
                          checked={noteType === 'public'}
                          onChange={() => setNoteType('public')}
                          style={styles.radio}
                        />
                        Public (Client can see)
                      </label>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="noteType"
                          checked={noteType === 'internal'}
                          onChange={() => setNoteType('internal')}
                          style={styles.radio}
                        />
                        Internal Only
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {actionModalType === 'Stop Timer & Add Notes' && (
                <div>
                  <div style={styles.timerStoppedInfo}>
                    <div style={styles.timerStoppedTime}>
                      Timer Stopped: {formatTime(timerSeconds)}
                    </div>
                    <div style={styles.timerStoppedSubtext}>
                      Time logged for ticket #{safeString(selectedTicket?.id)}
                    </div>
                  </div>

                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Add Work Notes</label>
                    <textarea
                      value={timerNotes}
                      onChange={(e) => setTimerNotes(e.target.value)}
                      placeholder="Describe the work completed during this time period..."
                      rows={5}
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
                      <option value="New">New</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Waiting">Waiting</option>
                      <option value="Escalated">Escalated</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Note Type</label>
                    <div style={styles.radioGroup}>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="noteType"
                          checked={noteType === 'public'}
                          onChange={() => setNoteType('public')}
                          style={styles.radio}
                        />
                        Public (Client can see)
                      </label>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="noteType"
                          checked={noteType === 'internal'}
                          onChange={() => setNoteType('internal')}
                          style={styles.radio}
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
                          checked={searchHistoricalTickets}
                          onChange={(e) => setSearchHistoricalTickets(e.target.checked)}
                          style={styles.checkbox}
                        />
                        Historical Tickets
                      </label>
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
                      <p style={{ fontSize: '18px', marginBottom: '8px' }}>Click to select files or drag and drop</p>
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
                        ...styles.buttonPrimary,
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
                            <div>
                              <span style={styles.fileName}>{file.name}</span>
                              <span style={styles.fileSize}> ({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
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

              {actionModalType === 'Manual Time Entry' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Time Worked</label>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <input
                        type="number"
                        value={timeHours}
                        onChange={(e) => setTimeHours(e.target.value)}
                        placeholder="Hours"
                        style={{...styles.formInput, flex: 1}}
                        min="0"
                        max="24"
                      />
                      <input
                        type="number"
                        value={timeMinutes}
                        onChange={(e) => setTimeMinutes(e.target.value)}
                        placeholder="Minutes"
                        style={{...styles.formInput, flex: 1}}
                        min="0"
                        max="59"
                      />
                    </div>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Work Description</label>
                    <textarea
                      value={workDescription}
                      onChange={(e) => setWorkDescription(e.target.value)}
                      placeholder="Describe the work completed..."
                      rows={4}
                      style={styles.formTextarea}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Note Type</label>
                    <div style={styles.radioGroup}>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="timeEntryNoteType"
                          checked={timeEntryNoteType === 'public'}
                          onChange={() => setTimeEntryNoteType('public')}
                          style={styles.radio}
                        />
                        Public (Client can see)
                      </label>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="timeEntryNoteType"
                          checked={timeEntryNoteType === 'internal'}
                          onChange={() => setTimeEntryNoteType('internal')}
                          style={styles.radio}
                        />
                        Internal Only
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {actionModalType === 'Assign/Add Teammate' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Action Type</label>
                    <div style={styles.radioGroup}>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="assignAction"
                          checked={isAssignTicket}
                          onChange={() => setIsAssignTicket(true)}
                          style={styles.radio}
                        />
                        Assign Ticket (Transfer ownership)
                      </label>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="assignAction"
                          checked={!isAssignTicket}
                          onChange={() => setIsAssignTicket(false)}
                          style={styles.radio}
                        />
                        Add Teammate (Collaborate)
                      </label>
                    </div>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Select Team Member</label>
                    <select
                      value={assigneeSelection}
                      onChange={(e) => setAssigneeSelection(e.target.value)}
                      style={styles.formSelect}
                    >
                      <option value="">Choose team member...</option>
                      {employees.map(employee => (
                        <option key={employee} value={employee}>{employee}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {actionModalType === 'Add Watchers' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Internal Watcher</label>
                    <select
                      value={internalWatcher}
                      onChange={(e) => setInternalWatcher(e.target.value)}
                      style={styles.formSelect}
                    >
                      <option value="">Select internal team member...</option>
                      {employees.map(employee => (
                        <option key={employee} value={employee}>{employee}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>External Watcher Email</label>
                    <input
                      type="email"
                      value={externalWatcherEmail}
                      onChange={(e) => setExternalWatcherEmail(e.target.value)}
                      placeholder="external.contact@company.com"
                      style={styles.formInput}
                    />
                  </div>
                </div>
              )}

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

              {actionModalType === 'Share Update' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Share With</label>
                    <select
                      value={shareUpdateStaff}
                      onChange={(e) => setShareUpdateStaff(e.target.value)}
                      style={styles.formSelect}
                    >
                      <option value="">Select team member...</option>
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
                      placeholder="What update would you like to share?"
                      rows={4}
                      style={styles.formTextarea}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Share Via</label>
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
                        SMS / Text
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {actionModalType === 'Add Note' && (
                <div>
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Note Content</label>
                    <textarea
                      value={timerNotes}
                      onChange={(e) => setTimerNotes(e.target.value)}
                      placeholder="Add your note here..."
                      rows={6}
                      style={styles.formTextarea}
                    />
                  </div>
                  
                  <div style={styles.formField}>
                    <label style={styles.formLabel}>Note Type</label>
                    <div style={styles.radioGroup}>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="noteType"
                          checked={noteType === 'public'}
                          onChange={() => setNoteType('public')}
                          style={styles.radio}
                        />
                        Public (Client can see)
                      </label>
                      <label style={styles.radioLabel}>
                        <input
                          type="radio"
                          name="noteType"
                          checked={noteType === 'internal'}
                          onChange={() => setNoteType('internal')}
                          style={styles.radio}
                        />
                        Internal Only
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              <div style={styles.modalActions}>
                <button 
                  style={styles.buttonCancel}
                  onClick={() => setShowActionModal(false)}
                >
                  Cancel
                </button>
                
                <button 
                  style={{
                    ...(actionModalType === 'Request Escalation' ? styles.buttonDanger : styles.buttonPrimary)
                  }}
                  onClick={() => {
                    if (actionModalType === 'Enterprise Knowledge Search') {
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
                   actionModalType === 'Assign/Add Teammate' ? (isAssignTicket ? 'Assign Ticket' : 'Add Teammate') :
                   actionModalType === 'Add Watchers' ? 'Add Watchers' :
                   actionModalType === 'Request Escalation' ? 'Submit Escalation' :
                   actionModalType === 'Share Update' ? 'Share Update' :
                   actionModalType === 'Add Note' ? 'Add Note' :
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