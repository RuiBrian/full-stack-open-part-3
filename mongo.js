const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Incorrect number of arguments');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@phonebook.7wmy5.mongodb.net/phonebook?retryWrites=true&w=majority`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose.connect(url, options)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

// Define the schema for a phonebook entry
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Define the Person model based on the schema
const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person
    .find({})
    .then((persons) => {
      persons.forEach(person => {
        console.log(`${person.name}: ${person.number}`);
      });
      mongoose.connection.close();
    });
} else if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  // Create the new object to be stored in the database
  const person = new Person({
    name: name,
    number: number,
  });

  // Save to database
  person.save().then(() => {
    console.log(`added ${name}: ${number} to the phonebook`);
    mongoose.connection.close();
  });
}