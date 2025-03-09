
function getBalanceSheetTable(annualReport, financialKeys){

    const table = document.createElement("table");
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    //Extract years from the balancesheet
    const years = annualReport.map(report => report.fiscalDateEnding);

    //Header row
    const headRow = document.createElement("tr");
    const firstTh = document.createElement("th");
    firstTh.textContent = "Financial Metric";
    headRow.appendChild(firstTh);

    years.forEach(year => {
        const th = document.createElement("th");
        th.textContent = year;
        headRow.appendChild(th);
    });

    tableHead.appendChild(headRow);
    table.appendChild(tableHead);

    //Create rows with financial data
    Object.entries(financialKeys).forEach(([label, key]) => {
        const row = document.createElement("tr");

        //Row header
        const th = document.createElement("th");
        th.textContent = label;
        row.appendChild(th);

        annualReport.forEach(report => {
            const td = document.createElement("td");
            td.textContent = report[key];
            row.appendChild(td);
        });

        tableBody.appendChild(row);
    })

    table.appendChild(tableBody);
    return table;
}

export {getBalanceSheetTable};