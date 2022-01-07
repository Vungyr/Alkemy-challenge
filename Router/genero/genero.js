const router = require('express').Router();

const { Genero } = require('../../db');

//Detalle de Genero
router.get('/', async (req, res) =>{
    const gen = await Genero.findAll();
    res.json(gen);
});

//Alta de Genero
router.post('/', async (req, res) =>{
    const gen = await Genero.create(req.body);
    res.json(gen);
});

//Modificacion de Genero
router.put('/:id', async(req, res)=>{
    await Genero.update(req.body,{
        where: {  id: req.params.id }
    });
    res.json( { success: 'Se ha modificado exitosamente'})
});

//Eliminacion Fisica de Genero
router.delete('/:id', async(req, res) =>{
    await Genero.destroy({
        where: { id: req.params.id}
    });
    res.json ({ success: 'Se ha eliminado correctamente.'})
});


module.exports = router;
