const monthlyBudget = (bills, incomes) => {
    let expenses;
    let income;

    expenses = allExpenses(bills);
    income = allIncome(incomes);
    
    return income - expenses;
}

const allExpenses = (bills) => {
    let expenses = 0;

    for (let i = 0; i < bills.length; i++) {
        expenses = expenses + bills[i].amount;
    }
    
    return expenses;
}

const allIncome = (incomes) => {
    let income = 0;

    for (let i = 0; i < incomes.length; i++) {
        income = income + income[i].amount;
    }

    return income;
}

module.exports = {
    monthlyBudget,
    allExpenses,
    allIncome
}
