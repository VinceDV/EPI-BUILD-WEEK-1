
let esito = document.getElementById('esito');
let quantiG = document.getElementById('quantita');
let quantiS = document.getElementById('quantiS');
let myChart = document.getElementById('myChart');

const ctx = document.getElementById('myChart');

var risposteCorrette = 22;
var risposteSbagliate = 78;

window.addEventListener("load", (event) => new Chart(ctx, {
    type: 'doughnut',
    data: {

        labels: [],
        datasets: [{
            label: [],
            data: [risposteCorrette, risposteSbagliate],
            backgroundColor: ['#00FFFF', '#C2128D'],
            borderWidth: 0,
        }]
    },
    options: {
        plugins: 
                {
            legend: {
                display: false
            },
        
        tooltip: {
            enabled: false
        }},
        responsive: true,
        maintainAspectRatio: true,
        cutout: 122,
    }
    
}));

