module.exports = {
  friendlyName: 'Touch ship',
  description: '',
  inputs: {
    barco: {
      friendlyName: 'A ship',
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
    var ship = inputs.barco;
    var x = inputs.x;
    var y = inputs.y;
    var arrX = await sails.helpers.arrayX();
    var arrY = await sails.helpers.arrayY();
    var posX = arrX.indexOf(ship.inicial_x);
    var posY = arrY.indexOf(ship.inicial_y);
    var ok = false;
    var i = 0;
    var shipPosX;
    var shipPosY;
    while (i < ship.longitud && ok == false) {
      shipPosX = arrX[posX];
      shipPosY = arrY[posY];
      if (shipPosX == x && shipPosY == y) {
        ok = true;
      }
      if (ship.orientacion == 'V') { // VERTICAL
        if (ship.direccion == 'T') { // top
          posX--;
        } else {
          posX++;
        }
      } else {
        if (ship.direccion == 'L') { // LEFT
          posY--;
        } else {
          posY++;
        }
      } i++;
    } return ok;
  },
};
