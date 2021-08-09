const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(url, options)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// Define the schema for a phonebook entry
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Format the returned objects
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

// Define the Person model based on the schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;