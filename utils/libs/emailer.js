const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'finance_super_tracker@outlook.com',
        pass: 'finances_rocks00'
    }
});

module.exports = {
    SendVerification: async (data) => {
        try {
            const info = await transporter.sendMail({
                from: 'Finance Tracker Web <finance_super_tracker@outlook.com>',
                to: data.email,
                subject: 'YOUR ACCOUNT VERIFICATION CODE!!!',
                text: 'Automatic mailer',
                html: `<a href='localhost:3001/verification/${data.code}'>Verify your Email</a>`
            });

            console.log('Mensaje enviado:', info.messageId);

        } catch (error) {
            console.error(error);
        }
    },
    SendRecovery: async (email, code) => {
        try {
            const info = await transporter.sendMail({
                from: 'Finance Tracker Web <finance_super_tracker@outlook.com>',
                to: email,
                subject: 'YOUR PASSWORD RECOVERY!!!',
                text: 'Automatic mailer',
                html: `<a href='someroute/passwordrecovery/${code}'>Follow link to update your password</a>`
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
