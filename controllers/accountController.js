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
    jwt.verify(res.token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
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