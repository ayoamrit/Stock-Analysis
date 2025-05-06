let chartInstance = null;
let fullLabels = [];
let fullPrices = [];

export function createCanvasWrapper() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("canvas-wrapper");

    const buttonsWrapper = createButtons();
    const canvas = createCanvas();

    wrapper.appendChild(buttonsWrapper);
    wrapper.appendChild(canvas);

    return wrapper;
}

function createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.id = "time-series-chart";
    return canvas;
}

function createButtons() {
    const container = document.createElement("div");
    container.classList.add("chart-buttons-container");

    const button_1 = document.createElement("button");
    button_1.id = "1-year-chart";
    button_1.textContent = "1 Year";

    const button_2 = document.createElement("button");
    button_2.id = "5-years-chart";
    button_2.textContent = "5 Years";

    const button_3 = document.createElement("button");
    button_3.id = "since-inception-chart";
    button_3.textContent = "Since Inception";
    button_3.classList.add("active");


    return container;
}

function formatChartData(timeSeriesData) {
    const timeSeries = timeSeriesData["Monthly Adjusted Time Series"];
    const labels = [];
    const prices = [];

    const entries = Object.entries(timeSeries).reverse();

    entries.forEach(([date, values]) => {
        labels.push(date);
        prices.push(parseFloat(values["4. close"]));
    });

    return [labels, prices];
}

function updateChart(range) {
    let months;
    if (range === "1y") months = 12;
    else if (range === "5y") months = 60;
    else months = fullLabels.length;

    const labels = fullLabels.slice(-months);
    const prices = fullPrices.slice(-months);

    chartInstance.data.labels = labels;
    chartInstance.data.datasets[0].data = prices;
    chartInstance.update();
}

function attachRangeButtonListeners() {
    const buttons = document.querySelectorAll(".chart-buttons-container button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // Remove 'active' class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));

            // Add 'active' class to clicked button
            button.classList.add("active");

            // Update chart based on button ID
            if (button.id === "1-year-chart") updateChart("1y");
            else if (button.id === "5-years-chart") updateChart("5y");
            else if (button.id === "since-inception-chart") updateChart("all");
        });
    });
}

export function createChart(timeSeriesData) {
    [fullLabels, fullPrices] = formatChartData(timeSeriesData);

    const ctx = document.getElementById("time-series-chart");

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: fullLabels,
            datasets: [{
                data: fullPrices,
                borderColor: "blue",
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            return `Price: $${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        maxTicksLimit: 10
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Price (USD)"
                    }
                }
            }
        }
    });

    attachRangeButtonListeners();
}
