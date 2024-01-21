// handles calender specifications and uses
let calendar;   // FullCalendar object

// set up calendar
$(document).ready(function() {
    let calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();

    colorCalendar();
    // color calendar when swapping months
    $('.fc-prev-button').click(colorCalendar);
    $('.fc-next-button').click(colorCalendar);

    // open day data
    $('.fc-day').click(function() {
        console.log('boop');
    });
});

let logData = {
    2023 : {
        12 : {5 : ["food"], 17 : ["pizza"]}
    },
    2024 : {
        1 : {1 : ["things", "other things"]}
    }
};

let months = [
    'boop',
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];


// adds class "good-day" to all good days
function colorCalendar() {
    // #fc-dom-1 holds the month title
    let month = months.indexOf($("#fc-dom-1").html().slice(0, -5).toLowerCase());
    let year = $("#fc-dom-1").html().slice(-4);
    console.log(year, month);
    if (year in logData && month in logData[year]) {
        Object.keys(logData[year][month]).forEach(day => {
            $(`.fc-day[data-date="${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}"]`).toggleClass('good-day');
        });
    }
}
