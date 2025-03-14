import {getTableContainer} from "./table.js";
/**
 * Root
 */
const root = document.getElementById("root");

const balanceSheetKeys = {
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
};

const cashFlowStatementKeys = {
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
}

const incomeStatementKeys = {
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

async function fetchStockFinancials(symbol){
    try{
        const response = await fetch(`/api/alphaVantage/stock?symbol=${symbol}`);
        const data = await response.json();
        console.log(data);
        
        if(data.balanceSheet && data.balanceSheet.annualReports){
            const balanceSheetTable = getTableContainer(data.balanceSheet.annualReports, balanceSheetKeys);
            const cashFlowStatementTable = getTableContainer(data.cashFlowStatement.annualReports, cashFlowStatementKeys);
            const incomeStatementTable = getTableContainer(data.incomeStatement.annualReports, incomeStatementKeys);

            root.appendChild(balanceSheetTable);
            root.appendChild(cashFlowStatementTable);
            root.appendChild(incomeStatementTable);
        }
    }catch(error){
        console.log(error);
    }
}

fetchStockFinancials("IBM");