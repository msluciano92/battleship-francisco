describe('POST /create-ship-player ', () => {
    beforeEach((done) => {
        app
            .post('/create-game')
            .send({ nombre: 'Game X for ship ' })
            .end(async (err) => {
                if (err) throw err;
                done();
            });
    });

    it('Return a new ship', (done) => {
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

    it('Return error, coordinates stepped on', (done) => {
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
            inicial_x: '2',
            inicial_y: 'A',
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
            inicial_x: '5',
            inicial_y: 'E',
            longitud: 3,
            orientacion: 'V',
            direccion: 'T',
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
            inicial_x: '5',
            inicial_y: 'E',
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
            inicial_x: '9',
            inicial_y: 'E',
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
            .post('/create-game')
            .send({ nombre: 'Game X for ship ' })
            .end(async (err) => {
                if (err) throw err;
                done();
            });
    });

    it('Return a new ship', (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
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

    it('Return error, coordinates stepped on', (done) => {
        const params = {
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
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

    it('Return new ship', (done) => {
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
            nombre: 'Ship 1 cpu ',
            partida_id: 1,
            inicial_x: '5',
            inicial_y: 'E',
            longitud: 2,
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
});
