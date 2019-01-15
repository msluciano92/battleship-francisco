async function checkShipsOnBoard(gameId, tipo) {
    const board = await Tablero.findOne({ where: { and: [{ partida_id: gameId }, { tipo }] } });
    const ships = await Barco.find({ tablero_id: board.id });
    return (ships !== undefined && ships.length < 5);
}

async function checkTotalShips(gameId) {
    const boards = await Tablero.find({ partida_id: gameId });
    const boardsId = boards.map(board => board.id);
    const ships = await Barco.find({ tablero_id: { in: boardsId } });
    return (ships !== undefined && ships.length === 10);
}

async function setStatePlayingGame(gameId) {
    const game = await Partida.updateOne({ id: gameId }).set({ estado: 'Jugando' });
    return (game !== undefined && game.estado === 'Jugando');
}


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
            if (await checkShipsOnBoard(gameId, tipE)) {
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
                                let msj = 'Ship created!';
                                if (await checkTotalShips(gameId)) {
                                    if (await setStatePlayingGame(gameId)) {
                                        msj += ' Configuration finalized. Send play';
                                    }
                                }
                                return { status: 201, msj };
                            }
                            return { status: 500, msj: 'Error when creating ship' };
                        }
                        return { status: 200, msj: 'Error, coordinates invalid' };
                    }
                    return { status: 200, msj: 'Error propierty ship' };
                }
                return { status: 200, msj: 'Error loading board' };
            }
            const msj = 'Ships on board created. ';
            return { status: 200, msj };
        }
        return { status: 200, msj: 'Indicate game' };
    },
};
