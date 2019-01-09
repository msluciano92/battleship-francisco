
describe('PATCH /send-plays-player ', () => {
    beforeEach((done) => {
        app
            .post('/create-game')
            .send({ nombre: 'Game X for ship ' })
            .end(async (err) => {
                if (err) throw err;
                done();
            });
    });

    it('Return plays player ', (done) => {
        app
            .patch('/send-plays-player')
            .send({ partida_id: 1, x: '1', y: 'A' })
            .expect('Content-type', 'application/json; charset=utf-8')
            .expect(201)
            .end((err, res) => {
                if (err) throw err;
                expect(res.body.msj === '¡Water!' || res.body.msj === '¡Touch a ship!').toBeTruthy();
                done();
            });
    });
});
