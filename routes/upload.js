const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const fs = require('fs');
  // Modelos
const Usuario = require('../models/usuario');
const Proveedor = require('../models/proveedor');
const Profesional = require('../models/profesional');
const ObraSocial = require('../models/obrasocial');
const Institucion = require('../models/institucion');
const EfectorSalud = require('../models/efectorsalud');
const Concurrente = require('../models/concurrente');
const AgendaContacto = require('../models/agendacontacto');
// default options
app.use(fileUpload());
  
app.put('/:tipo/:id', (req, res) => {

  const tipo = req.params.tipo;
  const id = req.params.id;

  // Tipos validos
  const tiposValidos = ['usuarios', 'profesionales', 'proveedores', 'instituciones', 'efectores', 'concurrentes', 'contactos', 'obrassociales'];
  if ( tiposValidos.indexOf( tipo ) < 0 ) {
    return res.status(400).json({
      ok: false,
      message: 'El tipo de coleccion es invalido',
      errors: { message: 'Debe seleccionar uno de estos tipos de coleccion ' + tiposValidos.join(', ' ) }
    })
  }


  if (!req.files) {
    return res.status(400).json({
      ok: false,
      message: 'No selecciono nada',
      errors: { message: 'Debe seleccionar un archivo primero' }
    })
  }
  // Obtener nombre del archivo
  const archivo  = req.files.imagen;
  const nombreArchivo = archivo.name.split('.');
  const extensionArchivo = nombreArchivo[nombreArchivo.length - 1];
  // Extensiones validas
  const extensionesValidas = ['png', 'jpg', 'gif', 'jpeg', 'pdf' ];

  if ( extensionesValidas.indexOf( extensionArchivo ) < 0 ) {
    return res.status(400).json({
      ok: false,
      message: 'La extension del archivo es invalida',
      errors: { message: 'Debe seleccionar un archivo con extension ' + extensionesValidas.join(', ' ) }
    })
  }

  // Nombre archivo personalizado
  const nombreArchivoPersonalizado = `${ id }-${new Date().getMilliseconds()}.${extensionArchivo}`;
  // Mover el archivo del temporal a un path
  const path = `./imagenes/${ tipo }/${nombreArchivoPersonalizado}`;

  archivo.mv( path, err => {
    if ( err ) {
      return res.status(500).json({
        ok: false,
        message: 'Error al mover el archivo',
        errors: err
      })
    }
    subirPorTipo(tipo, id, nombreArchivoPersonalizado, res);
    // res.status(200).json({
    //   ok: true,
    //   message: 'El archivo se movio correctamente',
    //   nombreArchivo: nombreArchivo
    // })

  })

  function subirPorTipo (tipo, id, nombreArchivoPersonalizado, res) {

    if ( tipo === 'usuarios' ) {
      Usuario.findById(id, (err, usuario) => {
        if ( !usuario ) {
          return res.status(400).json({
            ok: false,
            message: 'No hay un usuario con ese id',
            errors: err
          })
        }
        if ( err ) {
          return res.status(400).json({
            ok: false,
            message: 'Error',
            errors: err
          })
        }
         const pathViejo = './imagenes/usuarios/' + usuario.img;
         // Si existe, se elimina la imagen anterior
         if (fs.existsSync(pathViejo)) {
          fs.unlinkSync(pathViejo);
         }

         // asd
         usuario.img = nombreArchivoPersonalizado;
         usuario.save( (err, usuarioGuardado) => {
           usuarioGuardado.password = '';
          res.status(200).json({
            ok: true,
            message: 'Imagen del usuario actualizada',
            usuario: usuarioGuardado 
          })
         } )
      })
    }
    if ( tipo === 'usuarios' ) {

    }
    if ( tipo === 'usuarios' ) {

    }
    if ( tipo === 'usuarios' ) {

    }
    if ( tipo === 'usuarios' ) {

    }
    if ( tipo === 'usuarios' ) {

    }
    if ( tipo === 'usuarios' ) {

    }
    if ( tipo === 'usuarios' ) {

    }


  }
  

});
module.exports = app;