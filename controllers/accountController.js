const jwt = require('jsonwebtoken');
var { verDataToken } = require('../auth');

exports.inicio = (req, res, next) => {
    jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                success: 'Api rest con express y mongoDB : inicio account'
            });
        }
    });
};

exports.editarAccount = async (req, res, next) => {
    jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                success: 'Api rest con express y mongoDB : Editar Cuenta'
            });
        }
    });
};

exports.newPayment = async (req, res, next) => {
   const dataPay = {
        date: 1613749143,
        amount: 1000.50,
        spent: 980.50,
        reference: "",
        information: "",
        code: "",
        numberCard:""
    }
    const data = req.body;

    await jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
        const userData = verDataToken(req.token);
        console.log('userData id: ', userData._id)


        //buscar objeto account.usuarioId  (userData._id)
        //retorna un objeto account
        //account.payments.push(dataPay)


        if (err) {
            console.log('object =>')
            res.sendStatus(403);
        } else {
            res.json({
                success: 'Api rest con express y mongoDB : Nuevo pago, agrega saldo a la cuenta '
            });
        }
    });
};

exports.newCreditCard = async (req, res, next) => {
    jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                success: 'Api rest con express y mongoDB : nuevo registro de tarjeta '
            });
        }
    });

};