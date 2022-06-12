const fs = require('fs')
const fileLocation = './db/data.json'

const saveFile = data => {
    fs.writeFileSync( fileLocation, JSON.stringify(data) )
}

const readFile = data => {
    if ( ! fs.existsSync(fileLocation) ) return null
    const info = fs.readFileSync(fileLocation, { encoding: 'utf-8'})
    const archivo = JSON.parse( info )
    // console.log( archivo )
    return archivo
}

module.exports = {
    saveFile,
    readFile
}