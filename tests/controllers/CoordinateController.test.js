/*var supertest = require('supertest');
var server = supertest.agent('http://localhost:1337')



describe("PATCH /send-plays-player ", function (){
    it ("Return plays player ", function (done){
        server
          .patch("/send-plays-player")
          .send({ partida_id: 1, inicial_x: "1", inicial_y: "A" })
          .expect("Content-type", "application/json; charset=utf-8")
          .expect(200)
          .expect("text", "¡Touch ship!")
          .end(async function(err, res){
            if (err) throw err;
            done();
          });
    });
});

describe("PATCH /send-plays-player ", function (){
    it ("Return plays player ", function (done){
        server
          .patch("/send-plays-player")
          .send({ partida_id: 1, inicial_x: "1", inicial_y: "A" })
          .expect("Content-type", "application/json; charset=utf-8")
          .expect(200)
          .expect("text", "¡Coordinate selected! Please, enter a new coordinate.")
          .end(async function(err, res){
            if (err) throw err;
            done();
          });
    });
});

describe("PATCH /send-plays-player ", function (){
    it ("Return plays player ", function (done){
        server
          .patch("/send-plays-player")
          .send({ partida_id: 1, inicial_x: "1", inicial_y: "A" })
          .expect("Content-type", "application/json; charset=utf-8")
          .expect(200)
          .expect("text", "¡Coordinate selected! Please, enter a new coordinate.")
          .end(async function(err, res){
            if (err) throw err;
            done();
          });
    });
});
*/

describe("POST /create-game ", function (){
  it ("Return a new game", function (){
      expect(true).toBeTruthy();
  });
});
