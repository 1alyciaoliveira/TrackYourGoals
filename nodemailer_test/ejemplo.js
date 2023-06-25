"use strict";
const nodeMailer = require('nodemailer'); 

//aqui va template literal 
const htmeles = `
<h1>Ejemplo Node Mailer</h1>
<p>Nodmailer es sensacional</p> 
`;

async function main(){
    const transporter = nodeMailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: true,
        auth: {
            user: 'finance_super_tracker@outlook.com',
            pass: 'finances_rocks00'
        }
    });
    
    
        const estafeta = await transporter.sendMail({
            from: 'Don_finance_tracker <finance_super_tracker@outlook.com>',
            to: "1alycia.oliveira@gmail.com, sokidab922@aramask.com, 3dnuevoleon@gmail.com",
            subject: "Hola ✔",
            text: "Testing nodemailer",
            html: htmeles,
        });
        console.log("mensaje enviado", estafeta.messageId);
    }
    main()
    .catch(e => console.error(e));
