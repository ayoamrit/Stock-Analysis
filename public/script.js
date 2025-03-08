/**
 * Root
 */
const root = document.getElementById("root");

async function fetchStockFinancials(symbol){
    try{
        const response = await fetch(`/api/aplhaVantage/stock?symbol=${symbol}`);
        const data = await response.json();
        console.log(data);
        
    }catch(error){
        console.log(error.message);
        console.error(error.message);
    }
}

fetchStockFinancials("IBM");