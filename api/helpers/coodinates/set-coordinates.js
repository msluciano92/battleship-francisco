module.exports = {
  friendlyName: 'Set coordinates',
  description: '',
  inputs: {
    type1: {
      friendlyName: 'Type of board',
      description: '',
      type: 'string',
      default: '',
    },
    type2: {
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
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs) {
    var gameId = inputs.game_id;
    var type1 = inputs.type1;
    var type2 = inputs.type2;
    var x = inputs.x;
    var y = inputs.y;
    if (gameId !== undefined) {
      var board = await Tablero.findOne({
        partida_id: gameId,
        tipo: type1,
      });
      if (board.id !== undefined) {
        var coordinate = await Coordenada.findOne({
          where: {
            and: [
              {
                tablero_id: board.id,
                x: x,
                y: y,
              },
                ],
          },
        });
        if (coordinate == undefined && isCorrect(x, y)) {
          var board2 = await Tablero.findOne({
            partida_id: gameId,
            tipo: type2,
          });
          if (board2 !== undefined) {
            var ships = await Barco.find({
              tablero_id: board2.id,
              estado: 'Flota',
            });
            if (ships !== undefined) {
              var msj;
              var value;
              var ok = await sails.helpers.coodinates.moveTouchShip.with({
                x: x,
                y: y,
                barcos: ships,
              });
              if (ok) { // verifico en los barcos si la coordenada toca a alguno de ellos
                value = 3;
                msj = '¡Touch a ship!';
              } else {
                value = 4;
                msj = '¡Water!';
              }
              await Coordenada.create({
                tablero_id: board.id,
                x: x,
                y: y,
                value: value,
              }).fetch();
              await sails.helpers.coodinates.checkShipState.with({
                tableroId: board.id,
                barcoTableroId: board2.id,
              });
              return msj;
            } else {
              return 'Board not have ships';
            }
          } else {
            return 'Error. Loading data ships.';
          }
        } else {
          if (!isCorrect(x, y)) {
            return 'Coordinate incorrect. [0 <= x >= 9] && [A <= y >= J] ';
          } else {
            return 'Coordinate selected!';
          }
        }
      } else {
        return 'Error Loading board attack';
      }
    } else {
      return 'Error. Loading game data.';
    }
  },

};

function isCorrect(x, y) {
  var arrX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var arrY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  return (arrX.includes(x) && arrY.includes(y));
}
