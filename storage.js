const STORAGE_KEY = "elite_expense_tracker";


export function saveToStorage(transactions) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );

}



export function loadFromStorage() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

        return [];

    }

    try {

        return JSON.parse(data);

    }

    catch (error) {

        console.error(error);

        return [];

    }

}