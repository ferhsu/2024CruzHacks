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

// sample suggestions in log
let suggestions = [
    'the coffee was the right temperature',
    'i woke up on time today',
    'what are you grateful for?',
    'my plant is still alive',
    'i\'m meeting up with a friend',
    'what makes you happy?',
    'there is food in the fridge',
    'the sun the out and the clouds are pretty',
    'write your log here'
];
let index = 0;
function updateSuggestions() {
    let p = suggestions[index++ % suggestions.length];
    let timeout = 50;
    for (let i = 1; i <= p.length; ++i) {
        setTimeout(() => {
            $('#log').attr('placeholder', p.slice(0, i));
        }, timeout * i);
    }
    // make sure delete runs afterwards
    setTimeout(() => {
        for (let i = p.length; i >= 0; --i) {
            setTimeout(() => {
                $('#log').attr('placeholder', p.slice(0, i));
            }, timeout * (p.length - i+1));
        }
    }, timeout * p.length + 2500);
    // call it over and over
    setTimeout(updateSuggestions, 2 * (timeout * p.length) + 3000);
}
updateSuggestions();    // start it
