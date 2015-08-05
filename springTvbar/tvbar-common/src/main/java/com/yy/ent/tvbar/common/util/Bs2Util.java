package com.yy.ent.tvbar.common.util;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Created by xieyong on 2015/1/23.
 */
public class Bs2Util {

    // 照片压缩尺寸(key:尺寸  value:[0:按1:1比例压缩    1：按原图尺寸压缩])
       public final static Map<Integer, String> PHOTO_PRESS_SIZES = new HashMap<Integer,String>();


    // 获取照片压缩尺寸(包含压缩比例)
    public static Map<Integer, String> getPressSizeMap() {
        return Bs2Util.PHOTO_PRESS_SIZES;
    }

    // 获取照片压缩尺寸
    public static Set<String> getPressSizeSet() {
        Set<String> sizeSet = new HashSet<String>();
        if (Bs2Util.PHOTO_PRESS_SIZES!=null && Bs2Util.PHOTO_PRESS_SIZES.size()>0) {
            for (int size : Bs2Util.PHOTO_PRESS_SIZES.keySet()) {
                sizeSet.add(String.valueOf(size));
            }
        }
        return sizeSet;
    }

    public static Set<String> getPressImages(String path) {
        Set<String> data = new HashSet<String>();
        for (int size : Bs2Util.PHOTO_PRESS_SIZES.keySet()) {
            if (size==144) {
                data.add(path.substring(0, path.lastIndexOf(".")) + "_min" + path.substring(path.lastIndexOf(".")));
                continue;
            }
            data.add(path.substring(0, path.lastIndexOf("."))+"_min_" + size + path.substring(path.lastIndexOf(".")));
        }
        return data;
    }

    static {
        Bs2Util.PHOTO_PRESS_SIZES.put(208,"0");
        Bs2Util.PHOTO_PRESS_SIZES.put(144,"1");
    }
}
