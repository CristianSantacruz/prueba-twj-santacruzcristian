
module.exports.routes = {

  'get /': 'RutasController.home',
  'get /Inicio': 'RutasController.home',

  'get /CrearCelular': 'RutasController.crearCelular',
  'get /EditarCelular': 'RutasController.editarCelular',
  'get /ListarCelular': 'RutasController.listarCelular',

  'get /CrearAplicacion': 'RutasController.crearAplicacion',
  'get /EditarAplicacion': 'RutasController.editarAplicacion',
  'get /ListarAplicacion': 'RutasController.listarAplicacion'

};
