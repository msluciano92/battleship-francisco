module.exports = {
    async createGame(req, res) {
        try {
            const params = req.body;
            const game = await Partida.create(params).fetch();
            let msj = 'boards created!';
            if (game !== undefined) {
                const respJD = await sails.helpers.board.createBoardPlayerDefend.with({
                    partida_id: game.id,
                });
                const respJA = await sails.helpers.board.createBoardPlayerAttack.with({
                    partida_id: game.id,
                });
                const respCD = await sails.helpers.board.createBoardCpuDefend.with({
                    partida_id: game.id,
                });
                const respCA = await sails.helpers.board.createBoardCpuAttack.with({
                    partida_id: game.id,
                });
                if (!(respCA && respCD && respJA && respJD)) {
                    msj = ' Some boards not can created. ';
                }
                return res.status(201).json(
                    `¡Game created, ${msj}. Create a ships ...{id=${game.id}}`,
                );
            }
            return res.status(400).json('Game could not be created.');
        } catch (e) {
            return res.status(500).json(e);
        }
    },

    async getPlayerState(req, res) {
        try {
            const result = await sails.helpers.game.getState.with(
                {
                    tipo: 'JA',
                    partida_id: req.params.id,
                },
            );
            return res.status(result.status).json(result);
        } catch (e) {
            return res.status(500).json(e);
        }
    },

    async getCpuState(req, res) {
        try {
            const result = await sails.helpers.game.getState.with(
                {
                    tipo: 'CA',
                    partida_id: req.params.id,
                },
            );
            return res.status(result.status).json(result);
        } catch (e) {
            return res.status(500).json(e);
        }
    },
};
