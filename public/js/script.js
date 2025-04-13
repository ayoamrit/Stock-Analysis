import {getTable, getCompanyHeader, getCompanyOverview, getButtons} from "./table.js";

/**
 * Nav GitHub link 
 */
document.querySelector("nav").addEventListener("click", function() {
    window.open("https://github.com/ayoamrit/Stock-Analysis", "_blank");
});



const root = document.getElementById("root-layout-wrapper");
/**
 * Fetch stock financial data from the backend API and generates financial tables
 * 
 * @param {string} symbol - Stock ticker symbol (e.g. "MSFT" for Microsoft) 
 */
async function fetchStockFinancials(symbol){

    //Loader
    const loader = document.querySelector(".loader");

    try{

        //Show the loader
        loader.classList.remove("hidden");

        //Fetch financial data from the API
        const response = await fetch(`/api/alphaVantage/stock?symbol=${symbol}`);
        const data = await response.json();

        console.log(data);

        //Check whether there is data inside data object or not
        //There would usually be no data if the api has reached its limit
        const isLimitReached = Object.values(data).every(
            section => section?.Information && section.Information.includes("API key")
        );

        if(isLimitReached){
            loader.classList.add("hidden");
            window.alert("API rate limit reached. Please try again later.");
            return;
        }

        //Hide the loader once data is fetched
        loader.classList.add("hidden");

        //Remove everything from the root element before inserting
        root.innerHTML = "";

        const companyHeader = getCompanyHeader(data.overview);
        const companyOverview = getCompanyOverview(data.overview);
        const tableButtons = getButtons();

        root.appendChild(companyHeader);
        root.appendChild(companyOverview);
        root.appendChild(tableButtons);

        attachButtonListener(data);

        document.getElementById("balance-sheet-button").dispatchEvent(new Event("click"));

    }catch(error){
        loader.classList.add("hidden");
        window.alert(error.message);
        console.log(error);
    }
}


function attachButtonListener(data){
    const balanceSheetButton = document.getElementById("balance-sheet-button");
    const cashFlowStatementButton = document.getElementById("cash-flow-statement-button");
    const incomeStatementButton = document.getElementById("income-statement-button");

    balanceSheetButton.addEventListener("click", () => {
        setActiveButton(balanceSheetButton);
        buttonAction(data.balanceSheet.annualReports, "balanceSheet");
    });

    cashFlowStatementButton.addEventListener("click", () => {
        setActiveButton(cashFlowStatementButton);
        buttonAction(data.cashFlowStatement.annualReports, "cashFlowStatement");
    });

    incomeStatementButton.addEventListener("click", () => {
        setActiveButton(incomeStatementButton);
        buttonAction(data.incomeStatement.annualReports, "incomeStatement");
    });
}

function setActiveButton(button){
    document.querySelectorAll(".buttons-container button").forEach(btn => {
        btn.classList.remove("active");
    });
    button.classList.add("active");
}

function buttonAction(report, reportType){
    if(!report || report.length === 0){
        window.alert(`${report} data is missing or empty`);
        return;
    }

    const tableContainer = document.querySelector(".table-container");

    if(tableContainer){
        root.removeChild(tableContainer);
    }

    const table = getTable(report, reportType);
    root.appendChild(table);
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
