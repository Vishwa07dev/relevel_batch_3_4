require('dotenv').config();

const Client = require('node-rest-client').Client;

const client = new Client();

module.exports = (subject, content, recepients, requester)=>{
    const reqBody = {
        subject : subject,
        recepientEmails : recepients,
        content : content,
        requester : requester
    }

    const reqHeader = {
        "Content-Type" : "application/json"
    }

    const args = {
        data : reqBody,
        headers : reqHeader
    }

    try{
        client.post(process.env.NOTIFICATIONSERVICE_URL, args, (data,res)=>{
            console.log("#### Notification request sent #### ", data);
        })
    }catch(err){
        console.log(err.message);
    }
}