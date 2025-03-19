/*
 ***************************************************************
 * Company Header 
*/
export function getCompanyHeader(companyData){
    const container = document.createElement("div");
    container.classList.add("company-header-container");

    const heading = document.createElement("h2");
    heading.textContent = companyData.Name;

    const description = document.createElement("p");
    description.textContent = companyData.Description;

    container.appendChild(heading);
    container.appendChild(description);

    return container;
}

/*
 ***************************************************************
 * Company Overview 
*/
export function getCompanyOverview(companyData){

    const overviewContainer = document.createElement("div");
    overviewContainer.classList.add("company-overview-container");

    //Function to insert individual divs inside contentWrappers
    const createContent = (label, value) => {
        const content = document.createElement("div");
        content.classList.add("company-content");

        const labelElement = document.createElement("p");
        labelElement.textContent = label;

        const valueElement = document.createElement("p");
        valueElement.textContent = value;

        content.appendChild(labelElement);
        content.appendChild(valueElement);

        return content;
    };

    //1st Wrapper
    const contentWrapper_1 = document.createElement("div");
    contentWrapper_1.classList.add("company-content-wrapper");

    contentWrapper_1.appendChild(createContent("Sector", companyData.Sector));
    contentWrapper_1.appendChild(createContent('PE Ratio', companyData.PERatio));
    contentWrapper_1.appendChild(createContent('PEGRatio', companyData.PEGRatio));
    contentWrapper_1.appendChild(createContent('Book Value', companyData.BookValue));

    //2nd Wrapper
    const contentWrapper_2 = document.createElement("div");
    contentWrapper_2.classList.add("company-content-wrapper");

    contentWrapper_2.appendChild(createContent('Dividend/Share', companyData.DividendPerShare));
    contentWrapper_2.appendChild(createContent('Dividend Yield', companyData.DividendYield));
    contentWrapper_2.appendChild(createContent('EPS', companyData.EPS));
    contentWrapper_2.appendChild(createContent('Revenue/Share', companyData.RevenuePerShareTTM));

    //3rd Wrapper
    const contentWrapper_3 = document.createElement("div");
    contentWrapper_3.classList.add("company-content-wrapper");

    contentWrapper_3.appendChild(createContent('Profit Margin', companyData.ProfitMargin));
    contentWrapper_3.appendChild(createContent('Operating Margin', companyData.OperatingMarginTTM));
    contentWrapper_3.appendChild(createContent('ROA', companyData.ReturnOnAssetsTTM));
    contentWrapper_3.appendChild(createContent('ROE', companyData.ReturnOnEquityTTM));

    //3rd Wrapper
    const contentWrapper_4 = document.createElement("div");
    contentWrapper_4.classList.add("company-content-wrapper");

    contentWrapper_4.appendChild(createContent('Trailing PE', companyData.TrailingPE));
    contentWrapper_4.appendChild(createContent('Forward PE', companyData.ForwardPE));
    contentWrapper_4.appendChild(createContent('Price-to-Sale', companyData.PriceToSalesRatioTTM));
    contentWrapper_4.appendChild(createContent('Price-to-Book', companyData.PriceToBookRatio));


    overviewContainer.appendChild(contentWrapper_1);
    overviewContainer.appendChild(contentWrapper_2);
    overviewContainer.appendChild(contentWrapper_3);
    overviewContainer.appendChild(contentWrapper_4);

    return overviewContainer;
}


/*
 ***************************************************************
 * Company Table Buttons
*/
export function getButtons(){
    const container = document.createElement("div");
    container.classList.add("buttons-container");

    //Balance Sheet Button
    const button_1 = document.createElement("button");
    button_1.classList.add("active");
    button_1.setAttribute("id", "balance-sheet-button");
    button_1.textContent = "Balance Sheet";

    //Cash Flow Statement Button
    const button_2 = document.createElement("button");
    button_2.setAttribute("id", "cash-flow-statement-button");
    button_2.textContent = "Cash Flow Statement";

    //Income Statement Button
    const button_3 = document.createElement("button");
    button_3.setAttribute("id", "income-statement-button");
    button_3.textContent = "Income Statement";


    container.appendChild(button_1);
    container.appendChild(button_2);
    container.appendChild(button_3);

    return container;
}


/**
 * Generate an HTML table displaying fiancial data.
 * @param {Array} annualReport - Array of financial data Objects
 * @param {Object} financialKeys - Object mapping financial metric labels to report keys.
 * @returns {HTMLElement} - A table container element with the formatted financial data.
 */
export function getTable(annualReport, keyType){
    const tableContainer = createTableContainer();
    const table = document.createElement("table");

    //Extract years from the financial data
    const years = extractYears(annualReport);

    //Select the right keys from the KEYS Object
    const financialKeys = KEYS[keyType];

    //Append table header and body
    table.appendChild(createTableHeader(years));
    table.appendChild(createTableBody(annualReport, financialKeys));

    tableContainer.appendChild(table);

    return tableContainer;
}


/**
 * Create and returns the table container element
 */
function createTableContainer(){
    const tableContainer = document.createElement("div");
    tableContainer.classList.add("table-container");
    return tableContainer;
}

/**
 * Extracts unique fiscal years from the annual report
 * @param {Array} annualReport - Financial data array 
 * @returns {Array} - Array of fiscal years
 */
function extractYears(annualReport){
    return annualReport.map(report => report.fiscalDateEnding);
}

/**
 * Create the table header row
 * @param {Array} years - Array of fiscal years 
 * @returns {HTMLElement} - Table header element 
 */
function createTableHeader(years){
    const tableHead = document.createElement("thead");
    const headRow = document.createElement("tr");

    //First column: "Financial Metric"
    const firstTh = document.createElement("th");
    firstTh.textContent = "Financial Metric";
    firstTh.classList.add("sticky-first-col");
    headRow.appendChild(firstTh);

    years.forEach(year => {
        const th = document.createElement("th");
        th.textContent = year;
        headRow.appendChild(th);
    });

    tableHead.appendChild(headRow);
    return tableHead;
}

/**
 * Creates the table body with financial data
 * 
 * @param {Array} annualReport - Financial data array 
 * @param {Object} financialKeys - Object mapping financial metric labels to report keys 
 * @returns {HTMLElement} - Table body element
 */
function createTableBody(annualReport, financialKeys){
    const tableBody = document.createElement("tbody");

    //Creatw rows for each financial metric
    Object.entries(financialKeys).forEach(([label, key]) => {
        const row = document.createElement("tr");

        //Add row header (financial metric)
        row.appendChild(createRowHeader(label));

        //Populate row with financial values from annualReport
        annualReport.forEach(report => {

            //Get financial data from the report
            const value = report[key];
            row.appendChild(createDataCell(value));
        });

        tableBody.appendChild(row);
    });

    return tableBody;
}

/**
 * Creates a table row header (first column)
 * @param {string} label - The financial metric label 
 * @returns {HTMLElement} - Table header cell
 */
function createRowHeader(label){
    const th = document.createElement("th");
    th.textContent = label;
    return th;
}

/**
 * Creates a table data cell with formatted number
 * @param {number} value - The fiancial data value 
 * @returns {HTMLElement} - Table data cell 
 */
function createDataCell(value){
    const td = document.createElement("td");
    td.textContent = formatNumber(value);
    return td;
}

/**
 * Formats a number into millions (M) with two decimal places
 * @param {number} number - The number to format 
 * @returns {string} - The formatted number as a string
 */
function formatNumber(number){
    if(!number || isNaN(number)) return "-";

    const num = parseFloat(number);
    const absNum = Math.abs(num);

    const formattedNumber = (absNum/1_000_000).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (number < 0 ? "-$" : "$") + formattedNumber;
}


/**
 * Finacial keys
 * --------------------------------------------------------------------------
 */
const KEYS = {
    balanceSheet: {
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
    },
    cashFlowStatement: {
        "Capital Expenditures": "capitalExpenditures",
        "Cash Flow - Financing": "cashflowFromFinancing",
        "Cash Flow - Investing": "cashflowFromInvestment",
        "Dividend Payout": "dividendPayout",
        "Net Income": "netIncome",
        "Operating Cash Flow": "operatingCashflow",
        "Profit Loss": "profitLoss",
        "Change In Inventory": "changeInInventory",
        "Change In Operating Assets": "changeInOperatingAssets",
        "Change In Operating Liabilities": "changeInOperatingLiabilities",
        "Change In Receivables": "changeInReceivables"
    },
    incomeStatement: {
        "Comprehensive Income Net of Tax": "comprehensiveIncomeNetOfTax",
        "Cost of Revenue": "costOfRevenue",
        "Cost of Goods & Services Sold": "costofGoodsAndServicesSold",
        "Depreciation": "depreciation",
        "Depreciation & Amortization": "depreciationAndAmortization",
        "EBIT": "ebit",
        "EBITDA": "ebitda",
        "Gross Profit": "grossProfit",
        "Income Before Tax": "incomeBeforeTax",
        "Income Tax Expense": "incomeTaxExpense",
        "Interest Expense": "interestExpense",
        "Interest Income" : "interestIncome",
        "Net Income" : "netIncome",
        "Operating Expenses" : "operatingExpenses",
        "Operating Income" : "operatingIncome",
        "Total Revenue" : "totalRevenue"
    }
}