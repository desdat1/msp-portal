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
  Clipboard
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

// Enhanced mock data with more clients and tickets
const tickets = [
  // Accounting Plus
  { id: 'TF-2024-001511', priority: 'NEEDS_ATTENTION', title: 'Workstation showing SMART errors. Proactive hard drive replacement needed.', company: 'Accounting Plus', time: '2h 15m ago', status: 'In Progress', assignee: 'Sarah Chen', contact: { name: 'Steve Wilson', phone: '(555) 123-4567', email: 'steve.wilson@accountingplus.com' } },
  { id: 'TF-2024-001512', priority: 'HIGH', title: 'QuickBooks database corruption after power outage', company: 'Accounting Plus', time: '4h 30m ago', status: 'New', assignee: 'Unassigned', contact: { name: 'Mary Johnson', phone: '(555) 123-4568', email: 'mary.johnson@accountingplus.com' } },
  { id: 'TF-2024-001513', priority: 'MEDIUM', title: 'New employee setup - John Smith starting Monday', company: 'Accounting Plus', time: '1d ago', status: 'Assigned', assignee: 'Mike Johnson', contact: { name: 'Steve Wilson', phone: '(555) 123-4567', email: 'steve.wilson@accountingplus.com' } },
  { id: 'TF-2024-001514', priority: 'LOW', title: 'Adobe Creative Suite license renewal needed', company: 'Accounting Plus', time: '2d ago', status: 'Waiting', assignee: 'Alex Rodriguez', contact: { name: 'Mary Johnson', phone: '(555) 123-4568', email: 'mary.johnson@accountingplus.com' } },

  // Legal Services LLC
  { id: 'TF-2024-001520', priority: 'HIGH', title: 'Ransomware detection on workstation', company: 'Legal Services LLC', time: '30 min ago', status: 'New', assignee: 'Unassigned', contact: { name: 'Jennifer Adams', phone: '(555) 234-5678', email: 'jadams@legalservices.com' } },
  { id: 'TF-2024-001521', priority: 'MEDIUM', title: 'Clio practice management sync issues', company: 'Legal Services LLC', time: '3h ago', status: 'In Progress', assignee: 'Sarah Chen', contact: { name: 'Robert Martinez', phone: '(555) 234-5679', email: 'rmartinez@legalservices.com' } },
  { id: 'TF-2024-001522', priority: 'LOW', title: 'Document scanner driver update needed', company: 'Legal Services LLC', time: '1d ago', status: 'Resolved', assignee: 'Jenny Williams', contact: { name: 'Jennifer Adams', phone: '(555) 234-5678', email: 'jadams@legalservices.com' } },
  { id: 'TF-2024-001523', priority: 'MEDIUM', title: 'SharePoint document versioning conflicts', company: 'Legal Services LLC', time: '2d ago', status: 'Waiting', assignee: 'David Kim', contact: { name: 'Susan Clarke', phone: '(555) 234-5680', email: 'sclarke@legalservices.com' } },

  // Manufacturing Corp
  { id: 'TF-2024-001530', priority: 'MEDIUM', title: 'Critical network outage affecting main office', company: 'Manufacturing Corp', time: '45 min ago', status: 'Assigned', assignee: 'Mike Johnson', contact: { name: 'Robert Chen', phone: '(555) 345-6789', email: 'rchen@manufacturing.com' } },
  { id: 'TF-2024-001531', priority: 'HIGH', title: 'SAP Business One performance degradation', company: 'Manufacturing Corp', time: '2h ago', status: 'In Progress', assignee: 'Marcus Thompson', contact: { name: 'Lisa Wang', phone: '(555) 345-6790', email: 'lwang@manufacturing.com' } },
  { id: 'TF-2024-001532', priority: 'LOW', title: 'AutoCAD workstation graphics card upgrade', company: 'Manufacturing Corp', time: '1d ago', status: 'New', assignee: 'Unassigned', contact: { name: 'Robert Chen', phone: '(555) 345-6789', email: 'rchen@manufacturing.com' } },
  { id: 'TF-2024-001533', priority: 'MEDIUM', title: 'Email delivery delays to customers', company: 'Manufacturing Corp', time: '3d ago', status: 'Escalated', assignee: 'Alex Rodriguez', contact: { name: 'Tom Wilson', phone: '(555) 345-6791', email: 'twilson@manufacturing.com' } },

  // Tech Solutions Inc
  { id: 'TF-2024-001540', priority: 'LOW', title: 'Office server intermittently rejecting rebound messages', company: 'Tech Solutions Inc', time: '1h 2m ago', status: 'Waiting', assignee: 'Alex Rodriguez', contact: { name: 'Maria Garcia', phone: '(555) 456-7890', email: 'mgarcia@techsolutions.com' } },
  { id: 'TF-2024-001541', priority: 'HIGH', title: 'CRM data synchronization failures', company: 'Tech Solutions Inc', time: '5h ago', status: 'In Progress', assignee: 'Jenny Williams', contact: { name: 'Carlos Rodriguez', phone: '(555) 456-7891', email: 'crodriguez@techsolutions.com' } },
  { id: 'TF-2024-001542', priority: 'MEDIUM', title: 'VPN connection timeouts for remote workers', company: 'Tech Solutions Inc', time: '1d ago', status: 'Assigned', assignee: 'David Kim', contact: { name: 'Maria Garcia', phone: '(555) 456-7890', email: 'mgarcia@techsolutions.com' } },
  { id: 'TF-2024-001543', priority: 'LOW', title: 'Printer network configuration update', company: 'Tech Solutions Inc', time: '4d ago', status: 'Resolved', assignee: 'Sarah Chen', contact: { name: 'James Smith', phone: '(555) 456-7892', email: 'jsmith@techsolutions.com' } },

  // Healthcare Partners
  { id: 'TF-2024-001550', priority: 'HIGH', title: 'HIPAA compliance audit - security updates needed', company: 'Healthcare Partners', time: '1h ago', status: 'New', assignee: 'Unassigned', contact: { name: 'Dr. Patricia Lee', phone: '(555) 567-8901', email: 'plee@healthcarepartners.com' } },
  { id: 'TF-2024-001551', priority: 'MEDIUM', title: 'Electronic Health Records system slowdown', company: 'Healthcare Partners', time: '6h ago', status: 'In Progress', assignee: 'Marcus Thompson', contact: { name: 'Nurse Manager Kim', phone: '(555) 567-8902', email: 'kkim@healthcarepartners.com' } },
  { id: 'TF-2024-001552', priority: 'LOW', title: 'Medical device network integration', company: 'Healthcare Partners', time: '2d ago', status: 'Assigned', assignee: 'Jenny Williams', contact: { name: 'Dr. Patricia Lee', phone: '(555) 567-8901', email: 'plee@healthcarepartners.com' } },
  { id: 'TF-2024-001553', priority: 'NEEDS_ATTENTION', title: 'Patient data backup verification failure', company: 'Healthcare Partners', time: '3d ago', status: 'Escalated', assignee: 'Mike Johnson', contact: { name: 'IT Director Jones', phone: '(555) 567-8903', email: 'ijones@healthcarepartners.com' } },

  // Creative Solutions
  { id: 'TF-2024-001560', priority: 'MEDIUM', title: 'Adobe Creative Cloud license synchronization error', company: 'Creative Solutions', time: '3h ago', status: 'Assigned', assignee: 'Alex Rodriguez', contact: { name: 'Creative Director Smith', phone: '(555) 678-9012', email: 'cdsmith@creativesolutions.com' } },
  { id: 'TF-2024-001561', priority: 'HIGH', title: 'File server crash - project files inaccessible', company: 'Creative Solutions', time: '4h ago', status: 'In Progress', assignee: 'Sarah Chen', contact: { name: 'Project Manager Davis', phone: '(555) 678-9013', email: 'pmdavis@creativesolutions.com' } },
  { id: 'TF-2024-001562', priority: 'LOW', title: 'Video editing workstation RAM upgrade', company: 'Creative Solutions', time: '1d ago', status: 'New', assignee: 'Unassigned', contact: { name: 'Editor Johnson', phone: '(555) 678-9014', email: 'ejohnson@creativesolutions.com' } },
  { id: 'TF-2024-001563', priority: 'MEDIUM', title: 'Color calibration for design monitors', company: 'Creative Solutions', time: '5d ago', status: 'Resolved', assignee: 'David Kim', contact: { name: 'Creative Director Smith', phone: '(555) 678-9012', email: 'cdsmith@creativesolutions.com' } },

  // Financial Advisors Group
  { id: 'TF-2024-001570', priority: 'HIGH', title: 'Trading platform connectivity issues', company: 'Financial Advisors Group', time: '2h ago', status: 'New', assignee: 'Unassigned', contact: { name: 'Senior Advisor Brown', phone: '(555) 789-0123', email: 'sabrown@financialadvisors.com' } },
  { id: 'TF-2024-001571', priority: 'MEDIUM', title: 'Client portal login authentication problems', company: 'Financial Advisors Group', time: '4h ago', status: 'In Progress', assignee: 'Jenny Williams', contact: { name: 'IT Coordinator Lee', phone: '(555) 789-0124', email: 'itlee@financialadvisors.com' } },
  { id: 'TF-2024-001572', priority: 'LOW', title: 'Conference room display setup for client meetings', company: 'Financial Advisors Group', time: '2d ago', status: 'Assigned', assignee: 'Marcus Thompson', contact: { name: 'Office Manager Taylor', phone: '(555) 789-0125', email: 'omtaylor@financialadvisors.com' } },
  { id: 'TF-2024-001573', priority: 'NEEDS_ATTENTION', title: 'Compliance software licensing audit', company: 'Financial Advisors Group', time: '1d ago', status: 'Waiting', assignee: 'David Kim', contact: { name: 'Compliance Officer Wilson', phone: '(555) 789-0126', email: 'cowilson@financialadvisors.com' } },

  // Retail Operations LLC
  { id: 'TF-2024-001580', priority: 'HIGH', title: 'Point of sale system offline at main store', company: 'Retail Operations LLC', time: '1h ago', status: 'New', assignee: 'Unassigned', contact: { name: 'Store Manager Garcia', phone: '(555) 890-1234', email: 'smgarcia@retailops.com' } },
  { id: 'TF-2024-001581', priority: 'MEDIUM', title: 'Inventory management system sync delays', company: 'Retail Operations LLC', time: '5h ago', status: 'In Progress', assignee: 'Mike Johnson', contact: { name: 'Inventory Manager Chen', phone: '(555) 890-1235', email: 'imchen@retailops.com' } },
  { id: 'TF-2024-001582', priority: 'LOW', title: 'Customer WiFi network password update', company: 'Retail Operations LLC', time: '3d ago', status: 'Resolved', assignee: 'Alex Rodriguez', contact: { name: 'Store Manager Garcia', phone: '(555) 890-1234', email: 'smgarcia@retailops.com' } },
  { id: 'TF-2024-001583', priority: 'MEDIUM', title: 'Security camera system maintenance', company: 'Retail Operations LLC', time: '1d ago', status: 'Assigned', assignee: 'Sarah Chen', contact: { name: 'Security Coordinator Martinez', phone: '(555) 890-1236', email: 'scmartinez@retailops.com' } },

  // Engineering Consultants
  { id: 'TF-2024-001590', priority: 'MEDIUM', title: 'CAD software license server migration', company: 'Engineering Consultants', time: '2h ago', status: 'Assigned', assignee: 'Marcus Thompson', contact: { name: 'Engineering Manager White', phone: '(555) 901-2345', email: 'emwhite@engconsultants.com' } },
  { id: 'TF-2024-001591', priority: 'HIGH', title: 'Project database backup corruption detected', company: 'Engineering Consultants', time: '3h ago', status: 'In Progress', assignee: 'Jenny Williams', contact: { name: 'Data Manager Thompson', phone: '(555) 901-2346', email: 'dmthompson@engconsultants.com' } },
  { id: 'TF-2024-001592', priority: 'LOW', title: 'Workstation monitor dual-display setup', company: 'Engineering Consultants', time: '1d ago', status: 'New', assignee: 'Unassigned', contact: { name: 'Engineer Anderson', phone: '(555) 901-2347', email: 'eanderson@engconsultants.com' } },
  { id: 'TF-2024-001593', priority: 'NEEDS_ATTENTION', title: 'Network performance optimization needed', company: 'Engineering Consultants', time: '4d ago', status: 'Escalated', assignee: 'David Kim', contact: { name: 'IT Specialist Johnson', phone: '(555) 901-2348', email: 'itsjohnson@engconsultants.com' } },

  // Marketing Agency Pro
  { id: 'TF-2024-001600', priority: 'HIGH', title: 'Website hosting server migration urgent', company: 'Marketing Agency Pro', time: '1h ago', status: 'New', assignee: 'Unassigned', contact: { name: 'Web Developer Clark', phone: '(555) 012-3456', email: 'wdclark@marketingpro.com' } },
  { id: 'TF-2024-001601', priority: 'MEDIUM', title: 'Email marketing platform integration issues', company: 'Marketing Agency Pro', time: '6h ago', status: 'In Progress', assignee: 'Alex Rodriguez', contact: { name: 'Marketing Director Lewis', phone: '(555) 012-3457', email: 'mdlewis@marketingpro.com' } },
  { id: 'TF-2024-001602', priority: 'LOW', title: 'Social media management tool setup', company: 'Marketing Agency Pro', time: '2d ago', status: 'Assigned', assignee: 'Sarah Chen', contact: { name: 'Social Media Manager Hall', phone: '(555) 012-3458', email: 'smmhall@marketingpro.com' } },
  { id: 'TF-2024-001603', priority: 'MEDIUM', title: 'Analytics dashboard reporting errors', company: 'Marketing Agency Pro', time: '3d ago', status: 'Waiting', assignee: 'Mike Johnson', contact: { name: 'Analytics Specialist Young', phone: '(555) 012-3459', email: 'asyoung@marketingpro.com' } }
];

const engineers = ['Sarah Chen', 'Mike Johnson', 'Alex Rodriguez', 'Marcus Thompson', 'Jenny Williams', 'David Kim'];
const statuses = ['All Statuses', 'New', 'Assigned', 'In Progress', 'Waiting', 'Escalated', 'Resolved'];
const priorities = ['All Priorities', 'HIGH', 'MEDIUM', 'LOW', 'NEEDS_ATTENTION'];
const employees = ['David Kim (Manager)', 'Marcus Thompson (L3)', 'Lisa Wang (Senior)', 'Frank Chen (L2)', 'Tom Rodriguez (L1)', 'Sarah Chen (L2)', 'Mike Johnson (L2)', 'Alex Rodriguez (L1)', 'Jenny Williams (L2)'];

const ImprovedEngineerApp = () => {
  // USE LIVE API DATA INSTEAD OF STATIC MOCK DATA
  const { tickets: apiTickets, loading, error, lastUpdated, refresh } = useTickets();
  // Use live API data instead of static tickets
  const { tickets: apiTickets, loading, error, lastUpdated, refresh } = useTickets();
  
  const [selectedTicket", setSelectedTicket] = useState(tickets[0]);
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

  const filteredTickets = apiapiTickets.filter(ticket => {
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
        setAiAnalysisResult(`ðŸ¢ Client Environment - ${selectedTicket.company}:
        
ðŸ“Š Environment Overview:
â€¢ Total Users: ${selectedTicket.company === 'Accounting Plus' ? '45 active licenses, 42 in use' : 
                 selectedTicket.company === 'Legal Services LLC' ? '28 active licenses, 25 in use' :
                 selectedTicket.company === 'Manufacturing Corp' ? '156 active licenses, 148 in use' :
                 selectedTicket.company === 'Healthcare Partners' ? '85 active licenses, 78 in use' :
                 selectedTicket.company === 'Creative Solutions' ? '32 active licenses, 29 in use' :
                 selectedTicket.company === 'Financial Advisors Group' ? '15 active licenses, 14 in use' :
                 selectedTicket.company === 'Retail Operations LLC' ? '67 active licenses, 62 in use' :
                 selectedTicket.company === 'Engineering Consultants' ? '48 active licenses, 44 in use' :
                 selectedTicket.company === 'Marketing Agency Pro' ? '25 active licenses, 23 in use' :
                 '73 active licenses, 68 in use'}
â€¢ Remote Workers: ${selectedTicket.company === 'Accounting Plus' ? '18 (40% of workforce)' :
                    selectedTicket.company === 'Legal Services LLC' ? '22 (88% of workforce)' :
                    selectedTicket.company === 'Manufacturing Corp' ? '25 (16% of workforce)' :
                    selectedTicket.company === 'Healthcare Partners' ? '15 (19% of workforce)' :
                    selectedTicket.company === 'Creative Solutions' ? '28 (97% of workforce)' :
                    selectedTicket.company === 'Financial Advisors Group' ? '8 (57% of workforce)' :
                    selectedTicket.company === 'Retail Operations LLC' ? '12 (19% of workforce)' :
                    selectedTicket.company === 'Engineering Consultants' ? '35 (80% of workforce)' :
                    selectedTicket.company === 'Marketing Agency Pro' ? '20 (87% of workforce)' :
                    '45 (65% of workforce)'}
â€¢ Primary Contact: ${selectedTicket.contact.name}
â€¢ Phone: ${selectedTicket.contact.phone} | Email: ${selectedTicket.contact.email}

ðŸ’» Technology Stack:
${selectedTicket.company === 'Accounting Plus' ? 
  'â€¢ Microsoft 365 (E3 licenses)\nâ€¢ QuickBooks Enterprise 2024\nâ€¢ Adobe Creative Suite (5 licenses)\nâ€¢ Windows 11 Pro (38 workstations)\nâ€¢ Windows Server 2019 (primary domain controller)' :
  selectedTicket.company === 'Legal Services LLC' ?
  'â€¢ Microsoft 365 (E5 licenses)\nâ€¢ Clio Legal Practice Management\nâ€¢ Adobe Acrobat Pro DC\nâ€¢ Windows 11 Pro (25 workstations)\nâ€¢ Azure AD (cloud-only)' :
  selectedTicket.company === 'Manufacturing Corp' ?
  'â€¢ Microsoft 365 (E3 licenses)\nâ€¢ SAP Business One\nâ€¢ AutoCAD 2024\nâ€¢ Windows 10/11 Mixed (140 workstations)\nâ€¢ Windows Server 2022 (domain controller)' :
  selectedTicket.company === 'Healthcare Partners' ?
  'â€¢ Microsoft 365 (E5 licenses)\nâ€¢ Epic EHR System\nâ€¢ HIPAA Compliance Suite\nâ€¢ Windows 11 Pro (75 workstations)\nâ€¢ Windows Server 2022 (HIPAA compliant)' :
  selectedTicket.company === 'Creative Solutions' ?
  'â€¢ Adobe Creative Cloud Enterprise\nâ€¢ Slack Business+\nâ€¢ macOS Ventura (28 workstations)\nâ€¢ AWS Cloud Infrastructure\nâ€¢ Wacom Tablet Integration' :
  selectedTicket.company === 'Financial Advisors Group' ?
  'â€¢ Microsoft 365 (E3 licenses)\nâ€¢ Bloomberg Terminal\nâ€¢ FactSet Workstation\nâ€¢ Windows 11 Pro (12 workstations)\nâ€¢ Citrix Virtual Apps' :
  selectedTicket.company === 'Retail Operations LLC' ?
  'â€¢ Microsoft 365 (E3 licenses)\nâ€¢ Square POS System\nâ€¢ Shopify Plus\nâ€¢ Windows 10/11 Mixed (60 workstations)\nâ€¢ Ubiquiti Network Infrastructure' :
  selectedTicket.company === 'Engineering Consultants' ?
  'â€¢ Microsoft 365 (E3 licenses)\nâ€¢ AutoCAD 2024\nâ€¢ SolidWorks 2024\nâ€¢ Windows 11 Pro (40 workstations)\nâ€¢ Windows Server 2022 (file server)' :
  selectedTicket.company === 'Marketing Agency Pro' ?
  'â€¢ Google Workspace Enterprise\nâ€¢ HubSpot Enterprise\nâ€¢ Adobe Creative Cloud\nâ€¢ macOS/Windows Mixed (20 workstations)\nâ€¢ AWS Cloud Infrastructure' :
  'â€¢ Google Workspace Enterprise\nâ€¢ Salesforce CRM\nâ€¢ Slack Business+\nâ€¢ MacOS/Windows Mixed (65 workstations)\nâ€¢ AWS Cloud Infrastructure'}

ðŸ”§ Common Service Requests:
${selectedTicket.company === 'Accounting Plus' ?
  'â€¢ Password resets: 40% of tickets\nâ€¢ VPN configuration: 25% of tickets\nâ€¢ Email issues: 20% of tickets\nâ€¢ Software installation: 15% of tickets' :
  selectedTicket.company === 'Legal Services LLC' ?
  'â€¢ Document access issues: 45% of tickets\nâ€¢ VPN/Remote access: 35% of tickets\nâ€¢ Email security questions: 15% of tickets\nâ€¢ Software licensing: 5% of tickets' :
  selectedTicket.company === 'Manufacturing Corp' ?
  'â€¢ Network connectivity: 35% of tickets\nâ€¢ SAP system issues: 25% of tickets\nâ€¢ Hardware replacement: 20% of tickets\nâ€¢ Email problems: 20% of tickets' :
  selectedTicket.company === 'Healthcare Partners' ?
  'â€¢ EHR system issues: 40% of tickets\nâ€¢ HIPAA compliance questions: 25% of tickets\nâ€¢ Network connectivity: 20% of tickets\nâ€¢ Medical device integration: 15% of tickets' :
  selectedTicket.company === 'Creative Solutions' ?
  'â€¢ Adobe software issues: 45% of tickets\nâ€¢ File sharing problems: 25% of tickets\nâ€¢ Hardware upgrades: 20% of tickets\nâ€¢ Network performance: 10% of tickets' :
  selectedTicket.company === 'Financial Advisors Group' ?
  'â€¢ Trading platform issues: 50% of tickets\nâ€¢ Client portal access: 25% of tickets\nâ€¢ Compliance software: 15% of tickets\nâ€¢ Email security: 10% of tickets' :
  selectedTicket.company === 'Retail Operations LLC' ?
  'â€¢ POS system issues: 40% of tickets\nâ€¢ Inventory sync problems: 30% of tickets\nâ€¢ WiFi connectivity: 20% of tickets\nâ€¢ Security camera maintenance: 10% of tickets' :
  selectedTicket.company === 'Engineering Consultants' ?
  'â€¢ CAD software issues: 35% of tickets\nâ€¢ License server problems: 25% of tickets\nâ€¢ Network performance: 25% of tickets\nâ€¢ Hardware upgrades: 15% of tickets' :
  selectedTicket.company === 'Marketing Agency Pro' ?
  'â€¢ Website hosting issues: 35% of tickets\nâ€¢ Marketing tool integration: 30% of tickets\nâ€¢ Email marketing problems: 20% of tickets\nâ€¢ Analytics platform issues: 15% of tickets' :
  'â€¢ CRM data sync issues: 30% of tickets\nâ€¢ Slack integration problems: 25% of tickets\nâ€¢ Mobile device setup: 25% of tickets\nâ€¢ Cloud access issues: 20% of tickets'}`);
        break;
      case 'knowledge':
        setActionModalType('Enterprise Knowledge Search');
        setShowActionModal(true);
        break;
      case 'actions':
        const actionPlan = selectedTicket.title.toLowerCase().includes('smart') || selectedTicket.title.toLowerCase().includes('drive') ?
          `âš¡ AI Generated Action Plan for Ticket #${selectedTicket.id}:
        
ðŸ” Initial Assessment:
1. Review SMART error logs from Event Viewer (10 minutes)
2. Run Windows built-in disk check: chkdsk /f /r
3. Use manufacturer's diagnostic tool (Seagate SeaTools/WD Data Lifeguard)
4. Check warranty status and replacement eligibility

ðŸ› ï¸ Resolution Steps:
5. Backup critical data before replacement (30 minutes)
6. Clone drive to new replacement drive using Clonezilla
7. Install new drive and restore system
8. Test system functionality and performance

â±ï¸ Estimated Timeline:
â€¢ Total resolution time: 2-3 hours
â€¢ Client downtime: 1 hour (during replacement)
â€¢ Follow-up: 24-hour monitoring for stability

ðŸ“‹ Next Actions:
â€¢ Order replacement drive (same day delivery available)
â€¢ Schedule maintenance window with client
â€¢ Prepare backup and cloning tools` :

          selectedTicket.title.toLowerCase().includes('ransomware') ?
          `âš¡ AI Generated Action Plan for Ticket #${selectedTicket.id}:
        
ðŸš¨ IMMEDIATE CONTAINMENT:
1. ISOLATE affected workstation from network (URGENT)
2. Preserve evidence - do NOT power down
3. Notify management and security team
4. Document current system state

ðŸ” Assessment Phase:
5. Identify ransomware variant using ID Ransomware tool
6. Check network for lateral movement indicators
7. Verify backup integrity and availability
8. Assess scope of encryption damage

ðŸ› ï¸ Recovery Steps:
9. Wipe and rebuild affected system from clean image
10. Restore data from verified clean backups
11. Apply latest security patches and updates
12. Implement additional monitoring

â±ï¸ Critical Timeline:
â€¢ Immediate isolation: COMPLETED
â€¢ Assessment: 2-4 hours
â€¢ Full recovery: 6-8 hours
â€¢ Security hardening: 2 hours

ðŸ“‹ Next Actions:
â€¢ Contact cyber insurance provider
â€¢ File incident report with appropriate authorities
â€¢ Review and update security policies` :

          selectedTicket.title.toLowerCase().includes('network') || selectedTicket.title.toLowerCase().includes('outage') ?
          `âš¡ AI Generated Action Plan for Ticket #${selectedTicket.id}:
        
ðŸ” Network Diagnosis:
1. Check physical connections and switch status lights
2. Test internet connectivity from multiple locations
3. Review router/firewall logs for error messages
4. Ping test to gateway, DNS, and external sites

ðŸ› ï¸ Resolution Steps:
5. Restart network equipment in proper sequence
6. Check ISP status and contact if needed
7. Verify DHCP scope and IP allocation
8. Test wireless and wired connections separately

â±ï¸ Estimated Timeline:
â€¢ Initial diagnosis: 15-30 minutes
â€¢ Basic troubleshooting: 30-45 minutes
â€¢ ISP coordination (if needed): 1-4 hours
â€¢ Full restoration: 2-6 hours

ðŸ“‹ Next Actions:
â€¢ Update all affected users on status
â€¢ Document root cause for future prevention
â€¢ Review network redundancy options` :

          selectedTicket.title.toLowerCase().includes('pos') || selectedTicket.title.toLowerCase().includes('point of sale') ?
          `âš¡ AI Generated Action Plan for Ticket #${selectedTicket.id}:
        
ðŸ” POS System Diagnosis:
1. Check network connectivity to POS terminals
2. Verify payment processor connection status
3. Review POS software logs for error messages
4. Test backup payment methods

ðŸ› ï¸ Resolution Steps:
5. Restart POS terminals and base station
6. Verify network configuration and IP settings
7. Contact payment processor if needed
8. Test transaction processing end-to-end

â±ï¸ Estimated Timeline:
â€¢ Initial diagnosis: 10-15 minutes
â€¢ Network troubleshooting: 20-30 minutes
â€¢ Payment processor coordination: 30-60 minutes
â€¢ Full restoration: 1-2 hours

ðŸ“‹ Next Actions:
â€¢ Implement backup payment procedures
â€¢ Document incident for compliance
â€¢ Schedule preventive maintenance` :

          `âš¡ AI Generated Action Plan for Ticket #${selectedTicket.id}:
        
ðŸ” Initial Assessment:
1. Review system logs and error messages (10 minutes)
2. Test affected functionality and document symptoms
3. Check for recent system changes or updates
4. Verify user permissions and access rights

ðŸ› ï¸ Resolution Steps:
5. Apply appropriate troubleshooting steps based on issue type
6. Test proposed solution in isolated environment if possible
7. Implement fix during appropriate maintenance window
8. Verify resolution and document steps taken

â±ï¸ Estimated Timeline:
â€¢ Total resolution time: 1-3 hours
â€¢ Client impact: Minimal (low priority issue)
â€¢ Follow-up: 24-48 hour monitoring recommended

ðŸ“‹ Next Actions:
â€¢ Update client on progress and timeline
â€¢ Schedule follow-up verification
â€¢ Update internal documentation`;
        
        setAiAnalysisResult(actionPlan);
        break;
      case 'summary':
        setTicketSummaryContent(`ðŸ“‹ Ticket Summary - #${selectedTicket.id}

ðŸŽ¯ Issue Overview:
${selectedTicket.title}

ðŸ¢ Client: ${selectedTicket.company}
ðŸ‘¤ Contact: ${selectedTicket.contact.name}
ðŸ“ž Phone: ${selectedTicket.contact.phone}
âœ‰ï¸ Email: ${selectedTicket.contact.email}

âš¡ Priority: ${getPriorityText(selectedTicket.priority)}
ðŸ“Š Status: ${selectedTicket.status}
ðŸ‘¨â€ðŸ’» Assigned: ${selectedTicket.assignee}
ðŸ• Created: ${formatTimeAgo(selectedTicket.time)}

ðŸ” Technical Details:
${selectedTicket.title.toLowerCase().includes('smart') || selectedTicket.title.toLowerCase().includes('drive') ?
  'â€¢ Workstation showing SMART disk errors in Event Viewer\nâ€¢ Error codes: 51, 153, 154 indicating imminent drive failure\nâ€¢ User reports occasional system freezes and slow boot times\nâ€¢ Drive is 3.2 years old, still under warranty' :
  selectedTicket.title.toLowerCase().includes('ransomware') ?
  'â€¢ Workstation infected with suspected Conti ransomware variant\nâ€¢ Files encrypted with .conti extension\nâ€¢ Ransom note detected in multiple directories\nâ€¢ System isolated from network immediately' :
  selectedTicket.title.toLowerCase().includes('network') || selectedTicket.title.toLowerCase().includes('outage') ?
  'â€¢ Complete network connectivity loss at main office location\nâ€¢ Affects approximately 148 users\nâ€¢ Started during normal business hours\nâ€¢ Both wired and wireless connections affected' :
  selectedTicket.title.toLowerCase().includes('pos') || selectedTicket.title.toLowerCase().includes('point of sale') ?
  'â€¢ Point of sale system completely offline\nâ€¢ Affects all payment processing capabilities\nâ€¢ Customer transactions cannot be completed\nâ€¢ Emergency cash-only procedures implemented' :
  'â€¢ System showing intermittent performance issues\nâ€¢ User reports degraded functionality\nâ€¢ Issue started approximately ' + selectedTicket.time + '\nâ€¢ Business operations partially affected'}

ðŸ’¼ Business Impact:
${selectedTicket.priority === 'HIGH' || selectedTicket.priority === 'NEEDS_ATTENTION' ?
  'â€¢ High priority - critical business operations affected' :
  selectedTicket.priority === 'MEDIUM' ?
  'â€¢ Medium priority - affecting productivity and communications' :
  'â€¢ Low priority - minimal business impact'}

â±ï¸ Estimated Resolution: ${selectedTicket.title.toLowerCase().includes('smart') || selectedTicket.title.toLowerCase().includes('drive') ?
  '2-3 hours' :
  selectedTicket.title.toLowerCase().includes('ransomware') ?
  '6-8 hours' :
  selectedTicket.title.toLowerCase().includes('network') || selectedTicket.title.toLowerCase().includes('outage') ?
  '2-6 hours' :
  selectedTicket.title.toLowerCase().includes('pos') ?
  '1-2 hours' :
  '1-3 hours'}`);
        break;
    }
  };

  const handleTakeAction = (action: string) => {
    setShowTakeActionModal(false);
    
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
        setTimerStatusChange(selectedTicket.status);
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div style={styles.userInfo}>
          <span>Sarah Chen â€¢ L2 Support Engineer</span>
          <Settings size={24} style={{cursor: 'pointer'}} />
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Left Sidebar - Tickets List */}
        <div style={styles.ticketsSidebar}>
          <div style={styles.sidebarHeader}>
            <div>
              <div style={styles.sidebarTitle}>My Tickets</div>
              <div style={styles.sidebarStats}>Showing: {filteredTickets.length} â€¢ Total: {tickets.length}</div>
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
            {filteredapiTickets.map(ticket => (
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
              #{selectedTicket.id} ({selectedTicket.assignee}) â€¢ {selectedTicket.company}
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
                      ðŸ” Client Environment
                    </button>
                    <button 
                      style={styles.aiButton}
                      onClick={() => handleAiAction('knowledge')}
                    >
                      ðŸ“ˆ Enterprise Knowledge Search
                    </button>
                    <button 
                      style={styles.aiButton}
                      onClick={() => handleAiAction('actions')}
                    >
                      âš¡ Generate AI Actions
                    </button>
                    <button 
                      style={styles.aiButton}
                      onClick={() => handleAiAction('summary')}
                    >
                      ðŸ“‹ Ticket Summary
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
              onClick={() => handleQuickAction('watchers')}
            >
              <User size={24} />
              Add Watchers
            </button>
          </div>
        </div>
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
                      Time logged for ticket #{selectedTicket.id}
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
                        setSearchResults(`ðŸ” Enterprise Knowledge Search Results for "${searchKeywords}":

ðŸ“š Found 8 relevant articles:

ðŸ“„ Historical Tickets (3 results):
â€¢ Ticket #TF-2024-001245: "Exchange connector blocking external domains" 
  â†’ Resolution: Modified SMTP connector settings | Time: 45 min | Success rate: 100%
â€¢ Ticket #TF-2024-000892: "Exchange message queue backup after domain change"
  â†’ Resolution: Cleared queue + restart transport service | Time: 20 min 
â€¢ Ticket #TF-2024-000654: "Similar vendor email blocking issue"
  â†’ Resolution: Added domain to accepted list | Time: 15 min

ðŸ“‹ IT Glue Documentation (2 results):
â€¢ "Exchange SMTP Connector Configuration Guide"
  â†’ Step-by-step instructions for domain whitelisting
â€¢ "Common Exchange Email Flow Issues"
  â†’ Troubleshooting guide with PowerShell commands

ðŸ’¡ Recommended Next Steps:
1. Follow Historical Ticket #TF-2024-001245 resolution steps
2. Reference IT Glue SMTP Configuration Guide
3. Use PowerShell commands from Common Issues doc`);
                      } else {
                        setSearchResults(`ðŸ” Enterprise Knowledge Search Results for "${searchKeywords}":

ðŸ“š Found 3 relevant articles:

ðŸ’¡ Try searching for more specific terms like:
â€¢ "Exchange" for email server issues
â€¢ "VPN" for remote access problems  
â€¢ "QuickBooks" for accounting software issues
â€¢ "Password" for authentication problems`);
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




