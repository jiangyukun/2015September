var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            fillColor: "rgba(225,225,225,0)",
            strokeColor: "rgba(225,225,225,0)",
            pointColor: "rgba(225,225,225,0)",
            pointStrokeColor: "#fff",
            data: [45, 45, 45, 45, 45, 45, 55]
        },
        {
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            data: [50, 50, 50, 50, 50, 50, 50]
        }
    ]
};


var myData = {
    labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    datasets: [
        {
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "rgba(220,220,220,0)",
            pointColor: "rgba(220,220,220,0)",
            pointStrokeColor: "#fff",
            data: [45, 40, 40, 40, 45, 40, 51]
        },
        {
            fillColor: "rgba(90,190,90,.5)",
            strokeColor: "rgba(90,190,90,1)",
            pointColor: "rgba(90,190,90,1)",
            pointStrokeColor: "#fff",
            data: [50, 50, 50, 50, 50, 50, 50]
        }
    ]
};

Chart.defaults.global.showTooltips = false;
new Chart(document.getElementById("canvas").getContext("2d")).Line(myData);