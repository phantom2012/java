package com.yy.ent.tvbar.common.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * ExcelUtil
 *
 * @author suzhihua
 * @date 2015/6/1.
 */
public class ExcelUtil {
    public static class ExcelVo {
        private String fileName;
        private String sheetName;
        private List<List<String>> contentRow = new ArrayList<List<String>>();

        /**
         * 添加excel内容
         *
         * @param content
         * @throws Exception
         */
        public void addContentRow(List<String> content) throws Exception {
            this.contentRow.add(Collections.unmodifiableList(content));
        }

        /**
         * 添加excel内容
         * @param content
         * @throws Exception
         */
        public void addContentRow(String... content) throws Exception {
            this.contentRow.add(Arrays.asList(content));
        }

        /**
         * 设置sheet name,可不填写
         *
         * @param sheetName
         */
        public void setSheetName(String sheetName) {
            this.sheetName = sheetName;
        }

        /**
         * 下载文件名(无需后缀名),可不填写默认为yy-download
         *
         * @param fileName
         */
        public void setFileName(String fileName) {
            this.fileName = fileName;
        }
    }

    /**
     * 导出excel
     *
     * @param vo
     * @param response
     * @throws Exception
     */
    public static void exportExcel(ExcelVo vo, HttpServletResponse response) throws Exception {
        HSSFWorkbook hssfWorkbook = new HSSFWorkbook();
        HSSFSheet sheet;
        if (StringUtils.isNotBlank(vo.sheetName)) {
            sheet = hssfWorkbook.createSheet(vo.sheetName);
        } else {
            sheet = hssfWorkbook.createSheet();
        }

        HSSFRow row;
        HSSFCell cell;

        if (vo.contentRow != null) {
            int rowSize = vo.contentRow.size();
            List<String> rowData;
            for (int i = 0; i < rowSize; i++) {
                rowData = vo.contentRow.get(i);
                row = sheet.createRow(i);
                int dataSize = rowData.size();
                for (int j = 0; j < dataSize; j++) {
                    cell = row.createCell(j);
                    cell.setCellValue(rowData.get(j));
                }
            }
        }

        response.setContentType("application/vnd.ms-excel");
        String fileName = StringUtils.isBlank(vo.fileName) ? "yy-download" : new String(vo.fileName.getBytes("utf-8"), "iso8859-1");
        response.setHeader("content-disposition", "attachment; filename=" + fileName + ".xls");
        hssfWorkbook.write(response.getOutputStream());
        response.getOutputStream().flush();
    }

    /**
     * 读取excel内容
     *
     * @param is
     * @return
     * @throws Exception
     */
    public static List<List<String>> readExcel(InputStream is) throws Exception {
        List<List<String>> contentRow = new ArrayList<List<String>>();
        POIFSFileSystem fs;
        HSSFWorkbook hssfWorkbook;
        fs = new POIFSFileSystem(is);
        hssfWorkbook = new HSSFWorkbook(fs);
        HSSFSheet sheet = hssfWorkbook.getSheetAt(0);

        int rowNum = sheet.getLastRowNum();
        HSSFRow row = sheet.getRow(0);
        int colNum = row.getPhysicalNumberOfCells();
        List<String> dataRow;
        for (int i = 0; i <= rowNum; i++) {
            dataRow = new ArrayList<String>();
            row = sheet.getRow(i);
            int j = 0;
            while (j < colNum) {
                dataRow.add(getCellFormatValue(row.getCell(j)).trim());
                j++;
            }
            contentRow.add(dataRow);
        }

        return contentRow;
    }

    private static String getCellFormatValue(HSSFCell cell) {
        String cellvalue;
        // 判断当前Cell的Type
        if (cell != null) {
            switch (cell.getCellType()) {
                // 如果当前Cell的Type为NUMERIC
                case HSSFCell.CELL_TYPE_NUMERIC:
                case HSSFCell.CELL_TYPE_FORMULA: {
                    // 判断当前的cell是否为Date
                    if (HSSFDateUtil.isCellDateFormatted(cell)) {
                        Date date = cell.getDateCellValue();
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                        cellvalue = sdf.format(date);
                    } else {
                        // 数字取得当前Cell的数值
                        cellvalue = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                }
                // 如果当前Cell的Type为STRIN
                case HSSFCell.CELL_TYPE_STRING:
                    // 取得当前的Cell字符串
                    cellvalue = cell.getRichStringCellValue().getString();
                    break;
                // 默认的Cell值
                default:
                    cellvalue = cell.getStringCellValue();
            }
        } else {
            cellvalue = "";
        }
        return cellvalue;

    }
}
