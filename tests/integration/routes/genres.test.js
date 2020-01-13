const request = require ('supertest');
let server;
describe('/api/genres', () => {
    beforeEach(() => {server = require('../../../index')});
    afterEach(() => server.close);

    describe('GET /', () => {
        it('Should return all genres', () => {
            // const result = request(server).get('api/genres/')
            // expect(result).toBe(200);
        })
    })

});