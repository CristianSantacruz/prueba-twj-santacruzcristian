/**
 * CelularController
 *
 * @description :: Server-side logic for managing Celulars
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  crearCelular: function (req, res) {
    var parametros = req.allParams();

    if (req.method == 'POST') {
      if (parametros.nombre && parametros.sistemaOperativo && parametros.version) {
        Celular.create({
          nombre: parametros.nombre,
          sistemaOperativo: parametros.sistemaOperativo,
          version: parametros.version
        }).exec(function (error, celularCreado) {
          if (error) return res.view('error', {
            title: 'Error',
            error: {
              descripcion: 'No se pudo ingresar el celular: ' + error,
              url: '/crearCelular'
            }
          });
          Celular.find().exec(function (error, celularesEncontrados) {
            if (error) return res.serverError();
            sails.log.info(celularesEncontrados);
            return res.view('Vistas/Celular/listarCelular', {
              title: 'Lista de Celulares',
              celulares: celularesEncontrados
            })
          });
        });
      } else {
        // bad Request
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No envió todos los parametros',
            url: '/crearCelular'
          }
        });
      }
    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el metodo HTTP',
          url: '/crearCelular'
        }
      });
    }
  },
  editarCelular: function (req, res) {
    var parametros = req.allParams();
    if (req.method == 'POST') {
      if (parametros.id) {
        Celular.update({
          id: parametros.id
        }, {
          sistemaOperativo: parametros.sistemaOperativo,
          version: parametros.version
        }).exec(function (error) {
          if (error) {
            return res.view('error', {
              title: 'Error',
              error: {
                descripcion: 'No se pudo editar al celular: ' + error,
                url: '/listarCelular'
              }
            });
          }

          Celular.find().exec(function (error, celularesEncontrados) {
            if (error) return res.serverError();
            return res.view('Vistas/Celular/listarCelular', {
              title: 'Lista de Celulares',
              celulares: celularesEncontrados
            })
          });
        });
      } else {
        return res.view('error', {
          title: 'Error',
          error: {
            descripcion: 'No envió todos los parametros',
            url: '/editarCelular'
          }
        });
      }
    } else {
      console.log('POST');
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en el método HTTP',
          url: '/editarCelular'
        }
      });
    }
  },
  borrarCelular: function (req, res) {
    var parametros = req.allParams();

    if (parametros.id) {

      Celular.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, celularEliminado) {
        if (errorInesperado) {
          return res.view('Vistas/Error', {
            error: {
              descripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarCelular"
            }
          });
        }
        Celular.find()
          .exec(function (errorIndefinido, celularesEncontrados) {

            if (errorIndefinido) {
              res.view('Vistas/Error', {
                error: {
                  descripcion: "No se pudo cargar los celulares",
                  rawError: errorIndefinido,
                  url: "/ListarCelular"
                }
              });
            }
            res.view('Vistas/Celular/listarCelular', {
              celulares: celularesEncontrados
            });
          })
      })

    } else {
      return res.view('Vistas/Error', {
        error: {
          descripcion: "Ingrese el ID para borrar el celular",
          rawError: "No envía ID",
          url: "/ListarCelular"
        }
      });
    }
  }
};

