var sms = require('../controllers/sms');
var mail = require('../controllers/mail');
require("dotenv").config({ path: ".env" });

exports.infoSendSMS = async (req, res, next) => {
  const { Message, PhoneNumber, token } = req.body
  //ensureToken,
  jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {

      let dataRes = sendSMS({ Message, PhoneNumber });
      //buscar infosend.id de user.id
      //enviar a infosend.push({ "send": 123645487, "phone": "", "sms": ""})
      res.json({
        text: 'protected and valid',
        dataRes
      })
    }
  });

}



exports.sendMsgOrEmail = async function (req, res, next) {
  jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { type } = req.body;
      if (type === 'sms') {
        const { message, phone } = req.body;
        let dataRes =  sendSMS(message, phone);
        console.log(dataRes);
         res.json(dataRes);
      } else if (type === 'email') {
        const respData =  mail.sendEmail(req, res, next);
        //  res.setHeader('Content-Type', 'application/x-www-form-urlencoded');        
         res.json(respData);
      } else {
         res.send('App send msg  servicio de comunicaciones')
      }
    }
  });
}

exports.infoSendMgsAndEmail = async function (req, res, next) {
  jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      /*** send  SMS*/
      const { message, phone } = req.body;
      let dataRes =  sendSMS(message, phone);
      console.log(dataRes);
       res.json(dataRes);

      /***** SEND EMAIL */
       res.json({
        info: 'mensajes enviado',
        phone: '',
        email: 'en'
      })
    }
  });
};

/********* servicio prestados por email y sms ************/
exports.infoSendEmail = async (req, resp, next) => {
  jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
       mail.sendEmail(req, resp, next);
    }
  });
};

exports.infoSendCountEmail = async (req, resp, next) => {
  jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
       mail.countEmail(req, resp, next);
    }
  });
};

exports.infoSendCountSMS =
  async (req, resp, next) => {
    jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
         sms.countSMS(req, resp, next);
      }
    });
  };

