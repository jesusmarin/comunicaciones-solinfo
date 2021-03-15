const nodemailer = require('nodemailer');
var { transporter, transporterGmail, transporterOutLook } = require('./protocol')
const jwt = require('jsonwebtoken');
var { verDataToken } = require('../../auth');

exports.sendEmail = async (req, resp, next) => {
    const { services, name, email, objeto, message, contentHTML, phone } = req.body;
    data = {
        info: {},
        msg: '',
        name,
        email,
        phone,
        message,
        objeto,
        contentHTML
    };
    // console.log(' -> ',name, email, objeto, message, contentHTML, phone )  ;
    if (services === 'hotmail') {
        info = await transporterOutLook.sendMail({
            from: "Hotmail services 👻 <jesusmarin@outlook.es>",// '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email,// "contacto@edsur.com",//"bar@example.com, baz@example.com", // list of receivers
            subject: objeto, // Subject line
            text: message,//"Hello world?", // plain text body
            html: contentHTML,//"<b>Hello world?</b>", // html body
        });
    } else if (services === 'gmail') {
        info = await transporterGmail.sendMail({
            from: "Gmail Services  👻 <contacto@solinfo.com>",// '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email,// "contacto@edsur.com",//"bar@example.com, baz@example.com", // list of receivers
            subject: objeto, // Subject line
            text: message,//"Hello world?", // plain text body
            html: contentHTML,//"<b>Hello world?</b>", // html body
        });
    } else {
        info = await transporter.sendMail({
            from: "Solinfo services  👻 <contacto@solinfo.com>",// '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email,// "contacto@edsur.com",//"bar@example.com, baz@example.com", // list of receivers
            subject: objeto, // Subject line
            text: message,//"Hello world?", // plain text body
            html: contentHTML,//"<b>Hello world?</b>", // html body
        });
    }

    resp = (info) => {
        if (info.response.includes('250 OK')) {
            // el mensaje se envió correctamente
            console.log('El mensaje se envió correctamente -- 250 OK');
        } else {
            //No se envió el email
            console.log('Error en el envío del mensaje ');
        };
    };

    data.info = info;
    data.msg = info.messageId;
    // console.log('respuesta: ', data)
    return await data;


};


exports.countEmail = async (req, resp, next) => {
    console.log(req.token)
    jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            resp.sendStatus(403);
        } else {
            const { inicio, final } = req.body;
            const usertoken = verDataToken(req.token);
            resp.json({
                info: `correos enviado desde ${inicio} hasta ${final}`,
                sms: 0,
                usertoken
            });
        }
    });


};
