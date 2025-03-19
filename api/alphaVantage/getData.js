const API_KEY = process.env.API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

// Company_Overview_URL = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo";
// INCOME_STATEMENT_URL = "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo";
// BALANCE_SHEET_URL = "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo";
// CASH_FLOW_STATEMENT_URL = "https://www.alphavantage.co/query?function=CASH_FLOW&symbol=IBM&apikey=demo";


/**
 * Fetch data from the Aplha Vantage API
 * @param {string} tickerSymbol - Stock ticker symbol 
 * @param {string} functionType - API function (INCOME_STATEMENT, BALANCE_SHEET, CASH_FLOW)
 * @returns {promies<Object>} - Parsed JSON response
 */
async function fetchFinancialData(tickerSymbol, functionType){
    try{
        const url = `${BASE_URL}?function=${functionType}&symbol=${tickerSymbol}&apikey=${API_KEY}`;
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Failed to fetch ${functionType}: ${response.statusText}`);
        }

        return await response.json();

    }catch(error){
        console.error(`Error fetching ${functionType} for ${tickerSymbol}:`, error);
        return {error: error.message};
    }
}

/**
 * Fetch all financial statements for a stock
 * @param {string} tickerSymbol - stock ticker symbol 
 * @returns {Promise<Object>} - All financial statements
 */
async function getStockFinancials(tickerSymbol){
    const [incomeStatement, balanceSheet, cashFlowStatement, overview] = await Promise.all([
        fetchFinancialData(tickerSymbol, "INCOME_STATEMENT"),
        fetchFinancialData(tickerSymbol, "BALANCE_SHEET"),
        fetchFinancialData(tickerSymbol, "CASH_FLOW"),
        fetchFinancialData(tickerSymbol, "OVERVIEW")
    ]);

    return {incomeStatement, balanceSheet, cashFlowStatement, overview};
}

export {getStockFinancials};
