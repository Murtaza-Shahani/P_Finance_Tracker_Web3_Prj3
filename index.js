let expenses = [];
let updateIndex = null;

document.querySelector(".btn-success").addEventListener("click", () => { 
  // Get values from the DOM
<<<<<<< HEAD
  let balanceInput = document.querySelector(".balnc"); // Typo fixed here
  let totalblnc = parseFloat(balanceInput.value); // Convert input to number
=======
  let balanceInput = document.querySelector(".balnc"); 
  let totalblnc = parseFloat(balanceInput.value); 
>>>>>>> f8dad419845ad49e66e9dcb6bb8ccef74cb54213
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
  if (totalblnc < totalExpenses) {
    alert("Expenses exceed your budget, please adjust expenses");
  }
};

// Function to show the expenses list in the table
let showList = () => {
  let expenses = getExpenses();
  let tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  expenses.forEach((expense, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.category}</td>
      <td>${expense.amount}</td>
      <td>${expense.date}</td>
      <td>
        <button class="btn btn-primary update-btn" data-index="${index}" onclick="updateResult(${index})">Update</button> <!-- Fix index here -->
        <button class="btn btn-danger delete-btn" data-index="${index}" onclick="deleteResult(${index})">Delete</button> <!-- Fix index here -->
      </td>
    `;
    tbody.appendChild(row);
  });

  updateBalances();
};

// Function to add expense and display it
function addExpense() {
  let expenses = getExpenses();
  const category = document.querySelector("#category").value;
  const amount = parseFloat(document.querySelector("#amount").value);
  const date = document.querySelector('input[type="date"]').value;

  if (!category || isNaN(amount) || !date) {
    alert("Please fill in all fields with valid values.");
    return;
  }

  if (updateIndex === null) {
    // Add new expense
    expenses.push({ category, amount, date });
<<<<<<< HEAD
  } else {
    // Update existing expense
    expenses[updateIndex] = { category, amount, date };
=======
    alert("Expense added successfully")
  } else {
    // Update existing expense
    expenses[updateIndex] = { category, amount, date };
    alert("Expense updated successfully")
>>>>>>> f8dad419845ad49e66e9dcb6bb8ccef74cb54213
    updateIndex = null;
  }

  setExpenses(expenses);
  showList();
  clearForm();
}

// Function to clear the input form
function clearForm() {
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
}

// Update expense functionality here
let updateResult = (index) => {
  let expenses = getExpenses();
  let expense = expenses[index];

<<<<<<< HEAD
  // Add debugging to check if the index is valid
=======
  // check if the index is valid
>>>>>>> f8dad419845ad49e66e9dcb6bb8ccef74cb54213
  console.log("Update index:", index);
  console.log("Expenses:", expenses);

  if (expense) {
    document.getElementById("category").value = expense.category;
    document.getElementById("amount").value = expense.amount;
    document.getElementById("date").value = expense.date;
    updateIndex = index;
  } else {
    console.error("Expense not found at index:", index);
    alert("Expense not found. Please try again.");
  }
};

// Delete functionality here
let deleteResult = (index) => { 
  let expenses = getExpenses();
<<<<<<< HEAD
  if (index >= 0 && index < expenses.length) {
    expenses.splice(index, 1);
    setExpenses(expenses);
    showList();
=======
  
  // Check if the index is valid
  if (index >= 0 && index < expenses.length) {
    // confirmation before deleting
    if (confirm("Are you sure you want to delete this expense?")) {
      expenses.splice(index, 1);
      setExpenses(expenses);
      showList();
      alert("Expense deleted successfully.");
    }
>>>>>>> f8dad419845ad49e66e9dcb6bb8ccef74cb54213
  } else {
    console.error("Invalid index:", index);
    alert("Invalid index. Please try again.");
  }
};

<<<<<<< HEAD
// Add event listener for the Add Expense button
=======

// event listener for the Add Expense button
>>>>>>> f8dad419845ad49e66e9dcb6bb8ccef74cb54213
document.querySelector(".add-btn").addEventListener("click", (event) => {
  event.preventDefault();
  addExpense();
});

// Initial render of expenses on page load
document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  showList(); // Fix here: call showList instead of clearing local storage
});
=======
   
});
// Clear all local storage data upon browser refresh
window.onbeforeunload = () => {
  localStorage.clear();
};
>>>>>>> f8dad419845ad49e66e9dcb6bb8ccef74cb54213
