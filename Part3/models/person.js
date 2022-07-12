const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI
console.log('connecting to',url)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const numberValidator = (val) => {
  return /(\d{2}-\d{6,})|(\d{3}-\d{5,})/.test(val)
}
const personSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true, unique: true },
  number: { type: String, required: true }
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
personSchema.path('number').validate(numberValidator,'Number of eight digits at least. Must be formed  of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers')

personSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', personSchema)