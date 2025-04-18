export function downloadTableData(table, sheetType){
    var workBook =  XLSX.utils.table_to_book(table, {sheet: sheetType});
    XLSX.writeFile(workBook, 'FinancialData.xlsx');
}