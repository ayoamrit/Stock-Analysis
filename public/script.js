/**
 * Root
 */
const root = document.getElementById("root");

async function fetchStockFinancials(symbol){
    try{
        const response = await fetch(`/api/alphaVantage/stock?symbol=${symbol}`);
        const data = await response.json();
        console.log(data);
        
    }catch(error){
        console.log(error);
    }
}

fetchStockFinancials("IBM");