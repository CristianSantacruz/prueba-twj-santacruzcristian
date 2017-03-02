/**
 * AplicacionController
 *
 * @description :: Server-side logic for managing Aplicacions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearAplicacion: function (req, res) {
    var parametros = req.allParams();
    if (req.method == 'POST') {
      if (parametros.nombre && parametros.version && parametros.tamaño && parametros.idCelular) {
        Aplicacion.create({
          nombre: parametros.nombre,
          version: parametros.version,
          tamaño: parametros.tamaño,
          idCelular: parametros.idCelular
        }).exec(function (error, aplicacionCreada) {
          if (error) return res.view('error', {
            title: 'Error',
            error: {
              descripcion: 'No se pudo ingresar la aplicación: ' + error,
              url: '/crearAplicacion'
            }
          });
          Aplicacion.find().populate("idCelular").exec(function (error, aplicacionesEncontradas) {
            if (error) return res.serverError();
            sails.log.info(aplicacionesEncontradas);
            return res.view('Vistas/Aplicacion/listarAplicacion', {
              title: 'Lista de Aplicaciones',
              aplicaciones: aplicacionesEncontradas
            })
          });
        });
      } else {
        // bad Request
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No envió todos los parametros',
            url: '/crearAplicacion'
          }
        });
      }
    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/crearAplicacion'
        }
      });
    }
  },
  editarAplicacion: function (req, res) {
    var parametros = req.allParams();
    if (req.method == 'POST') {
      if (parametros.id) {
        Aplicacion.update({
          id: parametros.id
        }, {
          version: parametros.version,
          tamaño: parametros.tamaño
        }).exec(function (error) {
          if (error) {
            return res.view('error', {
              title: 'Error',
              error: {
                descripcion: 'No se pudo editar la aplicacion: ' + error,
                url: '/listarAplicacion'
              }
            });
          }

          Aplicacion.find().populate("idCelular").exec(function (error, aplicacionesEncontradas) {
            if (error) return res.serverError();
            return res.view('Vistas/Aplicacion/listarAplicacion', {
              title: 'Lista de Aplicaciones',
              aplicaciones: aplicacionesEncontradas
            })
          });
        });
      } else {
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No envió todos los parametros',
            url: '/editarAplicacion'
          }
        });
      }
    } else {
      console.log('POST');
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el método HTTP',
          url: '/editarAplicacion'
        }
      });
    }
  },
  borrarAplicacion: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {
      Aplicacion.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, aplicacionEliminada) {
        if (errorInesperado) {
          return res.view('Vistas/Error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarAplicacion"
            }
          });
        }
        Aplicacion.find().populate("idCelular")
          .exec(function (errorIndefinido, aplicacionesEncontradas) {
            if (errorIndefinido) {
              res.view('Vistas/Error', {
                error: {
                  descripcion: "No se pudo cargar las aplicaciones",
                  rawError: errorIndefinido,
                  url: "/ListarAplicacion"
                }
              });
            }
            res.view('Vistas/Aplicacion/listarAplicacion', {
              aplicaciones: aplicacionesEncontradas
            });
          })
      })
    } else {
      return res.view('Vistas/Error', {
        error: {
          descripcion: "Ingrese el ID para borrar la aplicación",
          rawError: "No envía ID",
          url: "/ListarAplicacion"
        }
      });
    }
  }
};
