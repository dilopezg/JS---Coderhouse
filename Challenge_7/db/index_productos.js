const knex = require('knex')

const options = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      //password: ,
      database: 'coderhouse'
    },
    pool: { min: 0, max: 7 }
}

class Producto {

  async createTable() {    
    const knexInstance = new knex(options)
    try {
      const exist = await knexInstance.schema.hasTable('productos')
      if(exist) {
        console.log('La tabla productos ya existe.')
        return
      }
      await knexInstance.schema.createTable('productos', (table) => {
        table.increments('id').notNullable()
        table.string('title',50).notNullable()
        table.integer('price').notNullable()
        table.string('thumbnail',150).notNullable()
        table.primary('id')
      })
      console.log('Tabla productos creada.')
    } catch (error) {
      console.error(error.message)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }

  async guardar(producto) {
    const knexInstance = knex(options)
    try {
      await knexInstance('productos').insert(producto)
      console.log('Productos creados con exito')
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }

  async listar() {
    const knexInstance = knex(options)
    try {
      const rows = await knexInstance('productos').select('*')
      console.log('Productos encontrados:', rows.length)
      return rows
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }

  async buscarPorId(conditions) {
    const knexInstance = knex(options)
    try {
      const rows = await knexInstance('productos').select('*').where(conditions)
      console.log('Productos encontrados:', rows.length)
      return rows
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }

  async actualizar(data, conditions) {
    const knexInstance = knex(options)
    try {
      await knexInstance('productos').update(data).where(conditions)
      console.log('productos editados')
    } catch (error) {
      console.error(error.message)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }

  async borrar(conditions) {
    const knexInstance = knex(options)
    try {
      if (conditions) {
        await knexInstance.from('productos').del().where(conditions)
      } else {
        await knexInstance.from('productos').del()
      }
      console.log('productos eliminados')
    } catch (error) {
      console.error(error.message)
      throw error
    } finally {
      knexInstance.destroy()
    }
  }
}

module.exports = new Producto();
    
    