const Hapi = require('hapi')
const MongoDb = require('./database/strategies/mongodb/mongodbStrategy')
const Context = require('./database/strategies/base/contextStrategy')
const PessoaSchema = require('./database/strategies/mongodb/schemas/pessoasSchema')
const app = new Hapi.Server({ port: 5000 })

async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, PessoaSchema))
    app.route({
        path: '/pessoas',
        method: 'GET',
        handler: (request, head) => {
            return context.read()
        }
    });
    await app.start();
    console.log(`Aí bateu lá, papa. Na ${app.info.port}`);
}

main();
