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


  fn: async function(inputs) {
    var matriz = [];
    var arrX = await sails.helpers.arrayX();
    var arrY = await sails.helpers.arrayY();
    for (var i = 0; i < arrX.length; i++) {
      matriz[arrX[i]] = [];
      for (var j = 0; j < arrY.length; j++) {
        matriz[arrX[i]][arrY[j]] = "Free"; // libre
      }
    }
    return matriz;
  }


};
