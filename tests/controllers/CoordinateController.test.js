describe('PATCH /send-plays-player ', () => {

  beforeEach((done) => {
      app
          .post('/partida')
          .send({ id: 1, nombre: 'Game X test ship player' })
          .end(async (err) => {
              if (err) throw err;
              app
                  .post('/tablero')
                  .send({ id: 1, partida_id: 1, tipo: 'JD' })
                  .end(async (err) => {
                      if (err) throw err;
                      app
                          .post('/tablero')
                          .send({ id: 2, partida_id: 1, tipo: 'JA' })
                          .end(async (err) => {
                              if (err) throw err;
                              app
                                  .post('/tablero')
                                  .send({ id: 3, partida_id: 1, tipo: 'CD' })
                                  .end(async (err) => {
                                      if (err) throw err;
                                      app
                                          .post('/tablero')
                                          .send({ id: 4, partida_id: 1, tipo: 'CA' })
                                          .end(async (err) => {
                                              if (err) throw err;
                                              app
                                                .post('/barco')
                                                .send({ nombre: 'Ship 1 cpu', tablero_id: 3, inicial_x: '1', inicial_y: 'A', longitud: 2, orientacion: 'H', direccion: 'R'})
                                                .end(async(err, res) => {
                                                    if (err) throw err;
                                                      done();
                                                });
                                          });
                                  });
                          });
                  });
          });
  });

    afterEach(async(done) => {
      let resultPartida = await sails.models.partida.destroy({}).fetch();
      let resultTablero = await sails.models.tablero.destroy({}).fetch();
      let resultBarco = await sails.models.barco.destroy({}).fetch();
      let resultCoordinate = await sails.models.coordenada.destroy({}).fetch();
      done();
    });


    it('Return plays player - Water', async (done) => {

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
        .end((err, res) => {
            if (err) throw err;
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
});

describe('Ship out', () => {
  beforeEach((done) => {

    app
        .post('/partida')
        .send({ id: 1, nombre: 'Game X test ship player' })
        .end(async (err) => {
            if (err) throw err;
            app
                .post('/tablero')
                .send({ id: 1, partida_id: 1, tipo: 'JD' })
                .end(async (err) => {
                    if (err) throw err;
                    app
                        .post('/tablero')
                        .send({ id: 2, partida_id: 1, tipo: 'JA' })
                        .end(async (err) => {
                            if (err) throw err;
                            app
                                .post('/tablero')
                                .send({ id: 3, partida_id: 1, tipo: 'CD' })
                                .end(async (err) => {
                                    if (err) throw err;
                                    app
                                        .post('/tablero')
                                        .send({ id: 4, partida_id: 1, tipo: 'CA' })
                                        .end(async (err) => {
                                            if (err) throw err;
                                            app
                                              .post('/barco')
                                              .send({ id: 1, nombre: 'Ship 1 cpu', tablero_id: 3, inicial_x: '1', inicial_y: 'A', longitud: 2, orientacion: 'H', direccion: 'R'})
                                              .end(async(err, res) => {
                                                  if (err) throw err;
                                                    app
                                                      .patch('/send-plays-player')
                                                      .send({partida_id: 1, x: '1', y: 'A'})
                                                      .end((err, res) => {
                                                          if (err) throw err;
                                                            app
                                                              .patch('/send-plays-player')
                                                              .send({partida_id: 1, x: '1', y: 'B'})
                                                              .end((err, res) => {
                                                                  if (err) throw err;
                                                                  done();
                                                              });
                                                      });
                                              });
                                        });
                                });
                        });
                });
        });
    });

    afterEach(async(done) => {
        let resultPartida = await sails.models.partida.destroy({}).fetch();
        let resultTablero = await sails.models.tablero.destroy({}).fetch();
        let resultBarco = await sails.models.barco.destroy({}).fetch();
        done();
    });

    it('Return state ship cpu - (Undido) ', (done) => {
        app
          .get('/barco/1')
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
              expect(res.body.estado).toBe('Undido');
              done();
          });
    });
});
