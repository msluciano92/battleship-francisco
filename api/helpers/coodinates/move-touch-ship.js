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
        let ship;
        while (ok === false && q < ships.length) {
            ship = ships[q];
            if (xX === ship.inicial_x && yY === ship.inicial_y) {
                ok = true;
            } else if (xX === ship.inicial_x || yY === ship.inicial_y) {
                const input = {
                    barco: ship,
                    x: xX,
                    y: yY,
                };
                ok = await sails.helpers.coodinates.touchShip.with(input);
            } q += 1;
        }
        if (ok) {
            const qTouch = ship.qTouch + 1;
            const ship2 = await Barco.updateOne({ id: ship.id }).set({ qTouch });
            return { ok, ship: ship2 };
        }
        return { ok };
    },

};
