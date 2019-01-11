describe('POST /create-ship-player ', () => {
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
                                                done();
                                            });
                                    });
                            });
                    });
            });
    });

    afterEach(async(done) => {
      let resultPartida = await sails.models.partida.destroy({}).fetch();
      let resultTablero = await sails.models.tablero.destroy({}).fetch();
      done();
    });

    it('Return a new ship',async (done) => {
        const params = {
            nombre: 'Ship 1 player ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'A',
            longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });

    it('Return indicate game (parameter partida_id)', (done) => {
        const params = {
            nombre: 'Ship 1 player ',
            inicial_x: '1',
            inicial_y: 'A',
            longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Indicate game');
                done();
            });
    });

    it('Return error propierty ship (parameter inicial_x)', (done) => {
        const params = {
            nombre: 'Ship 1 player ',
            partida_id: 1,
            // inicial_x: "1",
            inicial_y: 'A',
            longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });

    it('Return error propierty ship (parameter inicial_y)', (done) => {
        const params = {
            nombre: 'Ship 1 player ',
            partida_id: 1,
            inicial_x: '1',
            // inicial_y: "A",
            longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });
    it('Return error propierty ship (parameter longitud)', (done) => {
        const params = {
            nombre: 'Ship 1 player ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'A',
            // longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });
    it('Return error propierty ship (paramater orientation)', (done) => {
        const params = {
            nombre: 'Ship 1 player ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'A',
            longitud: 5,
            // orientacion: "H",
            direccion: 'R',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });

    it('Return error propierty ship (parameter direccion)', (done) => {
        const params = {
            nombre: 'Ship 1 player ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'A',
            longitud: 5,
            orientacion: 'H',
        };
        // direccion: "R" };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });

    it('Return error, coordinates stepped on',async (done) => {
        const params = {
            nombre: 'Ship 1 player ',
            partida_id: 1,
            inicial_x: '2',
            inicial_y: 'C',
            longitud: 2,
            orientacion: 'V',
            direccion: 'T',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error, coordinates invalid');
                done();
            });
    });

    it('Return new ship', (done) => {
        const params = {
            nombre: 'Ship 2 player ',
            partida_id: 1,
            inicial_x: '4',
            inicial_y: 'E',
            longitud: 4,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });


    it('Return new ship', (done) => {
        const params = {
            nombre: 'Ship 3 player ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'I',
            longitud: 3,
            orientacion: 'V',
            direccion: 'B',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });

    it('Return error, coordinates stepped on', (done) => {
        const params = {
            nombre: 'Ship 1 player ',
            partida_id: 1,
            inicial_x: '3',
            inicial_y: 'H',
            longitud: 2,
            orientacion: 'H',
            direccion: 'R',
        };

                app
                  .post('/create-ship-player')
                  .send(params)
                  .expect('Content-type', 'application/json; charset=utf-8')
                  .expect(200)
                  .end((err, res) => {
                      if (err) {
                        throw err;
                      }
                      expect(res.body.status).toBe(200);
                      expect(res.body.msj).toBe('Error, coordinates invalid');
                      done();
                    });
            });

    it('Return new ship', (done) => {
        const params = {
            nombre: 'Ship 4 player ',
            partida_id: 1,
            inicial_x: '6',
            inicial_y: 'A',
            longitud: 2,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });

    it('Return new ship', (done) => {
        const params = {
            nombre: 'Ship 5 player ',
            partida_id: 1,
            inicial_x: '7',
            inicial_y: 'F',
            longitud: 1,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-player')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });
});


describe('POST /create-ship-cpu ', () => {
  beforeEach((done) => {
      app
          .post('/partida')
          .send({ id: 1, nombre: 'Game X test ship cpu' })
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
                                              done();
                                          });
                                  });
                          });
                  });
          });
  });

  afterEach(async(done) => {
    let resultPartida = await sails.models.partida.destroy({}).fetch();
    let resultTablero = await sails.models.tablero.destroy({}).fetch();
    done();
  });



    it('Return a new ship', (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
            inicial_x: '3',
            inicial_y: 'A',
            longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });

    it('Return indicate game (parameter partida_id)', (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            inicial_x: '1',
            inicial_y: 'A',
            longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Indicate game');
                done();
            });
    });

    it('Return error propierty ship (parameter inicial_x)', (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
            // inicial_x: "1",
            inicial_y: 'A',
            longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });

    it('Return error propierty ship (parameter inicial_y)', (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
            inicial_x: '1',
            // inicial_y: "A",
            longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });
    it('Return error propierty ship (parameter longitud)', (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'A',
            // longitud: 5,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });
    it('Return error propierty ship (paramater orientation)', (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'A',
            longitud: 5,
            // orientacion: "H",
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });

    it('Return error propierty ship (parameter direccion)', (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'A',
            longitud: 5,
            orientacion: 'H',
        };
        // direccion: "R" };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error propierty ship');
                done();
            });
    });

    it('Return error, coordinates stepped on', async (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'D',
            longitud: 5,
            orientacion: 'V',
            direccion: 'B',
        };

        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error, coordinates invalid');
                done();
            });
    });

    it('Return new ship', (done) => {
        const params = {
            nombre: 'Ship 2 cpu ',
            partida_id: 1,
            inicial_x: '2',
            inicial_y: 'A',
            longitud: 4,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });

    it('Return error, coordinates stepped on', (done) => {
        const params = {
            nombre: 'Ship 3 cpu ',
            partida_id: 1,
            inicial_x: '5',
            inicial_y: 'E',
            longitud: 3,
            orientacion: 'V',
            direccion: 'T',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(200);
                expect(res.body.msj).toBe('Error, coordinates invalid');
                done();
            });
    });

    it('Return new ship', (done) => {
        const params = {
            nombre: 'Ship 4 cpu ',
            partida_id: 1,
            inicial_x: '9',
            inicial_y: 'E',
            longitud: 2,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });

    it('Return new ship', (done) => {
        const params = {
            nombre: 'Ship 5 cpu ',
            partida_id: 1,
            inicial_x: '7',
            inicial_y: 'F',
            longitud: 1,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });

    it('Return new ship', (done) => {
        const params = {
            nombre: 'Ship 5 cpu ',
            partida_id: 1,
            inicial_x: '1',
            inicial_y: 'A',
            longitud: 3,
            orientacion: 'H',
            direccion: 'R',
        };
        app
            .post('/create-ship-cpu')
            .send(params)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) {
                    throw err;
                }
                expect(res.body.status).toBe(201);
                expect(res.body.msj).toBe('Ship created!');
                done();
            });
    });
});
