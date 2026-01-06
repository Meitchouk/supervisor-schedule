/**
 * Export utilities for schedule data
 * Handles PDF, CSV, and Excel export formats
 */

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { STATE_TO_LABEL } from '../features/scheduler/constants';

/**
 * Color mappings for states
 * - Subida (S): Azul
 * - Inducción (I): Amarillo/Naranja
 * - Perforación (P): Verde
 * - Bajada (B): Rojo
 * - Descanso (D): Gris
 * - Vacío (-): Blanco
 */
const STATE_COLORS = {
  UP: { rgb: [59, 130, 246], hex: '3B82F6' }, // Azul
  INDUCTION: { rgb: [251, 146, 60], hex: 'FB923C' }, // Naranja/Amarillo
  DRILLING: { rgb: [34, 197, 94], hex: '22C55E' }, // Verde
  DOWN: { rgb: [239, 68, 68], hex: 'EF4444' }, // Rojo
  REST: { rgb: [156, 163, 175], hex: '9CA3AF' }, // Gris
  EMPTY: { rgb: [255, 255, 255], hex: 'FFFFFF' }, // Blanco
};

/**
 * MARK: Get color for a state label
 */
function getStateColor(stateLabel) {
  const stateMap = {
    S: 'UP',
    I: 'INDUCTION',
    P: 'DRILLING',
    B: 'DOWN',
    D: 'REST',
    '-': 'EMPTY',
  };
  const state = stateMap[stateLabel];
  return STATE_COLORS[state] || STATE_COLORS.EMPTY;
}

/**
 * MARK: Generate filename with timestamp
 */
function generateFilename(prefix, extension) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `${prefix}_${timestamp}.${extension}`;
}

/**
 * MARK: Convert schedule result to table data
 */
function scheduleToTableData(scheduleResult) {
  if (!scheduleResult || !scheduleResult.days) {
    return { headers: [], rows: [] };
  }

  const { days, drillingCountByDay } = scheduleResult;

  // Headers: Day numbers
  const headers = ['Supervisor', ...days.map((d) => d.dayNumber)];

  // Rows: S1, S2, S3, Drilling Count
  const rows = [
    ['S1', ...days.map((d) => STATE_TO_LABEL[d.s1] || '-')],
    ['S2', ...days.map((d) => STATE_TO_LABEL[d.s2] || '-')],
    ['S3', ...days.map((d) => STATE_TO_LABEL[d.s3] || '-')],
    ['#P', ...drillingCountByDay],
  ];

  return { headers, rows };
}

/**
 * MARK: Export schedule to PDF
 */
export function exportToPDF(scheduleResult, config) {
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const { days, drillingCountByDay } = scheduleResult;
    const DAYS_PER_TABLE = 30;
    const totalTables = Math.ceil(days.length / DAYS_PER_TABLE);
    const pageHeight = doc.internal.pageSize.height;
    // const pageWidth = doc.internal.pageSize.width;
    const TABLE_HEIGHT_ESTIMATE = 35; // Approximate height of a table
    const MARGIN_BOTTOM = 20;

    let currentY = 20;
    let isFirstTableOnPage = true;

    // Title and config on first page
    doc.setFontSize(18);
    doc.text('Supervisor Schedule', 14, currentY);
    currentY += 8;

    doc.setFontSize(10);
    doc.text(
      `Work Days: ${config.workDays} | Off Days: ${config.offDays}`,
      14,
      currentY,
    );
    currentY += 5;
    doc.text(
      `Induction Days: ${config.inductionDays} | Drilling Days Required: ${config.drillingDaysRequired}`,
      14,
      currentY,
    );
    currentY += 10;

    // Process each table chunk
    for (let tableIdx = 0; tableIdx < totalTables; tableIdx++) {
      const startIdx = tableIdx * DAYS_PER_TABLE;
      const endIdx = Math.min(startIdx + DAYS_PER_TABLE, days.length);
      const pageDays = days.slice(startIdx, endIdx);
      const pageDrillingCount = drillingCountByDay.slice(startIdx, endIdx);

      // Check if we need a new page (if table won't fit)
      if (
        !isFirstTableOnPage &&
        currentY + TABLE_HEIGHT_ESTIMATE > pageHeight - MARGIN_BOTTOM
      ) {
        doc.addPage();
        currentY = 20;
        isFirstTableOnPage = true;

        // Add title on new page
        doc.setFontSize(18);
        doc.text('Supervisor Schedule', 14, currentY);
        doc.setFontSize(9);
        doc.text(`(continued)`, 14 + 80, currentY);
        currentY += 15;
      }

      // Days range indicator
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(`Days ${startIdx} - ${endIdx - 1}`, 14, currentY);
      doc.setTextColor(0, 0, 0);
      currentY += 3;

      // Headers for this table
      const headers = ['Supervisor', ...pageDays.map((d) => d.dayNumber)];

      // Rows for this table
      const rows = [
        ['S1', ...pageDays.map((d) => STATE_TO_LABEL[d.s1] || '-')],
        ['S2', ...pageDays.map((d) => STATE_TO_LABEL[d.s2] || '-')],
        ['S3', ...pageDays.map((d) => STATE_TO_LABEL[d.s3] || '-')],
        ['#P', ...pageDrillingCount],
      ];

      // Generate table
      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: currentY,
        styles: {
          fontSize: 8,
          cellPadding: 2,
          halign: 'center',
        },
        headStyles: {
          fillColor: [243, 244, 246],
          textColor: [0, 0, 0],
          fontStyle: 'bold',
        },
        columnStyles: {
          0: {
            fontStyle: 'bold',
            fillColor: [243, 244, 246],
            textColor: [0, 0, 0],
          },
        },
        didParseCell: function (data) {
          if (data.section === 'head') {
            return;
          }

          if (data.row.index === 3) {
            data.cell.styles.fillColor = [243, 244, 246];
            data.cell.styles.fontStyle = 'bold';
          } else if (data.column.index > 0 && data.row.index < 3) {
            const cellValue = data.cell.text[0];
            if (cellValue && cellValue !== '-') {
              const color = getStateColor(cellValue);
              data.cell.styles.fillColor = color.rgb;
              data.cell.styles.textColor = [255, 255, 255];
              data.cell.styles.fontStyle = 'bold';
            }
          }
        },
      });

      // Update position for next table
      currentY = doc.lastAutoTable.finalY + 10;
      isFirstTableOnPage = false;
    }

    // Legend at the end
    // Check if legend fits on current page
    if (currentY + 30 > pageHeight - MARGIN_BOTTOM) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Legend:', 14, currentY);
    currentY += 6;

    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    const legendItems = [
      { label: 'S = Travel Up', color: STATE_COLORS.UP.rgb },
      { label: 'I = Induction', color: STATE_COLORS.INDUCTION.rgb },
      { label: 'P = Drilling', color: STATE_COLORS.DRILLING.rgb },
      { label: 'B = Travel Down', color: STATE_COLORS.DOWN.rgb },
      { label: 'D = Rest', color: STATE_COLORS.REST.rgb },
      { label: '- = Empty', color: STATE_COLORS.EMPTY.rgb },
    ];

    legendItems.forEach((item, index) => {
      const xPos = 14 + Math.floor(index / 3) * 100;
      const yPos = currentY + (index % 3) * 6;

      doc.setFillColor(...item.color);
      doc.rect(xPos, yPos - 3, 4, 4, 'F');

      doc.setTextColor(0, 0, 0);
      doc.text(item.label, xPos + 6, yPos);
    });

    // Save
    doc.save(generateFilename('supervisor-schedule', 'pdf'));
    return true;
  } catch (error) {
    console.error('PDF export failed:', error);
    return false;
  }
}

/**
 * MARK: Export schedule to CSV
 */
export function exportToCSV(scheduleResult) {
  try {
    const { headers, rows } = scheduleToTableData(scheduleResult);

    // Convert to CSV format
    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, generateFilename('supervisor-schedule', 'csv'));
    return true;
  } catch (error) {
    console.error('CSV export failed:', error);
    return false;
  }
}

/**
 * MARK: Export schedule to Excel with colors using ExcelJS
 */
export async function exportToExcel(scheduleResult, config) {
  try {
    const { headers, rows } = scheduleToTableData(scheduleResult);

    // Create workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Supervisor Schedule';
    workbook.created = new Date();

    // Schedule sheet
    const worksheet = workbook.addWorksheet('Schedule');

    // Add header row
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' }, // Blue
      };
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      };
    });

    // Add data rows with colors
    rows.forEach((rowData, rowIndex) => {
      const row = worksheet.addRow(rowData);

      row.eachCell((cell, colNumber) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        };

        // First column (supervisor names)
        if (colNumber === 1) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF3F4F6' }, // Light gray
          };
          cell.font = { bold: true };
        }
        // Drilling count row (last row, index 3)
        else if (rowIndex === 3) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF3F4F6' }, // Light gray
          };
          cell.font = { bold: true };
        }
        // Supervisor rows (S1, S2, S3) - color by state
        else if (rowIndex < 3 && colNumber > 1) {
          const cellValue = cell.value;
          if (cellValue && cellValue !== '-') {
            const color = getStateColor(cellValue);
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF' + color.hex },
            };
            cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
          } else {
            // Empty cells - white background
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFFFFFF' },
            };
            cell.font = { color: { argb: 'FF6B7280' } };
          }
        }
      });
    });

    // Set column widths
    worksheet.getColumn(1).width = 12;
    for (let i = 2; i <= headers.length; i++) {
      worksheet.getColumn(i).width = 5;
    }

    // Configuration & Legend sheet
    const configSheet = workbook.addWorksheet('Config & Legend');

    // Configuration section
    configSheet.addRow(['Configuration', 'Value']);
    configSheet.addRow(['Work Days', config.workDays]);
    configSheet.addRow(['Off Days', config.offDays]);
    configSheet.addRow(['Induction Days', config.inductionDays]);
    configSheet.addRow(['Drilling Days Required', config.drillingDaysRequired]);
    configSheet.addRow([]);

    // Style config header
    const configHeader = configSheet.getRow(1);
    configHeader.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' },
      };
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    });

    // Legend section with colors
    const legendStartRow = 7;
    configSheet.getCell(`A${legendStartRow}`).value = 'Legend';
    configSheet.getCell(`B${legendStartRow}`).value = 'Meaning';
    configSheet.getCell(`C${legendStartRow}`).value = 'Color';

    const legendHeader = configSheet.getRow(legendStartRow);
    legendHeader.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' },
      };
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    });

    // Legend items with actual colors
    const legendItems = [
      { label: 'S', meaning: 'Travel Up (Subida)', color: STATE_COLORS.UP },
      {
        label: 'I',
        meaning: 'Induction (Inducción)',
        color: STATE_COLORS.INDUCTION,
      },
      {
        label: 'P',
        meaning: 'Drilling (Perforación)',
        color: STATE_COLORS.DRILLING,
      },
      { label: 'B', meaning: 'Travel Down (Bajada)', color: STATE_COLORS.DOWN },
      { label: 'D', meaning: 'Rest (Descanso)', color: STATE_COLORS.REST },
      { label: '-', meaning: 'Empty (Vacío)', color: STATE_COLORS.EMPTY },
    ];

    legendItems.forEach((item, index) => {
      const rowNum = legendStartRow + 1 + index;
      const row = configSheet.getRow(rowNum);
      row.getCell(1).value = item.label;
      row.getCell(2).value = item.meaning;
      row.getCell(3).value = '';

      // Color the first cell with the actual color
      row.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF' + item.color.hex },
      };

      // White or dark text based on color
      if (item.color.hex === 'FFFFFF') {
        row.getCell(1).font = { bold: true, color: { argb: 'FF6B7280' } };
        row.getCell(1).border = {
          top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        };
      } else {
        row.getCell(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      }

      row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    // Set column widths for config sheet
    configSheet.getColumn(1).width = 25;
    configSheet.getColumn(2).width = 25;
    configSheet.getColumn(3).width = 15;

    // Generate file and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, generateFilename('supervisor-schedule', 'xlsx'));
    return true;
  } catch (error) {
    console.error('Excel export failed:', error);
    return false;
  }
}

/**
 * MARK: Export selected history items to Excel using ExcelJS
 */
export async function exportHistoryToExcel(historyItems) {
  try {
    if (!historyItems || historyItems.length === 0) {
      console.warn('No history items to export');
      return false;
    }

    // Create workbook
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Supervisor Schedule';
    workbook.created = new Date();

    // Summary sheet
    const worksheet = workbook.addWorksheet('History Summary');

    // Headers
    const headers = [
      'Date & Time',
      'Work Days',
      'Off Days',
      'Induction Days',
      'Drilling Days Req.',
      'Total Days',
      'Drilling Completed',
      'Status',
      'Duplicate',
    ];

    // Add header row
    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF3B82F6' },
      };
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
      };
    });

    // Add data rows
    historyItems.forEach((item) => {
      const date = new Date(item.timestamp).toLocaleString();
      const row = worksheet.addRow([
        date,
        item.config.workDays,
        item.config.offDays,
        item.config.inductionDays,
        item.config.drillingDaysRequired,
        item.totalDays,
        item.drillingDaysCompleted,
        item.hasErrors ? 'Has Errors' : 'Valid',
        item.isDuplicate ? 'Yes' : 'No',
      ]);

      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
          right: { style: 'thin', color: { argb: 'FFE5E7EB' } },
        };
      });
    });

    // Set column widths
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 12;
    worksheet.getColumn(3).width = 10;
    worksheet.getColumn(4).width = 14;
    worksheet.getColumn(5).width = 18;
    worksheet.getColumn(6).width = 12;
    worksheet.getColumn(7).width = 18;
    worksheet.getColumn(8).width = 12;
    worksheet.getColumn(9).width = 10;

    // Generate file and download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, generateFilename('supervisor-schedule-history', 'xlsx'));
    return true;
  } catch (error) {
    console.error('History export failed:', error);
    return false;
  }
}

/**
 * MARK: Export selected history items to CSV
 */
export function exportHistoryToCSV(historyItems) {
  try {
    if (!historyItems || historyItems.length === 0) {
      console.warn('No history items to export');
      return false;
    }

    const headers = [
      'Date & Time',
      'Work Days',
      'Off Days',
      'Induction Days',
      'Drilling Days Req.',
      'Total Days',
      'Drilling Completed',
      'Status',
      'Duplicate',
    ];

    const rows = historyItems.map((item) => {
      const date = new Date(item.timestamp).toLocaleString();
      return [
        date,
        item.config.workDays,
        item.config.offDays,
        item.config.inductionDays,
        item.config.drillingDaysRequired,
        item.totalDays,
        item.drillingDaysCompleted,
        item.hasErrors ? 'Has Errors' : 'Valid',
        item.isDuplicate ? 'Yes' : 'No',
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, generateFilename('supervisor-schedule-history', 'csv'));
    return true;
  } catch (error) {
    console.error('History CSV export failed:', error);
    return false;
  }
}
