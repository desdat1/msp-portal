// types/Ticket.ts
export interface Contact {
  name: string;
  phone: string;
  email: string;
}

export interface Ticket {
  id: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'NEEDS_ATTENTION';
  title: string;
  company: string;
  time: string;
  status: 'New' | 'Assigned' | 'In Progress' | 'Waiting' | 'Escalated' | 'Resolved';
  assignee: string;
  contact: Contact;
  description?: string;
  dateEntered?: string;
  lastUpdated?: string;
  board?: string;
  type?: string;
  subType?: string;
  severity?: string;
  impact?: string;
  urgency?: string;
}