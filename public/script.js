import {getBalanceSheetTable} from "./utils/tables.js";

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
            const balanceSheetTable = getBalanceSheetTable(data.balanceSheet.annualReports, "balanceSheet");
            root.appendChild(balanceSheetTable);
        }
    }catch(error){
        console.log(error);
    }
}

fetchStockFinancials("IBM");