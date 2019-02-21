const Hapi = require('hapi');
const MongoDb = require('./database/strategies/mongodb/mongodbStrategy');
const Context = require('./database/strategies/base/contextStrategy');
const PessoaSchema = require('./database/strategies/mongodb/schemas/pessoasSchema');
const PessoaRoute = require('./routes/pessoasRoutes');
const AuthRoute = require('./routes/authRoutes');

const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');
const HapiAuthJwt2 = require('hapi-auth-jwt2')


const JWT_DEFAULT_SECRET = 'S&CRÊT';
const app = new Hapi.Server({ port: 5000 })

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection, PessoaSchema));

    const swaggerOptions = {
        info: {
            title: 'API CRUD de Pessoas',
            version: 'v1.0'
        },
        lang: 'pt'
    }
    await app.register([
        HapiAuthJwt2,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_DEFAULT_SECRET,
        // options: {
        //     expiresIn: 2
        // }
        validate: (dados, request) => {
            return {
                isValid: true
            }
        }
    })
    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new PessoaRoute(context), PessoaRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_DEFAULT_SECRET), AuthRoute.methods())
    ]);

    await app.start();
    console.log(`Aí bateu lá, papa. Na ${app.info.port}`);
    return app;
}

module.exports = main();
