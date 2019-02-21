const ContextStrategy = require('./database/strategies/base/contextStrategy')
const MongoDB = require('./database/strategies/mongodbStrategy')
const Postgres = require('./database/strategies/postgresStrategy')

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()