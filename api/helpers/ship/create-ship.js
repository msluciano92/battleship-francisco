module.exports = {
  friendlyName: 'Create ship',
  description: '',
  inputs: {
    tipe: {
      friendlyName: 'Type of board',
      description: '',
      type: 'string',
      default: '',
    },
    game_id: {
      friendlyName: 'Id game',
      description: '',
      type: 'number',
      default: 0,
    },
    x: {
      friendlyName: 'Coordinates X',
      description: '',
      type: 'string',
      default: '',
    },
    y: {
      friendlyName: 'Coodinates Y',
      description: '',
      type: 'string',
      default: '',
    },
    long: {
      friendlyName: 'Long ship',
      description: '',
      type: 'number',
      default: 0,
    },
    name: {
      friendlyName: 'Name ship',
      description: '',
      type: 'string',
      default: '',
    },
    orientation: {
      friendlyName: 'Orientation ship',
      description: '',
      type: 'string',
      default: '',
    },
    address: {
      friendlyName: 'Direction ship',
      description: '',
      type: 'string',
      default: '',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    var gameId = inputs.game_id;
    var x = inputs.x;
    var y = inputs.y;
    var longitud = inputs.long;
    var orientation = inputs.orientation;
    var address = inputs.address;
    var name = inputs.name;
    var tipe = inputs.tipe;
    var arrResp = [];
    if (gameId !== undefined) {
      var board = await Tablero.findOne({
        partida_id: gameId,
        tipo: tipe,
      });
      if (board.id !== undefined) {
        if (name !== undefined && x !== undefined && y !== undefined &&
          longitud !== undefined && orientation !== undefined && address !== undefined) {
          var ships = await Barco.find({ tablero_id: board.id });
          if (false == await sails.helpers.checkCoordinateShip.with({ ships, x, y, longitud, orientation, address})) {
            var ship = await Barco.create({
              nombre: name,
              inicial_x: x,
              inicial_y: y,
              longitud: longitud,
              orientacion: orientation,
              direccion: address,
              tablero_id: board.id,
            }).fetch();
            if (ship.id !== undefined) {
              arrResp[0] = 200;
              arrResp[1] = 'Ship created! (id=' + ship.id + ')';
              return arrResp;
            }
            arrResp[0] = 500;
            arrResp[1] = 'Error when creating ship.';
            return arrResp;
          } else {
            arrResp[0] = 400;
            arrResp[1] = 'Error, coordinates invalid';
            return arrResp;
          }
        } else {
          arrResp[0] = 400;
          arrResp[1] = 'Error propierty ship.';
          return arrResp;
        }
      } else {
        arrResp[0] = 400;
        arrResp[1] = 'Error loading board.';
        return arrResp;
      }
    } else {
      arrResp[0] = 400;
      arrResp[1] = 'Indicate game.';
      return arrResp;
    }
  },

};
