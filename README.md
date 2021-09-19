# NodePop

Esta Api esta pensada para dar un servicio de anuncios de compra o venta de artículos y permite buscar por distintos tipos de filtros.
Para ello hemos desarrollado un metodo Get para la busqueda con filtros tales como: rango de precios, tags, nombre, si esta o no en venta.
Mediante el metodo Post podemos dar de alta nuevos articulos, y se ha implementado un metodo Delete para el borrado de los mismos, existe tambien un metodo Put para la actulización de dichos articulos;
En su versión web podemos también visualizar las fotos de los articulos, aunque esta está pendiente de maquetar de forma más amigable.

## Para iniciar el proyecto ejecutar una vez clonado el repo:

```sh
npm install
```

Para instalarnos todas las dependecias necesarias

## Para arrancar el proyecto en modo desarrollo usamos:

```sh
npm run dev
```

## Inicializar la base de datos

Para inicializar la base de datos ejecutamos:

```sh
npm run initDB
```

## Rutas del API

Para obtener una lista de Anuncios:

### /api/anuncios/

- con los parametros skip y limit controlamos la paginación

- podemos filtrar por precio entre un rango, o dejarlo vacio y que nos liste todos los articulos, o buscar alguno con un precio en concreto.

Aun estamos en fase inicial del proyecto, por lo que se irán realizando mejoras al mismo conforme vayan surgiendo necesidades.
