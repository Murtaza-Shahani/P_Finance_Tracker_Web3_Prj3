let expenses = [];
let updateIndex = null;
let expenseChart;

// Initialize the chart
function initializeChart() {
  const ctx = document.getElementById('expenseChart').getContext('2d');
  expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Food', 'Transport', 'Entertainment', 'Other'],
      datasets: [{
        label: 'Expenses',
        data: [0, 0, 0, 0], // Initialize with zeros
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Expense Breakdown'
        }
      }
    }
  });
}

// Update the chart data
function updateChartData() {
  let expenses = getExpenses();
  let food = 0, transport = 0, entertainment = 0, other = 0;

  expenses.forEach(expense => {
    switch (expense.category.toLowerCase()) {
      case 'food':
        food += parseFloat(expense.amount);
        break;
      case 'transport':
        transport += parseFloat(expense.amount);
        break;
      case 'entertainment':
        entertainment += parseFloat(expense.amount);
        break;
      default:
        other += parseFloat(expense.amount);
        break;
    }
  });

  expenseChart.data.datasets[0].data = [food, transport, entertainment, other];
  expenseChart.update();
}

document.querySelector(".btn-success").addEventListener("click", () => {
  let balanceInput = document.querySelector(".balnc");
  let totalblnc = parseFloat(balanceInput.value);
  let total = document.querySelector(".total");

  if (!isNaN(totalblnc)) {
    localStorage.setItem("totalblnc", totalblnc);
    total.innerHTML = `RS: ${totalblnc}`;
    updateBalances();
    balanceInput.value = "";
  } else {
    alert("Please enter a valid number for the balance.");
  }
});

let setExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

let getExpenses = () => {
  let expenses = localStorage.getItem("expenses");
  return expenses ? JSON.parse(expenses) : [];
};

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
        <button class="btn btn-primary update-btn" data-index="${index}" onclick="updateResult(${index})">Update</button>
        <button class="btn btn-danger delete-btn" data-index="${index}" onclick="deleteResult(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  updateBalances();
  updateChartData();
};

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
    expenses.push({ category, amount, date });
    alert("Expense added successfully");
  } else {
    expenses[updateIndex] = { category, amount, date };
    alert("Expense updated successfully");
    updateIndex = null;
  }

  setExpenses(expenses);
  showList();
  clearForm();
}

function clearForm() {
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
}

let updateResult = (index) => {
  let expenses = getExpenses();
  let expense = expenses[index];

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

let deleteResult = (index) => {
  let expenses = getExpenses();

  if (index >= 0 && index < expenses.length) {
    if (confirm("Are you sure you want to delete this expense?")) {
      expenses.splice(index, 1);
      setExpenses(expenses);
      showList();
      alert("Expense deleted successfully.");
    }
  } else {
    console.error("Invalid index:", index);
    alert("Invalid index. Please try again.");
  }
};

document.querySelector(".add-btn").addEventListener("click", (event) => {
  event.preventDefault();
  addExpense();
});

document.addEventListener("DOMContentLoaded", () => {
  initializeChart();
  showList();
});
window.onbeforeunload = () => {
  localStorage.clear();
};
