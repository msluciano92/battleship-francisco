module.exports = {
  friendlyName: 'Get game state for player or cpu',
  description: '',
  inputs: {
    tipo: {
      friendlyName: 'Type board',
      description: '',
      type: 'string',
      default: '',
    },
    partida_id: {
      friendlyName: 'Id game',
      description: '',
      type: 'number',
      default: 0,
    },
  },

  exits: {
    success: {
      outputFriendlyName: 'State',
    },
  },

  fn: async function (inputs) {
    var type = inputs.tipo;
    var gameId = inputs.partida_id;
    if (undefined !== gameId) {
      var game = await Partida.findOne({
        id: gameId,
      });
      if (game.id !== undefined && game.estado !== 'Finalizada') {
        var board = await Tablero.findOne({
          partida_id: gameId,
          tipo: type,
        });
        if (board.id !== undefined) {
          var coordinates = await Coordenada.find({
            tablero_id: board.id,
          });
          if (coordinates === undefined) {
            return 'Error coordinates';
          } else {
            var arrayXY = await sails.helpers.initializeCoordinatesGame();
            coordinates.forEach(coordinate => {
              var valueMove = (coordinate.value == 3) ? 'Ship' : 'Water';
              arrayXY[coordinate.x][coordinate.y] = valueMove;
            });
            var arrayJson = [];
            for (x in arrayXY) {
              var subArray = arrayXY[x];
              for (y in subArray) {
                var val = arrayXY[x][y];
                arrayJson.push({
                  x,
                  y,
                  val,
                });
              }
            } return arrayJson;
          }
        } else {
          return tableros;
        }
      } else {
        return 'Game not exists or finalized.';
      }
    } else {
      return 'Indicate game.';
    }
  },

};
