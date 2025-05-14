import { Sequelize } from 'sequelize'

const database = new Sequelize(process.env.BANCO_DE_DADOS)

try {
    await database.authenticate()
    console.log('Conectado com sucesso')
} catch(erro) {
    console.log('Erro na conexão')
}

export { database }