// handles page swapping

$(document).ready(function() {
    // hide all pages
    $('.page:not(.current-page)').hide();
    $('nav').hide();

    // title page animation
    $('#echo-sub').hide();
    setTimeout(() => {
        $('#echo-sub').fadeIn();
    }, 1700);
    
    // fetch mode
    let mode = localStorage.getItem('echoecho_colorMode');
    if (mode == undefined) {
        mode = 'light';
    }
    $('body').toggleClass(mode);
    updateNavBar();
    $('nav img').click(function() {
        $('body').toggleClass('light');
        $('body').toggleClass('dark');
        updateNavBar();
    });
});

// page swap
$('.page-nav').click(function() {
    swapToPage($(this).data('page'));
});

function swapToPage(id) {
    let speed = 250;
    if ($('.current-page').data('page') != id) {
        $('.current-page').toggleClass('current-page').fadeOut(speed);
        setTimeout(() => {
            $(`#page_${id}`).toggleClass('current-page').fadeIn(speed);
            // show nav bar for every page that's not in the list
            if (['title', 'day-something', 'day-nothing', 'login', 'signup'].includes(id)) {
                $('nav').fadeOut(speed);
            } else {
                $('nav').fadeIn(speed);
            }
        }, speed);
    }
}

// set up navigation bar img
function updateNavBar() {
    $('nav img').fadeOut(250);
    setTimeout(() => {
        if ($('body').hasClass('light')) {
            $('#mode-light').fadeIn(250);
            localStorage.setItem('echoecho_colorMode', 'light');
        } else {
            $('#mode-dark').fadeIn(250);
            localStorage.setItem('echoecho_colorMode', 'dark');
        }
    }, 250);
}