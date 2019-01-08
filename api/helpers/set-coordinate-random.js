module.exports = {


    friendlyName: 'Set coordinate random',


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
            description: 'All done.',
        },

    },


    async fn(inputs) {
        const tipO = inputs.tipo;
        const gameId = inputs.partida_id;
        const board = await Tablero.findOne({
            partida_id: gameId,
            tipO,
        });
        if (board.id !== undefined) {
            const coordinates = await Coordenada.find({
                tablero_id: board.id,
            });
            const arr = [];
            let ok = false;
            let x;
            let y;
            coordinates.forEach((coordinate) => {
                const xValue = coordinate.x;
                const yValue = coordinate.y;
                arr.push({
                    xValue,
                    yValue,
                });
            });
            const arrayx = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            const arrayy = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
            const long = arrayx.length;
            while (!ok) {
                const r = Math.random() * long;
                const rm = Math.floor(r);
                x = arrayx[rm];
                y = arrayy[rm];
                if (!arr.includes({
                    x,
                    y,
                })) {
                    ok = true;
                }
            }
            if (ok) {
                return [x, y];
            }
            return false;
        }
        return false;
    },
};
