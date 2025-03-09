/**
 * Root
 */
const root = document.getElementById("root");

const balanceSheetKeys = () => {
    return {
        "Cash & Short Term Investments": "cashAndShortTermInvestments",
        "Common Stock": "commonStock",
        "Current Debt": "currentDebt",
        "Current Long term Debt": "currentLongTermDebt",
        "Goodwill": "goodwill",
        "Intangible Assets": "intangibleAssets",
        "Investments": "investments",
        "Retained Earnings": "retainedEarnings",
        "Total Assets": "totalAssets",
        "Total Liabilities": "totalLiabilities",
        "Treasury Stock": "treasuryStock"
    };
}

function getBalanceSheetTable(annualReport, reportType){

    if(reportType === "balanceSheet"){
        financialKeys = balanceSheetKeys();
    }

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

async function fetchStockFinancials(symbol){
    try{
        const response = await fetch(`/api/alphaVantage/stock?symbol=${symbol}`);
        const data = await response.json();
        console.log(data);
        
        if(data.balanceSheet && data.balanceSheet.annualReports){
            const balanceSheetTable = getBalanceSheetTable(data.balanceSheet.annualReports, "balanceSheet");
            root.appendChild(balanceSheetTable);
        }
    }catch(error){
        console.log(error);
    }
}

fetchStockFinancials("IBM");