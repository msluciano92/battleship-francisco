describe('POST /create-game ', () => {
    it('Return a new game', (done) => {
        const name = { nombre: 'Game 5' };
        app
            .post('/create-game')
            .send(name)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end(async (err, res) => {
                if (err) throw err;
                expect(res.body).toBe('¡Game created, boards created!. Create a ships ...{id=1}');
                done();
            });
    });

    it('Return error. Param body invalid. ', (done) => {
        const name = { nombr: 'Game 5' };
        app
            .post('/create-game')
            .send(name)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(500)
            .end(async (err) => {
                if (err) throw err;
                done();
            });
    });

    it('Return error. Param name repeat', (done) => {
        const name = { nombre: 'Game 5' };
        app
            .post('/create-game')
            .send(name)
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(500)
            .end(async (err) => {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /state-game-player', () => {
    beforeEach((done) => {
        app
            .post('/partida')
            .send({ nombre: 'Game X ' })
            .end((err) => {
                if (err) throw err;
                done();
            });
    });


    it('Return OK', (done) => {
        app
            .get('/state-game-player/1')
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toHaveLength(100);
                expect(Array.isArray(res.body.msj)).toBeTruthy();
                const arrMsj = res.body.msj;
                arrMsj.forEach((row) => {
                    expect(row.x).toBeDefined();
                    expect(row.y).toBeDefined();
                    expect(row.val).toBeDefined();
                });
                done();
            });
    });

    it('Return game empty. ', (done) => {
        app
            .get('/state-game-player/999')
            .expect(200)
            .expect('Content-type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toBe('Game not exists or finalized');
                done();
            });
    });

    it('Return game not includes boards. ', (done) => {
        app
            .get('/state-game-player/3')
            .expect(200)
            .expect('Content-type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toBe('Game not includes boards');
                done();
            });
    });

    it('Return error. Param get empty. ', (done) => {
        app
            .get('/state-game-player')
            .expect(404)
            .end((err) => {
                if (err) throw err;
                done();
            });
    });
});

describe('GET /state-game-cpu ', () => {
    beforeEach((done) => {
        app
            .post('/partida')
            .send({ nombre: 'Game X ' })
            .end((err) => {
                if (err) throw err;
                done();
            });
    });


    it('Return OK', (done) => {
        app
            .get('/state-game-cpu/1')
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toHaveLength(100);
                expect(Array.isArray(res.body.msj)).toBeTruthy();
                const arrMsj = res.body.msj;
                arrMsj.forEach((row) => {
                    expect(row.x).toBeDefined();
                    expect(row.y).toBeDefined();
                    expect(row.val).toBeDefined();
                });
                done();
            });
    });

    it('Return game empty. ', (done) => {
        app
            .get('/state-game-cpu/999')
            .expect(200)
            .expect('Content-type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toBe('Game not exists or finalized');
                done();
            });
    });

    it('Return game not includes boards. ', (done) => {
        app
            .get('/state-game-cpu/3')
            .expect(200)
            .expect('Content-type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj).toBe('Game not includes boards');
                done();
            });
    });

    it('Return error. Param get empty. ', (done) => {
        app
            .get('/state-game-cpu')
            .expect(404)
            .end((err) => {
                if (err) throw err;
                done();
            });
    });
});
