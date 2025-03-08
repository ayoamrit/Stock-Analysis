import { getStockFinancials } from "../alphaVantage/getData.js";

export default async function handler(req, res){
    try{
        const {symbol} = req.query;

        if(!symbol){
            return res.status(400).json({error: "Stock symbol is required"});
        }

        const financialData = await getStockFinancials(symbol);
        res.status(200).json(financialData);
    }catch(error){
        res.status(500).json({error: "Failed to fetch financial data", details: error.message});
    }
}