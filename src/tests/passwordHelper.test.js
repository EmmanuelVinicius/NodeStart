const assert = require('assert');
const PasswordHelper = require('./../helpers/passwordHelper');

const PASSWORD_DEFAULT = 'Salame@2019';
const HASH_DEFAULT = '$2b$04$k4MbWSbWd.ks8DjZFwmekOsHM46wR8Ft3I4JIgZMXMRHCMe5MO2rW';
describe('Suite de testes do UserHelper', function () {
    it('Gera um hash a partir de senha', async()=>{
        const result = await PasswordHelper.hashPassword(PASSWORD_DEFAULT);
        
        assert.ok(result.length > 10)
    })
    it('Valida a senha com o seu hash', async()=>{
        const result = await PasswordHelper.comparePassword(PASSWORD_DEFAULT, HASH_DEFAULT)

        assert.ok(result)
    })
})