const router = require('express').Router();
const { Op } = require("sequelize");

const { Personaje } = require('../../db');
const { Pelicula } = require('../../db');

//Listado de Personaje
router.get('/', async (req, res) =>{

    var pers 
    if (req.query.nombre) {
        pers = await Personaje.findAll({ where: { nombre:{[Op.substring]: req.query.nombre} } });  

    }else {
        if (req.query.edad) {
            pers = await Personaje.findAll({ where: { edad:req.query.edad } });

        }else {
            if (req.query.peso) {
                pers = await Personaje.findAll({ where: { peso: req.query.peso } });

            }else {
                if (req.query.idMovie) {
                    pers = await Personaje.findAll({ include: [{ model: Pelicula, through:{ where: { peliculaId:req.query.idMovie} } }] });  
                    pers = pers.filter(pers => pers.peliculas.length > 0 );

                } else{
                    pers = await Personaje.findAll({ attributes:['nombre', 'imagen'] });
                }
            }
        }
    }

    res.json(pers);
});

//Detalles de Personaje
router.get('/Detalles', async (req, res) =>{
    let nomb = req.query.nombre;
    const pers = await Personaje.findOne({ where: { nombre:nomb } });
    const rel = await Personaje.findAll({ include: [{ model: Pelicula, through:{ where: { personajeId:pers.id} } }] });
    const relacion = rel.filter(rel => rel.peliculas.length > 0 );

    res.json(relacion);
});


//Alta de Personaje
router.post('/', async (req, res) =>{
    const pers = await Personaje.create(req.body);
    res.json(pers);
});


//Modificacion de Personaje
router.put('/:idPer', async(req, res)=>{
    await Personaje.update(req.body,{
        where: {  id: req.params.idPer }
    });
    res.json( { success: 'Se ha modificado exitosamente'})
});

//Eliminacion Fisica de Personaje
router.delete('/:idPer', async(req, res) =>{
    await Personaje.destroy({
        where: { id: req.params.idPer}
    });
    res.json ({ success: 'Se ha eliminado correctamente.'})
});


module.exports = router;