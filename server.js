// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create a new Express application
const app = express();

// Configure body-parser to parse JSON requests
app.use(bodyParser.json());

// Allow cross-origin requests
app.use(cors());

// Initialize an array to store the expenses
let expenses = [{ name: 'Rent', amount: 1000, date: new Date(), id: new Date().toString(), category: '💰 Bill' }];

// Create a GET route to retrieve all the expenses
app.get('/expenses', (req, res) => {
  res.json(expenses);
});

// Create a POST route to add a new expense
app.post('/expenses', (req, res) => {
  // Extract the expense details from the request body
  const { name, amount, category } = req.body;

  console.log(name, amount);

  // Create a new expense object with a unique id
  const expense = {
    id: Date.now().toString(),
    name,
    amount: parseInt(amount),
    category,
    date: new Date()
  };

  // Add the expense to the list of expenses
  expenses.push(expense);

  // Send a response with the updated list of expenses
  res.json(expenses);
});

// Create a PUT route to update an expense
app.put('/expenses/:id', (req, res) => {
  // Extract the id and updated expense details from the request parameters and body
  const { id } = req.params;
  const { name, amount } = req.body;

  // Find the index of the expense with the given id
  const index = expenses.findIndex((expense) => expense.id === id);

  // If the expense is not found, send a 404 error response
  if (index === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  // Update the expense and send a response with the updated list of expenses
  expenses[index].name = name;
  expenses[index].amount = amount;
  expenses[index].date = new Date();
  res.json(expenses);
});

// Create a DELETE route to remove an expense
app.delete('/expenses/:id', (req, res) => {
  // Extract the id from the request parameters
  const { id } = req.params;

  // Find the index of the expense with the given id
  const index = expenses.findIndex((expense) => expense.id === id);

  // If the expense is not found, send a 404 error response
  if (index === -1) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  // Remove the expense and send a response with the updated list of expenses
  expenses.splice(index, 1);
  res.json(expenses);
});

// Start the server and listen for incoming requests
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
