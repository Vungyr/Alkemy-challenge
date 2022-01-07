const router = require('express').Router();
const { Op } = require("sequelize");

const { Pelicula } = require('../../db');
const { Personaje } = require('../../db');
const { Genero } = require('../../db');
const moment = require("moment")


//Listado de Peliculas
router.get('/', async (req, res) =>{

    var peli 

    if (req.query.titulo) {
        peli = await Pelicula.findAll({ where: { titulo:{[Op.substring]: req.query.titulo} } });  

    } else {

        if (req.query.idGenero) {
            peli = await Pelicula.findAll({ include: [{ model: Genero, through:{ where: { generoId:req.query.idGenero} } }] });  
            peli = peli.filter(peli => peli.generos.length > 0 );

        } else{
            peli = await Pelicula.findAll({ attributes:['titulo', 'imagen', 'fecha_creacion'] });
        }
    }
   
    if (req.query.order === 'ASC'){

        peli = peli.sort((a, b) => moment(a.fecha_creacion) - moment(b.fecha_creacion));
    }else{
        if(req.query.order === 'DESC'){
            peli = peli.sort((a, b) => moment(b.fecha_creacion) - moment(a.fecha_creacion));
    
        }
    }
    
    res.json(peli);
});

//Detalle de Peliculas
router.get('/Detalles', async (req, res) => {
    
    const pel = await Pelicula.findOne({ where: { titulo:{[Op.substring]: req.query.titulo} } });
    const rel = await Pelicula.findAll({ include: [{ model: Personaje, through:{ where: { peliculaId:pel.id} } }] });
    const relacion = rel.filter(rel => rel.personajes.length > 0 );

    res.json(relacion);        
});


//Alta de Peliculas
router.post('/', async (req, res) => {
    const peli = await Pelicula.create(req.body);
    res.json(peli);
});

//Modificacion de Peliculas
router.put('/:id', async (req, res) => {
    await Pelicula.update(req.body, {
        where: { id: req.params.id }
    });
    res.json({ success: 'Se ha modificado exitosamente' })
});

//Eliminacion Fisica de Peliculas
router.delete('/:id', async (req, res) => {
    await Pelicula.destroy({
        where: { id: req.params.id }
    });
    res.json({ success: 'Se ha eliminado correctamente.' })
});

module.exports = router;