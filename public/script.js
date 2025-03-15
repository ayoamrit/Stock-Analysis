import {getTable} from "./table.js";
/**
 * Root
 */
const root = document.getElementById("root");


/**
 * Fetch stock financial data from the backend API and generates financial tables
 * 
 * @param {string} symbol - Stock ticker symbol (e.g. "MSFT" for Microsoft) 
 */
async function fetchStockFinancials(symbol){
    try{

        //Fetch financial data from the API
        const response = await fetch(`/api/alphaVantage/stock?symbol=${symbol}`);
        const data = await response.json();
        console.log(data);
        
        //Append Balance Sheet Table if data exists
        if(data.balanceSheet && data.balanceSheet.annualReports){
            const balanceSheetTable = getTable(data.balanceSheet.annualReports, "balanceSheet");
            root.appendChild(balanceSheetTable);
        }

        //Append Cash Flow Statement if data exists
        if(data.cashFlowStatement && data.cashFlowStatement.annualReports){
            const cashFlowStatementTable = getTable(data.cashFlowStatement.annualReports, "cashFlowStatement");
            root.appendChild(cashFlowStatementTable);
        }

        //Append Income Statement if data exists
        if(data.incomeStatement && data.incomeStatement.annualReports){
            const incomeStatementTable = getTable(data.incomeStatement.annualReports, "incomeStatement");
            root.appendChild(incomeStatementTable);
        }
    }catch(error){
        console.log(error);
    }
}

fetchStockFinancials("MSFT");