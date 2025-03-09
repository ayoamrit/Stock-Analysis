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
    const headers = ["Year", "Cash & Short Term Investments", "Common Stock", "Current Debt", "Current Long term Debt", "Goodwill", "Intangible Assets", "Investments", "Retained Earnings", "Total Assets", "Total Liabilities", "Treaury Stock"];

    //Insert heading to the tableHead
    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headRow.appendChild(th);
    });

    tableHead.appendChild(headRow);
    table.appendChild(tableHead);

    balanceSheet.forEach((report) => {
        const row = document.createElement("tr");

        //Year
        const yearCell = document.createElement("td");
        yearCell.textContent = report.fiscalDateEnding;
        row.appendChild(yearCell);

        //Cash & Short Term Investments
        const cashShortTermInvestmentsCell = document.createElement("td");
        cashShortTermInvestmentsCell.textContent = report.cashAndShortTermInvestments;
        row.appendChild(cashShortTermInvestmentsCell);

        //Common Stock
        const commonStockCell = document.createElement("td");
        commonStockCell.textContent = report.commonStock;
        row.appendChild(commonStockCell);

        //Current Debt
        const currentDebtCell = document.createElement("td");
        currentDebtCell.textContent = report.currentDebt;
        row.appendChild(currentDebtCell);

        //Current Long Term Debt
        const currentLongTermDebtCell = document.createElement("td");
        currentLongTermDebtCell.textContent = report.currentLongTermDebt;
        row.appendChild(currentLongTermDebtCell);

        //Goodwill
        const goodwillCell = document.createElement("td");
        goodwillCell.textContent = report.goodwill;
        row.appendChild(goodwillCell);

        //Intangible Assets
        const intangibleAssetsCell = document.createElement("td");
        intangibleAssetsCell.textContent = report.intangibleAssets;
        row.appendChild(intangibleAssetsCell);

        //Investments
        const investmentCell = document.createElement("td");
        investmentCell.textContent = report.investments;
        row.appendChild(investmentCell);

        //Retained Earnings
        const retainedEarningCell = document.createElement("td");
        retainedEarningCell.textContent = report.retainedEarnings;
        row.appendChild(retainedEarningCell);

        //Total Assets
        const totalAssetCell = document.createElement("td");
        totalAssetCell.textContent = report.totalAssets;
        row.appendChild(totalAssetCell);
        
        //Total Liabilities
        const totalLiabilitiesCell = document.createElement("td");
        totalLiabilitiesCell.textContent = report.totalLiabilities;
        row.appendChild(totalLiabilitiesCell);

        //Treaury Stock
        const treasuryStockCell = document.createElement("td");
        treasuryStockCell.textContent = report.treasuryStock;
        row.appendChild(treasuryStockCell);

        
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    root.appendChild(table);
}

fetchStockFinancials("IBM");