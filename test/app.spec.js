const app = require('../src/app')

describe('App', () => {
    it('GET / responds with 200 contain "HELLO DERP!', () => {
        return supertest(app)
            .get('/')
            .expect(200, "HELLO DERP!")
    })
})