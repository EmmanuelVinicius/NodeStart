//docker exec -it f2031ad8f2b8 mongo -u emmanuel -p emmanuel --authenticationDatabase Pessoas

db.Pessoas.insert({
    nome: 'Decio',
    endereco: 'Perto do UPA',
    tempoConvertido: 20
})

db.Pessoas.find().pretty()

for (let i = 0; i < 100; i++) {
    db.Pessoas.insert({
        nome: `Decio Clone-${i}`,
        endereco: 'Perto do UPA',
        tempoConvertido: 20
    })
}

db.Pessoas.count()
db.Pessoas.findOne()
db.Pessoas.find().limit(50).sort({ nome: -1 })
db.Pessoas.find({}, { endereco: 1, _id: 0 })

//insert
db.Pessoas.insert({
    nome: 'Decio',
    endereco: 'Perto do UPA',
    tempoConvertido: 20
})

//read
db.Pessoas.find()

//update
db.Pessoas.update({ _id: ObjectId("5c6a9bbe96cd28575c3bd996") },
    { nome: 'Veri' })
db.Pessoas.update({
    _id: ObjectId("5c6a9bbe96cd28575c3bd996")
},
    {
        $set: {
            nome: 'Veri'
        }
    })

//delete
db.Pessoas.remove({})
db.Pessoas.remove({ nome: 'DecioClone-0'})