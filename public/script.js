import { showTable } from "./table";

/**
 * Root
 */
const root = document.getElementById("root");

async function fetchStockFinancials(symbol){
    try{
        const response = await fetch(`/api/alphaVantage/stock?symbol=${symbol}`);
        const data = await response.json();
        console.log(data);
        
        if(data.balanceSheet && data.balanceSheet.annualReports){
            insertTable(data.balanceSheet.annualReports);
        }
    }catch(error){
        console.log(error);
    }
}

function insertTable(balanceSheet){
    const table = document.createElement("table");
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");
    const headRow = document.createElement("tr");

    //Create table headers dynamically from the first report keys
    const firstReport = balanceSheet[0];
    const headers = ["Year", ...Object.keys(firstReport).filter(key => key !== "fiscalDateEnding")];

    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headRow.appendChild(th);
    });

    tableHead.appendChild(headRow);
    table.appendChild(tableHead);

    balanceSheet.forEach((report) => {
        const row = document.createElement("tr");

        const yearCell = document.createElement("td");
        yearCell.textContent = report.fiscalDateEnding;
        row.appendChild(yearCell);

        headers.slice(1).forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = report[key] || "N/A";
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    root.appendChild(table);
}

fetchStockFinancials("IBM");