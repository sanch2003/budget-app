const displayAmount = document.querySelector(".budget-amount");
const expensesAmount = document.querySelector(".expenses-amount");
const balanceAmount = document.querySelector(".balance-amount");
const addBudget = document.querySelector(".add-budget");
const addExpense = document.querySelector(".add-expense");
const budgetValue = document.querySelector(".budget-value");
const submitExpense = document.querySelector(".submit-expense");
const addExpenseTitle = document.querySelector(".add-expense-title");
const addExpenseValue = document.querySelector(".add-expense-value");
const expenseTitle = document.querySelector(".expense-title-list");
const expenseValue = document.querySelector(".expense-value-list");

class Budget {
  expenses = [
    {
      title: "first expense",
      amount: 204,
    },
    {
      title: "second expense",
      amount: 51,
    },
  ];

  constructor(budget) {
    this.budget = budget;
  }

  setBudget(amount) {
    this.budget = amount;
  }

  getTotalBudget() {
    return this.budget;
  }

  createExpense(title, amount) {
    this.expenses.push({
      title,
      amount,
    });
  }

  getExpenses() {
    return this.expenses;
  }
}

class UI {
  displayData(budget) {
    const totalBudget = budget.getTotalBudget();
    const expensesList = budget.getExpenses();
    const totalExpenses = expensesList.reduce((total, current) => {
      return total + current.amount;
    }, 0);
    displayAmount.textContent = totalBudget;
    expensesAmount.textContent = totalExpenses;
    balanceAmount.textContent = totalBudget - totalExpenses;

    expensesList.forEach((item) => {
      expenseTitle.insertAdjacentHTML(
        "beforeend",
        `
      <li>${item.title}</li>
      `
      );

      expenseValue.insertAdjacentHTML(
        "beforeend",
        `
      <li>${item.amount}</li>
      `
      );
    });
  }
}

class Storage {}

function init() {
  let budget = new Budget(300);
  const ui = new UI();
  ui.displayData(budget);

  addBudget.addEventListener("click", () => {
    if (budgetValue.value) {
      let newBudget = new Budget(budgetValue.value);
      ui.displayData(newBudget);
    }
  });

  submitExpense.addEventListener("click", () => {
    if (addExpenseTitle.value && addExpenseValue.value) {
      budget.createExpense(addExpenseTitle.value, addExpenseValue.value);
    }
    console.log(budget.getExpenses());
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
