const Sequelize = require('sequelize')
const driver = new Sequelize(
    'usuarios',
    'emmanuel',
    'emmanuel',
    {
        host: '192.168.99.100',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
    }
)

async function main() {
    const pessoas = driver.define('pessoas', {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        userrole: {
            type: Sequelize.STRING,
            required: true
        },
        nome: {
            type: Sequelize.STRING,
            required: true
        },
        sobrenome: {
            type: Sequelize.STRING,
            required: true
        },
        email: {
            type: Sequelize.STRING,
            required: true
        },
        senha: {
            type: Sequelize.STRING,
            required: true
        }
    }, {
            tableName: 'pessoas',
            freezeTableName: false,
            timestamps: false
        })
    await pessoas.sync()

    const result = await pessoas.findAll({ raw: true })
    console.log('result', result);

}
main()