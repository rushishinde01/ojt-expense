import { state } from "./state.js";

const transactionList = document.getElementById("transaction-list");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const countEl = document.getElementById("count");

export function renderTransactions() {

    let filteredTransactions = state.transactions;

    // Search
    if (state.searchTerm) {

        filteredTransactions = filteredTransactions.filter(tx =>
            tx.text.toLowerCase()
                .includes(state.searchTerm.toLowerCase())
        );

    }

    // Category filter
    if (state.selectedCategory !== "all") {

        filteredTransactions = filteredTransactions.filter(tx =>
            tx.category === state.selectedCategory
        );

    }

    // Latest first
    filteredTransactions.sort(
        (a, b) => b.id - a.id
    );

    transactionList.innerHTML = "";

    if (filteredTransactions.length === 0) {

        transactionList.innerHTML = `
        <li>
            📭 No transactions found
        </li>
        `;

        updateSummary();

        return;
    }

    filteredTransactions.forEach(tx => {

        const sign = tx.amount >= 0 ? "+" : "-";

        const li = document.createElement("li");

        li.innerHTML = `

        <div class="transaction-info">

            <strong>${tx.text}</strong>

            <span class="category">
                ${tx.category} • ${tx.createdAt}
            </span>

            <span>
                ${sign} ₹${Math.abs(tx.amount)}
            </span>

        </div>

        <div class="actions">

            <button
                class="edit"
                onclick="window.editTransaction('${tx.id}')"
            >
                Edit
            </button>

            <button
                class="delete"
                onclick="window.deleteTransaction('${tx.id}')"
            >
                Delete
            </button>

        </div>

        `;

        transactionList.appendChild(li);

    });

    updateSummary();

}



export function updateSummary() {

    const amounts = state.transactions.map(
        tx => tx.amount
    );

    const balance = amounts.reduce(
        (acc, item) => acc + item,
        0
    );

    const income = amounts
        .filter(amount => amount > 0)
        .reduce((acc, amount) => acc + amount, 0);

    const expense = amounts
        .filter(amount => amount < 0)
        .reduce((acc, amount) => acc + amount, 0);

    balanceEl.textContent = `₹${balance}`;

    incomeEl.textContent = `₹${income}`;

    expenseEl.textContent =
        `₹${Math.abs(expense)}`;

    countEl.textContent =
        state.transactions.length;

}



export function clearInputs() {

    document.getElementById("text").value = "";

    document.getElementById("amount").value = "";

    document.getElementById("category").value = "Food";

}