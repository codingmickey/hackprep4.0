// Description: This is the main file of the API

// Importing the express module
const express = require('express');
const app = express();

// Array of finances
let finances = [
  {
    // Name of the transaction
    name: 'Gift for mummy',
    // Bill, EMI, Entertainment, Food, Drinks, Fuel, Groceries, Health, Investment, Shopping, Transfer, Travel
    category: 'Food',
    // Date of the transaction
    date: '2021-05-01',
    // Amount of the transaction
    amount: 1000,
    // Unique ID of the transaction
    id: 1
  },
  {
    name: 'Pav Bhaji with Friends',
    category: 'Food',
    date: '2021-05-01',
    amount: 1000,
    id: 2
  }
];

// Ignore (for now, ask me later if you want to know)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('API is working!! Lessgo :D');
});

// Get all finances
app.get('/finances', (req, res) => {
  res.send(finances);
});

// Get a single finance
app.get('/finances/:id', (req, res) => {
  let id = req.params.id;
  let finance = finances.find((finance) => finance.id == id);
  res.send(finance);
});

// Add a finance
app.post('/finances', (req, res) => {
  let finance = req.body;
  finances.push(finance);
  res.send('Added');
});

app.listen(5000, () => {
  console.log('Server Listening on port 5000');
});
