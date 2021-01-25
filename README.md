# SARGAS

This is the back-end of SARGAS project. This project was developed to help with the management, control and generation of storage tank sales contracts for a company.

In the past, such tasks were performed manually by the client, who has to edit text filesfor each new tank budget or contract.

Now, with the new application, the following topics have been developed:

1. Users CRUD;
2. Clients CRUD;
3. Trucks CRUD;
4. Products CRUD (Aerial Tank, Fuel Tank, Pipa Tank e Water Tank);
5. Authenticated access;
6. Budget creation;
7. Budget negotiation;
8. Sanding budget by e-mail;
9. Contract creation;
10. General settings;
11. Customization of budget and contract documents;
12. Automatic budget archiving and expiration;
13. Manual budget unarchiving.

## Used Technologies

* AdonisJS
* PostgreSQL
* Redis
* Sentry
* adonis-kue (https://github.com/nrempel/adonis-kue)
* handlebars (https://github.com/handlebars-lang/handlebars.js)
* pdf-creator-node (https://github.com/hajareshyam/pdf-creator-node)
* adonis-scheduler (https://github.com/nrempel/adonis-scheduler)

## How to Install and Run

1. ``` git clone https://github.com/rebeccapanisset/sargas_api.git ```
2. Open the project folder ``` cd sargas_api ```
3. ``` yarn install ``` (install all dependencies)

### Configuring .env

1. Make a copy of the base file ``` .env.example ``` and rename it to ``` .env ```
2. Fill the file ``` .env ``` with the necessary information
3. Run ``` adonis key:generate ``` to generate the application key

### Data Base and Migrations

1. Create a database (PostgreSQL) with the name 'sargas'
2. Run ``` adonis migration:run ``` to create the database tables
3. Run ``` adonis seed ``` to create a administrator user (the administrator credencials are registered in the '.env' file)

### Execution

1. Run ``` adonis serve ``` to start server, or run ``` adonis serve --dev ``` to start the development mode
2. Run ``` adonis kue:listen ``` to start the kue manager
3. Run ``` node ace run:scheduler ``` to start schedule

