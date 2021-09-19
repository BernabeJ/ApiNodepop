'use strict';

function isAPIRequest(req) {
  return req.originalUrl.startsWith('/api/') 
}

const priceSplitter = (rangoPrecio) => {
    let precios =  rangoPrecio.split('-');
    precios.sort(function(a,b){return})
    if(precios.length < 2){
      precios = [0, ...precios]
    }
    return precios
}

module.exports = {
  priceSplitter, isAPIRequest
}

