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
            default: 0,
        },
        orientation: {
            friendlyName: 'Orientation ship',
            description: '',
            type: 'string',
            default: '',
        },
        address: {
            friendlyName: 'Address ship',
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


    async fn(inputs) {
        const shipsS = inputs.ships;
        const orientationN = inputs.orientation;
        const addresS = inputs.address;
        let k = 0;
        let ok = false;
        const arrX = await sails.helpers.arrayX();
        const arrY = await sails.helpers.arrayY();
        let posX = arrX.indexOf(inputs.x);
        let posY = arrY.indexOf(inputs.y);
        while (!ok && k < shipsS.length) {
            let q = 0;
            while (!ok && q < shipsS.length) {
                const ship = shipsS[q];
                valX = arrX[posX];
                valY = arrY[posY];
                const inputsParam = {
                    barco: ship,
                    x: valX,
                    y: valY,
                };
                ok = await sails.helpers.coodinates.touchShip.with(inputsParam);
                q += 1;
            }
            if (orientationN === 'V') { // VERTICAL
                if (addresS === 'T') { // top
                    posX -= 1;
                } else {
                    posX += 1;
                }
            } else if (addresS === 'L') { // LEFT
                posY -= 1;
            } else {
                posY += 1;
            }
            k += 1;
        }
        return ok;
    },

};
