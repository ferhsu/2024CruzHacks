// handles page swapping

$(document).ready(function() {
    // hide all pages
    $('.page:not(.current-page)').hide();
    $('nav').hide();
});

// page swap
$('.page-nav').click(function() {
    swapToPage($(this).data('page'));
});

function swapToPage(id) {
    let speed = 250;
    $('.current-page').toggleClass('current-page').fadeOut(speed);
    setTimeout(() => {
        $(`#page_${id}`).toggleClass('current-page').fadeIn(speed);
        // show nav bar for every page that's not title
        if (['title'].includes(id)) {
            $('nav').fadeOut(speed);
        } else {
            $('nav').fadeIn(speed);
        }
    }, speed);
}


