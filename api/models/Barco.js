/**
 * Barco.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    attributes: {
        tablero_id: {
            type: 'number',
        },
        nombre: {
            type: 'string',
        },
        longitud: {
            type: 'number',
        },
        inicial_x: {
            type: 'string',
        },
        inicial_y: {
            type: 'string',
        },
        orientacion: {
            type: 'string',
        }, // V: vertical, H: horizontal
        direccion: {
            type: 'string',
        }, // L: left, R: rigth, T: top, B: bottom
        estado: {
            type: 'string',
            defaultsTo: 'Flota',
        },
    },
};
