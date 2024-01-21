// communicates with backend and ensures data passage is right

let login = false;
let rm = localStorage.getItem('echoecho_rememberLogin');
if (rm != undefined) {
    login = true;
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
    // today's date
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;      // months zero-based
    const day = date.getDate();
    console.log(year, month, day);
    console.log(`logging ${log} for ${date}`);
    // TRANSFER TO BACKEND
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
    // clear vals
    $(`#${type}-username`).val('');
    $(`#${type}-password`).val('');
    // saving preferences
    if ($(`#${type}-remember`).hasClass('checked')) {
        localStorage.setItem('echoecho_rememberLogin', 'true');
    } else {
        localStorage.removeItem('echoecho_rememberLogin');
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