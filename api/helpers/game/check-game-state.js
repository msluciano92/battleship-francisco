async function checkShipsState(gameId, boardId, winds) {
    const shipsWithStateOut = await Barco.find({
        where: {
            and: [
                { tablero_id: boardId, estado: 'Undido' },
            ],
        },
    });
    // checkeo primero siempre por los barcos de la cpu, por que el jugador es el primero que juega
    if (shipsWithStateOut !== undefined) {
        if (shipsWithStateOut.length === 1) {
            const respGame = await Partida.updateOne({ id: gameId }).set({ ganador: winds, estado: 'Finalized' });
            return { state: false, msj: '¡Game Finalized!' };
        }
        return { state: true, msj: 'Ships ok' };
    }
    return { state: true, msj: 'Error loading ships' };
}

module.exports = {


    friendlyName: 'Check game state',


    description: '',


    inputs: {

        game_id: {
            friendlyName: 'Game id',
            description: 'Identify game',
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
        if (gameId !== undefined && gameId > 0) {
            const boards = await Tablero.find({ partida_id: gameId });
            if (boards !== undefined && boards.length === 4) {
                const boardCpu = boards.find(element => element.tipo === 'CD');
                const boardPlayer = boards.find(element => element.tipo === 'JD');
                const resp = checkShipsState(gameId, boardCpu.id, 'player');
                if (resp !== undefined && resp.state !== true) {
                    return resp;
                }
                const resp1 = checkShipsState(gameId, boardPlayer.id, 'cpu');
                return resp1;
            }
            return 'Error loading boards';
        }
        return 'Indicate game';
    },


};
