const mongoose = require('mongoose')
const dbConfig = require('./db.js')

const connection = () => {

 mongoose.connect(dbConfig.url , {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then((result) => {
    console.info('db is connected')
}).catch((err) => {
    console.info(err)
})

}
module.exports = connection