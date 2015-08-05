package com.yy.ent.tvbar.common.util;

public enum WeiXinConstant {
	
	
	menu11("精彩预告",11),
	menu12("往期精选",12),
	menu21("反馈建议",21),
	menu22("我要投稿",22),
	menu31("活动专区",31);
	
	public String name;
    public int value;
    private WeiXinConstant(String name, int value) {
        this.name = name;
        this.value = value;
    }
}
