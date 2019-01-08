module.exports = {


    friendlyName: 'Initialize coordinates game',


    description: '',


    inputs: {

    },


    exits: {

        success: {
            description: 'All done.',
        },

    },


    async fn() {
        const matriz = [];
        const arrX = await sails.helpers.arrayX();
        const arrY = await sails.helpers.arrayY();
        for (let i = 0; i < arrX.length; i += 1) {
            matriz[arrX[i]] = [];
            for (let j = 0; j < arrY.length; j += 1) {
                matriz[arrX[i]][arrY[j]] = 'Free'; // libre
            }
        }
        return matriz;
    },


};
