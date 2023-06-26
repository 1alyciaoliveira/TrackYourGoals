const nodemailer = require('nodemailer');
const cred = require('../../email.json');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: cred.email,
        pass: cred.pass
    }
});

module.exports = {
    SendVerification: async (data) => {
        try {
            const info = await transporter.sendMail({
                from: 'Finance Tracker Web <finance_super_tracker@outlook.com>',
                to: data.email,
                subject: 'Please use the following verification code to complete your registration process.',
                text: 'Automatic mailer',
                html: `<h2>Your Verification Code:</h2><h3>${data.code}</h3>`
            });

            console.log('Mensaje enviado:', info.messageId);

        } catch (error) {
            console.error(error);
        }
    },
    SendRecovery: async (data) => {
        try {
            const info = await transporter.sendMail({
                from: 'Finance Tracker Web <finance_super_tracker@outlook.com>',
                to: data.email,
                subject: 'YOUR PASSWORD RECOVERY CODE!!!',
                text: 'Automatic mailer',
                html: `<h2>Your Recovery Code:</h2><h3>${data.code}</h3>`
            });

            console.log('Mensaje enviado:', info.messageId);

        } catch (error) {
            console.error(error);
        }
    },
    SendNotification: async (email, body) => {
        try {
            const info = await transporter.sendMail({
                from: 'Finance Tracker Web <finance_super_tracker@outlook.com>',
                to: email,
                subject: 'Transaction Alert!!',
                text: 'Automatic mailer',
                html: (body.isDeposit) ?
                    `<p>You have added ${body.quantity} to your ${body.goal} goal</p>` :
                    `<p>You have removed ${body.quantity} from your ${body.goal} goal</p>` ,
            });

            console.log('Mensaje enviado:', info.messageId);

        } catch (error) {
            console.error(error);
        }
    }

};