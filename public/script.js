import {getBalanceSheetTable} from "./table.js";
/**
 * Root
 */
console.log("before root");
const root = document.getElementById("root");
const balanceSheetKeys = {
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

async function fetchStockFinancials(symbol){
    try{
        const response = await fetch(`/api/alphaVantage/stock?symbol=${symbol}`);
        const data = await response.json();
        console.log(data);
        
        if(data.balanceSheet && data.balanceSheet.annualReports){
            const balanceSheetTable = getBalanceSheetTable(data.balanceSheet.annualReports, balanceSheetKeys);
            root.appendChild(balanceSheetTable);
        }
    }catch(error){
        console.log(error);
    }
}

fetchStockFinancials("IBM");