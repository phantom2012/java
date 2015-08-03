package com.yy.ent.tvbar.interceptor;

import com.yy.ent.cherrice.interceptor.AbstractFileUploadInterceptor;


public class UploadInterceptor extends AbstractFileUploadInterceptor {

    @Override
    protected String getSaveDir() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    protected long getMaximumSize() {
        return 500 * 1024 * 1024;
    }


}
