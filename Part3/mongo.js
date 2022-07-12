const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://Juan:${password}@cluster0.xoaqg.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}
if (process.argv.length > 3){
  const nombre = process.argv[3].toString()
  const numero = process.argv[4].toString()
  const person = new Person({
    name: nombre,
    number: numero,
  })
  person.save().then(result => {
    console.log('Result',result,`added ${nombre} number ${numero} to phonebook`)
    mongoose.connection.close()
  })
}