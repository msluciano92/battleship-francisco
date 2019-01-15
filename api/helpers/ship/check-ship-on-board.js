module.exports = {


    friendlyName: 'Check ship on board',


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

    },


    exits: {

        success: {
            description: 'All done.',
        },

    },


    async fn(inputs) {
        const gameId = inputs.game_id;
        const tipO = inputs.tipo;
        const board = await Tablero.findOne({ where: { and: [{ partida_id: gameId }, { tipo: tipO }] } });
        const ships = await Barco.find({ tablero_id: board.id });
        return (ships !== undefined && ships.length < 5);
    },
};
