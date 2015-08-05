package com.yy.ent.tvbar.common.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

/**
 * Created by xieyong on 2014/10/15.
 */
public class FileUtil {

    public static Logger logger = Logger.getLogger(FileUtil.class);

    /**读取配置文件，并把内容转为proerties*/
    public static Properties readProperties(String fileName) {//传入参数fileName是要读取的资源文件的文件名如(file.properties)
        InputStream in = null;
        Properties pros = new Properties();
        try {
            if (null != fileName) {
                in = new FileInputStream(fileName);
                pros.load(in);
                return pros;
            }
        } catch (Exception e) {
            logger.warn("reading file: " + fileName + "failed!");
        } finally {
            try {
                if (null != in) {
                    in.close();
                }
            } catch (IOException e) {
                logger.warn("fileInputStream close failed!");
            }
        }
        return null;
    }
}
