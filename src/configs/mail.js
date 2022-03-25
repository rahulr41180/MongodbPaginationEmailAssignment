
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host : "smtp.mailtrap.io",
    port : "587",
    secure : false,
    auth : 
    {
        user : "641add156b35c3",
        pass : "1fbbf8e535fa2b",
    },

});

module.exports = transporter;