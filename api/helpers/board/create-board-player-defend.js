module.exports = {
    friendlyName: 'Create board player defend',
    description: '',
    inputs: {
        partida_id: {
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
        const gameId = inputs.partida_id;
        if (gameId !== undefined) {
            const board = await Tablero.create({
                partida_id: gameId,
                tipo: 'JD',
            }).fetch();
            if (board.id !== undefined) {
                return true;
            }
            return false;
        }
        return false;
    },

};
