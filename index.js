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

app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then((persons) => {
      response.json(persons);
    })
});

app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.get('/info', (request, response, next) => {
  Person
    .estimatedDocumentCount({})
    .then((numContacts) => {
      const info = `<p>Phonebook has info for ${numContacts} ${numContacts === 1 ? 'person' : 'people'}</p>
                    <p>${new Date()}</p>`
      response.send(info);
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id;
  Person
    .findByIdAndDelete(id)
    .then((deletedPerson) => {
      if (deletedPerson) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
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
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  const newContact = {
    name: body.name,
    number: body.number,
  }

  Person
    .findByIdAndUpdate(id, newContact, { runValidators: true, new: true, context: 'query' })
    .then((result) => {
      response.json(result);
    })
    .catch(error => 
    {
      next(error);
      console.log(newContact);
    });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});