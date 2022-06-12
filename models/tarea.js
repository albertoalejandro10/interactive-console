const { v4: uudiv4 } = require('uuid')

class Tarea {
    id = ''
    desc = ''
    completadoEn = false

    constructor( desc ) {
        this.id = uudiv4()
        this.desc = desc
        this.completadoEn = null      
    }
}

module.exports = Tarea