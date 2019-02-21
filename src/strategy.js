class NaoImplementadoPapai extends Error {
    constructor() {
        super("Aí deu ruim em, pai")
    }
}

class ICrud {
    create(item) {
        throw new NaoImplementadoPapai()
    }
    read(query) {
        throw new NaoImplementadoPapai()
    }
    update(id, item) {
        throw new NaoImplementadoPapai()
    }
    delete(id) {
        throw new NaoImplementadoPapai()
    }
}

class MongoDB extends ICrud {
    constructor(){
        super()
    }
    create(item){
        console.log('O item foi salvo no mongodb')
    }
}

class Postgres extends ICrud{
    constructor(){
        super()
    }
    create(item){
        console.log('O item foi salvo no postgres');
    }
}

class ContextStrategy {
    constructor(strategy) {
        this._database = strategy
    }
    create(item){
        return this._database.create(item)
    }
    read(query){
        return this._database.read(query)
    }
    update(id, item){
        return this._database.update(id, item)
    }
    delete(id){
        return this._database.delete(id)
    }
}

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create()