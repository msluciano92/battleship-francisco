/**
 * Coordenada.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tablero_id: {
      type: 'number',
    },
    x: {
      type: 'string',
    },
    y: {
      type: 'string',
    },
    value: {
      type: 'number',
    },
  },
};
