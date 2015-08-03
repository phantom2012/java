package com.yy.ent.tvbar.base;


import com.yy.ent.cherrice.ret.Redirect;

public class BaseRedirect extends Redirect {
    protected static String basePath = "/WEB-INF/jsp/";
    protected static String errorBasePath = "/agency/html/";

    public BaseRedirect(String path) {
        super(errorBasePath + path);
    }
}
