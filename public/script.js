import {getTable, getCompanyHeader, getCompanyOverview, getButtons} from "./table.js";
/**
 * Root
 */
const root = document.getElementById("root");

/**
 * Nav GitHub link
 * 
 */
document.querySelector("nav").addEventListener("click", function() {
    window.open("https://github.com/ayoamrit/Stock-Analysis", "_blank");
});


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

        const companyHeader = getCompanyHeader(data.overview);
        const companyOverview = getCompanyOverview(data.overview);
        const tableButtons = getButtons();

        root.appendChild(companyHeader);
        root.appendChild(companyOverview);
        root.appendChild(tableButtons);

        //Append Balance Sheet Table if data exists
        if(data.balanceSheet && data.balanceSheet.annualReports){
            
            const balanceSheetTable = getTable(data.balanceSheet.annualReports, "balanceSheet");
            root.appendChild(balanceSheetTable);
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