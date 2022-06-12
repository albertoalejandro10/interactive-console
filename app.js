require('colors')

const { 
    inquirerMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
    toggleCompletadas
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')
const { saveFile, readFile } = require('./helpers/saveFile')

const main = async() => {

    let opt = ''
    const tareas = new Tareas()

    const tareasDB = readFile()

    if ( tareasDB ) {
        // TODO: Cargar tareas
        tareas.cargarTareasFromArray( tareasDB )
    }

    do {
        opt = await inquirerMenu()
        // console.log({ opt })

        switch ( opt ) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripcion:')
                tareas.crearTarea( desc )
            break
            case '2': // Mostrar tareas
                tareas.mostrarTareas()
            break

            case '3': // Listar completadas
                tareas.listarPendientes( true )
            break

            case '4': // Listar pendientes
                tareas.listarPendientes( false )
            break

            case '5': // Completado || Pendiente
                const ids = await mostrarListadoChecklist( tareas.listadoArr )
                tareas.toggleCompletadas( ids )
            break
            
            case '6': // Borrar tareas
                const id = await listadoTareasBorrar( tareas.listadoArr )
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Estas seguro?')
                    if ( ok ) {
                        tareas.borrarTarea( id )
                        console.log('Tarea borrada')
                    }
                }
            break
        
            default:
            break
        }

        saveFile( tareas.listadoArr )
        await pause()
    } while (opt !== '0' )
}

main()