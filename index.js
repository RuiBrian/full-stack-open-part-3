require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json());
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    req.method === 'POST' ? JSON.stringify(req.body) : null
  ].join(' ');
}));

const generateID = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then((persons) => {
      response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response) => {
  Person
    .findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    });

});

app.get('/info', (request, response) => {
  Person
    .estimatedDocumentCount({})
    .then((numContacts) => {
      const info = `<p>Phonebook has info for ${numContacts} ${numContacts === 1 ? 'person' : 'people'}</p>
                    <p>${new Date()}</p>`
      response.send(info);
    });
});

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person
    .findByIdAndDelete(id)
    .then((deletedPerson) => {
      if (deletedPerson) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    });

});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "The name or number is missing"
    });
  }

  const newContact = new Person({
    name: body.name,
    number: body.number,
  });

  newContact
    .save()
    .then((result) => {
      response.json(result);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})