// communicates with backend and ensures data passage is right
//import { PostCode } from "./post";

let userid;
let date = new Date();;
const year = date.getFullYear();
const month = date.getMonth() + 1;      // months zero-based
const day = date.getDate();
date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
let login = false;
let rm = localStorage.getItem('echoecho_rememberLogin');
if (rm != undefined) {
    login = true;
    userid = rm;
}

// login authentication
$(document).ready(function() {
    titleCheckLogin();
});
$('.page-nav[data-page="title"]').click(function() {
    if ($(this).text() == 'logout') {
        login = false;
    }
    titleCheckLogin();
});

function saveLog(log) {
    // TRANSFER TO BACKEND
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/post',
        data: { "name": userid, "date": date, "echo": log},
    }).then((msg) => {
        getUserLogs()
        console.log(msg);
        console.log(userid, date, log);
    });
}

// modify title page
function titleCheckLogin() {
    $('#page_title div.row').hide();
    if (login) {
        $('#page_title .activity').show();
    } else {
        $('#page_title .user').show();
    }
}

// login in sign up
$('#login-button').click(function() {
    auth('login');
});
$('#signup-button').click(function() {
    auth('signup');
});

function auth(type) {
    $('.missing-field').toggleClass('missing-field');
    let user = $(`#${type}-username`).val();
    let pw = $(`#${type}-password`).val();
    if (user == '') {
        $(`#${type}-username`).toggleClass('missing-field');
    }
    if (pw == '') {
        $(`#${type}-password`).toggleClass('missing-field');
    }
    if (user == '' || pw == '') {
        return;
    }
    // login
    login = true;
    titleCheckLogin();
    swapToPage('title');
    userid = user;
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/post',
        data: { "name": userid, "startdate": date},
    })
    // clear vals
    $(`#${type}-username`).val('');
    $(`#${type}-password`).val('');
    // saving preferences
    if ($(`#${type}-remember`).hasClass('checked')) {
        localStorage.setItem('echoecho_rememberLogin', userid);
    } else {
        localStorage.removeItem('echoecho_rememberLogin');
    }
    // get logs for calendar
    if (type == 'login') {
        getUserLogs();
    }
}

// checkbox functionality
$('.checkbox').click(function() {
    $(this).toggleClass('checked');
    if ($(this).hasClass('checked')) {
        $(this).text('x');
    } else {
        $(this).text('');
    }
});
