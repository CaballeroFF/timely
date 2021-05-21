var ctx = document.getElementById('records-chart');
var x = [];
var y = [];

// const updateChart = (data) => {
//     if (data.length) {
//         data.forEach(doc => {
//             let dt = doc.data().datetime.toDate();
//             x.push(dt.toDateString());
//             y.push(60 * dt.getHours() + dt.getMinutes());
//         });
//     } else {
//         x = [];
//         y = [];
//     }
// };

var chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: x,
        datasets: [{
            label: '# of Votes',
            data: y,
            borderColor: [
                'rgba(255, 99, 132, 1)'
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