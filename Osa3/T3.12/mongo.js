const mongoose = require('mongoose')
const url = "mongodb://*******:**********@ds113482.mlab.com:13482/fullstack-people"
mongoose.connect(url, {useNewUrlParser: true})

const args = process.argv

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

if(args.length === 2) {
  console.log("Puhelinluettelo:")
  Person
    .find({})
    .then(res => {
      res.forEach(person => {
        console.log(person.name, person.number)
      })
      mongoose.connection.close()
    })
}
else {
  const person = new Person({
    name: args[2],
    number: args[3]
  })

  person
    .save()
    .then(res => {
      console.log(`Lisätään henkilö ${person.name} numero ${person.number} luetteloon`)
      mongoose.connection.close()
    })
}
