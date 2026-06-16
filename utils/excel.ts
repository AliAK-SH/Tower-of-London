import * as XLSX from 'xlsx';

export const exportToExcel = (results: any[]) => {
  const worksheet = XLSX.utils.json_to_sheet(results);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
  XLSX.writeFile(workbook, "TowerOfLondonResults.xlsx");
};
