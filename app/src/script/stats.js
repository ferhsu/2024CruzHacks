$('.page-nav[data-page="stats"]').click(function() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
});

// global chart
let chart;

function drawChart() {
    let c1, c2, c3, c4;
    if ($('body').hasClass('light')) {
        c1 = 'black';   // text
        c2 = 'white';   // background
        c3 = 'pink';    // lines
        c4 = 'red';     // graph
    } else {
        c1 = 'black';   // can't get this one to work
        c2 = 'black';
        c3 = 'red';
        c4 = 'pink';
    }
    // chart options
    let options = {
        legend: 'none',
        animation: {
            "startup": true,
            "duration": 2000
        },
        fontName: 'Courier',
        backgroundColor: c2,
        colors: [c4],
        width: $('#monthlyStats').width(),
        height: $('#monthlyStats').height(),
        vAxis: {
            title: "frequency",
            gridlines: {color: c3},
            textsStyle: {
                color: c1
            }
        },
        hAxis: {
            title: "days",
            baseline: 1,
            slantedText: true,
            showTextEvery: 1,
            maxAlternation: 1,
            textsStyle: {
                color: c1
            }
        }
    };
    chart = new google.visualization.LineChart(document.getElementById('monthlyStats'));
    chart.draw(getChartData(), options);
}

function getChartData() {
    let data = [['Day', '# of times you logged a happy memory']];
    for (let i = 1; i <= 31; ++i) {
        let count = 0;
        if (i in logData['2024']['1']) {
            count = logData['2024']['1'][i].length;
        }
        data.push([i, count]);
    }
    console.log(data);
    data = google.visualization.arrayToDataTable(data);
    return data;
}
