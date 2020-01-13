const {User} = require('../../../models/user');
const monggose = require('mongoose');
const jwt = require('jsonwebtoken');

describe('middlewares auth', () => {

    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules() // this is important - it clears the cache
      process.env = { ...OLD_ENV };
      delete process.env.NODE_ENV;
    });
  
    afterEach(() => {
      process.env = OLD_ENV;
    });

    it('Should return a valid JWT', () => {
        const payload = {_id : new monggose.Types.ObjectId().toHexString(), email : 'sabriyan@gmail.com' };
        console.log(payload);
        const user = new User(payload);
        const token = user.generateAuthToken();
        expect(result).toBe(200);
    })
});