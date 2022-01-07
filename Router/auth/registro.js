const router = require('express').Router();
const bcrypt = require ('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');

const { Usuario } = require('../../db');
const { email } = require('../sendgrid');
const { check, validationResult } = require('express-validator');


router.post('/registro', [
    check('nombre_usuario', 'El nombre de usuario es obligatorio'). not().isEmpty(),
    check('contraseña', 'La constraseña debe ser obligatorio').not().isEmpty(),
    check('email', 'El correo electronico es obligatorio').isEmail()
],async(req, res) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errores: errors.array() })
    };

    email(req.body.email);
    req.body.contraseña = bcrypt.hashSync(req.body.contraseña, 10);
    const user =  await Usuario.create(req.body);
    res.json(user);
});

router.post('/login', async (req, res) =>{
    const user = await Usuario.findOne( { where: { email: req.body.email } });
    if (user) {
        const iguales = bcrypt.compareSync(req.body.contraseña, user.contraseña);
        if (iguales){
            res.json ({ success: createToken(user)});
        }else{
            res.json( {error: 'Error en usuario y/o contraseña'});
        }
    }else{
        res.json( {error: 'Error en usuario y/o contraseña'});
    }

});

const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutos').unix()
    }
    return jwt.encode(payload, 'passw');
}


module.exports = router;
