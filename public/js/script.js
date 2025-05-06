import {getTable, getCompanyHeader, getCompanyOverview, getButtons} from "./table.js";
import { downloadTableData } from "./excel.js";
import { createCanvasWrapper, createChart } from "./chart.js";


/**
 * Nav GitHub link 
 */
document.querySelector("nav").addEventListener("click", function() {
    window.open("https://github.com/ayoamrit/Stock-Analysis", "_blank");
});

let currentActiveButtonName = "";
const root = document.getElementById("root");
const rootWrapper = document.getElementById("root-layout-wrapper");
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

        //Show the root if it's hidden
        if(root.classList.contains("hidden")){
            root.classList.remove("hidden");
        }

        //Remove everything from the root element before inserting
        rootWrapper.innerHTML = "";

        //Generate and append UI Sections
        const companyHeader = getCompanyHeader(data.overview);
        const companyOverview = getCompanyOverview(data.overview);
        const tableButtons = getButtons();

        rootWrapper.appendChild(companyHeader);
        rootWrapper.appendChild(createCanvasWrapper());
        createChart(data.timeSeries);
        rootWrapper.appendChild(companyOverview);
        rootWrapper.appendChild(tableButtons);

        //Attach listeners to the buttons for different financial reports
        attachButtonListener(data);

        //Trigger click on the balance sheet button to show it by default
        document.getElementById("balance-sheet-button").dispatchEvent(new Event("click"));



    }catch(error){
        //Hide loader and root if an error occurs
        loader.classList.add("hidden");
        root.classList.add("hidden");

        //Display error message
        window.alert(error.message);
        console.log(error);
    }
}


/**
 * Attaches click listeners to the report type buttons (balance sheet, cash flow, income statement)
 * @param {object} data - Object containing all financial data
 *
 */
function attachButtonListener(data){
    const balanceSheetButton = document.getElementById("balance-sheet-button");
    const cashFlowStatementButton = document.getElementById("cash-flow-statement-button");
    const incomeStatementButton = document.getElementById("income-statement-button");
    const downloadExcelButton = document.getElementById("download-xlsx-button");

    //Add click listener to balance sheet button
    balanceSheetButton.addEventListener("click", () => {
        setActiveButton(balanceSheetButton);
        currentActiveButtonName = "Balance Sheet";
        buttonAction(data.balanceSheet.annualReports, "balanceSheet");
    });

    //Add click listener to cash flow button
    cashFlowStatementButton.addEventListener("click", () => {
        setActiveButton(cashFlowStatementButton);
        currentActiveButtonName = "Cash Flow Statement";
        buttonAction(data.cashFlowStatement.annualReports, "cashFlowStatement");
    });

    //Add click listener to income statement button
    incomeStatementButton.addEventListener("click", () => {
        setActiveButton(incomeStatementButton);
        currentActiveButtonName = "Income Statement";
        buttonAction(data.incomeStatement.annualReports, "incomeStatement");
    });

    //Add click listener to download excel button
    downloadExcelButton.addEventListener("click", () => {
        downloadTableData(document.querySelector("table"), currentActiveButtonName);
    });
}


function setActiveButton(button){
    document.querySelectorAll(".buttons-container button").forEach(btn => {
        btn.classList.remove("active");
    });
    button.classList.add("active");
}


/**
 * Sets the clicked button as active and removes the 'active' class and others
 * @param {HTMLElement} button - The button that was clicked 
 */
function buttonAction(report, reportType){
    //Show alert if no data is available
    if(!report || report.length === 0){
        window.alert(`${report} data is missing or empty`);
        return;
    }

    //Remove previous table if it exists
    const tableContainer = document.querySelector(".table-container");

    if(tableContainer){
        rootWrapper.removeChild(tableContainer);
    }

    //Generate and append the new table
    const table = getTable(report, reportType);
    rootWrapper.appendChild(table);
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
