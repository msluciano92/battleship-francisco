module.exports = {

    createShipPlayer: async function (req, res)
    {
      try {
        var inputs = {
          tipe: 'JD',
          game_id: req.body.partida_id,
          x: req.body.inicial_x,
          y: req.body.inicial_y,
          long: req.body.longitud,
          orientation: req.body.orientacion,
          address: req.body.direccion,
          name: req.body.nombre,
        };
        var arrResp = await sails.helpers.ship.createShip.with(inputs);
        var status = arrResp[0];
        var msj = arrResp[1];
        res.status(status).json(msj);
      } catch (e) {
        res.status(500).json(e);
      }
    },

    createShipCpu: async function (req, res) {
      try {
        var inputs = {
          tipe: 'CD',
          game_id: req.body.partida_id,
          x: req.body.inicial_x,
          y: req.body.inicial_y,
          long: req.body.longitud,
          orientation: req.body.orientacion,
          address: req.body.direccion,
          name: req.body.nombre,
        };
        var arrResp = await sails.helpers.ship.createShip.with(inputs);
        var status = arrResp[0];
        var msj = arrResp[1];
        res.status(status).json(msj);
      } catch (e) {
        res.status(500).json(e);
      }
    },
  };
