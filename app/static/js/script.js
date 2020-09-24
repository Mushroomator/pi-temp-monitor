let tempArr = [];
let timeArr = [];
let ctx = document.getElementById('tempChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeArr,
        datasets: [{
            fill: false,
            label: 'CPU Temperatur',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: tempArr
        }],
        options: {}
    }
});

const msecPerSec = 1000;
const timeoutInSec = 1;
setInterval(displayTempPerSecond, timeoutInSec * msecPerSec);

let passedTimeInSec = 0;
function displayTempPerSecond() {
    passedTimeInSec++;
    axios.get('/temp')
        .then(function (response) {
            let cpuTemp = response.data;
            // addDataPoint(passedTimeInSec, cpuTemp);
            axios.get('/time')
                .then(function (response) {
                    let time = response.data;
                    addDataPoint(time, cpuTemp);
                })
        })
}

function addDataPoint(time, cpuTemp) {
    const max_num_vals = 60;
    let timeAxis = chart.data.labels;
    let tempAxis = chart.data.datasets[0].data;
    if (timeAxis.length > max_num_vals) {
        timeAxis.shift();
        tempAxis.shift();
    }
    timeAxis.push(time);
    tempAxis.push(cpuTemp);
    console.log(`New data point added:\nTime: ${time}s\nCPU-Temp: ${cpuTemp}°C`)
    chart.update();
}


