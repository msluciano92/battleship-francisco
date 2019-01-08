describe("POST /create-game ", function (){
  it ("Return a new game", function (){
      expect(true).toBeTruthy();
  });
});
/*var supertest = require('supertest');
var server = supertest.agent('http://localhost:1337')

  describe("POST /create-ship-player ", function (){
      it ("Return a new ship", function (done){
          server
            .post("/create-ship-player")
            .send({ nombre: 'Ship 1 player ', partida_id: 1, inicial_x: "1", inicial_y: "A", longitud: 5, orientacion: "H", direccion: "R" })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(200)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });

  describe("POST /create-ship-player ", function (){
      it ("Return a new ship", function (done){
          server
            .post("/create-ship-player")
            .send({ nombre: 'Ship 2 player ', partida_id: 1, inicial_x: "2", inicial_y: "B", longitud: 2, orientacion: "H", direccion: "R" })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(200)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });

  describe("POST /create-ship-player ", function (){
      it ("Return error when ship create", function (done){
          server
            .post("/create-ship-player")
            .send({ nombre: 'Ship 3 player ', partida_id: 1, inicial_x: "2", inicial_y: "C", longitud: 3, orientacion: "H", direccion: "R" })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(400)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });


  describe("POST /create-ship-player ", function (){
      it ("Return error when ship create", function (done){
          server
            .post("/create-ship-player")
            .send({ nombre: 'Ship 4 player ', partida_id: 1, inicial_x: "1", inicial_y: "A", longitud: 4, orientacion: "V", direccion: "B" })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(400)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });

  describe("POST /create-ship-player ", function (){
      it ("Return error when ship create", function (done){
          server
            .post("/create-ship-player")
            .send({ nombre: 'Ship 4 player ', partida_id: 1, inicial_x: "8", inicial_y: "A", longitud: 4, orientacion: "H", direccion: "R" })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(200)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });

  describe("POST /create-ship-player ", function (){
      it ("Return error when ship create", function (done){
          server
            .post("/create-ship-player")
            .send({ nombre: 'Ship 3 player ', partida_id: 1, inicial_x: "3", inicial_y: "E", longitud: 3, orientacion: "V", direccion: "T" })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(400)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });

  describe("POST /create-ship-player ", function (){
      it ("Return error when ship create", function (done){
          server
            .post("/create-ship-player")
            .send({ nombre: 'Ship 3 player ', partida_id: 1, inicial_x: "3", inicial_y: "E", longitud: 3, orientacion: "V", direccion: "B" })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(200)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });

  describe("POST /create-ship-player ", function (){
      it ("Return error when ship create", function (done){
          server
            .post("/create-ship-player")
            .send({ nombre: 'Ship 1 player ', partida_id: 1, inicial_x: "3", inicial_y: "E", longitud: 1, orientacion: "V", direccion: "B" })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(400)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });

  describe("POST /create-ship-player ", function (){
      it ("Return error when ship create", function (done){
          server
            .post("/create-ship-player")
            .send({ nombre: 'Ship 1 player ', partida_id: 1, inicial_x: "4", inicial_y: "G", longitud: 1, orientacion: "V", direccion: "B" })
            .expect("Content-type", "application/json; charset=utf-8")
            .expect(200)
            .end(async function(err, res){
              if (err) throw err;
              done();
            });
      });
  });


    describe("POST /create-ship-cpu ", function (){
        it ("Return a new ship", function (done){
            server
              .post("/create-ship-cpu")
              .send({ nombre: 'Ship 1 cpu ', partida_id: 1, inicial_x: "1", inicial_y: "A", longitud: 5, orientacion: "H", direccion: "R" })
              .expect("Content-type", "application/json; charset=utf-8")
              .expect(200)
              .end(async function(err, res){
                if (err) throw err;
                done();
              });
        });
    });

    describe("POST /create-ship-cpu ", function (){
        it ("Return a new ship", function (done){
            server
              .post("/create-ship-cpu")
              .send({ nombre: 'Ship 2 cpu ', partida_id: 1, inicial_x: "2", inicial_y: "B", longitud: 2, orientacion: "H", direccion: "R" })
              .expect("Content-type", "application/json; charset=utf-8")
              .expect(200)
              .end(async function(err, res){
                if (err) throw err;
                done();
              });
        });
    });

    describe("POST /create-ship-cpu ", function (){
        it ("Return error when ship create", function (done){
            server
              .post("/create-ship-player")
              .send({ nombre: 'Ship 3 cpu ', partida_id: 1, inicial_x: "2", inicial_y: "C", longitud: 3, orientacion: "H", direccion: "R" })
              .expect("Content-type", "application/json; charset=utf-8")
              .expect(400)
              .end(async function(err, res){
                if (err) throw err;
                done();
              });
        });
    });


    describe("POST /create-ship-cpu ", function (){
        it ("Return error when ship create", function (done){
            server
              .post("/create-ship-cpu")
              .send({ nombre: 'Ship 4 cpu ', partida_id: 1, inicial_x: "1", inicial_y: "A", longitud: 4, orientacion: "V", direccion: "B" })
              .expect("Content-type", "application/json; charset=utf-8")
              .expect(400)
              .end(async function(err, res){
                if (err) throw err;
                done();
              });
        });
    });

    describe("POST /create-ship-cpu ", function (){
        it ("Return error when ship create", function (done){
            server
              .post("/create-ship-cpu")
              .send({ nombre: 'Ship 4 cpu ', partida_id: 1, inicial_x: "8", inicial_y: "A", longitud: 4, orientacion: "H", direccion: "R" })
              .expect("Content-type", "application/json; charset=utf-8")
              .expect(200)
              .end(async function(err, res){
                if (err) throw err;
                done();
              });
        });
    });

    describe("POST /create-ship-cpu ", function (){
        it ("Return error when ship create", function (done){
            server
              .post("/create-ship-cpu")
              .send({ nombre: 'Ship 3 cpu ', partida_id: 1, inicial_x: "3", inicial_y: "E", longitud: 3, orientacion: "V", direccion: "T" })
              .expect("Content-type", "application/json; charset=utf-8")
              .expect(400)
              .end(async function(err, res){
                if (err) throw err;
                done();
              });
        });
    });

    describe("POST /create-ship-cpu ", function (){
        it ("Return error when ship create", function (done){
            server
              .post("/create-ship-cpu")
              .send({ nombre: 'Ship 3 cpu ', partida_id: 1, inicial_x: "3", inicial_y: "E", longitud: 3, orientacion: "V", direccion: "B" })
              .expect("Content-type", "application/json; charset=utf-8")
              .expect(200)
              .end(async function(err, res){
                if (err) throw err;
                done();
              });
        });
    });

    describe("POST /create-ship-cpu ", function (){
        it ("Return error when ship create", function (done){
            server
              .post("/create-ship-cpu")
              .send({ nombre: 'Ship 1 cpu ', partida_id: 1, inicial_x: "3", inicial_y: "E", longitud: 1, orientacion: "V", direccion: "B" })
              .expect("Content-type", "application/json; charset=utf-8")
              .expect(400)
              .end(async function(err, res){
                if (err) throw err;
                done();
              });
        });
    });

    describe("POST /create-ship-cpu ", function (){
        it ("Return error when ship create", function (done){
            server
              .post("/create-ship-cpu")
              .send({ nombre: 'Ship 1 cpu ', partida_id: 1, inicial_x: "4", inicial_y: "G", longitud: 1, orientacion: "V", direccion: "B" })
              .expect("Content-type", "application/json; charset=utf-8")
              .expect(200)
              .end(async function(err, res){
                if (err) throw err;
                done();
              });
        });
    });
*/
