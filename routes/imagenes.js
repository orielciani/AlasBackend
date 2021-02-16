const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/:tipo/:imagen', (req, res) => {
    let tipo = req.params.tipo;
    let imagen = req.params.imagen;
    let path = `./imagenes/${ tipo }/${ imagen }`;

    fs.exists(path, existe => {

        if (!existe) {
            path = './imagenes/xxx.jpg';
        }


        res.sendfile(path);

    });

});
module.exports = app;