// ConnectWise Demo Data Population Script - Fixed Version with Required Fields
// Run: node populate-connectwise-demo.js

const axios = require('axios');
const fs = require('fs');

// ConnectWise API Configuration - Updated with your credentials
const CW_CONFIG = {
  baseURL: 'https://na.myconnectwise.net/v4_6_release/apis/3.0',
  headers: {
    'Authorization': 'Basic ' + Buffer.from('resolveai+GFJovckLwxDZhAu4:B5oJSGbE0LqCqVpr').toString('base64'),
    'Content-Type': 'application/json',
    'clientId': '8126172f-85ec-4027-8c56-974625fdb14c',
    'Accept': 'application/vnd.connectwise.com+json; version=2024.8'
  }
};

// Demo Companies Data - Fixed with identifiers
const DEMO_COMPANIES = [
  {
    identifier: 'TECHFLOW01',
    name: 'TechFlow Startup Inc',
    addressLine1: '123 Innovation Drive',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    phoneNumber: '512-555-0101',
    userCount: 50,
    industry: 'Technology',
    contacts: [
      { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@techflow.com', title: 'CTO', phone: '512-555-0102' },
      { firstName: 'Mike', lastName: 'Chen', email: 'mike.chen@techflow.com', title: 'IT Manager', phone: '512-555-0103' }
    ]
  },
  {
    identifier: 'PINNACLE01',
    name: 'Pinnacle Law Group',
    addressLine1: '456 Justice Boulevard',
    city: 'Dallas',
    state: 'TX',
    zip: '75201',
    phoneNumber: '214-555-0201',
    userCount: 25,
    industry: 'Legal',
    contacts: [
      { firstName: 'Robert', lastName: 'Martinez', email: 'rmartinez@pinnaclelaw.com', title: 'Managing Partner', phone: '214-555-0202' },
      { firstName: 'Lisa', lastName: 'Thompson', email: 'lthompson@pinnaclelaw.com', title: 'Office Manager', phone: '214-555-0203' }
    ]
  },
  {
    identifier: 'ADVMFG01',
    name: 'Advanced Manufacturing Corp',
    addressLine1: '789 Industrial Parkway',
    city: 'Houston',
    state: 'TX',
    zip: '77001',
    phoneNumber: '713-555-0301',
    userCount: 100,
    industry: 'Manufacturing',
    contacts: [
      { firstName: 'David', lastName: 'Rodriguez', email: 'drodriguez@advmfg.com', title: 'Plant Manager', phone: '713-555-0302' },
      { firstName: 'Jennifer', lastName: 'Kim', email: 'jkim@advmfg.com', title: 'IT Coordinator', phone: '713-555-0303' }
    ]
  },
  {
    identifier: 'HEALTHY01',
    name: 'Healthy Life Medical',
    addressLine1: '321 Wellness Way',
    city: 'San Antonio',
    state: 'TX',
    zip: '78201',
    phoneNumber: '210-555-0401',
    userCount: 30,
    industry: 'Healthcare',
    contacts: [
      { firstName: 'Dr. Emily', lastName: 'Wilson', email: 'ewilson@healthylife.com', title: 'Practice Manager', phone: '210-555-0402' },
      { firstName: 'Carlos', lastName: 'Garcia', email: 'cgarcia@healthylife.com', title: 'Office Administrator', phone: '210-555-0403' }
    ]
  },
  {
    identifier: 'PREMIER01',
    name: 'Premier Accounting Services',
    addressLine1: '654 Financial Plaza',
    city: 'Fort Worth',
    state: 'TX',
    zip: '76101',
    phoneNumber: '817-555-0501',
    userCount: 40,
    industry: 'Accounting',
    contacts: [
      { firstName: 'Michael', lastName: 'Anderson', email: 'manderson@premieraccounting.com', title: 'Managing Partner', phone: '817-555-0502' },
      { firstName: 'Amanda', lastName: 'Lee', email: 'alee@premieraccounting.com', title: 'IT Specialist', phone: '817-555-0503' }
    ]
  }
];

// Demo Ticket Templates
const TICKET_TEMPLATES = [
  // Email Issues
  {
    summary: 'Email not syncing on mobile device',
    description: 'User reports that emails are not syncing properly on their iPhone. Emails appear on desktop but not mobile.',
    type: 'Incident',
    subtype: 'Email Problem',
    priority: 2, // Medium
    severity: 'Medium',
    impact: 'Medium',
    urgency: 'Medium'
  },
  {
    summary: 'Exchange server mailbox full error',
    description: 'Multiple users receiving "mailbox full" errors. Server storage may need expansion.',
    type: 'Incident',
    subtype: 'Email Problem',
    priority: 1, // High
    severity: 'High',
    impact: 'High',
    urgency: 'High'
  },
  
  // Network Issues
  {
    summary: 'Intermittent network connectivity issues',
    description: 'Users experiencing random disconnections from network resources. Affects productivity.',
    type: 'Incident',
    subtype: 'Network Problem',
    priority: 2,
    severity: 'Medium',
    impact: 'High',
    urgency: 'Medium'
  },
  {
    summary: 'VPN connection failing for remote users',
    description: 'Remote workers unable to connect to company VPN. Error message: "Authentication failed".',
    type: 'Incident',
    subtype: 'Network Problem',
    priority: 1,
    severity: 'High',
    impact: 'High',
    urgency: 'High'
  },
  
  // Hardware Issues
  {
    summary: 'Laptop hard drive making clicking noises',
    description: 'User reports their laptop is making unusual clicking sounds. SMART errors detected.',
    type: 'Incident',
    subtype: 'Hardware Issue',
    priority: 1,
    severity: 'High',
    impact: 'Medium',
    urgency: 'High'
  },
  {
    summary: 'Printer offline and not responding',
    description: 'Office printer shows offline status. Users unable to print important documents.',
    type: 'Incident',
    subtype: 'Hardware Issue',
    priority: 3,
    severity: 'Low',
    impact: 'Medium',
    urgency: 'Low'
  },
  
  // Software Issues
  {
    summary: 'QuickBooks database corruption error',
    description: 'Accounting software showing database corruption errors. Cannot access financial data.',
    type: 'Incident',
    subtype: 'Software Issue',
    priority: 1,
    severity: 'Critical',
    impact: 'High',
    urgency: 'High'
  },
  {
    summary: 'Microsoft Office activation issues',
    description: 'Office suite asking for reactivation on multiple computers. Licensing problem suspected.',
    type: 'Incident',
    subtype: 'Software Issue',
    priority: 2,
    severity: 'Medium',
    impact: 'Medium',
    urgency: 'Medium'
  },
  
  // Service Requests
  {
    summary: 'New user setup - access to shared folders',
    description: 'New employee needs access to company shared folders and network resources.',
    type: 'Service Request',
    subtype: 'User Access',
    priority: 3,
    severity: 'Low',
    impact: 'Low',
    urgency: 'Low'
  },
  {
    summary: 'Install Adobe Creative Suite on design workstation',
    description: 'Marketing team needs Adobe Creative Suite installed on new workstation for graphic design work.',
    type: 'Service Request',
    subtype: 'Software Install',
    priority: 3,
    severity: 'Low',
    impact: 'Low',
    urgency: 'Medium'
  },
  
  // Security Issues
  {
    summary: 'Suspected ransomware on workstation',
    description: 'Workstation showing signs of ransomware infection. Files being encrypted. URGENT.',
    type: 'Incident',
    subtype: 'Security Issue',
    priority: 1,
    severity: 'Critical',
    impact: 'Critical',
    urgency: 'Critical'
  },
  {
    summary: 'Employee clicked suspicious email link',
    description: 'User accidentally clicked on phishing email link. Need to check for malware infection.',
    type: 'Incident',
    subtype: 'Security Issue',
    priority: 2,
    severity: 'Medium',
    impact: 'Medium',
    urgency: 'High'
  }
];

// Priority Labels for your app
const PRIORITY_LABELS = {
  1: 'HIGH',
  2: 'MEDIUM', 
  3: 'LOW',
  4: 'LOW',
  5: 'LOW'
};

// Sample Engineers for assignment
const ENGINEERS = [
  'Sarah Chen',
  'Mike Johnson', 
  'Alex Rodriguez',
  'Marcus Thompson',
  'Jenny Williams',
  'David Kim'
];

// Sample Notes Templates
const NOTE_TEMPLATES = [
  'Initial assessment completed. Issue confirmed and documented.',
  'Contacted user to gather additional information about the problem.',
  'Remote session established. Beginning troubleshooting procedures.',
  'Issue appears to be related to recent Windows updates. Investigating compatibility.',
  'Temporary workaround implemented. Permanent solution in progress.',
  'Testing resolution with end user. Monitoring for 24 hours.',
  'Resolution confirmed working. Documenting solution for knowledge base.',
  'Ticket resolved. User satisfied with outcome. Closing ticket.'
];

class ConnectWisePopulator {
  constructor() {
    this.api = axios.create(CW_CONFIG);
    this.createdCompanies = [];
    this.createdContacts = [];
    this.createdTickets = [];
    this.boardInfo = null;
    this.availableStatuses = [];
    this.availableTypes = [];
    this.availablePriorities = [];
    this.companyTypes = [];
    this.companyStatuses = [];
    this.availableSites = [];
  }

  async initializeConnectWise() {
    try {
      console.log('🔧 Initializing ConnectWise configuration...');
      
      // Get first available board
      const boardResponse = await this.api.get('/service/boards');
      this.boardInfo = boardResponse.data[0];
      console.log(`   Using board: ${this.boardInfo.name} (ID: ${this.boardInfo.id})`);
      
      // Get board statuses
      const statusResponse = await this.api.get(`/service/boards/${this.boardInfo.id}/statuses`);
      this.availableStatuses = statusResponse.data;
      console.log(`   Found ${this.availableStatuses.length} statuses`);
      
      // Get board types
      const typeResponse = await this.api.get(`/service/boards/${this.boardInfo.id}/types`);
      this.availableTypes = typeResponse.data;
      console.log(`   Found ${this.availableTypes.length} ticket types`);
      
      // Get priorities
      const priorityResponse = await this.api.get('/service/priorities');
      this.availablePriorities = priorityResponse.data;
      console.log(`   Found ${this.availablePriorities.length} priorities`);
      
      // Get sites (required for companies)
      try {
        const siteResponse = await this.api.get('/system/info');
        // Try to get site info from system info
        console.log('   Getting site information...');
        
        // Alternative: try to get locations/sites
        try {
          const locationResponse = await this.api.get('/company/companies/1/sites');
          this.availableSites = locationResponse.data;
          console.log(`   Found ${this.availableSites.length} sites`);
        } catch (locError) {
          console.log('   No existing sites found, will create default site reference');
          // We'll use a default site structure
          this.availableSites = [{ id: 1, name: 'Main' }];
        }
      } catch (error) {
        console.log('   Using default site configuration');
        this.availableSites = [{ id: 1, name: 'Main' }];
      }
      
      // Get company types
      try {
        const companyTypeResponse = await this.api.get('/company/companies/types');
        this.companyTypes = companyTypeResponse.data;
        console.log(`   Found ${this.companyTypes.length} company types (will not use due to API version compatibility)`);
      } catch (error) {
        console.log('   Company types not available, will use defaults');
      }
      
      // Get company statuses
      try {
        const companyStatusResponse = await this.api.get('/company/companies/statuses');
        this.companyStatuses = companyStatusResponse.data;
        console.log(`   Found ${this.companyStatuses.length} company statuses (will not use due to API version compatibility)`);
      } catch (error) {
        console.log('   Company statuses not available, will use defaults');
      }
      
      console.log('✅ ConnectWise configuration loaded\n');
      
    } catch (error) {
      console.error('❌ Error initializing ConnectWise:', error.response?.data || error.message);
      throw error;
    }
  }

  async createCompany(companyData) {
    try {
      console.log(`Creating company: ${companyData.name}`);
      
      // Company structure with required site field
      const company = {
        identifier: companyData.identifier, // Required field!
        name: companyData.name,
        addressLine1: companyData.addressLine1,
        city: companyData.city,
        state: companyData.state,
        zip: companyData.zip,
        phoneNumber: companyData.phoneNumber,
        website: `www.${companyData.identifier.toLowerCase()}.com`,
        // Add required site field
        site: { 
          id: this.availableSites.length > 0 ? this.availableSites[0].id : 1,
          name: this.availableSites.length > 0 ? this.availableSites[0].name : 'Main'
        }
      };

      const response = await this.api.post('/company/companies', company);
      this.createdCompanies.push(response.data);
      console.log(`   ✅ Created company: ${response.data.name} (ID: ${response.data.id})`);
      
      // Create contacts for this company
      for (const contactData of companyData.contacts) {
        await this.createContact(response.data.id, contactData);
        await this.delay(300); // Small delay between contacts
      }
      
      return response.data;
    } catch (error) {
      console.error(`❌ Error creating company ${companyData.name}:`, error.response?.data || error.message);
      // Continue with next company instead of crashing
      return null;
    }
  }

  async createContact(companyId, contactData) {
    try {
      console.log(`   Creating contact: ${contactData.firstName} ${contactData.lastName}`);
      
      // Contact structure without direct email field - using communicationItems instead
      const contact = {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        title: contactData.title,
        company: { id: companyId },
        defaultFlag: this.createdContacts.filter(c => c.company?.id === companyId).length === 0,
        // Use communicationItems for email and phone
        communicationItems: []
      };

      // Add email as communication item
      if (contactData.email) {
        contact.communicationItems.push({
          type: { id: 1, name: 'Email' },
          value: contactData.email,
          defaultFlag: true
        });
      }

      // Add phone as communication item
      if (contactData.phone) {
        contact.communicationItems.push({
          type: { id: 2, name: 'Phone' },
          value: contactData.phone,
          defaultFlag: false
        });
      }

      const response = await this.api.post('/company/contacts', contact);
      this.createdContacts.push(response.data);
      console.log(`     ✅ Created contact: ${response.data.firstName} ${response.data.lastName}`);
      return response.data;
    } catch (error) {
      console.error(`     ❌ Error creating contact ${contactData.firstName} ${contactData.lastName}:`, error.response?.data || error.message);
      
      // Try alternative approach - create contact without communicationItems first
      try {
        console.log(`     🔄 Trying simplified contact creation...`);
        const simpleContact = {
          firstName: contactData.firstName,
          lastName: contactData.lastName,
          title: contactData.title,
          company: { id: companyId },
          defaultFlag: this.createdContacts.filter(c => c.company?.id === companyId).length === 0
        };

        const fallbackResponse = await this.api.post('/company/contacts', simpleContact);
        this.createdContacts.push(fallbackResponse.data);
        console.log(`     ✅ Created simplified contact: ${fallbackResponse.data.firstName} ${fallbackResponse.data.lastName}`);
        return fallbackResponse.data;
      } catch (fallbackError) {
        console.error(`     ❌ Fallback contact creation also failed:`, fallbackError.response?.data || fallbackError.message);
        return null;
      }
    }
  }

  async createTicket(companyId, contactId, template) {
    try {
      const randomEngineer = ENGINEERS[Math.floor(Math.random() * ENGINEERS.length)];
      const statuses = ['New', 'Assigned', 'In Progress', 'Waiting', 'Resolved'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      console.log(`     Creating ticket: ${template.summary}`);
      
      // Find matching status
      const targetStatus = this.availableStatuses.find(s => 
        s.name.toLowerCase().includes(randomStatus.toLowerCase()) ||
        s.name.toLowerCase() === randomStatus.toLowerCase()
      ) || this.availableStatuses[0];
      
      // Find matching type (or use first available)
      const targetType = this.availableTypes.find(t => 
        t.name.toLowerCase().includes(template.type.toLowerCase()) ||
        t.name.toLowerCase().includes('incident') ||
        t.name.toLowerCase().includes('service')
      ) || this.availableTypes[0];
      
      // Find matching priority
      const targetPriority = this.availablePriorities.find(p => 
        p.name.includes(`Priority ${template.priority}`) || 
        p.name.includes(`${template.priority}`) ||
        p.id === template.priority
      ) || this.availablePriorities[template.priority - 1] || this.availablePriorities[0];
      
      // Simplified ticket structure - remove problematic fields
      const ticket = {
        summary: template.summary,
        initialDescription: template.description,
        recordType: 'ServiceTicket',
        company: { id: companyId },
        contact: { id: contactId },
        board: { id: this.boardInfo.id },
        status: { id: targetStatus.id },
        type: { id: targetType.id },
        priority: { id: targetPriority.id }
        // Removed: severity, impact, urgency, resources, budgetHours, actualHours
        // These fields seem to cause API version conflicts
      };

      const response = await this.api.post('/service/tickets', ticket);
      this.createdTickets.push(response.data);
      console.log(`       ✅ Created ticket #${response.data.id}: ${template.summary}`);
      
      // Add some notes to make it realistic
      if (randomStatus !== 'New') {
        await this.addTicketNotes(response.data.id);
      }
      
      // Add time entries for in-progress tickets
      if (['In Progress', 'Waiting', 'Resolved'].includes(randomStatus)) {
        await this.addTimeEntry(response.data.id, randomEngineer);
      }
      
      return response.data;
    } catch (error) {
      console.error(`       ❌ Error creating ticket ${template.summary}:`, error.response?.data || error.message);
      // Continue with other tickets
      return null;
    }
  }

  async addTicketNotes(ticketId) {
    try {
      const numNotes = Math.floor(Math.random() * 3) + 1; // 1-3 notes
      
      for (let i = 0; i < numNotes; i++) {
        const noteTemplate = NOTE_TEMPLATES[Math.floor(Math.random() * NOTE_TEMPLATES.length)];
        
        // Fixed note structure - only set one flag to true
        const note = {
          text: noteTemplate,
          detailDescriptionFlag: true,  // Always true for detail description
          internalAnalysisFlag: false,  // Set to false
          resolutionFlag: false         // Set to false
        };

        await this.api.post(`/service/tickets/${ticketId}/notes`, note);
        await this.delay(200); // Small delay between notes
      }
    } catch (error) {
      console.error(`         ❌ Error adding notes to ticket ${ticketId}:`, error.response?.data || error.message);
    }
  }

  async addTimeEntry(ticketId, engineer) {
    try {
      const hours = Math.random() * 4 + 0.5; // 0.5 to 4.5 hours
      const startTime = new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000);
      const endTime = new Date(startTime.getTime() + hours * 60 * 60 * 1000);
      
      // Fixed time entry structure with proper date format
      const timeEntry = {
        chargeToId: ticketId,
        chargeToType: 'ServiceTicket',
        timeStart: startTime.toISOString().split('.')[0] + 'Z', // Remove milliseconds
        timeEnd: endTime.toISOString().split('.')[0] + 'Z',     // Remove milliseconds
        notes: `Troubleshooting and resolution work performed by ${engineer}.`,
        internalNotes: 'Technical details and investigation notes.',
        billableOption: 'Billable'
      };

      await this.api.post('/time/entries', timeEntry);
    } catch (error) {
      console.error(`         ❌ Error adding time entry to ticket ${ticketId}:`, error.response?.data || error.message);
    }
  }

  async populateDemo() {
    console.log('🚀 Starting ConnectWise demo population...\n');
    
    try {
      // Initialize ConnectWise configuration
      await this.initializeConnectWise();
      
      // Check for existing companies first
      console.log('🔍 Checking for existing demo companies...\n');
      await this.findExistingCompanies();
      
      // Create companies and contacts (skip if companies exist)
      console.log('📊 Creating companies and contacts...\n');
      for (const companyData of DEMO_COMPANIES) {
        const existingCompany = this.createdCompanies.find(c => c.identifier === companyData.identifier);
        
        if (existingCompany) {
          console.log(`Company ${companyData.name} already exists (ID: ${existingCompany.id}), creating contacts...`);
          
          // Create contacts for existing company
          for (const contactData of companyData.contacts) {
            await this.createContact(existingCompany.id, contactData);
            await this.delay(300);
          }
        } else {
          // Create new company
          const company = await this.createCompany(companyData);
          if (company) {
            await this.delay(1000); // Rate limiting
          }
        }
      }

      console.log(`\n✅ Working with ${this.createdCompanies.length} companies and ${this.createdContacts.length} contacts\n`);

      // Create tickets for each company
      console.log('🎫 Creating tickets for each company...\n');
      for (const company of this.createdCompanies) {
        const companyContacts = this.createdContacts.filter(c => c.company?.id === company.id);
        
        if (companyContacts.length === 0) {
          console.log(`   ⚠️  No contacts found for ${company.name}, skipping tickets`);
          continue;
        }
        
        const ticketsPerCompany = Math.floor(Math.random() * 16) + 5; // 5-20 tickets per company

        console.log(`   Creating ${ticketsPerCompany} tickets for ${company.name}...`);

        for (let i = 0; i < ticketsPerCompany; i++) {
          const randomTemplate = TICKET_TEMPLATES[Math.floor(Math.random() * TICKET_TEMPLATES.length)];
          const randomContact = companyContacts[Math.floor(Math.random() * companyContacts.length)];
          
          await this.createTicket(company.id, randomContact.id, randomTemplate);
          await this.delay(800); // Rate limiting - increased delay
        }
        
        console.log(`   ✅ Completed tickets for ${company.name}\n`);
      }

      console.log(`\n🎉 Demo population complete!`);
      console.log(`📊 Final Summary:`);
      console.log(`   - Companies: ${this.createdCompanies.length}`);
      console.log(`   - Contacts: ${this.createdContacts.length}`);
      console.log(`   - Tickets: ${this.createdTickets.length}`);
      
      // Save summary to file
      const summary = {
        companies: this.createdCompanies,
        contacts: this.createdContacts,
        tickets: this.createdTickets,
        priorityLabels: PRIORITY_LABELS,
        connectWiseConfig: {
          board: this.boardInfo,
          statusCount: this.availableStatuses.length,
          typeCount: this.availableTypes.length,
          priorityCount: this.availablePriorities.length
        },
        populationTimestamp: new Date().toISOString(),
        successfulCompanies: this.createdCompanies.length,
        successfulContacts: this.createdContacts.length,
        successfulTickets: this.createdTickets.length
      };
      
      fs.writeFileSync('connectwise-demo-data.json', JSON.stringify(summary, null, 2));
      console.log(`\n💾 Summary saved to connectwise-demo-data.json`);
      console.log(`\n🔗 You can now proceed with Make.com integration to sync this data to your application!`);

    } catch (error) {
      console.error('❌ Error during demo population:', error);
      process.exit(1);
    }
  }

  async findExistingCompanies() {
    try {
      // Try to find existing companies by searching for our identifiers
      for (const companyData of DEMO_COMPANIES) {
        try {
          const searchResponse = await this.api.get(`/company/companies?conditions=identifier="${companyData.identifier}"`);
          if (searchResponse.data && searchResponse.data.length > 0) {
            console.log(`   Found existing company: ${searchResponse.data[0].name} (ID: ${searchResponse.data[0].id})`);
            this.createdCompanies.push(searchResponse.data[0]);
          }
        } catch (searchError) {
          // Company doesn't exist, which is fine
          console.log(`   Company ${companyData.identifier} not found - will create new`);
        }
        await this.delay(200); // Small delay between searches
      }
    } catch (error) {
      console.log('   Could not search for existing companies, will attempt to create new ones');
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Run the population script
if (require.main === module) {
  const populator = new ConnectWisePopulator();
  populator.populateDemo()
    .then(() => {
      console.log('\n✨ Script completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Script failed:', error);
      process.exit(1);
    });
}

module.exports = ConnectWisePopulator;