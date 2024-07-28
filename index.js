document.querySelector(".btn-success").addEventListener("click", () => {
  // Get values from the DOM
  let balanceInput = document.querySelector(".balnc");
  let totalblnc = parseFloat(balanceInput.value); // Convert input to number
  let total = document.querySelector(".total");
  let expensesElement = document.querySelector(".expenses");
  let remaining = document.querySelector(".remaining");

  // Check if balance input is valid
  if (!isNaN(totalblnc)) {
    // Save balance to local storage
    localStorage.setItem("totalblnc", totalblnc);

    // Update total balance
    total.innerHTML = `RS: ${totalblnc}`;

    // Update balances
    updateBalances();

    // Clear the input field
    balanceInput.value = "";
  } else {
    alert("Please enter a valid number for the balance.");
  }
});

// Function for setting expenses in localStorage
let setExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

// Function for getting the data from localStorage
let getExpenses = () => {
  let expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};

// Function for maintaining the balance
let updateBalances = () => {
  let totalblnc = parseFloat(localStorage.getItem("totalblnc")) || 0;
  let expenses = getExpenses();
  let totalExpenses = expenses.reduce(
    (sum, exp) => sum + parseFloat(exp.amount),
    0
  );

  let expensesElement = document.querySelector(".expenses");
  let remaining = document.querySelector(".remaining");

  expensesElement.innerHTML = `RS: ${totalExpenses}`;
  remaining.innerHTML = `RS: ${totalblnc - totalExpenses}`;
  if(totalblnc < totalExpenses){
    alert("Expenses exceedes your budget ,please adjust expenses")
  }
};

// Function to show the expenses list in the table
let showList = () => {
  let expenses = getExpenses();
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  expenses.forEach((expense) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.category}</td>
      <td>${expense.amount}</td>
      <td>${expense.date}</td>
       <td>
        <button class="btn btn-primary update-btn" data-index="0">Update</button>
        <button class="btn btn-danger delete-btn" data-index="0">Delete</button>

      </td>
    `;
    tbody.appendChild(row);
  });

  updateBalances();
};

// Function to add expense and display it
function addExpense() {
  const category = document.querySelector("#category").value;
  const amount = parseFloat(document.querySelector("#amount").value);
  const date = document.querySelector('input[type="date"]').value;

  if (!category || isNaN(amount) || !date) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  const expenses = getExpenses();
  expenses.push({ category, amount, date });
  setExpenses(expenses);
  category.value = "";
  amount.value = "";
  date.value = "";
  showList();
}

// Add event listener for the Add Expense button
document.querySelector(".add-btn").addEventListener("click", (event) => {
  event.preventDefault();
  addExpense();
});

// Initial render of expenses on page load
document.addEventListener("DOMContentLoaded", () => {
  // Clear all expenses from local storage on page load
  localStorage.removeItem("expenses");
});
