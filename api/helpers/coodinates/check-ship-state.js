function shipCoordinates(ship) {
    const arr = [];
    let i = 0;
    const arrX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const arrY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let posX = arrX.indexOf(ship.inicial_x);
    let posY = arrY.indexOf(ship.inicial_y);
    let shipValueX;
    let shipValueY;
    while (i < ship.longitud) {
        shipValueY = arrY[posY];
        shipValueX = arrX[posX];
        arr.push([shipValueX, shipValueY]);
        if (ship.orientacion === 'V') { // VERTICAL
            if (ship.direccion === 'T') { // top
                posX -= 1;
            } else {
                posX += 1;
            }
        } else if (ship.direccion === 'L') { // LEFT
            posY -= 1;
        } else {
            posY += 1;
        } i += 1;
    } return arr;
}

function coordinatesIncludesShip(arrCoordenadas, arrBarco) {
    let ok = true;
    let i = 0;
    while (ok && i < arrBarco.length) {
        coordenadaBarco = arrBarco[i];
        j = 0;
        let ok1 = false;
        while (j < arrCoordenadas.length && ok1 === false) {
            ok1 = (arrCoordenadas[j][0] === coordenadaBarco[0]
          && arrCoordenadas[j][1] === coordenadaBarco[1]);
            j += 1;
        }

        if (!ok1) {
            ok = false;
        } i += 1;
    } return ok;
}

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

    async fn(inputs) {
        const boardId = inputs.tableroId;
        const shipBoardId = inputs.barcoTableroId;
        const ships = await Barco.find({
            tablero_id: shipBoardId,
            estado: 'Flota',
        });
        const arrayCoordinates = [];
        const coordinates = await Coordenada.find({
            tablero_id: boardId,
            value: 3,
        });
        if (coordinates !== undefined) {
            coordinates.forEach((coordinate) => {
                arrayCoordinates.push([coordinate.x, coordinate.y]);
            });
            if (ships !== undefined && ships.length > 1 && arrayCoordinates.length > 0) {
                ships.forEach(async (ship) => {
                    const arrayCoorShip = shipCoordinates(ship);
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
