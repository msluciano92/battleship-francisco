module.exports = {

    async createShipPlayer(req, res) {
        try {
            const inputs = {
                tipe: 'JD',
                game_id: req.body.partida_id,
                x: req.body.inicial_x,
                y: req.body.inicial_y,
                long: req.body.longitud,
                orientation: req.body.orientacion,
                address: req.body.direccion,
                name: req.body.nombre,
            };
            const result = await sails.helpers.ship.createShip.with(inputs);
            return res.status(result.status).json(result);
        } catch (e) {
            return res.status(500).json(e);
        }
    },

    async createShipCpu(req, res) {
        try {
            const inputs = {
                tipe: 'CD',
                game_id: req.body.partida_id,
                x: req.body.inicial_x,
                y: req.body.inicial_y,
                long: req.body.longitud,
                orientation: req.body.orientacion,
                address: req.body.direccion,
                name: req.body.nombre,
            };
            const result = await sails.helpers.ship.createShip.with(inputs);
            return res.status(result.status).json(result);
        } catch (e) {
            return res.status(500).json(e);
        }
    },
};
