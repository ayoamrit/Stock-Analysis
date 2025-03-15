import {getTableContainer} from "./table.js";
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
            const balanceSheetTable = getTableContainer(data.balanceSheet.annualReports, "balanceSheet");
            const cashFlowStatementTable = getTableContainer(data.cashFlowStatement.annualReports, "cashFlowStatement");
            const incomeStatementTable = getTableContainer(data.incomeStatement.annualReports, "incomeStatement");

            root.appendChild(balanceSheetTable);
            root.appendChild(cashFlowStatementTable);
            root.appendChild(incomeStatementTable);
        }
    }catch(error){
        console.log(error);
    }
}

fetchStockFinancials("MSFT");