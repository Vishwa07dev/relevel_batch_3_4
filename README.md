# CRM application
This project is node.js back-end code for a customer relationship management application that can create users and tickets as well as manage them.

<br/>

## Features

>**Account creation**
- When you create a new user (customer or engineeer), an account verification link will be sent to e-mail address provided.
- Verification link is valid for a limited time only.
- If the user is a customer, the account will autometically be approved on verification.
- In case of Engineer, an admin will have to approve the account.
- JSON Web Token used for authentication
- User can reset forgotten password by getting an email link to reset the password
- Users can also update some details like name and password
- User search is also available for users with proper authorization

>**Ticket creation**
- When a new ticket is created, an engineer with least open tickets is assigned to it. (if available)
- On new ticket creation, a notification email is sent to admin, ticket reporter and assigned engineer.
- Users can get all the tickets connected to their account.
- Ticket details can be updated only by related parties.
- Ticket Engineer can only be reassigned by the admin

<br/>

## Dependencies
|npm modules|
|-|
|express|
|mongoose|
|jsonwebtoken|
|node-rest-client|
|dotenv|
|bcryptjs|

<br/>

## REST API paths

>**User creation**

- **Sign-up**<br/>
`POST /crm/api/v2/auth/signup`<br/>
Register user with name, userId, email, password and user type.<br/><br/>

- **Sign-in**<br/>
`POST /crm/api/v2/auth/signin`<br/>
User Sign-in using userId and password.<br/><br/>

- **Account verification**<br/>
`GET /crm/api/v2/auth/verifyemail/:token`<br/>
Account verification by using the link provided to the registered email address.<br/><br/>

- **Resend verification link**<br/>
`GET /crm/api/v2/auth/resendverificationemail/:token`<br/>
Resend the verificaion link to email in case the link is not received or has expired.<br/><br/>

>**User operations**

- **Get all users (Query params userType and userStatus supported)**<br/>
`GET /crm/api/v2/users`<br/>
An admin can get a list of all users. The list can also be filtered by userType and userStatus.<br/><br/>

- **Get user by userId**<br/>
`get /crm/api/v2/users/:id`<br/>
A user or an admin can get the data of the user.<br/><br/>

- **Update user data**<br/>
`PUT /crm/api/v2/users/:id`<br/>
A user or an admin can update the data of the user.<br/><br/>

- **Forgot user password**<br/>
`GET /crm/api/v2/users/resetpassword/:id`<br/>
User can get an email link to reset their forgotten password.<br/><br/>

- **Reset password**<br/>
`PUT /crm/api/v2/users/resetpassword/:token`<br/>
Updating user password by using the link provided to the registered email address.<br/><br/>

>**Ticket creation and operations**

- **Create new ticket**<br/>
`POST /crm/api/v2/tickets/`<br/>
Any user can raise a ticket.<br/><br/>

- **Get all tickets (query param status supported)**<br/>
`Get /crm/api/v2/tickets/`<br/>
A user can get a list of tickets attached to their account. An admin can get a list of all tickets. The list can also be filtred by it's status.<br/><br/> 

- **Update ticket**<br/>
`Put /crm/api/v2/tickets/:id`<br/>
The ticket can be updated by related parties.