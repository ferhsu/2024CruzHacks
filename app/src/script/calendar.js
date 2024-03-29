// handles calender specifications and uses
let calendar;   // FullCalendar object

// set up calendar
$(document).ready(function() {
    let calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();

    getUserLogs();
    // color calendar when swapping months
    $('.fc-prev-button').click(getUserLogs);
    $('.fc-next-button').click(getUserLogs);
    $('.fc-today-button').click(getUserLogs);

    // we don't need the events
    $('.fc-daygrid-day-events').hide();
});

// just a wrapper
function setupCalendar() {
    colorCalendar();
    setupDays();
}

// set up clickability of calendar dates
function setupDays() {
    // open day data
    $('.fc-day:not(.day-setup-done)').click(function() {
        // add a tag
        $(this).toggleClass('day-setup-done');
        let date = $(this).data('date');
        // show list of good things for that day
        goodThings(...[parseInt(date.slice(0,4)), parseInt(date.slice(6,9)), parseInt(date.slice(-2))]);
    });
}

let logData = {};
function getUserLogs() {    // by user id
    // GET LOGS FROM BACKEND
    $.get('http://localhost:3000/calendar/'+userid, (data, status) => {
        console.log(data, status);
        logData = data;
        console.log(logData);
        setupCalendar();
    })
}
$('.page-nav[data-page="calendar"]').click(getUserLogs);

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
    console.log(logData, year in logData, month in logData[year]);
    if (year in logData && month in logData[year]) {
        console.log(Object.keys(logData[year][month]))
        Object.keys(logData[year][month]).forEach(day => {
            $(`.fc-day:not(.good-day)[data-date="${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}"]`).toggleClass('good-day');
        });
    }
}

// pulls up all the good things from that day and displays it
function goodThings(year, month, day) {
    if (year in logData && month in logData[year] && day in logData[year][month]) {
        swapToPage('day-something');
        let goodThingsList = logData[year][month][day];
        // update website 
        $('#good-things-count').text(goodThingsList.length);
        $('#good-things-list').empty();
        goodThingsList.forEach(item => {
            $('#good-things-list').append(`<p>${item}`);
        });
    } else {
        swapToPage('day-nothing');
    }
}

// click anywhere to return functionality
['day-nothing', 'day-something'].forEach(page => {
    $(`#page_${page}`).click(function() {
        swapToPage('calendar');
    });
});
