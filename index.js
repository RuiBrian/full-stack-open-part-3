const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

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

let contacts = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
];

const generateID = () => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

app.get('/api/persons', (request, response) => {
  response.json(contacts);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = contacts.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get('/info', (request, response) => {
  const numContacts = contacts.length;
  const date = new Date();
  const info = `<p>Phonebook has info for ${numContacts} ${numContacts === 1 ? 'person' : 'people'}</p>
                <p>${new Date()}</p>`
  response.send(info);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  contacts = contacts.filter(p => p.id !== id);

  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "The name or number is missing"
    });
  }

  const existingContact = contacts.find(p => p.name === body.name);

  if (existingContact) {
    return response.status(400).json({
      error: "The name must be unique"
    });
  }

  const newContact = {
    id: generateID(),
    name: body.name,
    number: body.number
  }

  contacts = contacts.concat(newContact);
  response.json(newContact);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})