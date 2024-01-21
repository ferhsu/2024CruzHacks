// communicates with backend and ensures data passage is right

function saveLog(log) {
    // today's date
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;      // months zero-based
    const day = date.getDate();
    console.log(year, month, day);
    console.log(`logging ${log} for ${date}`);
    // TRANSFER TO BACKEND
}
