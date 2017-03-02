/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  home: function (req, res) {
    return res.view('Vistas/home', {
      title: 'Inicio'
    })
  },
  crearCelular: function (req, res) {
    return res.view('Vistas/Celular/crearCelular', {
      title: 'Crear Celular'
    })
  },
  editarCelular: function (req, res) {
    var parametros = req.allParams();
    console.log(parametros);
    if (parametros.id) {
      Celular.findOne({
        id: parametros.id
      }).exec(function (error, celularEncontrado) {
        if (error) return res.serverError();
        return res.view('Vistas/Celular/editarCelular', {
          title: 'Editar Celular - ' + celularEncontrado.nombre,
          celular: celularEncontrado
        })
      });

    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'No existe el ID'
        }
      });
    }
  },
  listarCelular: function (req, res) {
    Celular.find().exec(function (error, celularesEncontrados) {
      if (error) return res.serverError();
      sails.log.info(celularesEncontrados);
      return res.view('Vistas/Celular/listarCelular', {
        title: 'Lista de Celulares',
        celulares: celularesEncontrados
      })
    });
  },
  crearAplicacion: function (req, res) {
    Celular.find().exec(function (error, celularesEncontrados) {
      if (error) return res.serverError();
      return res.view('Vistas/Aplicacion/crearAplicacion', {
        title: 'Crear Aplicación',
        celulares: celularesEncontrados
      });
    });
  },
  editarAplicacion: function (req, res) {
    var parametros = req.allParams();
    console.log(parametros);
    if (parametros.id) {

      Aplicacion.findOne({
        id: parametros.id
      }).exec(function (error, aplicacionEncontrada) {
        if (error) return res.serverError();
        return res.view('Vistas/Aplicacion/editarAplicacion', {
          title: 'Editar mascota ',
          aplicacion: aplicacionEncontrada
        })
      });

    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'No existe el ID'
        }
      });
    }
  },
  listarAplicacion: function (req, res) {
    Aplicacion.find().populate("idCelular").exec(function (error, aplicacionesEncontradas) {
      if (error) return res.serverError();
      return res.view('Vistas/Aplicacion/listarAplicacion', {
        title: 'Lista de Aplicaciones',
        aplicaciones: aplicacionesEncontradas
      })
    });
  }
  };

