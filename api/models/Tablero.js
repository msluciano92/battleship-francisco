/**
 * Tablero.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    partida_id: {
      type: 'number',
    },
    tipo: {
      type: 'string',
    },
  },
};
