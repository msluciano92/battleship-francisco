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

    async fn(inputs) {
        const ship = inputs.barco;
        const xX = inputs.x;
        const yY = inputs.y;
        const arrX = await sails.helpers.arrayX();
        const arrY = await sails.helpers.arrayY();
        let posX = arrX.indexOf(ship.inicial_x);
        let posY = arrY.indexOf(ship.inicial_y);
        let ok = false;
        let i = 0;
        let shipPosX;
        let shipPosY;
        while (i < ship.longitud && !ok) {
            shipPosX = arrX[posX];
            shipPosY = arrY[posY];
            /*console.log("busca: " + xX + " - " + yY);
            console.log("busca: " + shipPosX + " - " + shipPosY);*/
            if (shipPosX === xX && shipPosY === yY) {
                ok = true;
            }
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
        }
        return ok;
    },
};
