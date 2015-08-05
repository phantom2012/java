/**
 * 下拉组件 usage:$(XXX).agencySelect(options)
 * 
 * @dependency:jquery
 * @author:suzhihua
 */
(function($){
//init事件
$(document).ready(function() {
	$(document).click(function() {
		$(".agencySelect-main").hide();
	});
});
	// 对象级别
	$.fn.extend({
		/**
		 * 选择控件
		 * 
		 * @param options:name生成隐藏域input
		 *            name默认为agencySelect,
		 *            initCodes:初始化选项code,maxLimit:限定最多多少项0为无限,
		 *            type:类型city=城市下拉,data:数据,type/data优先选用data
		 *            splits按字母分组,默认为['A-F','G-J','K-N','O-W','X-Z']
		 *            itemClick(code)为点击事件,clearClick(code)为点击清除事件,allClearClick为点击清除所有事件
		 */
		agencySelect : function(options) {
			$(this).each(function(index){
				//init data/options
				var $this = $(this);
				var $title=$this;
				$this.attr("readonly","readonly");
				var settings = {type:'city',initCodes:'',maxLimit:0,name:'agencySelect',splits:['A-F','G-J','K-N','O-W','X-Z'],itemClick:function(code){},clearClick:function(code){},allClearClick:function(){}};
				$.extend(settings, options);
				var data=settings.data;
				if(!data){
					data=$.agencyData[settings.type];
				}
				//main
				var $main=$('<div class="agencySelect-main city-select-box"></div>');
				var oldArray;
				//点击隐藏
				$this.click(function(e) {
					if ($main.css("display") == 'none') {
						oldArray=[];
						var $old=$("[name='"+settings.name+"']",$selected);
						$old.each(function(i,e){oldArray.push($(e).val())});
						
						$(".agencySelect-main").hide();
						$main.show();
						$main.css({top:($this.position().top+$this.outerHeight()-1)+'px',left:($this.position().left+0)+'px'});
					} else {
						$main.hide();
					}
					e.stopPropagation();
				});
				$main.mouseout(function(){
					$title.blur();
				});
				$main.click(function(e) {
					e.stopPropagation();
				});
				//头
				var tip=settings.maxLimit>0 ? ('(最多选择'+settings.maxLimit+'个)') : '';
				$main.append("<div class='agencySelect-header title'>请选择"+tip+"</div>")
				//main body
				var $body=$("<div class='agencySelect-body'></div>");
				$main.append($body);
				//脚选择
				var $footer=$("<div class='agencySelect-footer selected'></div>");
				$main.append($footer);
				$footer.append("<p>已选择:</p>");
				var $selected=$("<div class='agencySelect-selected selected-list'></div>");
				$footer.append($selected);
				var $clear=$("<div class='selected-list agencySelect-clear'><a href='javascript:void(0)' class='clear'>[清空] </a></div>");
				$footer.append($clear);
				var $btns=$("<div class='agencySelect-btn btn-con'><a href='javascript:void(0)' class='btn' _id='agencySelect-sure-btn'>确定 </a> <a href='javascript:void(0)' class='btn' _id='agencySelect-cancel-btn'>取消</a></div>");
				$footer.append($btns);
				//tab
				var $tab=$("<div class='agencySelect-tab tab'></div>");
				$body.append($tab);
				var $hot=$('<a href="javascript:void(0)" class="active">热门</a>');
				$tab.append($hot);
				for (var i = 0; i < settings.splits.length; i++) {
					var between=settings.splits[i];
					if(between.length!=3){
						continue;
					}
					var min=between.charCodeAt(0);
					var max=between.charCodeAt(2);
					var array=[];
					for(var j=min;j<=max;j++){
						array.push(String.fromCharCode(j));
					}
					$tab.append('<a href="javascript:void(0)">'+array.join('')+"</a>");
				}
				var $ulbody=$("<div class='agencySelect-tab-div city-list'></div>");
				$body.append($ulbody);
				//热门
				var $ultab=$("<ul class='agencySelect-tab-body city-con'></ul>");
				$ulbody.append($ultab);
				for (var j = 0; j < data.length; j++) {
					if(data[j].h==1){
						$ultab.append("<li code='"+data[j].c+"'><span><input type='checkbox'></span>"+data[j].n+"</li>");
					}
				}
				//按字母排列选项
				for (var i = 0; i < settings.splits.length; i++) {
					var between=settings.splits[i];
					if(between.length!=3){
						continue;
					}
					var min=between.charCodeAt(0);
					var max=between.charCodeAt(2);
					var $ultab=$("<ul class='agencySelect-tab-body city-con'></ul>");
					$ulbody.append($ultab);
					for (var j = 0; j < data.length; j++) {
						var num=data[j].l.charCodeAt(0);
						if(num<=max&&num>=min){
							$ultab.append("<li code='"+data[j].c+"'><span><input type='checkbox'></span>"+data[j].n+"</li>");
						}
					}
				}
				
				//event
				$tab.find("a").click(function(){
					var $this=$(this);
					var index=$this.index();
					$tab.find("a").removeClass('active');
					$this.addClass('active');
					var $tmp=$ulbody.find("ul");
					$tmp.removeClass('active');
					$tmp.eq(index).addClass('active');
				});
				//更新展示已选择的
				var updateTitle=function($this){
					var array=[];
					$selected.find("span").each(function(){
						var $this=$(this);
						array.push($this.attr("name"));
					});
					$title.val(array.join(","));
				}
				//具体选项
				$ulbody.find("li").click(function(){
					var $this=$(this);
					var code=$this.attr('code');
					//已选择的变为不选择
					if($selected.find("span[value='"+code+"']").size()>=1){
						$ulbody.find("li[code='"+code+"']").find("input[type='checkbox']").attr('checked',false);
						$selected.find("*[value='"+code+"']").remove();
						updateTitle();
						if(settings.clearClick){
							settings.clearClick(code);
						}
						return;
					}else{
						var code=$this.attr("code");
						if($selected.find("span").size()>=settings.maxLimit){
							$ulbody.find("li[code='"+code+"']").find("input[type='checkbox']").attr('checked',false);
//							if ($.messagebox) {
//			                    $.messagebox({type: "error", msg: 11});
//			                } else {
//			                    alert(11);
//			                }
							return;
						}
						$ulbody.find("li[code='"+code+"']").find("input[type='checkbox']").attr('checked',true);
						var $li=$("<span class='city' value='"+code+"' name='"+$this.text()+"'>"+$this.text()+"<em class='delete'></em></span>");
						$selected.append($li);
						$selected.append("<input type='hidden' name='"+settings.name+"' value='"+code+"'/>");
						updateTitle();
						$li.click(function(){
							var $this=$(this);
							var value=$this.attr("value");
							$ulbody.find("li[code='"+value+"']").get(0).click();
						});
						
					}
					
					if(settings.itemClick){
						settings.itemClick(code);
					}
				});
				
				//清空按键
				$clear.click(function(){
					$ulbody.find("li input[type='checkbox']").attr('checked',false);
					$selected.html('');
					$title.val('');
					if(settings.allClearClick){
						settings.allClearClick();
					}
				});
				
				//确定,取消按键
				$btns.find("a").click(function(){
					var $this=$(this);
					var id=$this.attr("_id");
					if("agencySelect-sure-btn"==id){
						$main.hide();
						$title.blur();
					}else if("agencySelect-cancel-btn"==id){
						$clear.click();
						init(oldArray.join(','));
						$main.hide();
						$title.blur();
					}
				});
				
				function init(initCodes){
					var array=initCodes.split(",");
					var uniq={};
					for(var i=0;i<array.length;i++){
						if(!uniq[array[i]]){
							uniq[array[i]]=1;
							var li=$ulbody.find("li[code='"+array[i]+"']");
							if(li.size()>0){
								li.get(0).click();
							}
						}
					};
				}
				//init展示界面
				$this.after($main);
				$hot.click();
				init(settings.initCodes);
				
			});
		}
	});
	
	var city=[
	          /*c:代码,n:城市名字,l:首家母,h:是否热门城市1为是**/
	         {c:"110100",n:"北京",l:"B",h:1},
	         {c:"120100",n:"天津",l:"T",h:1},
	         {c:"130100",n:"石家庄",l:"S",h:0},
	         {c:"130200",n:"唐山",l:"T",h:0},
	         {c:"130300",n:"秦皇岛",l:"Q",h:0},
	         {c:"130400",n:"邯郸",l:"H",h:0},
	         {c:"130500",n:"邢台",l:"X",h:0},
	         {c:"130600",n:"保定",l:"B",h:0},
	         {c:"130700",n:"张家口",l:"Z",h:0},
	         {c:"130800",n:"承德",l:"C",h:0},
	         {c:"130900",n:"沧州",l:"C",h:0},
	         {c:"131000",n:"廊坊",l:"L",h:0},
	         {c:"131100",n:"衡水",l:"H",h:0},
	         {c:"140100",n:"太原",l:"T",h:0},
	         {c:"140200",n:"大同",l:"T",h:0},
	         {c:"140300",n:"阳泉",l:"Y",h:0},
	         {c:"140400",n:"长治",l:"C",h:0},
	         {c:"140500",n:"晋城",l:"J",h:0},
	         {c:"140600",n:"朔州",l:"S",h:0},
	         {c:"140700",n:"晋中",l:"J",h:0},
	         {c:"140800",n:"运城",l:"Y",h:0},
	         {c:"140900",n:"忻州",l:"X",h:0},
	         {c:"141000",n:"临汾",l:"L",h:0},
	         {c:"141100",n:"吕梁",l:"L",h:0},
	         {c:"150100",n:"呼和浩特",l:"H",h:0},
	         {c:"150200",n:"包头",l:"B",h:0},
	         {c:"150300",n:"乌海",l:"W",h:0},
	         {c:"150400",n:"赤峰",l:"C",h:0},
	         {c:"150500",n:"通辽",l:"T",h:0},
	         {c:"150600",n:"鄂尔多斯",l:"E",h:0},
	         {c:"150700",n:"呼伦贝尔",l:"H",h:0},
	         {c:"150800",n:"巴彦淖尔",l:"B",h:0},
	         {c:"150900",n:"乌兰察布",l:"W",h:0},
	         {c:"152200",n:"兴安",l:"X",h:0},
	         {c:"152500",n:"锡林郭勒",l:"X",h:0},
	         {c:"152900",n:"阿拉善",l:"A",h:0},
	         {c:"210100",n:"沈阳",l:"S",h:0},
	         {c:"210200",n:"大连",l:"D",h:1},
	         {c:"210300",n:"鞍山",l:"A",h:0},
	         {c:"210400",n:"抚顺",l:"F",h:0},
	         {c:"210500",n:"本溪",l:"B",h:0},
	         {c:"210600",n:"丹东",l:"D",h:0},
	         {c:"210700",n:"锦州",l:"J",h:0},
	         {c:"210800",n:"营口",l:"Y",h:0},
	         {c:"210900",n:"阜新",l:"F",h:0},
	         {c:"211000",n:"辽阳",l:"L",h:0},
	         {c:"211100",n:"盘锦",l:"P",h:0},
	         {c:"211200",n:"铁岭",l:"T",h:0},
	         {c:"211300",n:"朝阳",l:"C",h:0},
	         {c:"211400",n:"葫芦岛",l:"H",h:0},
	         {c:"220100",n:"长春",l:"C",h:0},
	         {c:"220200",n:"吉林",l:"J",h:0},
	         {c:"220300",n:"四平",l:"S",h:0},
	         {c:"220400",n:"辽源",l:"L",h:0},
	         {c:"220500",n:"通化",l:"T",h:0},
	         {c:"220600",n:"白山",l:"B",h:0},
	         {c:"220700",n:"松原",l:"S",h:0},
	         {c:"220800",n:"白城",l:"B",h:0},
	         {c:"222400",n:"延边朝鲜族",l:"Y",h:0},
	         {c:"230100",n:"哈尔滨",l:"H",h:0},
	         {c:"230200",n:"齐齐哈尔",l:"Q",h:0},
	         {c:"230300",n:"鸡西",l:"J",h:0},
	         {c:"230400",n:"鹤岗",l:"H",h:0},
	         {c:"230500",n:"双鸭山",l:"S",h:0},
	         {c:"230600",n:"大庆",l:"D",h:0},
	         {c:"230700",n:"伊春",l:"Y",h:0},
	         {c:"230800",n:"佳木斯",l:"J",h:0},
	         {c:"230900",n:"七台河",l:"Q",h:0},
	         {c:"231000",n:"牡丹江",l:"M",h:0},
	         {c:"231100",n:"黑河",l:"H",h:0},
	         {c:"231200",n:"绥化",l:"S",h:0},
	         {c:"232700",n:"大兴安岭",l:"D",h:0},
	         {c:"310100",n:"上海",l:"S",h:1},
	         {c:"320100",n:"南京",l:"N",h:1},
	         {c:"320200",n:"无锡",l:"W",h:0},
	         {c:"320300",n:"徐州",l:"X",h:0},
	         {c:"320400",n:"常州",l:"C",h:0},
	         {c:"320500",n:"苏州",l:"S",h:0},
	         {c:"320600",n:"南通",l:"N",h:0},
	         {c:"320700",n:"连云港",l:"L",h:0},
	         {c:"320800",n:"淮安",l:"H",h:0},
	         {c:"320900",n:"盐城",l:"Y",h:0},
	         {c:"321000",n:"扬州",l:"Y",h:0},
	         {c:"321100",n:"镇江",l:"Z",h:0},
	         {c:"321200",n:"泰州",l:"T",h:0},
	         {c:"321300",n:"宿迁",l:"S",h:0},
	         {c:"330100",n:"杭州",l:"H",h:1},
	         {c:"330200",n:"宁波",l:"L",h:0},
	         {c:"330300",n:"温州",l:"W",h:0},
	         {c:"330400",n:"嘉兴",l:"J",h:0},
	         {c:"330500",n:"湖州",l:"H",h:0},
	         {c:"330600",n:"绍兴",l:"S",h:0},
	         {c:"330700",n:"金华",l:"J",h:0},
	         {c:"330800",n:"衢州",l:"Q",h:0},
	         {c:"330900",n:"舟山",l:"Z",h:0},
	         {c:"331000",n:"台州",l:"T",h:0},
	         {c:"331100",n:"丽水",l:"L",h:0},
	         {c:"340100",n:"合肥",l:"H",h:0},
	         {c:"340200",n:"芜湖",l:"W",h:0},
	         {c:"340300",n:"蚌埠",l:"B",h:0},
	         {c:"340400",n:"淮南",l:"H",h:0},
	         {c:"340500",n:"马鞍山",l:"M",h:0},
	         {c:"340600",n:"淮北",l:"K",h:0},
	         {c:"340700",n:"铜陵",l:"T",h:0},
	         {c:"340800",n:"安庆",l:"A",h:0},
	         {c:"341000",n:"黄山",l:"H",h:0},
	         {c:"341100",n:"滁州",l:"C",h:0},
	         {c:"341200",n:"阜阳",l:"F",h:0},
	         {c:"341300",n:"宿州",l:"S",h:0},
	         {c:"341400",n:"巢湖",l:"C",h:0},
	         {c:"341500",n:"六安",l:"L",h:0},
	         {c:"341600",n:"亳州",l:"H",h:0},
	         {c:"341700",n:"池州",l:"C",h:0},
	         {c:"341800",n:"宣城",l:"X",h:0},
	         {c:"350100",n:"福州",l:"F",h:1},
	         {c:"350200",n:"厦门",l:"X",h:1},
	         {c:"350300",n:"莆田",l:"P",h:0},
	         {c:"350400",n:"三明",l:"S",h:0},
	         {c:"350500",n:"泉州",l:"Q",h:0},
	         {c:"350600",n:"漳州",l:"Z",h:0},
	         {c:"350700",n:"南平",l:"N",h:0},
	         {c:"350800",n:"龙岩",l:"L",h:0},
	         {c:"350900",n:"宁德",l:"L",h:0},
	         {c:"360100",n:"南昌",l:"N",h:0},
	         {c:"360200",n:"景德镇",l:"J",h:0},
	         {c:"360300",n:"萍乡",l:"P",h:0},
	         {c:"360400",n:"九江",l:"J",h:0},
	         {c:"360500",n:"新余",l:"X",h:0},
	         {c:"360600",n:"鹰潭",l:"Y",h:0},
	         {c:"360700",n:"赣州",l:"G",h:0},
	         {c:"360800",n:"吉安",l:"J",h:0},
	         {c:"360900",n:"宜春",l:"Y",h:0},
	         {c:"361000",n:"抚州",l:"F",h:0},
	         {c:"361100",n:"上饶",l:"S",h:0},
	         {c:"370100",n:"济南",l:"J",h:1},
	         {c:"370200",n:"青岛",l:"Q",h:1},
	         {c:"370300",n:"淄博",l:"Z",h:0},
	         {c:"370400",n:"枣庄",l:"Z",h:0},
	         {c:"370500",n:"东营",l:"D",h:0},
	         {c:"370600",n:"烟台",l:"Y",h:0},
	         {c:"370700",n:"潍坊",l:"W",h:0},
	         {c:"370800",n:"济宁",l:"J",h:0},
	         {c:"370900",n:"泰安",l:"T",h:0},
	         {c:"371000",n:"威海",l:"W",h:0},
	         {c:"371100",n:"日照",l:"R",h:0},
	         {c:"371200",n:"莱芜",l:"L",h:0},
	         {c:"371300",n:"临沂",l:"L",h:0},
	         {c:"371400",n:"德州",l:"D",h:0},
	         {c:"371500",n:"聊城",l:"L",h:0},
	         {c:"371600",n:"滨州",l:"B",h:0},
	         {c:"371700",n:"菏泽",l:"H",h:0},
	         {c:"410100",n:"郑州",l:"Z",h:1},
	         {c:"410200",n:"开封",l:"K",h:0},
	         {c:"410300",n:"洛阳",l:"L",h:0},
	         {c:"410400",n:"平顶山",l:"P",h:0},
	         {c:"410500",n:"安阳",l:"A",h:0},
	         {c:"410600",n:"鹤壁",l:"H",h:0},
	         {c:"410700",n:"新乡",l:"X",h:0},
	         {c:"410800",n:"焦作",l:"J",h:0},
	         {c:"410900",n:"濮阳",l:"P",h:0},
	         {c:"411000",n:"许昌",l:"X",h:0},
	         {c:"411100",n:"漯河",l:"L",h:0},
	         {c:"411200",n:"三门峡",l:"S",h:0},
	         {c:"411300",n:"南阳",l:"N",h:0},
	         {c:"411400",n:"商丘",l:"Q",h:0},
	         {c:"411500",n:"信阳",l:"X",h:0},
	         {c:"411600",n:"周口",l:"Z",h:0},
	         {c:"411700",n:"驻马店",l:"Z",h:0},
	         {c:"420100",n:"武汉",l:"W",h:1},
	         {c:"420200",n:"黄石",l:"H",h:0},
	         {c:"420300",n:"十堰",l:"S",h:0},
	         {c:"420500",n:"宜昌",l:"Y",h:0},
	         {c:"420600",n:"襄阳",l:"S",h:0},
	         {c:"420700",n:"鄂州",l:"E",h:0},
	         {c:"420800",n:"荆门",l:"J",h:0},
	         {c:"420900",n:"孝感",l:"X",h:0},
	         {c:"421000",n:"荆州",l:"J",h:0},
	         {c:"421100",n:"黄冈",l:"H",h:0},
	         {c:"421200",n:"咸宁",l:"X",h:0},
	         {c:"421300",n:"随州",l:"S",h:0},
	         {c:"422800",n:"恩施",l:"E",h:0},
	         {c:"430100",n:"长沙",l:"C",h:1},
	         {c:"430200",n:"株洲",l:"Z",h:0},
	         {c:"430300",n:"湘潭",l:"X",h:0},
	         {c:"430400",n:"衡阳",l:"H",h:0},
	         {c:"430500",n:"邵阳",l:"S",h:0},
	         {c:"430600",n:"岳阳",l:"Y",h:0},
	         {c:"430700",n:"常德",l:"C",h:0},
	         {c:"430800",n:"张家界",l:"Z",h:0},
	         {c:"430900",n:"益阳",l:"Y",h:0},
	         {c:"431000",n:"郴州",l:"C",h:0},
	         {c:"431100",n:"永州",l:"Y",h:0},
	         {c:"431200",n:"怀化",l:"H",h:0},
	         {c:"431300",n:"娄底",l:"L",h:0},
	         {c:"433100",n:"湘西",l:"X",h:0},
	         {c:"440100",n:"广州",l:"G",h:1},
	         {c:"440200",n:"韶关",l:"S",h:0},
	         {c:"440300",n:"深圳",l:"S",h:1},
	         {c:"440400",n:"珠海",l:"Z",h:0},
	         {c:"440500",n:"汕头",l:"S",h:0},
	         {c:"440600",n:"佛山",l:"F",h:0},
	         {c:"440700",n:"江门",l:"J",h:0},
	         {c:"440800",n:"湛江",l:"Z",h:0},
	         {c:"440900",n:"茂名",l:"M",h:0},
	         {c:"441200",n:"肇庆",l:"S",h:0},
	         {c:"441300",n:"惠州",l:"H",h:0},
	         {c:"441400",n:"梅州",l:"M",h:0},
	         {c:"441500",n:"汕尾",l:"S",h:0},
	         {c:"441600",n:"河源",l:"H",h:0},
	         {c:"441700",n:"阳江",l:"Y",h:0},
	         {c:"441800",n:"清远",l:"Q",h:0},
	         {c:"441900",n:"东莞",l:"D",h:0},
	         {c:"442000",n:"中山",l:"Z",h:0},
	         {c:"445100",n:"潮州",l:"C",h:0},
	         {c:"445200",n:"揭阳",l:"J",h:0},
	         {c:"445300",n:"云浮",l:"Y",h:0},
	         {c:"450100",n:"南宁",l:"N",h:0},
	         {c:"450200",n:"柳州",l:"L",h:0},
	         {c:"450300",n:"桂林",l:"G",h:0},
	         {c:"450400",n:"梧州",l:"W",h:0},
	         {c:"450500",n:"北海",l:"B",h:0},
	         {c:"450600",n:"防城港",l:"F",h:0},
	         {c:"450700",n:"钦州",l:"Q",h:0},
	         {c:"450800",n:"贵港",l:"G",h:0},
	         {c:"450900",n:"玉林",l:"Y",h:0},
	         {c:"451000",n:"百色",l:"B",h:0},
	         {c:"451100",n:"贺州",l:"H",h:0},
	         {c:"451200",n:"河池",l:"C",h:0},
	         {c:"451300",n:"来宾",l:"L",h:0},
	         {c:"451400",n:"崇左",l:"S",h:0},
	         {c:"460100",n:"海口",l:"H",h:0},
	         {c:"460200",n:"三亚",l:"S",h:1},
	         {c:"460300",n:"三沙",l:"S",h:0},
	         {c:"500100",n:"重庆",l:"C",h:1},
	         {c:"510100",n:"成都",l:"C",h:1},
	         {c:"510300",n:"自贡",l:"Z",h:0},
	         {c:"510400",n:"攀枝花",l:"P",h:0},
	         {c:"510500",n:"泸州",l:"L",h:0},
	         {c:"510600",n:"德阳",l:"D",h:0},
	         {c:"510700",n:"绵阳",l:"M",h:0},
	         {c:"510800",n:"广元",l:"G",h:0},
	         {c:"510900",n:"遂宁",l:"S",h:0},
	         {c:"511000",n:"内江",l:"N",h:0},
	         {c:"511100",n:"乐山",l:"L",h:0},
	         {c:"511300",n:"南充",l:"N",h:0},
	         {c:"511400",n:"眉山",l:"M",h:0},
	         {c:"511500",n:"宜宾",l:"Y",h:0},
	         {c:"511600",n:"广安",l:"G",h:0},
	         {c:"511700",n:"达州",l:"D",h:0},
	         {c:"511800",n:"雅安",l:"Y",h:0},
	         {c:"511900",n:"巴中",l:"B",h:0},
	         {c:"512000",n:"资阳",l:"Z",h:0},
	         {c:"513200",n:"阿坝",l:"A",h:0},
	         {c:"513300",n:"甘孜",l:"G",h:0},
	         {c:"513400",n:"凉山",l:"L",h:0},
	         {c:"520100",n:"贵阳",l:"G",h:0},
	         {c:"520200",n:"六盘水",l:"L",h:0},
	         {c:"520300",n:"遵义",l:"Z",h:0},
	         {c:"520400",n:"安顺",l:"A",h:0},
	         {c:"522200",n:"铜仁",l:"T",h:0},
	         {c:"522300",n:"黔西南",l:"Q",h:0},
	         {c:"522400",n:"毕节",l:"B",h:0},
	         {c:"522600",n:"黔东南",l:"Q",h:0},
	         {c:"522700",n:"黔南",l:"Q",h:0},
	         {c:"530100",n:"昆明",l:"K",h:1},
	         {c:"530300",n:"曲靖",l:"Q",h:0},
	         {c:"530400",n:"玉溪",l:"Y",h:0},
	         {c:"530500",n:"保山",l:"B",h:0},
	         {c:"530600",n:"昭通",l:"S",h:0},
	         {c:"530700",n:"丽江",l:"L",h:0},
	         {c:"530800",n:"普洱",l:"P",h:0},
	         {c:"530900",n:"临沧",l:"L",h:0},
	         {c:"532300",n:"楚雄",l:"Q",h:0},
	         {c:"532500",n:"红河",l:"H",h:0},
	         {c:"532600",n:"文山",l:"W",h:0},
	         {c:"532800",n:"西双版纳",l:"X",h:0},
	         {c:"532900",n:"大理",l:"D",h:0},
	         {c:"533100",n:"德宏",l:"D",h:0},
	         {c:"533300",n:"怒江",l:"N",h:0},
	         {c:"533400",n:"迪庆",l:"D",h:0},
	         {c:"540100",n:"拉萨",l:"L",h:0},
	         {c:"542100",n:"昌都",l:"C",h:0},
	         {c:"542200",n:"山南",l:"S",h:0},
	         {c:"542300",n:"日喀则",l:"R",h:0},
	         {c:"542400",n:"那曲",l:"N",h:0},
	         {c:"542500",n:"阿里",l:"A",h:0},
	         {c:"542600",n:"林芝",l:"L",h:0},
	         {c:"610100",n:"西安",l:"X",h:1},
	         {c:"610200",n:"铜川",l:"T",h:0},
	         {c:"610300",n:"宝鸡",l:"B",h:0},
	         {c:"610400",n:"咸阳",l:"X",h:0},
	         {c:"610500",n:"渭南",l:"H",h:0},
	         {c:"610600",n:"延安",l:"Y",h:0},
	         {c:"610700",n:"汉中",l:"H",h:0},
	         {c:"610800",n:"榆林",l:"Y",h:0},
	         {c:"610900",n:"安康",l:"A",h:0},
	         {c:"611000",n:"商洛",l:"S",h:0},
	         {c:"620100",n:"兰州",l:"L",h:0},
	         {c:"620200",n:"嘉峪关",l:"J",h:0},
	         {c:"620300",n:"金昌",l:"J",h:0},
	         {c:"620400",n:"白银",l:"B",h:0},
	         {c:"620500",n:"天水",l:"T",h:0},
	         {c:"620600",n:"武威",l:"W",h:0},
	         {c:"620700",n:"张掖",l:"Z",h:0},
	         {c:"620800",n:"平凉",l:"P",h:0},
	         {c:"620900",n:"酒泉",l:"Q",h:0},
	         {c:"621000",n:"庆阳",l:"Q",h:0},
	         {c:"621100",n:"定西",l:"D",h:0},
	         {c:"621200",n:"陇南",l:"L",h:0},
	         {c:"622900",n:"临夏",l:"L",h:0},
	         {c:"623000",n:"甘南",l:"G",h:0},
	         {c:"630100",n:"西宁",l:"X",h:0},
	         {c:"632100",n:"海东",l:"H",h:0},
	         {c:"632200",n:"海北",l:"H",h:0},
	         {c:"632300",n:"黄南",l:"H",h:0},
	         {c:"632500",n:"海南藏族",l:"H",h:0},
	         {c:"632600",n:"果洛",l:"G",h:0},
	         {c:"632700",n:"玉树",l:"Y",h:0},
	         {c:"632800",n:"海西",l:"X",h:0},
	         {c:"640100",n:"银川",l:"Y",h:0},
	         {c:"640200",n:"石嘴山",l:"S",h:0},
	         {c:"640300",n:"吴忠",l:"W",h:0},
	         {c:"640400",n:"固原",l:"G",h:0},
	         {c:"640500",n:"中卫",l:"Z",h:0},
	         {c:"650100",n:"乌鲁木齐",l:"W",h:0},
	         {c:"650200",n:"克拉玛依",l:"K",h:0},
	         {c:"652100",n:"吐鲁番",l:"T",h:0},
	         {c:"652200",n:"哈密",l:"H",h:0},
	         {c:"652300",n:"昌吉",l:"C",h:0},
	         {c:"652700",n:"博尔塔拉",l:"B",h:0},
	         {c:"652800",n:"巴音郭楞",l:"B",h:0},
	         {c:"652900",n:"阿克苏",l:"A",h:0},
	         {c:"653000",n:"克孜勒苏柯尔克孜",l:"K",h:0},
	         {c:"653100",n:"喀什",l:"K",h:0},
	         {c:"653200",n:"和田",l:"H",h:0},
	         {c:"654000",n:"伊犁",l:"Y",h:0},
	         {c:"654200",n:"塔城",l:"T",h:0},
	         {c:"654300",n:"阿勒泰",l:"A",h:0}
	         ];
	var business=[
	          /*c:代码,n:城市名字,l:首家母,h:是否热门城市1为是**/
	         {c:"1",n:"音乐制作",l:"Y",h:1},
	         {c:"5",n:"造型拍摄",l:"Z",h:1} ,
	         {c:"2",n:"mv制作",l:"M",h:1} ,
	         {c:"6",n:"单曲+造型",l:"D",h:1}
//	         {c:"100002",n:"电影制作",l:"D",h:1},
//	         {c:"100003",n:"mv制作",l:"M",h:1},
//	         {c:"100004",n:"广告制作",l:"G",h:1},
//	         {c:"100005",n:"影视制作",l:"Y",h:1}
	         ]
	// 全局级别
	$.extend({
		/**
		 * 数据
		 */
		agencyData : {
			city:city,business:business
		},
		
		/**
		 * 转义为中文
		 * codes多个code用逗号划分
		 * type类型默认为city
		 * split返回的分隔符默认为逗号
		 */
		agencySelectFromCode:function(codes,type,split){
			if(!codes){return'';}
			if(!type){
				type='city';
			}
			if(!split){
				split=',';
			}
			var one=function(code,type){
				var data=$.agencyData[type];
				for (var j = 0; j < data.length; j++) {
					if(data[j].c==code){
						return data[j].n;
					}
				}
				return '未知类型';
			};
			var arr=codes.split(',');
			var result=[];
			for(var i=0;i<arr.length;i++){
				result.push(one(arr[i],type));
			}
			return result.join(split);
		}
		 ,
		    agencySelectFromName:function(names,type,split){
				if(!names){return'';}
				if(!type){
					type='city';
				}
				if(!split){
					split=',';
				}
				var one=function(name,type){
					var data=$.agencyData[type];
					for (var j = 0; j < data.length; j++) {
						if(data[j].n==name){
							return data[j].c;
						}
					}
					return '未知类型';
				};
				var arr=names.split(',');
				var result=[];
				for(var i=0;i<arr.length;i++){
					result.push(one(arr[i],type));
				}
				return result.join(split);
			}
		,
		agencySelectFiltByCode : function(codes,type,split){
			if(!codes){return'';}
			if(!type){
				type='city';
			}
			if(!split){
				split=',';
			}
			var data=$.agencyData[type];
			var subData = [] ;
			var arr=codes.split(',');
			for(var index in arr){
				for(var key in data){
                   if(arr[index] == data[key].c){
					   subData.push(data[key]) ;
					   break ;
				   }
				}
			}
			return subData ;
		}
	});
})(jQuery);

