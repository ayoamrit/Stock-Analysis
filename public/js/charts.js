function getCanvas(id){
    const canvas = document.createElement("canvas");
    canvas.classList.add("multiple-line-chart");
    canvas.setAttribute("id", id);
    canvas.style.width = "100%";
    canvas.style.height = "300px";

    return canvas;
}

export function getBalanceSheetChart(fiscalYears, totalAssets, totalLiabilities){
    const canvas = getCanvas("balance-sheet-chart");

    const xValues = fiscalYears;
    
    new Chart(canvas, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                label: "Total Assets",
                data: totalAssets,
                borderColor: "red",
                borderWidth: 2,
                fill: false
            }, 
            {
                label: "Total Liabilities",
                data: totalLiabilities,
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Assets and Liabilities Over Time (in millions)",
                    font: {
                        size: 20
                    }
                },                
                legend: {
                    display: true,
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });

    return canvas;
}