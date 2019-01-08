module.exports = {
    friendlyName: 'Create ship',
    description: '',
    inputs: {
        tipe: {
            friendlyName: 'Type of board',
            description: '',
            type: 'string',
            default: '',
        },
        game_id: {
            friendlyName: 'Id game',
            description: '',
            type: 'number',
            default: 0,
        },
        x: {
            friendlyName: 'Coordinates X',
            description: '',
            type: 'string',
            default: '',
        },
        y: {
            friendlyName: 'Coodinates Y',
            description: '',
            type: 'string',
            default: '',
        },
        long: {
            friendlyName: 'Long ship',
            description: '',
            type: 'number',
            default: 0,
        },
        name: {
            friendlyName: 'Name ship',
            description: '',
            type: 'string',
            default: '',
        },
        orientation: {
            friendlyName: 'Orientation ship',
            description: '',
            type: 'string',
            default: '',
        },
        address: {
            friendlyName: 'Direction ship',
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
        const gameId = inputs.game_id;
        const xX = inputs.x;
        const yY = inputs.y;
        const longitud = inputs.long;
        const orientatioN = inputs.orientation;
        const addresS = inputs.address;
        const namE = inputs.name;
        const tipE = inputs.tipe;
        const arrResp = [];
        if (gameId !== undefined) {
            const board = await Tablero.findOne({
                partida_id: gameId,
                tipo: tipE,
            });
            if (board.id !== undefined) {
                if (namE !== undefined && xX !== undefined && yY !== undefined
          && longitud !== undefined && orientatioN !== undefined && addresS !== undefined) {
                    const ships = await Barco.find({ tablero_id: board.id });
                    if (await sails.helpers.checkCoordinateShip.with({
                        ships, x, y, longitud, orientation, address,
                    }) === false) {
                        const ship = await Barco.create({
                            nombre: namE,
                            inicial_x: x,
                            inicial_y: y,
                            longitud,
                            orientacion: orientation,
                            direccion: address,
                            tablero_id: board.id,
                        }).fetch();
                        if (ship.id !== undefined) {
                            arrResp[0] = 200;
                            arrResp[1] = `Ship created! (id=${ship.id})`;
                            return arrResp;
                        }
                        arrResp[0] = 500;
                        arrResp[1] = 'Error when creating ship.';
                        return arrResp;
                    }
                    arrResp[0] = 400;
                    arrResp[1] = 'Error, coordinates invalid';
                    return arrResp;
                }
                arrResp[0] = 400;
                arrResp[1] = 'Error propierty ship.';
                return arrResp;
            }
            arrResp[0] = 400;
            arrResp[1] = 'Error loading board.';
            return arrResp;
        }
        arrResp[0] = 400;
        arrResp[1] = 'Indicate game.';
        return arrResp;
    },

};
