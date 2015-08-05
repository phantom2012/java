package com.yy.ent.tvbar.common.constants.admin;

/**
 * @author HuangJunHua
 *
 */
public class AdminConstants {

	/**
	 * 机构首次录入页面
	 */
//	public static final String ENTER_URL = "admin/agen/agency_enter.jsp" ;
	public static final String ENTER_URL = "admin/agen/serve-item.jsp" ;
	
	/**
	 * 机构非首次录入页面
	 */
	public static final String EDIT_URL = "admin/agen/agency_edit.jsp" ;
	
	/**
	 * 机构经典案例录入页面
	 */
	public static final String CASE_URL = "admin/agen/agency_case.jsp" ;
	
	public static final String COMPANY_STATUS_NAME = "company_status_name" ;
	
	/**
	 * 机构收入进入后台，即将录入信息
	 */
	public static final int COMPANY_STATUS0 = 0 ;
	
	/**
	 * 机构已经录入完公司简介 ，下一步将录入服务项目
	 */
	public static final int COMPANY_STATUS1 = 1 ;
	
	/**
	 * 机构已经录入完服务项目 ，下一步将录入经典案例
	 */
	public static final int COMPANY_STATUS2 = 2 ;
	
	/**
	 * 机构已经录入完经典案例 ，下一步将生成设置首页
	 */
	
	public static final int COMPANY_STATUS3 = 3 ;
	
	/**
	 * 在生成设置首页tab中点击了保存 这个状态也就是收入录入成功，并处于发布状态，外网前端界面可以看到刚录入的内容
	 */	
	public static final int COMPANY_STATUS4 = 4 ;
	/** 正常状态,可用于聚合页首页展示及生成机构对应静态html首页*/
	public static final int COMPANY_NORMAL = COMPANY_STATUS4 ;
	
	/**
	 * 机构退出了yy平台了，这个状态下，前端是不现实这个机构的任何内容了
	 */	
	public static final int COMPANY_STATUS5 = 5 ;
	
	/**
	 * 公司封禁后的状态
	 */
	public static final int COMPANY_STATUS6 = 6 ;
	
	public static final long DEFAULTORDERID = 0 ;
	
	public static final int CASEIMGTYPE = 1 ;
	/**
	 * 正常的服务项目状态
	 */
	public static final long DEFAULTSERVICESTATUS = 0 ;
	
	public static final String COMPANYIDNAME = "company_id" ;
	
	public static final String SERVICEIDNAME = "service_id" ;
	
	public static final long VEDIOTYPE = 0 ;
	
	public static final long IMGTYPE = 1 ;
	
	public static final byte PUSH_STATUS_SUCCESS = 0 ;
	
	public static final byte PUSH_STATUS_FAIL = 1 ;
	
	//作品类型
	public final static int WORK_TYPE_MUSIC = 0;
    public final static int WORK_TYPE_VEDIO = 1;
	
	/**
	 * 删除服务项目时需要置成的状态
	 */
	public static final long DELETESERVICESTATUS = 1 ;
	
	public static final String RE_PAR_COMPANYID = "com.yy.ageny.companyId" ;
	
	public static class sqlOperation {
		
		public static final String QUERYCOMPANYJOINADMIN = "queryCompanyJoinAdmin" ;
		
		public static final String QUERYSERVICEJOINCONTENTPRICE = "queryServiceJoinContentPrice" ;
		
	}
	
	
}
