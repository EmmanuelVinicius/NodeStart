const assert = require('assert');
const api = require('./../api');


const MOCK_PESSOA_CADASTRAR = {
    nome: 'Anna Luiza',
    telefone: 31963636363,
    endereco: 'Na igreja msm',
    departamento: 'adolescentes'
}
let MOCK_ID = {}
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByaXNyYWVsIiwiaWQiOjEsImlhdCI6MTU1MDc0OTY0M30.R6RMKeWOmpFd-COAHx7DI0vGXwlkE_L3guDhS_XxOz4'
const headers = {
    authorization: TOKEN
}


describe('Suite de Testes da API', function () {
    this.beforeAll(async () => {
        app = await api
        const result = await app.inject({
            method: 'POST',
            url: '/pessoas',
            headers,
            payload: JSON.stringify(MOCK_PESSOA_CADASTRAR)
        })
        const id = JSON.parse(result.payload)
        MOCK_ID = id._id
    })

    it('Lista a partir da /pessoas', async () => {
        const result = await app.inject({
            method: 'GET',
            headers,
            url: '/pessoas?skip=0&limit=10'
        })

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        assert.deepStrictEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });
    it('Lista de /pessoas com limit correto', async () => {
        const TAMANHO_LIMITE = 3;
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/pessoas?skip=0&limit=${TAMANHO_LIMITE}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepStrictEqual(statusCode, 200);
        assert.ok(dados.length === TAMANHO_LIMITE)
    });
    it('Lista de /pessoas com paginacao e dá erro de limit', async () => {
        const TAMANHO_LIMITE = 'ASFE';
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/pessoas?skip=0&limit=${TAMANHO_LIMITE}`
        });
        const statusCode = result.statusCode;

        assert.ok(statusCode !== 200);
    })
    it('Filtra de /pessoas', async () => {
        const TAMANHO_LIMITE = 1000;
        const NAME = MOCK_PESSOA_CADASTRAR.nome
        const result = await app.inject({
            method: 'GET',
            headers,
            url: `/pessoas?skip=0&limit=${TAMANHO_LIMITE}&nome=${NAME}`
        });
        const [{ nome }] = JSON.parse(result.payload)
        const statusCode = result.statusCode;

        assert.deepStrictEqual(statusCode, 200);
        assert.ok(nome === NAME)
    });
    it('Cadastra em /pessoas', async () =>{
        const result = await app.inject({
            method: 'POST',
            headers,
            url: `/pessoas`,
            payload: MOCK_PESSOA_CADASTRAR
        });

        const statusCode = result.statusCode;
        const { message, _id } = JSON.parse(result.payload)
        assert.ok(statusCode === 200);
        assert.notDeepStrictEqual(_id, undefined)
        assert.deepStrictEqual(message, 'Cadastrado com sucesso')
    })
    it('Atualiza item de /pessoas/:id', async () =>{
        const expected = {
            departamento: 'jovens'
        }
        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/pessoas/${MOCK_ID}`,
            payload: JSON.stringify(expected)

        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepStrictEqual(dados.message, 'Atualizado com sucesso')
    });
    it('Não atualiza item de /pessoas/:id e dá erro de ID', async () => {
        const expected = {
            departamento: 'jovens'
        }
        const result = await app.inject({
            method: 'PATCH',
            headers,
            url: `/pessoas/5c6b04973c32352ecc6cfd24`,
            payload: JSON.stringify(expected)

        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        
        assert.ok(statusCode !== 200);
        assert.deepStrictEqual(dados.message, 'Deu erro, bixo!')
    });
    it('Remove de /pessoas/:id', async () => {
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/pessoas/${MOCK_ID}`
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        assert.deepStrictEqual(dados.message, 'Removido com sucesso');

    });
    it('Não remove de /pessoas/:id e dá erro de ID', async () => {
        const result = await app.inject({
            method: 'DELETE',
            headers,
            url: `/pessoas/5c6b04973c32352ecc6cfd24`
        });
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode !== 200);
        assert.deepStrictEqual(dados.message, 'Deu erro, bixo!');

    })
});