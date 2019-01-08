module.exports = {


  friendlyName: 'Check coordinate ship',


  description: '',


  inputs: {

      ships: {
        friendlyName: 'Ships',
        description: '',
        type: 'json',
        default: '',
      },
      x: {
        friendlyName: 'Coordinate x',
        description: '',
        type: 'string',
        default: '',
      },
      y: {
        friendlyName: 'Coordinate Y',
        description: '',
        type: 'string',
        default: '',
      },
      longitud: {
        friendlyName: 'Long a ship',
        description: '',
        type: 'number',
        default: 0
      },
      orientation: {
        friendlyName: 'Orientation ship',
        description: '',
        type: 'string',
        default: ''
      },
      address: {
        friendlyName: 'Address ship',
        description: '',
        type: 'string',
        default: ''
      }
  },


  exits: {
    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
      var x = inputs.x;
      var y = inputs.y;
      var ships = inputs.ships;
      var k = 0;
      var ok = false;
      var arrX = await sails.helpers.arrayX();
      var arrY = await sails.helpers.arrayY();
      var posX = arrX.indexOf(x);
      var posY = arrY.indexOf(y);
      var long = inputs.longitud;
      var orientation = inputs.orientation;
      var address = inputs.address;
      while (!ok && k < ships.length) {
        var q = 0;
        while (!ok && q < ships.length) {
          var ship = ships[q];
          val_x = arrX[posX];
          val_y = arrY[posY];
          inputs = {
            barco: ship,
            x: val_x,
            y: val_y,
          };
          ok = await sails.helpers.coodinates.touchShip.with(inputs);
          q++;
        }
        if (orientation == 'V') { // VERTICAL
          if (address == 'T') { // top
            posX--;
          } else {
            posX++;
          }
        } else {
          if (address == 'L') { // LEFT
            posY--;
          } else {
            posY++;
          }
        }        
        k++;
      }
      return ok;
  }

};
