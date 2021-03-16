var express = require('express');
const nodemailer = require('nodemailer');
var InfoSend = require('../controllers/infoSendController');
// var sms = require('../controllers/sms');
var mail = require('../controllers/mail');
var { verifyToken, login } = require('../auth');

var User = require('../controllers/userController');
var Account = require('../controllers/accountController');
const router = express.Router();



module.exports =  () => {
  router.get('/', function (req, res) {
    res.send('App SYNCHROX services ApiRest comunicaciones')
  })
  //******** endPoint user *********************
  router.get('/user', User.inicio);

  router.post('/user/registro', User.saveUser); //guarda el usuario infosend y acount  en la bd

  // router.post('/user/registro', register)

  router.post('/user/login', login);



  //*****************endpoint INFOSEND*************
  //Send sms ok
  router.post('/api/sendSMS', verifyToken,  InfoSend.infoSendSMS)

  //Send email ok
  router.post('/api/sendEmail', verifyToken, mail.sendEmail);

  //Send email or sms   
  router.post('/api/sendMsgOr', verifyToken, InfoSend.sendMsgOrEmail);

  //send email and sms infoSendMgsAnd 
  router.post('/api/infoSendMgsAnd', verifyToken, InfoSend.infoSendMgsAndEmail);

  //count email
  router.post('/api/countEmail', verifyToken, InfoSend.infoSendCountEmail);

  //count sms
   router.post('/api/countSms', verifyToken, InfoSend.infoSendCountSMS);

  
 //*****************endpoint ACCOUNT ***********************
  //al	Crear Account (inicia authorization:{data}, balance:{data}, payments:[], methodPay:[])
  //Editar account
  router.post('/api/account', verifyToken,  Account.editarAccount);
  
  //Editar Acount en push payments (agrega nuevo cargo a saldo en balance.avalaible, balance.sendSms :0, balance.sendEmail:0 )
  router.post('/api/account/payments', verifyToken,  Account.newPayment);
  
  //Editar Acount en push methodPay [] agrega una tarjeta de pago electrónico tarjeta de crédito
  router.post('/api/account/methodPay', verifyToken, Account.newCreditCard);
  
  return router;
}

