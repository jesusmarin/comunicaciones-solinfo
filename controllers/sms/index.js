const AWS = require('aws-sdk');


const credentials = {
    id: "AKA",
    key_secret: "pkpa"

}

// Set region
AWS.config.update({
    region: 'sa-east-1',  // 'us-east-1',//sa-east-1
    accessKeyId: credentials.id,
    secretAccessKey: credentials.key_secret

});

// Create publish parameters
let params = {
    Message: 'Mensaje con api sns aws, UN SALUDO para juanjo', /* required */
    PhoneNumber: '+573044793865',
};

function sendSMS_(params) {
    var publishTextPromise = new AWS.SNS().publish(params).promise();
    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(function (data) {
        console.log("MessageID is " + data.MessageId);
    }).catch(function (err) {
        console.error(err, err.stack);
    });
}

//sendSMS(params);



exports.sendSMS = (props) => {
    dataMsg = {
        msg: 'mensaje enviado correctamente',
        msgId: '',
        Message: props.Message,
        PhoneNumber: props.PhoneNumber
    };
    var publishTextPromise = new AWS.SNS().publish(props).promise();
    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(function async(data) {
        console.log('MesasageId', data.MessageId);
        dataMsg.msgId = data.MessageId;
        dataMsg.msg = 'mensaje enviado correctamente',
        dataMsg.Message = props.Message,
        dataMsg.PhoneNumber = props.PhoneNumber

    }).catch(function (err) {
        console.error(err, err.stack);
        dataMsg.msg = 'error en el envio de mensaje';
    });

    return dataMsg;
}

exports.countSMS = async (req, res, next) => {
    const {inicio, final} = req.body;
    await res.json({
      info:`mensajes enviado desde ${inicio} hasta ${final}`,
      sms:0
    });
}