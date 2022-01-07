function email(correo){

    const sgMail = require('@sendgrid/mail');
    const key = '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';
    
    sgMail.setApiKey(key);
    
    const message = {
        to:correo,
        from: 'viktor-1051@hotmail.com',
        subject: 'Alkemy challenge',
        text:'Registro realizado exitosamente!'
    
    }
    
    return (
    sgMail.send(message)
    .then((respose) => console.log("mensaje enviado"))
    .catch((err) => console.log(err)));
};

module.exports = {email};