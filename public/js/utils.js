/**
 * Formats a number into millions (M) with two decimal places
 * @param {number} number - The number to format 
 * @returns {string} - The formatted number as a string
 */
export function formatNumber(number, dollarSymbolFlag = true){
    if(!number || isNaN(number)) return "-";

    const num = parseFloat(number);
    const absNum = Math.abs(num);

    const formattedNumber = (absNum/1_000_000).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });


    //Check whether the dollar symbol is required
    if(dollarSymbolFlag){
        return (number < 0 ? "-$" : "$") + formattedNumber;
    }
    else{
        return number < 0 ? -parseFloat(formattedNumber) : parseFloat(formattedNumber);
    }
}