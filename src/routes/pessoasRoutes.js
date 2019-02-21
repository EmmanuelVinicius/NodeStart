const BaseRoute = require('./base/baseRoute');
const Joi = require('joi')
const Boom = require('boom')

const failAction = (request, headers, erro) => {
    throw erro;
}
const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown();

class PessoasRoutes extends BaseRoute {
    constructor(db) {
        super();
        this._db = db;
    }

    list() {
        return {
            path: '/pessoas',
            method: 'GET',
            config: {
                tags: ['api'],
                description: 'Lista as pessoas do banco',
                notes: 'É possível paginar e e filtrar por nome',
                validate: {
                    failAction,
                    headers,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    },
                },

                handler: (request, headers) => {
                    try {
                        const { skip, limit, nome } = request.query;
                        const query = nome ? {
                            nome: { $regex: `.*${nome}*.` }
                        } : {}

                        return this._db.read(query, skip, limit);
                    } catch (error) {
                        console.error('Moio pai', error);
                        return Boom.internal();

                    }
                }
            }
        }
    }


    create() {
        return {
            path: '/pessoas',
            method: 'POST',
            config: {
                tags: ['api'],
                description: 'Cadastra alguém',
                notes: 'Cadastro por nome, telefone, endereço e departamento',
                validate: {
                    failAction,
                    headers,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        telefone: Joi.number().integer(),
                        endereco: Joi.string().min(5).max(100),
                        departamento: Joi.string().required().min(3).max(20)
                    }

                }
            },
            handler: async (request) => {
                try {
                    const dados = request.payload;
                    const result = await this._db.create(dados)
                    return {
                        message: 'Cadastrado com sucesso',
                        _id: result._id
                    }
                } catch (error) {
                    console.error('Moio papa', error);
                    return Boom.internal();
                }
            }
        }
    }
    update() {
        return {
            path: '/pessoas/{id}',
            method: 'PATCH',
            config: {
                tags: ['api'],
                description: 'Atualiza um registro',
                notes: 'É possível atualizar alguém pelo ID',
                validate: {
                    failAction,
                    headers,
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        telefone: Joi.number().integer(),
                        endereco: Joi.string().min(5).max(100),
                        departamento: Joi.string().min(3).max(20)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params;
                    const { payload } = request;
                    const dadosString = JSON.stringify(payload);

                    const dados = JSON.parse(dadosString);

                    const result = await this._db.update(id, dados);
                    if (result.nModified !== 1) return Boom.preconditionFailed('Deu erro, bixo!');
                    return {
                        message: 'Atualizado com sucesso'
                    }
                } catch (error) {
                    console.error('Moio, pai', error);
                    return Boom.internal();
                }
            }
        }
    }
    delete() {
        return {
            path: '/pessoas/{id}',
            method: 'DELETE',
            config: {
                tags: ['api'],
                description: 'Apaga alguém',
                notes: 'Deleta um registro pelo ID',
                validate: {
                    failAction,
                    headers,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { id } = request.params;
                    const result = await this._db.delete(id);

                    if (result.n !== 1) return Boom.preconditionFailed('Deu erro, bixo!');
                    return { message: 'Removido com sucesso' }
                } catch (error) {
                    console.error('Moio, papito', error);
                    return Boom.internal();
                }
            }
        }
    }

}
module.exports = PessoasRoutes;