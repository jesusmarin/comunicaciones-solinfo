const User = require('../model/user');
const bcryptjs = require('bcryptjs');
const infoSend = require('../model/infoSend');
const Account = require('../model/account');

exports.inicio = (req, res) => {
    res.json({
        success: 'Api rest con express y mongoDB : Modulo User'
    });
};

exports.saveUser = async (req, res) => {
    let dataError = 'El usuario o el correo electrónico ya existen';
    const newUser = new User(req.body);
    const { username, password } = req.body;
    newUser.created = new Date();
    if (newUser !== undefined) {
        try {
            newUser.password = newUser.password.toLowerCase();
            //email existe??
            const revisarEmail = await User.findOne({ "email": newUser.email.toLowerCase() });
            if (revisarEmail) throw new Error(dataError);

            //revisar existencia de username           
            const revisarUsername = await User.findOne({ username });
            if (revisarUsername) throw new Error(dataError);

            //encriptar password
            const salt = await bcryptjs.genSaltSync(10);
            newUser.password = await bcryptjs.hash(password, salt);
            //el usuario es guardado en la bd
            await newUser.save().then(() => {
                const enfoSend = {
                    usuarioId: newUser.id,
                    date: new Date(),
                    entidad: "",
                    modulo: "",
                    accion: "",
                    operator: "",
                    endPoint: "",
                    other: "",
                    sms: [],
                    email: []
                };
                const newInfoSend = new infoSend(enfoSend);
                newInfoSend.save().then(info => console.log('info save ')).catch(err => console.log(err))               
            }).then(() => {
                const laAccount = {
                    usuarioId: newUser.id,
                    authorization: {
                        isEnabled: true,
                        startDate: new Date(),
                        endingDate: new Date(),
                    },
                    balance: {
                        available: 0.00,
                        sendSms: 0,
                        sendEmail: 0
                    },
                    payments: [],
                    methodPay: []
                }
                try {                    
                    const newAccount = new Account(laAccount);
                    console.log( newAccount);            
                    newAccount.save().then(info => console.log('infoAccount')).catch(err => console.log(err));
                    console.log('SAVE ACCOUNT');
                } catch (error) {
                    console.log('catch error new Account ', error.message);                }
               

            }).then(() => {
                console.log('res json info');
                res.json({
                    msg: 'El cliente se agregó correctamente',
                    newUser
                });
            }).catch(err => console.log(error));

        } catch (error) {
            await res.json({
                dataInfo: 'Error proceso login Api rest Mensajeria ***',
                dataError,
                getError: error.message
            });
        }
    } else {
        res.json({
            msgError: 'Datos de usuario incorrectos : Modulo User'
        });
    }

};




