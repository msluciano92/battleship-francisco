/**
 * CoordinateController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async setCoordinatesPlayer(req, res) {
        try {
            let inputs = {
                type1: 'JA',
                type2: 'CD',
                game_id: req.body.partida_id,
                x: req.body.x,
                y: req.body.y,
            };
            let resp = await sails.helpers.coodinates.setCoordinates.with(inputs);
            if (resp !== '¡Coordinate selected!') {
                coor = await sails.helpers.setCoordinateRandom.with({
                    partida_id: req.body.partida_id,
                    tipo: 'CA',
                });
                if (coor !== false) {
                    inputs = {
                        type1: 'CA',
                        type2: 'JD',
                        game_id: req.body.partida_id,
                        x: coor[0],
                        y: coor[1],
                    };
                    respCpu = await sails.helpers.coodinates.setCoordinates.with(inputs);
                } res.json(resp);
            } else {
                resp = '¡Coordinate selected! Please, enter a new coordinate.';
            }res.json(resp);
        } catch (e) {
            res.status(500).json(e);
        }
    },

    async setCoordinatesCpu(req, res) {
        try {
            const inputs = {
                type1: 'CA',
                type2: 'JD',
                game_id: req.body.partida_id,
                x: req.body.x,
                y: req.body.y,
            };
            res.json(await sails.helpers.coodinates.setCoordinates.with(inputs));
        } catch (e) {
            res.status(500).json(e);
        }
    },
};
