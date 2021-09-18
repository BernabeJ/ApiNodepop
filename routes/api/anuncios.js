'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');


router.get('/', async (req, res, next) => {
    try {

        const nombre = req.query.nombre;
        const tags = req.query.tags;
        const venta = req.query.venta;
        const precio = parseInt(req.query.precio);
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const select = req.query.select; // campos
        const sort = req.query.sort;

        const filtro = {};

    if (nombre) {
      filtro.nombre = nombre;
    }

    if (tags) {
        filtro.tags = tags;
    }
    
    if (venta) {
        filtro.venta = venta;
    }
    
    if (precio >= 10 && precio <= 50) {
        filtro.precio = {$gte: 10, $lte:50}
    }
    
    if (precio > 100 ) {
        filtro.precio = {$gte: 100}
    }
        
    if (precio <500) {
        filtro.precio = {$lte:500}
    }
    
    if (precio >5000) {
        filtro.precio = {$gte:5000}
    }

    const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort);
    res.json({ results: anuncios });
  } catch (err) {
    next(err);
  }
});

//POST /api/anuncios(body)
// Crear un anuncio

router.post('/', async (req, res, next) => {
    try {

        const anuncioData = req.body;
        const anuncio = new Anuncio(anuncioData); //creo un objeto de tipo Anuncio en Memoria
        const anuncioCreado = await anuncio.save(); // Lo guardo en la base de datos
        res.status(201).json({ anuncioCreado });

    } catch (err) {
        next(err)
    }
});

//DELETE /api/anuncios:id
// Elimina un anuncio
router.delete('/:id', async (req, res, next) => {
    try {
        
        const _id = req.params.id;
        await Anuncio.deleteOne({ _id: _id });
        res.json();

    } catch (err) {
        next(err);
    };
});

//PUT /api/anuncios:id (body)
//Actualizar un anuncio

router.put('/:id', async (req, res, next) => {
    try {
      
        const _id = req.params.id;
        const anuncioData = req.body;
        const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: _id }, anuncioData, {
            new: true, // esto es para que me devuelva el estado final del documento del anuncio
        });

        if (!anuncioActualizado) {
            res.status(404).json({ error: 'not found' });
            return
        }
        res.json({ result: anuncioActualizado });

    } catch (err) {
        next(err);
    };
})




module.exports = router;
