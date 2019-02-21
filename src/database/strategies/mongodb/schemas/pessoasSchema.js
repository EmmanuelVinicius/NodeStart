const Mongoose = require('mongoose')

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
module.exports = Mongoose.model('Pessoas', pessoaSchema)
