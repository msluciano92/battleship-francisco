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

    async fn(inputs) {
        const ships = inputs.barcos;
        const xX = inputs.x;
        const yY = inputs.y;
        let ok = false;
        let q = 0;
        while (ok === false && q < ships.length) {
            const ship = ships[q];
            if (x === ship.inicial_x && y === ship.inicial_y) {
                ok = true;
            } else if (xX === ship.inicial_x || yY === ship.inicial_y) {
                const input = {
                    barco: ship,
                    xX,
                    yY,
                };
                ok = sails.helpers.coodinates.touchShip.with(input);
            } q += 1;
        } return ok;
    },

};
