module.exports = {
  createGame: async function (req, res)
  {
    try {
      var params = req.body;
      var game = await Partida.create(params).fetch();
      var msj = 'boards created!';
      if (game !== undefined) {
        var respJD = await sails.helpers.board.createBoardPlayerDefend.with({
          partida_id: game.id,
        });
        var respJA = await sails.helpers.board.createBoardPlayerAttack.with({
          partida_id: game.id,
        });
        var respCD = await sails.helpers.board.createBoardCpuDefend.with({
          partida_id: game.id,
        });
        var respCA = await sails.helpers.board.createBoardCpuAttack.with({
          partida_id: game.id,
        });
        if (!(respCA && respCD && respJA && respJD)) {
          msj = ' Some boards not can created. ';
        }

        res.status(201).json(
          '¡Game created, ' + msj + '. Create a ships ...' + '{id=' + game.id + '}');
      } else {
        res.status(400).json('Game could not be created.');
      }
    } catch (e) {
      res.status(500).json(e);
    }
  },

  getPlayerState: async function (req, res)
  {
    try {
      res.json(
        await sails.helpers.game.getState.with(
          {
            tipo: 'JA',
            partida_id: req.params.id,
          }
        )
      );
    } catch (e) {
      res.status(500).json(e);
    }
  },

  getCpuState: async function (req, res)
  {
    try {
      res.json(await sails.helpers.game.getState.with({
        tipo: 'CA',
        partida_id: req.params.id,
      }));
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
