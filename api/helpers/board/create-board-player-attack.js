module.exports = {
  friendlyName: 'Create board player attack',
  description: '',
  inputs: {
    partida_id: {
      friendlyName: 'Id game',
      description: '',
      type: 'number',
      default: 0,
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    var gameId = inputs.partida_id;
    if (gameId !== undefined) {
      var board = await Tablero.create({
        partida_id: gameId,
        tipo: 'JA',
      }).fetch();
      if (board.id !== undefined) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },

};
