const assert = require('assert');
const api = require('./../api')
const Context = require('./../database/strategies/base/contextStrategy')
const Postgres = require('./../database/strategies/postgres/postgresStrategy');
const UsuarioSchema = require('./../database/strategies/postgres/schemas/usuarioSchema')

const MOCK_USUARIO_DEFAULT = {
    userrole: 'user',
    nome: 'Felipe',
    sobrenome: 'Geraldo',
    email: 'felipe.geraldo@serafinsdedeus.com.br',
    senha: '1234'
};
const MOCK_USER_DB = {}
describe('Suite de testes de autenticação', function () {
    this.beforeAll(async () => {
        app = await api;
        const connectionPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    });
    it('Obtém um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                email: MOCK_USUARIO_DEFAULT.email,
                password: MOCK_USUARIO_DEFAULT.senha
            }
        });

        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.deepStrictEqual(statusCode, 200);
        assert.ok(dados.token.length > 10);
    })
})