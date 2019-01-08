module.exports = {
  friendlyName: 'Check ship state',
  description: 'Check the status of a ship after the play',
  inputs: {
    tableroId: {
      friendlyName: 'Id  table',
      description: '',
      type: 'number',
      default: '',
    },

    barcoTableroId: {
      friendlyName: 'Id  table',
      description: '',
      type: 'number',
      default: '',
    },
  },

  exits: {
    success: {
      description: 'All done.',
    },
  },

  fn: async function (inputs) {
    // verifico los estados de los barcos
    var boardId = inputs.tableroId;
    var shipBoardId = inputs.barcoTableroId;
    var ships = await Barco.find({
      tablero_id: shipBoardId,
      estado: 'Flota',
    });
    var arrayCoordinates = [];
    var coordinates = await Coordenada.find({
      tablero_id: boardId,
      value: 3,
    });
    if (coordinates !== undefined) {
      coordinates.forEach(coordinate => {
        arrayCoordinates.push([coordinate.x, coordinate.y]);
      });
      if (ships !== undefined && arrayCoordinates.length > 0) {
        ships.forEach(async ship => {
          var arrayCoorShip = shipCoordinates(ship);
          if (coordinatesIncludesShip(arrayCoordinates, arrayCoorShip)) {
            await Barco.update({
              id: ship.id,
            }).set({
              estado: 'Undido',
            }).fetch();
          }
        });
      }
    }
  },

};

function shipCoordinates(ship) {
  var arr = [];
  var i = 0;
  var arrX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  var arrY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  var posX = arrX.indexOf(ship.inicial_x);
  var posY = arrY.indexOf(ship.inicial_y);
  var shipPosX;
  var shipPosY;
  while (i < ship.longitud) {
    shipValueX = arrX[posX];
    shipValueY = arrY[posY];
    arr.push([shipValueX, shipValueY]);
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
  } return arr;
}

function coordinatesIncludesShip(arrCoordenadas, arrBarco) {
  var ok = true;
  var i = 0;
  while (ok && i < arrBarco.length) {
    coordenadaBarco = arrBarco[i];
    j = 0;
    var ok1 = false;
    while (j < arrCoordenadas.length && ok1 == false) {
      ok1 = (arrCoordenadas[j][0] == coordenadaBarco[0]
          && arrCoordenadas[j][1] == coordenadaBarco[1]);
      j++;
    }

    if (!ok1) {
      ok = false;
    } i++;
  } return ok;
}
