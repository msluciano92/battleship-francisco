module.exports = {
    friendlyName: 'Get game state for player or cpu',
    description: '',
    inputs: {
        tipo: {
            friendlyName: 'Type board',
            description: '',
            type: 'string',
            default: '',
        },
        partida_id: {
            friendlyName: 'Id game',
            description: '',
            type: 'number',
            default: 0,
        },
    },

    exits: {
        success: {
            outputFriendlyName: 'State',
        },
    },

    async fn(inputs) {
        const type = inputs.tipo;
        const gameId = inputs.partida_id;
        if (undefined !== gameId) {
            const game = await Partida.findOne({
                id: gameId,
            });
            if (game !== undefined && game.estado !== 'Finalizada') {
                const board = await Tablero.findOne({
                    partida_id: gameId,
                    tipo: type,
                });
                if (board !== undefined) {
                    const coordinates = await Coordenada.find({
                        tablero_id: board.id,
                    });
                    if (coordinates === undefined) {
                        return 'Error coordinates';
                    }
                    const arrayXY = await sails.helpers.initializeCoordinatesGame();
                    coordinates.forEach((coordinate) => {
                        const valueMove = (coordinate.value === 3) ? 'Ship' : 'Water';
                        arrayXY[coordinate.x][coordinate.y] = valueMove;
                    });
                    const arrayJson = [];
                    let x = 1;
                    arrayXY.forEach((objArray) => {
                        const subArray = Object.entries(objArray);
                        subArray.forEach((elem) => {
                            const y = elem[0];
                            const val = elem[1];
                            arrayJson.push({
                                x,
                                y,
                                val,
                            });
                        });
                        x += 1;
                    });
                    return arrayJson;
                }
                return tableros;
            }
            return 'Game not exists or finalized.';
        }
        return 'Indicate game.';
    },

};
