// handles logging of good things :>

// clear last log
$('.page-nav').click(function() {
    if ($(this).data('page') == 'log') {
        $('#log').val('');
    }
});

$('#log').on("keypress", function(event) {
    if ($(this).val() != '' && event.which === 13) {        // enter button = 13
        saveLog($(this).val());
        swapToPage('log-complete');
    }
});

