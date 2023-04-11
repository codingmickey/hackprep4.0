// Retrieve the form and list elements from the HTML
const form = document.querySelector('form');
const expensesList = document.querySelector('#expenses');

// Function to clear the form fields
function clearForm() {
  form.name.value = '';
  form.amount.value = '';
}

// Event listener for the "Add Expense" button
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.name.value;
  const amount = form.amount.value;
  const category = form.category.value;
  fetch('http://localhost:3000/expenses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, amount, category })
  })
    .then((response) => response.json())
    .then((expense) => {
      console.log(expense);
      getExpenses();
      clearForm();
    })
    .catch((error) => console.error(error));
});

// Function to retrieve expenses from the server and add them to the list
function getExpenses() {
  fetch('http://localhost:3000/expenses')
    .then((response) => response.json())
    .then((expenses) => {
      console.log(expenses);
      renderExpenses(expenses);
    })
    .catch((error) => console.error(error));
}

function renderExpenses(expenses) {
  expensesList.innerHTML = `<tr>
            <th>Category</th>
            <th>Expense</th>
            <th class="amount">Amount</th>
            <th>Date</th>
            <th>Time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>`;

  expenses.forEach((expense) => {
    const expenseItem = document.createElement('tr');
    expenseItem.innerHTML = `
          <tr>
            <td>${expense.category}</td>
            <td>${expense.name}</td>
            <td class="amount">$${expense.amount.toFixed(2)}</td>
            <td class="date">${new Date(expense.date).toDateString()}</td>
            <td class="time">${new Date(expense.date).toLocaleTimeString()}</td>
            <td><i class="fa fa-pencil-alt edit-icon" data-id="${expense.id}"></i></td>
            <td><i class="fa fa-trash delete-icon delete-button" data-id="${expense.id}"></i></td>
          </tr> 
    `;

    expensesList.appendChild(expenseItem);
  });

  // Add event listeners to edit and delete buttons
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const expenseId = button.getAttribute('data-id');
      editExpense(expenseId);
    });
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const expenseId = button.getAttribute('data-id');
      deleteExpense(expenseId);
    });
  });
}

async function editExpense(id, description, amount, date) {
  const data = { description, amount, date };
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`http://localhost:3000/expenses/${id}`, options);
    const updatedExpense = await response.json();
    return updatedExpense;
  } catch (error) {
    console.error(error);
  }
}

async function deleteExpense(expenseId) {
  try {
    const response = await fetch(`http://localhost:3000/expenses/${expenseId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete expense');
    }

    const expenses = await response.json();
    renderExpenses(expenses);
  } catch (error) {
    console.error(error);
  }
}

// Call the getExpenses function to populate the list on page load
getExpenses();
