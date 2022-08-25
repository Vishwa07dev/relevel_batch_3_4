require('dotenv').config();
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const sendEmail = require('./notificationClient')
const admin = "dharmitmailer+crmadmin@gmail.com"

exports.accountVerification = (user)=>{
    let token = jwt.sign({id: user._id, purpose: "accountVerification"}, authConfig.secret); // no expiery because we can decode it to get id to resend link if time expired
    sendEmail(
        `Email varification link`,
        `Please verify your account by visiting this link. ${process.env.APP_URL}/crm/api/v2/auth/verifyemail/${token}`,
        user.email,
        "CRM app"
    );
}

exports.ticketCreated = (ticket, reporter, assignee)=>{
    sendEmail(    //sending email notification to all stakeholders
    `New ticket created by ${reporter.userType} ${reporter.name}`,
    `Ticket title is ${ticket.title}`,
    `${admin}, ${reporter.email}, ${assignee.email}`,
    "CRM app"
    );
}

exports.ticketUpdated = (ticket, reporter, assignee)=>{
    sendEmail(    //sending email notification to all stakeholders
    `Ticket id: ${ticket._id} updated`, 
    `Ticket title is ${ticket.title}`, 
    `${admin}, ${reporter.email}, ${assignee.email}`, 
    "CRM app"
    );
}

exports.resetPassword = (user)=>{
    let token = jwt.sign({id: user._id, purpose: "resetPassword"}, authConfig.secret); // no expiery because we can decode it to get id to resend link if time expired
    sendEmail(
        `Password reset link`,
        `Reset your password by visiting this link. ${process.env.APP_URL}/crm/api/v2/users/resetpassword/${token}`,
        user.email,
        "CRM app"
    )
}