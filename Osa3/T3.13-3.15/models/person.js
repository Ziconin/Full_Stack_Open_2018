const mongoose = require('mongoose')
const dbUrl = "mongodb://*******:**********@ds113482.mlab.com:13482/fullstack-people"
mongoose.connect(dbUrl, {useNewUrlParser: true})

const schema = new mongoose.Schema({
  name: String,
  number: String
})

schema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  }
}

const Person = mongoose.model('Person', schema)

module.exports = Person
