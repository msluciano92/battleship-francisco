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
        if (gameId !== undefined) {
            const board = await Tablero.findOne({
                partida_id: gameId,
                tipo: tipE,
            });
            if (board !== undefined) {
                if (namE !== undefined && xX !== undefined && yY !== undefined
          && longitud !== undefined && orientatioN !== undefined && addresS !== undefined) {
                    const ships = await Barco.find({ tablero_id: board.id });
                    const inputsParam = {
                        ships, x: xX, y: yY, longitud, orientation: orientatioN, address: addresS,
                    };

                    if (await sails.helpers.checkCoordinateShip.with(inputsParam) === false) {
                        const ship = await Barco.create({
                            nombre: namE,
                            inicial_x: xX,
                            inicial_y: yY,
                            longitud,
                            orientacion: orientatioN,
                            direccion: addresS,
                            tablero_id: board.id,
                        }).fetch();
                        if (ship !== undefined) {
                            return { status: 201, msj: 'Ship created!' };
                        }
                        return { status: 500, msj: 'Error when creating ship' };
                    }
                    return { status: 200, msj: 'Error, coordinates invalid' };
                }
                return { status: 200, msj: 'Error propierty ship' };
            }
            return { status: 200, msj: 'Error loading board' };
        }
        return { status: 200, msj: 'Indicate game' };
    },

};
