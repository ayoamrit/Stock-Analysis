function formatNumber(value) {
    if (!value || isNaN(value)) return "-"; // Handle missing or invalid values

    const num = parseFloat(value);

    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(2) + "B"; // Convert to billions (B)
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(2) + "M"; // Convert to millions (M)
    }
    return num.toLocaleString(); // Keep smaller numbers readable with commas
}


export function getTableContainer(annualReport, financialKeys){

    //Table container => div
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");


    const table = document.createElement("table");
    const tableHead = document.createElement("thead");
    const tableBody = document.createElement("tbody");

    //Extract years from the balancesheet
    const years = annualReport.map(report => report.fiscalDateEnding);

    //Header row
    const headRow = document.createElement("tr");
    const firstTh = document.createElement("th");
    firstTh.classList.add("sticky-first-col");
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
            td.textContent = formatNumber(report[key]);
            row.appendChild(td);
        });

        tableBody.appendChild(row);
    })

    table.appendChild(tableBody);
    tableContainer.append(table);
    return tableContainer;
}