const knex = require('knex')


const options ={
    client: 'sqlite3',
    connection: { filename: './coderhouse.sqlite' }
}


class chat {

    async createTable() {    
        const knexInstance = new knex(options)
        try {
          const exist = await knexInstance.schema.hasTable('chat')
          if(exist) {
            console.log('La tabla chat ya existe.')
            return
          }
          await knexInstance.schema.createTable('chat', (table) => {
            table.increments('id').notNullable()
            table.string('email',50).notNullable()
            table.string('message').notNullable()
            table.time('time').notNullable()
            table.primary('id')
          })
          console.log('Tabla chat creada.')
        } catch (error) {
          console.error(error.message)
          throw error
        } finally {
          knexInstance.destroy()
        }
    }

    async save(mensaje) {
        const knexInstance = knex(options)
        try {
            await knexInstance('chat').insert(mensaje)
            console.log('Mensaje guardado con exito')
        } catch (error) {
            console.error(error)
            throw error
        } finally {
            knexInstance.destroy()
        }
    }  

    async getAll() {
        const knexInstance = knex(options)
        try {
          const rows = await knexInstance('chat').select('*')
          console.log('Chat encontrado:', rows.length)
          return rows
        } catch (error) {
          console.error(error)
          throw error
        } finally {
          knexInstance.destroy()
        }
    }

}

module.exports = chat;