let productosDao
let mensajesDao

const persistencia = process.env.TIPO_PERSISTENCIA || 'txt'

switch (persistencia) {
    case 'txt':
        const { default: ProductosDaoArchivo } = await import('./productos/ProductosDaoArchivo.js')
        const { default: MensajesDaoArchivo } = await import('./mensajes/MensajesDaoArchivo.js')

        productosDao = new ProductosDaoArchivo()
        mensajesDao = new MensajesDaoArchivo()
        break    
    default:
        const { default: ProductosDaoMem } = await import('./productos/ProductosDaoMemoria.js')
        const { default: MensajesDaoMem } = await import('./mensajes/MensajesDaoMemoria.js')

        productosDao = new ProductosDaoMem()
        mensajesDao = new MensajesDaoMem()
}

module.exports = { productosDao, mensajesDao };