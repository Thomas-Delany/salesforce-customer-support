# Customer Support Salesforce Integration

This is a Salesforce DX project that serves as the backend for a Customer Support Portal. It allows support agents to view, manage, and resolve cases submitted from an external Laravel frontend via Salesforce's REST API.

In essence, this project is a simple, full-stack ticketing system that simulates how real companies handle customer support requests through a web form, storing and managing those requests inside Salesforce — a widely-used CRM platform.

# How it works

1. Customer visits Laravel site → Submits support form

2. Laravel → Sends POST request to Salesforce REST API

3. Salesforce → Receives, stores as a Case object

4. Support Agent (logged into Salesforce) → Views the Case in the LWC dashboard

5. Agent → Responds, resolves, updates Case status


## 🧩 Technologies Used

- Apex (backend logic)
- Lightning Web Components (UI)
- SOQL / SOSL (queries)
- DML (data manipulation)
- Salesforce REST API
- Laravel (external integration which included blade directives, PHP, HTML, Bootstrap for styling, a controller file and a route)

## 🧱 Features

- REST API for external case submission
- LWC dashboard to view and filter support tickets
- Apex logic for ticket assignment and notifications
- Case search using SOSL

Submit a ticket from either "anglossa.com/support" (English site) or "es.anglossa.com/support" (Spanish site) like this: 

<img width="1802" height="793" alt="submit-ticket" src="https://github.com/user-attachments/assets/ee159b7f-56d3-4cd4-82a2-5f073c6bc143" />

A support agent who is logged into Salesforce can manage all the tickets that were submitted from the support ticket like so: 

<img width="1872" height="842" alt="salesforce-ticket" src="https://github.com/user-attachments/assets/3062c079-e1c8-4b98-860f-2860ba8f29e1" />



