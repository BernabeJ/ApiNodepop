var express = require('express');
var router = express.Router();
const Anuncio = require('../models/Anuncio');
// const utils = require('../lib/utils');
 
/* GET home page. */
router.get('/', async  (req, res, next) => {
  try {

        const nombre = req.query.nombre;
        const tags = req.query.tags;
        const venta = req.query.venta;
        const precio =req.query.precio;
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

    
    let precios = precio.split('-');
    
    
    if (precio) {
         
          let precioMin =  Math.min.apply(null, precios)
          let precioMax =  Math.max.apply(null, precios) 
          filtro.precio = { $gte: precioMin, $lte: precioMax }
      
      }

    
      
    
      
      const anuncios = await Anuncio.lista(filtro, skip || 0, limit || 5, select, sort);
      
      
      res.render('index', { anuncios, pagination: {nombre, venta, precio, tags, skip, limit} });
      
    } catch (err) {
      next(err);
    }
  
});




module.exports = router;
