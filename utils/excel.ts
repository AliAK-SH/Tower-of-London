import * as XLSX from 'xlsx';
import { ToLResult } from '../types/index'; // Import the interface we just made

export const exportToExcel = (results: ToLResult[]) => {
  const worksheet = XLSX.utils.json_to_sheet(results);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
  XLSX.writeFile(workbook, "TowerOfLondonResults.xlsx");
};
