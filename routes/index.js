var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', async  (req, res, next) => {
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

    const anuncios = await Anuncio.lista(filtro, skip || 0, limit || 5, select, sort);

    
      res.render('index', { anuncios, paginacion: {nombre, venta, precio, tags, skip, limit} });
    
  } catch (err) {
    next(err);
  }
});




module.exports = router;
