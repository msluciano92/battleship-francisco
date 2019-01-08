function isCorrect(x, y) {
    const arrX = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const arrY = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    return (arrX.includes(x) && arrY.includes(y));
}

module.exports = {
    friendlyName: 'Set coordinates',
    description: '',
    inputs: {
        type1: {
            friendlyName: 'Type of board',
            description: '',
            type: 'string',
            default: '',
        },
        type2: {
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
    },

    exits: {

        success: {
            description: 'All done.',
        },

    },

    async fn(inputs) {
        const gameId = inputs.game_id;
        const typE1 = inputs.type1;
        const typE2 = inputs.type2;
        const xX = inputs.x;
        const yY = inputs.y;
        if (gameId !== undefined) {
            const board = await Tablero.findOne({
                partida_id: gameId,
                tipo: typE1,
            });
            if (board.id !== undefined) {
                const coordinate = await Coordenada.findOne({
                    where: {
                        and: [
                            {
                                tablero_id: board.id,
                                xX,
                                yY,
                            },
                        ],
                    },
                });
                if (coordinate === undefined && isCorrect(xX, yY)) {
                    const board2 = await Tablero.findOne({
                        partida_id: gameId,
                        tipo: typE2,
                    });
                    if (board2 !== undefined) {
                        const ships = await Barco.find({
                            tablero_id: board2.id,
                            estado: 'Flota',
                        });
                        if (ships !== undefined) {
                            let msj;
                            let value;
                            const ok = await sails.helpers.coodinates.moveTouchShip.with({
                                xX,
                                yY,
                                barcos: ships,
                            });
                            if (ok) { // verifico en los barcos si la coordenada toca a alguno de ellos
                                value = 3;
                                msj = '¡Touch a ship!';
                            } else {
                                value = 4;
                                msj = '¡Water!';
                            }
                            await Coordenada.create({
                                tablero_id: board.id,
                                xX,
                                yY,
                                value,
                            }).fetch();
                            await sails.helpers.coodinates.checkShipState.with({
                                tableroId: board.id,
                                barcoTableroId: board2.id,
                            });
                            return msj;
                        }
                        return 'Board not have ships';
                    }
                    return 'Error. Loading data ships.';
                } if (!isCorrect(x, y)) {
                    return 'Coordinate incorrect. [0 <= x >= 9] && [A <= y >= J] ';
                }
                return 'Coordinate selected!';
            }
            return 'Error Loading board attack';
        }
        return 'Error. Loading game data.';
    },

};
