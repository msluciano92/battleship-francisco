module.exports = {


  friendlyName: 'Set coordinate random',


  description: '',


  inputs: {
    tipo: {
      friendlyName: 'Type board',
      description: '',
      type: 'string',
      default: ''
    },
    partida_id: {
      friendlyName: 'Id game',
      description: '',
      type: 'number',
      default: 0
    }

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function(inputs) {
    var tipo = inputs.tipo;
    var game_id = inputs.partida_id;
    var board = await Tablero.findOne({
      partida_id: game_id,
      tipo: tipo
    });
    if (board.id !== undefined) {
      var coordinates = await Coordenada.find({
        tablero_id: board.id
      });
      var arr = [];
      var ok = false;
      var x;
      var y;
      coordinates.forEach(coordinate => {
        var x_value = coordinate.x;
        var y_value = coordinate.y;
        arr.push({
          x_value,
          y_value
        });
      });
      var array_x = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      var array_y = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      var long = array_x.length;
      while (!ok) {
        var r = Math.random() * long;
        var rm = Math.floor(r);
        x = array_x[rm];
        y = array_y[rm];
        if (!arr.includes({
            x,
            y
          })) {
          ok = true;
        }
      }
      if (ok) {
        return [x, y];
      } else {
        false
      }
    } else {
      return false;
    }
  }


};
