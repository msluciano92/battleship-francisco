module.exports = {
  friendlyName: 'Move touch ship',
  description: '',
  inputs: {
    barcos: {
      friendlyName: 'A collection ship',
      description: '',
      type: 'json',
      default: '',
    },
    x: {
      friendlyName: 'A coordinate x',
      description: '',
      type: 'string',
      default: '',
    },
    y: {
      friendlyName: 'A coordinate Y',
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
    var ships = inputs.barcos;
    var x = inputs.x;
    var y = inputs.y;
    var ok = false;
    var q = 0;
    while (ok == false && q < ships.length) {
      var ship = ships[q];
      if (x == ship.inicial_x && y == ship.inicial_y) {
        ok = true;
      } else {
        if (x == ship.inicial_x || y == ship.inicial_y) {
          var input = {
            barco: ship,
            x: x,
            y: y,
          };
          ok = await sails.helpers.coodinates.touchShip.with(input);
        }
      } q++;
    } return ok;
  },

};
