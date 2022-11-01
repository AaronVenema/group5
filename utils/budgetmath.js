const monthlyBudget = (bills, incomes) => {
    let expenses;
    let income;

    for (let i = 0; i < bills.length; i++) {
        expenses = expenses + bills[i].amount;
    }
    for (let i = 0; i < incomes.length; i++) {
        income = income + income[i].amount;
    };
    
    return income - expenses;
}

module.exports = monthlyBudget