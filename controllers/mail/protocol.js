const nodemailer = require('nodemailer');

exports.transporterGmail = nodemailer.createTransport({
    // service:'gmail',
     host: "smtp.gmail.com",
     port: 465,//
     secure: true, // true for 465, false for other ports
    auth: {
        user: 'jesushernanmarin@gmail.com', // generated ethereal user
        pass: 'Primaver41234', //ok generated ethereal password
    },
     tls: {
         rejectUnauthorized: false
    }
});


exports.transporterOutLook = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'jesusmarin@outlook.es',
        pass: 'Adell3123+'//ok
    }
});

exports.transporter = nodemailer.createTransport({
    // service:'gmail',
     host: "smtp.gmail.com",
     port: 465,//
     secure: true, // true for 465, false for other ports
    auth: {
        user: 'viacreativa@gmail.com', // generated ethereal user
        pass: 'Adell3123()+', // ok generated ethereal password
    },
     tls: {
         rejectUnauthorized: false
    }
});