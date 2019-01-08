describe("POST /create-game ", function (){
      it ("Return a new game", function (done){
          var name = { nombre: 'Game 5' };
          app
            .post("/create-game")
            .send({ nombre: 'Game 5' })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(201)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });



/*
  describe("POST /create-game ", function (){
      it ("Return a new game", function (done){
          server
            .post("/create-game")
            .send({ nombre: 'Game 1' })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(500)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });
*/


/*
  describe("GET /state-game-player ", function (){
      it ("Return state game by player", function (done){
          server
            .get("/state-game-player/1")
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(200)
            .end(function(err, res){
              if (err) throw err;
              done();
            });
      });
  });
  describe("GET /state-game-cpu ", function (){
      it ("Return state game by cpu", function (done){
          server
            .get("/state-game-player/1")
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(200)
            .end(function(err, res){
              if (err) throw err;
              done();
            });
      });
  });
*/
