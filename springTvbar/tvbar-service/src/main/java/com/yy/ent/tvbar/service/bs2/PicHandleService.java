package com.yy.ent.tvbar.service.bs2;

import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.mobile.bs2.EntBs2Client;
import com.yy.ent.mobile.bs2.util.Bs2CdnUtils;
import com.yy.ent.mobile.bs2.util.ImageViewUrl;

/**
 * Created by Administrator on 2015-07-03.
 */
public class PicHandleService {
    @Inject(instance = EntBs2Client.class)
    private EntBs2Client entBs2Client;

    public String changePictureSizeToBs2(String picUrl){
        String changedUrl = ImageViewUrl.atLeastEdge().width(200).dropExif().blur(1.0).on(picUrl);
        return changedUrl;
    }

    public String upLoadToBs2(byte[] byteData, String fileName, boolean useCdn){
        return entBs2Client.uploadMinFileData(byteData,fileName, useCdn);
    }

    public static void main(String[] args) {
        String url = "http://empfs.bs2dl.yy.com/YzExYjdlNjYtMWY3Ny00MWVkLTk4ZDYtNDA0NmE1YjExNjdm.jpg";
        System.out.println(ImageViewUrl.atLeastEdge().width(200).dropExif().blur(1.0).on(url));

        System.out.println(Bs2CdnUtils.toCdnUrl(url));
    }
}
