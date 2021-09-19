'use strict';

const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio');
const utils = require('../../lib/utils');


router.get('/', async (req, res, next) => {
    try {

        const nombre = req.query.nombre;
        const tags = req.query.tags;
        const venta = req.query.venta;
        const precio = req.query.precio;
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

      
    

     if (precio) {

          let precioMin = parseInt(utils.filtraPrecio(precio)[0])
          let precioMax = parseInt(utils.filtraPrecio(precio)[1])    
          filtro.precio = {$gte: precioMin, $lte: precioMax}
      }
        
 
    
    
    const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort);
    res.json({ results: anuncios});
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
