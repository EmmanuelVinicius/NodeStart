const Mongoose = require('mongoose')
Mongoose.connect('mongodb://emmanuel:emmanuel@192.168.99.100:27017/Pessoas',
{ useNewUrlParser: true }, function(error){
    if(!error) return;
    console.log("Não liguei lá não, pai", error)
})

const connection = Mongoose.connection;

connection.once('open', async ()=> console.log('Liga noix, pai'));
// const state = connection.readyState
// console.log('state', state);

const pessoaSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    telefone: {
        type: Number,
        maxlength: 11,
        minlength: 9,
    },
    endereco: {
        type: String,
    },
    departamento: {
        type: String,
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }

})
const model = Mongoose.model('Pessoas', pessoaSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Reginaldo',
        telefone: 31975758849,
        endereco: 'Rua Sem Saída no Milionários',
        departamento: 'casados'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItens = await model.find();
    console.log('Itens', listItens);
    
}

main();

/*
nome,
telefone,
endereco,
departamento,
*/