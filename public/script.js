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
        
        //Remove everything from the root element before inserting
        root.innerHTML = "";

        //Append Balance Sheet Table if data exists
        if(data.balanceSheet && data.balanceSheet.annualReports){
            const title = "Balance Sheet";
            const description = `The balance sheet provides a snapshot of the company’s financial position, showing assets, liabilities, and equity over time.`;
            const balanceSheetTable = getTable(data.balanceSheet.annualReports, "balanceSheet", title, description);
            root.appendChild(balanceSheetTable);
        }

        //Append Cash Flow Statement if data exists
        if(data.cashFlowStatement && data.cashFlowStatement.annualReports){
            const title = "Cash Flow Statement";
            const description = "This statement tracks the cash inflows and outflows from operating, investing, and financing activities, reflecting the company’s liquidity and cash management.";
            const cashFlowStatementTable = getTable(data.cashFlowStatement.annualReports, "cashFlowStatement", title, description);
            root.appendChild(cashFlowStatementTable);
        }

        //Append Income Statement if data exists
        if(data.incomeStatement && data.incomeStatement.annualReports){
            const title = "Income Statement";
            const description = "The income statement outlines revenue, expenses, and net income over a period, helping assess profitability and financial performance.";
            const incomeStatementTable = getTable(data.incomeStatement.annualReports, "incomeStatement", title, description);
            root.appendChild(incomeStatementTable);
        }
    }catch(error){
        console.log(error);
    }
}


/**
 * Event listener for the search button that fetches stock financial data.
 * 
 * When the user clicks the search button, this function retrieves the 
 * stock ticker symbol from the input field, trims any leading or trailing 
 * spaces, converts it to uppercase, and ensures it is not empty. If the 
 * input is valid, it calls the `fetchStockFinancials` function to get the 
 * financial data for the provided stock symbol.
 */
document.getElementById("search-button").addEventListener("click", () => {
    const tickerSymbol = document.getElementById("stock-symbol-input").value.trim().toUpperCase();

    if(!tickerSymbol){
        window.alert("The stock's ticker symbol is required to search");
        return;
    }

    //Call the function to fetch stock financial data using the provided ticker symbol
    fetchStockFinancials(tickerSymbol);
});