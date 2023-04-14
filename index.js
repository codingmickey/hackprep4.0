const express = require('express');
const app = express();

// Ignore (for now, ask me later if you want to know)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const expenses = [
  {
    title: 'Pav Bhaji',
    amount: 200,
    date: '14-04-23',
    category: 'Food',
    id: 1
  }
];
app.get('/expenses', (req, res) => {
  res.send(expenses);
});

app.post('/expenses', (req, res) => {
  const amount = req.body.amount;
  const title = req.body.title;
  const date = req.body.date;
  const expense = {
    amount: amount,
    title: title,
    date: date,
    id: 2
  };
  expenses.push(expense);
  res.send('expense added!');
});

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.put('/expenses', (req, res) => {
  let id = req.body.id;
  let expense = expenses.find((expense) => expense.id == id);
  expense.name = req.body.name;
  expense.category = req.body.category;
  expense.date = req.body.date;
  expense.amount = req.body.amount;
  res.send('Updated');
});

// Delete a expense
app.delete('/expenses', (req, res) => {
  let id = req.body.id;
  let expense = expenses.find((expense) => expense.id == id);
  let index = expenses.indexOf(expense);
  expenses.splice(index, 1);
  res.send('Deleted');
});
app.listen(3001, () => {
  console.log('Server is running!!');
});
