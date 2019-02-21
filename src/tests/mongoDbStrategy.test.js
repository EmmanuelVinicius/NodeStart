const assert = require('assert')
const Mongodb = require('./../database/strategies/mongodb/mongodbStrategy')
const PessoaSchema = require('./../database/strategies/mongodb/schemas/pessoasSchema')

const Context = require('./../database/strategies/base/contextStrategy')



let context = {}

const MOCK_PESSOA_CADASTRAR = {
    nome: 'Abraão',
    telefone: 31945454545,
    endereco: 'Rua Perto do Monte',
    departamento: 'jovens',
};
const MOCK_PESSOA_ATUALIZAR = {
    nome: `Thiago-${Date.now()}`,
    telefone: 31987457845,
    endereco: 'Proximo ao Isaura',
    departamento: 'casados',
};
let MOCK_PESSOA_ID = '';
describe('Suite de testes do MongoDb Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async () => {
        const connection = Mongodb.connect();
        context = new Context(new Mongodb(connection, PessoaSchema));
        
        const base = await context.create(MOCK_PESSOA_ATUALIZAR);
        MOCK_PESSOA_ID = base._id;
    })
    it('Verifica conexao do mongodb', async () => {
        const result = await context.isConected()

        assert.deepStrictEqual(result, 'Conectado')
    })
    it('Cadastra pessoa no mongodb', async () => {
        const { nome } = await context.create(MOCK_PESSOA_CADASTRAR);

        assert.deepStrictEqual(nome, MOCK_PESSOA_CADASTRAR.nome)
    })
    it('Lista pessoas do mongodb', async () => {
        const [{ nome }] = await context.read({ nome: MOCK_PESSOA_ATUALIZAR.nome });

        assert.deepStrictEqual(nome, MOCK_PESSOA_ATUALIZAR.nome)
    })
    it('Atualiza uma pessoa do mongodb', async () => {
        const result = await context.update(MOCK_PESSOA_ID, {
            nome: 'Bia'
        });

        assert.deepStrictEqual(result.nModified, 1);
    })
    it('Deleta uma pessoa do mongodb', async () => {
        const result = await context.delete(MOCK_PESSOA_ID);

        assert.deepStrictEqual(result.n, 1);
    })
})