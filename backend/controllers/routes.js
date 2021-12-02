const path = require('path')

const home = (req, res) =>{
    return res.sendFile(path.join(`${__dirname}/../views/index.html`))
}
const single = (req, res) =>{
    return res.sendFile(path.join(`${__dirname}/../views/single.html`))
}
const multiple = (req, res) =>{
    return res.sendFile(path.join(`${__dirname}/../views/multiple.html`))
}
module.exports = { getHome : home, getSingle : single, getMultiple : multiple }