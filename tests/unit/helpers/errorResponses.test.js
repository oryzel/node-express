const lib = require('../../../helpers/errorResponses');
describe('error response', () => {

    it('validator object true',() => {
        const result = lib.validatorObjectId('5e0d41ce772a7c29705a7fa8');
        expect(result).toBe(true);
    });

    it('validator object false',() => {
        const result = lib.validatorObjectId('invalid');
        expect(result).toBe(false);
    });

});