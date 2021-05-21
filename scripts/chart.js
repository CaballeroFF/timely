const defaultX = ["Sat May 01 2021", "Sun May 02 2021", "Mon May 03 2021", "Tue May 04 2021", "Wed May 05 2021", "Thu May 06 2021", "Fri May 07 2021", "Sat May 08 2021", "Sun May 09 2021", "Mon May 10 2021", "Tue May 11 2021"];
const defaultY = [90, 200, 302, 350, 247, 209, 180, 150, 301, 311, 319];

var ctx = document.getElementById('records-chart');
var x = [];
var y = [];

// update chart with user data
const updateChart = (data) => {
    parseData(data);

    if (auth.currentUser == null) {
        x = defaultX;
        y = defaultY;
    }

    chart.data.labels = x;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = y;
    });
    chart.update();
};

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: x,
        datasets: [{
            label: 'Minutes',
            data: y,
            borderColor: [
                '#ff1744'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// parse data from user, fill labels and datasets 
const parseData = (data) => {
    x = [];
    y = [];
    if (data.length) {
        data.forEach(doc => {
            let dt = doc.data().datetime.toDate();
            x.push(dt.toDateString());
            y.push(60 * dt.getHours() + dt.getMinutes());
        });
    }
    x.reverse();
    y.reverse();
};