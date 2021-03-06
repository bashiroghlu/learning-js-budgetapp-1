class UI {
  constructor() {
    this.budgetFeedback = document.querySelector('.budget-feedback');
    this.expenseFeedback = document.querySelector('.expense-feedback');
    this.budgetForm = document.getElementById('budget-form');
    this.budgetInput = document.getElementById('budget-input');
    this.budgetAmount = document.getElementById('budget-amount');
    this.expenseAmount = document.getElementById('expense-amount');
    this.balance = document.getElementById('balance');
    this.balanceAmount = document.getElementById('balance-amount');
    this.expenseForm = document.getElementById('expense-form');
    this.expenseInput = document.getElementById('expense-input');
    this.amountInput = document.getElementById('amount-input');
    this.expenseList = document.getElementById('expense-list');
    this.itemList = [];
    this.itemID = 0;
  }
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value === '' || value < 0) {
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innerHTML = `<p>budget input should be higher than 0 and not empty</p>`;
      const self = this;
      setTimeout(function() {
        self.budgetFeedback.classList.remove('showItem');
      }, 400);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    }
  }
  submitExpenseForm() {
    const expenseName = this.expenseInput.value;
    const expenseAmount = this.amountInput.value;
    if (expenseName === '' || expenseAmount === '' || expenseAmount < 0) {
      this.expenseFeedback.classList.add('showItem');
      this.expenseFeedback.innerHTML = `<p>expense input should be higher than 0 and not empty</p>`;
      const self = this;
      setTimeout(function() {
        self.expenseFeedback.classList.remove('showItem');
      }, 400);
    } else {
      // this.budgetAmount.textContent = value;
      let amount = parseInt(expenseAmount);
      this.expenseInput.value = '';
      this.amountInput.value = '';
      let expense = {
        id: this.itemID,
        title: expenseName,
        amount
      };
     
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

    <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
    <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

    <div class="expense-icons list-item">

     <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
      <i class="fas fa-edit"></i>
     </a>
     <a href="#" class="delete-icon" data-id="${expense.id}">
      <i class="fas fa-trash"></i>
     </a>
    </div>
   </div>`;
    this.expenseList.appendChild(div);
  }
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed', 'showBlack');
    } else if (total === 0) {
      this.balance.classList.remove('showRed', 'showGreen');
      this.balance.classList.add('showBlack');
    } else if (total > 0) {
      this.balance.classList.remove('showRed', 'showBlack');
      this.balance.classList.add('showGreen');
    }
  }
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, item) => acc + item.amount, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
  }
  editElement(element) {
    // console.log(element.attributeList.data - id);
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    let expense = this.itemList.filter(function(item) {
      return item.id === id;
    });
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    let tempList = this.itemList.filter(function(item) {
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();

    // if(element.attributeList.data-id)
    // element.parentElement.parentElement.remove();
  }
  deleteElement(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    let tempList = this.itemList.filter(function(item) {
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
  }
}

function eventListener() {
  const budgetForm = document.getElementById('budget-form');
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');

  const ui = new UI();

  budgetForm.addEventListener('submit', function(event) {
    ui.submitBudgetForm();
    event.preventDefault();
  });
  expenseForm.addEventListener('submit', function(event) {
    ui.submitExpenseForm();
    event.preventDefault();
  });
  expenseList.addEventListener('click', function() {
    if (event.target.parentElement.classList.contains('edit-icon')) {
      ui.editElement(event.target.parentElement);
    }
    if (event.target.parentElement.classList.contains('delete-icon')) {
      ui.editElement(event.target.parentElement);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  eventListener();
});
