
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
// var fetchUrl = require("fetch").fetchUrl;
var fetch = require("fetch");
require("dotenv").config({ path: ".env" });
const User = require('../model/user');

let user = {};
let secretKey = '';
let expiresIn = '1h';

const createToken = (user, SECRET_KEY, expiresIn) => {
    const { _id, email, username, usuario } = user;
    const payload = { _id, email, username, usuario }
    // console.log('user en token ', user)
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

exports.verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {      
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        // console.log(req.token);
        next();
    } else {
        
       
        res.sendStatus(403);
    }
};

exports.verDataToken = (token) => {
    return jwt.decode(token);
};

exports.getPasswordEncriptado = (pass) => {
    // const salt = await bcryptjs.genSaltSync(10);
    // newUser.password = await bcryptjs.hash(password, salt);
    return '';
};


exports.register = (req, resp, next) => {
    const usuario = req.body;
    resp.json({
        msg: 'registro de usuario',
        usuario
    })
};
exports.login = async (req, resp, next) => {
    const { email, password } = req.body;
    // console.log(process.env.SECRET_KEY);
    email.toLowerCase();
    //usuario existe
    const userFound = await User.findOne({ email });
    if (!userFound) throw new Error('email de usuario no existe o contraseña');

    //se encripta el passwor enviado para comparar
    // const salt = await bcryptjs.genSaltSync(10);
    const passwordSucess = await bcryptjs.compare(password, userFound.password);
    if (!passwordSucess) throw new Error('email de usuario  o contraseña no corresponden');


    // const token = createToken(userFound, process.env.SECRET_KEY, "2");;
    const token = createToken(userFound, process.env.SECRET_KEY, expiresIn);;//expira en 10 mintoss
    // console.log(token)
    await resp.json({
        token,
        success: 'El cliente se validó correctamente'

    });
};


const getUsuario = fetch.fetchUrl('http://localhost:4001/login/:user', async (error, meta, body) => {
    // console.log('ok 200 getUsuario fetch');
    return await ({
        msg: 'peticion fetch'
    })
});

//req, resp, next  
const getToken = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '12h' }, (err, token) => {
    //console.log(token);
    return { token };
});


