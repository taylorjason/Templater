// src/defaultTemplates.js

const defaultTemplates = [
  {
    name: "Job Offer Email",
    category: "Finance",
    subCategory: "Recruitment",
    content:
      "Dear {candidate}, We are pleased to offer you the position of {role} starting on {startDate}.",
  },
  {
    name: "Meeting Reminder",
    category: "General",
    subCategory: "Scheduling",
    content:
      "Hi {planner}, this is a reminder for our meeting on {date} at {time}.",
  },
  {
    name: "Invoice Email",
    category: "Finance",
    subCategory: "Accounting",
    content:
      "Dear {client}, please find attached the invoice #{invoiceNumber} for {amount} due on {dueDate}.",
  },
  {
    name: "Project Update",
    category: "Project",
    subCategory: "Reporting",
    content:
      "Hi {team}, the project {projectName} has reached {milestone} milestone. Please review the attached report.",
  },
  {
    name: "Event Invitation",
    category: "Marketing",
    subCategory: "Promotions",
    content:
      "Dear {recipient}, you are invited to {eventName} on {eventDate} at {location}. RSVP by {rsvpDate}.",
  },
];

export default defaultTemplates;
