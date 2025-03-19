/*
 ***************************************************************
 * Company Header 
*/
export function getCompanyHeader(companyData){
    return `
        <div class="company-header-container">
            <h2>${companyData.Name} | ${companyData.Symbol}</h2>
            <p>${companyData.Description}</p>
        </div>
    `;
}

/*
 ***************************************************************
 * Company Overview 
*/
export function getCompanyOverview(companyData){
    return `
        <div class="company-overview-container">
            <div class="company-content-wrapper">
                <div class="company-content">
                    <p>Sector</p>
                    <p>${companyData.Sector}</p>
                </div>
                <div class="company-content">
                    <p>PE Ratio</p>
                    <p>${companyData.PERatio}</p>
                </div>
                <div class="company-content">
                    <p>PEGRatio</p>
                    <p>${companyData.PEGRatio}</p>
                </div>
                <div class="company-content">
                    <p>Book Value</p>
                    <p>${companyData.BookValue}</p>
                </div>
            </div>

            <div class="company-content-wrapper">
                <div class="company-content">
                    <p>Dividend/Share</p>
                    <p>${companyData.DividendPerShare}</p>
                </div>
                <div class="company-content">
                    <p>Dividend Yield</p>
                    <p>${companyData.DividendYield}</p>
                </div>
                <div class="company-content">
                    <p>EPS</p>
                    <p>${companyData.EPS}</p>
                </div>
                <div class="company-content">
                    <p>Revenue/Share</p>
                    <p>${companyData.RevenuePerShareTTM}</p>
                </div>
            </div>

            <div class="company-content-wrapper">
                <div class="company-content">
                    <p>Profit Margin</p>
                    <p>${companyData.ProfitMargin}</p>
                </div>
                <div class="company-content">
                    <p>Operating Margin</p>
                    <p>${companyData.OperatingMarginTTM}</p>
                </div>
                <div class="company-content">
                    <p>ROA</p>
                    <p>${companyData.ReturnOnAssetsTTM}</p>
                </div>
                <div class="company-content">
                    <p>ROE</p>
                    <p>${companyData.ReturnOnEquityTTM}</p>
                </div>
            </div>

            <div class="company-content-wrapper">
                <div class="company-content">
                    <p>Trailing PE</p>
                    <p>${companyData.TrailingPE}</p>
                </div>
                <div class="company-content">
                    <p>Forward PE</p>
                    <p>${companyData.ForwardPE}</p>
                </div>
                <div class="company-content">
                    <p>Price-to-Sale</p>
                    <p>${companyData.PriceToSalesRatioTTM}</p>
                </div>
                <div class="company-content">
                    <p>Price-to-Book</p>
                    <p>${companyData.PriceToBookRatio}</p>
                </div>
            </div>
        </div>
    `;
}


/*
 ***************************************************************
 * Company Table Buttons
*/
export function getButtons(){
    return `
        <div class="table-buttons">
            <button class="active" id="balance-sheet-button">Balance Sheet</button>
            <button id="cash-flow-statement-button>Cash Flow Statement</button>
            <button id="income-statement-button">Income Statement</button>
        </div>
    `;
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

    return tableSection;
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