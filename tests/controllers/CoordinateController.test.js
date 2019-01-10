describe('PATCH /send-plays-player ', () => {

    beforeEach((done) => {
      app
        .post('/create-game')
        .send({nombre: 'Game Test'})
        .end(async(err, res) => {
            if (err) throw err;
            app
              .post('/create-ship-cpu')
              .send({ nombre: 'Ship 1 cpu', partida_id: 1, inicial_x: '1', inicial_y: 'A', longitud: 2, orientacion: 'H', direccion: 'R'})
              .end(async(err, res) => {
                  if (err) throw err;
                  done();
              });
        });
    });

    it('Return plays player - Water', (done) => {
        app
            .patch('/send-plays-player')
            .send({ partida_id: 1, x: '4', y: 'F' })
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toBe('¡Water!');
                done();
            });
    });

    it('Return plays player - Touch ship ', (done) => {
        app
            .patch('/send-plays-player')
            .send({ partida_id: 1, x: '1', y: 'B' })
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toBe('¡Touch a ship!');
                done();
            });
    });

    it('Return plays player - Water', (done) => {
        app
            .patch('/send-plays-player')
            .send({ partida_id: 1, x: '8', y: 'F' })
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toBe('¡Water!');
                done();
            });
    });

    it('Return plays player - Touch ship ', (done) => {
        app
            .patch('/send-plays-player')
            .send({ partida_id: 1, x: '1', y: 'A' })
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toBe('¡Touch a ship!');
                done();
            });
    });

    it('Return coordinated selected ', (done) => {
        app
            .patch('/send-plays-player')
            .send({ partida_id: 1, x: '1', y: 'A' })
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toBe('¡Coordinate selected! Please, enter a new coordinate.');
                done();
            });
    });

});


describe('Ship out', () => {
  beforeEach((done) => {
    app
      .post('/create-game')
      .send({nombre: 'Game Test by check ship state'})
      .end(async(err, res) => {
          if (err) throw err;
          app
          .post('/create-ship-cpu')
          .send({ nombre: 'Ship 1 cpu - Test Undido', partida_id: 6, inicial_x: '9', inicial_y: 'A', longitud: 2, orientacion: 'H', direccion: 'R'})
          .end(async(err, res) => {
              if(err) throw err;

              app
                .patch('/send-plays-player')
                .send({ partida_id: 6, x: '9', y: 'B' })
                .end(async(err, res) => {
                  if (err) throw err;
                  app
                    .patch('/send-plays-player')
                    .send({ partida_id: 6, x: '9', y: 'A' })
                    .end(async(err, res) => {
                      if (err) throw err;
                      done();
                    });
                });
          });
      });
  });

  it('Return state ship cpu - (Undido) ', (done) => {
      app
          .get('/barco/2')
          .expect(200)
          .end((err, res) => {
              if (err) throw err;
              expect(res.body.estado).toBe('Undido');
              done();
          });
  });

});
