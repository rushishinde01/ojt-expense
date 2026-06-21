import { state } from "./state.js";
import { saveToStorage, loadFromStorage } from "./storage.js";
import { renderTransactions, clearInputs } from "./render.js";

const form = document.getElementById("transaction-form");

const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");

const searchInput = document.getElementById("search");
const filterCategory = document.getElementById("filter-category");

const exportBtn = document.getElementById("export-btn");
const themeBtn = document.getElementById("theme-btn");

const toast = document.getElementById("toast");



init();



function init() {

    state.transactions = loadFromStorage();

    renderTransactions();

}



form.addEventListener("submit", e => {

    e.preventDefault();

    const text = textInput.value.trim();

    const amount = Number(amountInput.value);

    const category = categoryInput.value;

    if (!text || amount === 0) {

        showToast("Invalid input");

        return;

    }


    // UPDATE

    if (state.editId) {

        const tx = state.transactions.find(
            tx => tx.id === state.editId
        );

        tx.text = text;
        tx.amount = amount;
        tx.category = category;

        state.editId = null;

        showToast("Transaction updated");

    }

    // CREATE

    else {

        const transaction = {

            id: Date.now().toString(),

            text,

            amount,

            category,

            createdAt:
                new Date().toLocaleDateString()

        };

        state.transactions.push(transaction);

        showToast("Transaction added");

    }

    saveToStorage(state.transactions);

    renderTransactions();

    clearInputs();

});




// DELETE

window.deleteTransaction = function (id) {

    const confirmed = confirm(
        "Delete this transaction?"
    );

    if (!confirmed) return;

    state.transactions =
        state.transactions.filter(
            tx => tx.id !== id
        );

    saveToStorage(state.transactions);

    renderTransactions();

    showToast("Transaction deleted");

};




// EDIT

window.editTransaction = function (id) {

    const tx = state.transactions.find(
        tx => tx.id === id
    );

    if (!tx) return;

    textInput.value = tx.text;

    amountInput.value = tx.amount;

    categoryInput.value = tx.category;

    state.editId = id;

};




// SEARCH

searchInput.addEventListener("input", () => {

    state.searchTerm = searchInput.value;

    renderTransactions();

});




// FILTER

filterCategory.addEventListener("change", () => {

    state.selectedCategory =
        filterCategory.value;

    renderTransactions();

});




// EXPORT CSV

exportBtn.addEventListener("click", () => {

    let csv =
        "Description,Amount,Category,Date\n";

    state.transactions.forEach(tx => {

        csv +=
            `${tx.text},${tx.amount},${tx.category},${tx.createdAt}\n`;

    });

    const blob = new Blob([csv], {
        type: "text/csv"
    });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = "transactions.csv";

    a.click();

});




// THEME

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

});




// TOAST

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show-toast");

    setTimeout(() => {

        toast.classList.remove(
            "show-toast"
        );

    }, 2000);

}