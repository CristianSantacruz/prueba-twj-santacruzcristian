/**
 * Aplicacion.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
      required: true
    },

    version: {
      type: 'integer',
      required: true
    },

    tamaño: {
      type: 'integer',
      required: true
    },

    idCelular:{
      model: 'Celular',
      required: true
    }
  }
};

