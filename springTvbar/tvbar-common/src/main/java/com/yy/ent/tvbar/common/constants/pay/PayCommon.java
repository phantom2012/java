package com.yy.ent.tvbar.common.constants.pay;

public class PayCommon {

	public enum CommonSetting {
		APP_ID("117"),															// appId
		KEY("0EaOnTPDl72cUh7F"),												// 支付密码
		PAY_URL("https://payplf-gate-test.yy.com/pay.do"),						// 支付url
		NOTIFY_URL("http://idol.yy.com/idol/pay/notifyAfterPay.action"),		// 服务器异步通知页面路径
		RETURN_URL("http://idol.yy.com/idol/pay/returnAfterPay.action"),			// 页面跳转同步通知页面路径
		QUERY_URL("https://payplf-gate-test.yy.com/query.do"),					// 订单查询url
		REFUND_URL("https://payplf-gate-test.yy.com/refund.do")				// 退款url
		;

		private String value;
		private CommonSetting(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}

	}

	public enum PayReqParam{
		APP_ID("appId"),					// 业务ID
		SIGN("sign"),						// 签名
		DATA("data");						// 数据集合 json格式

		private String value;
		private PayReqParam(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}

		public enum Data{
			APP_ORDER_ID("appOrderId"),  		// 业务订单号
			AMOUNT("amount"),		   			// 金额
			UNIT("unit"),			   			// 单位
			CHID("chId"),			   			// 支付渠道
			BANK_ID("bankId"),		   			// 银行ID
			PAY_METHOD("payMethod"),	   		// 支付渠道下的网关代码
			APP_ORDER_TIME("appOrderTime"),		// 支付请求时间
			PROD_ID("prodId"),					// 产品ID
			PROD_NAME("prodName"),				// 产品名称
			PROD_DESC("prodDesc"),				// 产品描述
			PROD_ADDIINFO("prodAddiInfo"),		// 产品附加信息
			RETURN_URL("returnUrl"),			// 页面跳转同步通知页面路径
			NOTIFY_URL("notifyUrl"),			// 服务器异步通知页面路径
			USER_IP("userIp"),					// 用户 IP
			USER_ID("userId"),					// 用户 ID json格式 当使用了优惠券或者是通用支付 页面时，是必填字段，而且必须包含”yyuid”属性
			USER_NAME("userName"),				// 用户名称
			USER_CONTACT("userContact"),		// 用户联系方式 json格式
			USER_ADDI_INFO("userAddiInfo"),		// 用户的附加信息 json格式
			CARD_NUM("cardNum"),				// 卡支付的卡号 多个卡号使用~分开
			CARD_TOTAL_AMOUNT("cardTotalAmount"),// 卡支付的总金额
			YY_OPER("yyOper"),					// 是否对 Y 币账户操作
			YY_AMOUNT("yyAmount"),				// Y 币充值额度
			AUTOR_EDIRECT("autoRedirect"),		// 是否自动跳转
			COUPONS("coupons"),					// 优惠券列表 多个优惠券用~分开
			ORI_AMOUNT("oriAmount");			// 原始总金额

			private String value;
			private Data(String value){
				this.value = value;
			}
			public String value() {
				return value;
			}

			public enum UserId {
				YYUID("yyuid");

				private String value;
				private UserId(String value){
					this.value = value;
				}
				public String value() {
					return value;
				}
			}
		}
	}

	public enum PayResParam{
		APP_ID("appId"),					// 业务ID
		SIGN("sign"),						// 签名
		DATA("data");						// 数据集合 json格式

		private String value;
		private PayResParam(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}

		public enum Data{
			STATUS_CODE("statusCode"),  		// 状态码
			STATUS_MSG("statusMsg"),		   	// 状态描述
			PAY_URL("payUrl");			   		// 第三方支付地址 如果未设置 autoRedirect 为 true， 业务系统自行为用户打开该地址

			private String value;
			private Data(String value){
				this.value = value;
			}
			public String value() {
				return value;
			}
		}
	}

	public enum ReturnCallBackParam {
		APP_ID("appId"),					// 业务ID
		SIGN("sign"),						// 签名
		DATA("data");						// 数据集合 json格式

		private String value;
		private ReturnCallBackParam(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}

		public enum Data{
			STATUS_CODE("statusCode"),  			// 状态码
			STATUS_MSG("statusMsg"),		   		// 状态描述
			APP_ORDER_ID("appOrderId");			   	// 业务订单号

			private String value;
			private Data(String value){
				this.value = value;
			}
			public String value() {
				return value;
			}
		}
	}

	public enum QueryReqParam{
		APP_ID("appId"),					// 业务ID
		SIGN("sign"),						// 签名
		DATA("data");						// 数据集合 json格式

		private String value;
		private QueryReqParam(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}

		public enum Data{
			APP_ORDER_ID("appOrderId");			   	// 业务订单号

			private String value;
			private Data(String value){
				this.value = value;
			}
			public String value() {
				return value;
			}
		}
	}

	public enum QueryResParam{
		APP_ID("appId"),					// 业务ID
		SIGN("sign"),						// 签名
		DATA("data");						// 数据集合 json格式

		private String value;
		private QueryResParam(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}

		public enum Data{
			STATUS_CODE("statusCode"),  			// 状态码
			STATUS_MSG("statusMsg"),		   		// 状态描述
			APP_ORDER_ID("appOrderId");			   	// 业务订单号

			private String value;
			private Data(String value){
				this.value = value;
			}
			public String value() {
				return value;
			}
		}
	}

	public enum RefundReqParam{
		APP_ID("appId"),					// 业务ID
		SIGN("sign"),						// 签名
		DATA("data");						// 数据集合 json格式

		private String value;
		private RefundReqParam(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}

		public enum Data{
			APP_ORDER_ID("appOrderId"),
			/** 格式：“yyyyMMddHHmmss” **/
			APP_REFUND_TIME("appRefundTime"),
			/** 精确到小数点后两位 **/
			REFUND_AMOUNT("refundAmount"),
			REFUND_DESC("refundDesc"),
			/** 默认为空，如果该订单的支付不是发生在支付平台，那么应设置为“Y” **/
			ORPHAN_REFUND("orphanRefund"),
			CH_DEAL_ID("chDealId"),
			CH_ID("chId"),
			BANK_ID("bankId"),
			PAY_METHOD("payMethod"),
			USER_IP("userIp"),
			NOTIFY_URL("notifyUrl")
			;
			private String value;
			private Data(String value){
				this.value = value;
			}
			public String value() {
				return value;
			}
		}
	}

	public enum RefundResParam{
		APP_ID("appId"),					// 业务ID
		SIGN("sign"),						// 签名
		DATA("data");						// 数据集合 json格式

		private String value;
		private RefundResParam(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}

		public enum Data{
			STATUS_CODE("statusCode"),  		// 状态码
			STATUS_MSG("statusMsg")		   	// 状态描述
			;
			private String value;
			private Data(String value){
				this.value = value;
			}
			public String value() {
				return value;
			}
		}
	}

	public enum PayChannel {
		/** 支付宝  */
		ZFB("Zfb"),
		/** 银联wap支付 */
		UNIONPAY("Unionpay"),
		/** Y币余额支付 */
		YB("Yb")
		;

		private String value;
		private PayChannel(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}
	}

	public enum PayMethod {
		/** 银行直连 */
		GATE("Gate"),
		/** 余额支付 */
		BALANCE("Balance"),
		/** 支付宝客户端支付 **/
		WAPAPP("WapApp"),
		/** 支付宝移动Wap页支付 **/
		WAPALIPAY("WapAlipay"),
		/** 银联Wap页支付 **/
		WAP("Wap")
		;

		private String value;
		private PayMethod(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}
	}

	public enum StatusCode {
		CODE_SUCCESS,						// 操作成功
		CODE_FAIL,							// 操作失败
		CODE_DATA_ERROR,					// 请求数据错误，如 yyuid 为空
		CODE_UNKNOWN,						// 未知错误
		CODE_SECURE_ERROR,					// 安全错误，如签名错误
		CODE_DATA_FORMAT_ERROR,				// 请求数据格式错误，如 data 为不合法的 json 数据
		CODE_APP_INFO_ERROR,				// 业务信息错误，如业务不存在或被禁用
		CODE_REQ_ERROR,						// 请求错误
		CODE_CHANNEL_INFO_ERROR,			// 渠道信息错误
		CODE_CHANNEL_CONN_ERROR,			// 外部网络连接错误
		CODE_CHANNEL_ERROR,					// 第三方渠道发生错误
		CODE_INTERNAL_ERROR,				// 内部错误
		CODE_UNKNOWN_ERROR,					// 未知错误
		CODE_CONN_ERROR,					// 对外连接错误
		CODE_ORDER_NOT_EXIST,				// 订单号不存在
		CODE_COUPON_INVALID,				// 优惠券无效
		CODE_COUPON_UNMATCH,				// 优惠券不能使用在该产品 ID
		CODE_COUPON_EXPIRED,				// 优惠券过期
		CODE_REPAYED_YB,					// 已用 Y 币补偿
		CODE_CHANNEL_PAYED,					// 渠道处支付成功，尚未完成后续处理，比如优惠券的扣除

		CODE_PENDING,						// 支付中

		CODE_REFUND_PENDING,				// 退款请求成功
		CODE_REFUND_SUCCESS,				// 退款成功
		CODE_REFUND_FAIL					// 退款失败
		;
	}

	public enum HttpCommonSymbol {
		QUESTION_MARK("?"),
		AND("&"),
		EQUAL("=")
		;
		private String value;
		private HttpCommonSymbol(String value){
			this.value = value;
		}
		public String value() {
			return value;
		}
	}

}
