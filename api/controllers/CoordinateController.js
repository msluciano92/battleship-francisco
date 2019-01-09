/**
 * CoordinateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async setCoordinatesPlayer(req, res) {
        try {
            const inputs = {
                type1: 'JA',
                type2: 'CD',
                game_id: req.body.partida_id,
                x: req.body.x,
                y: req.body.y,
            };
            const result = await sails.helpers.coodinates.setCoordinates.with(inputs);
            if (result.msj !== '¡Coordinate selected!') {
                const coor = await sails.helpers.setCoordinateRandom.with({
                    partida_id: req.body.partida_id,
                    tipo: 'CA',
                });
                if (coor !== false) {
                    const inputsParam = {
                        type1: 'CA',
                        type2: 'JD',
                        game_id: req.body.partida_id,
                        x: coor[0],
                        y: coor[1],
                    };
                    await sails.helpers.coodinates.setCoordinates.with(inputsParam);
                }
                return res.status(result.status).json(result);
            }
            result.msj = '¡Coordinate selected! Please, enter a new coordinate.';
            return res.status(result.status).json(result);
        } catch (e) {
            return res.status(500).json(e);
        }
    },

};
