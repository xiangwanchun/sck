/*
 * smartMenu.js 智能上下文菜单插件
 * http://www.zhangxinxu.com/
 *
 * Copyright 2011, zhangxinxu
 *
 *updata 本插件经过 憧憬 2次修改
 *修改了与ztree配合实现右键功能,以及改变了右键模板,事件指向
 */
 
(function($) {
	var D = $(document).data("func", {});	
	$.smartMenu = $.noop;
	$.fn.smartMenu = function(data, options) {
		var B = $("body"), defaults = {
			name: "",
			offsetX: 2,
			offsetY: 2,
			textLimit: 6,
			ztree:'',
			beforeShow: $.noop,
			afterShow: $.noop
		};
		var params = $.extend(defaults, options || {});
		
		var htmlCreateMenu = function(datum) {
			var dataMenu = datum || data, nameMenu = datum? Math.random().toString(): params.name, htmlMenu = "", htmlCorner = "", clKey = "smart_menu_";
			if ($.isArray(dataMenu) && dataMenu.length) {
				htmlMenu = '<div id="smartMenu_'+ nameMenu +'" class="'+ clKey +'box">' +
								'<div class="'+ clKey +'body">' +
									'<ul class="'+ clKey +'ul">';
									
				$.each(dataMenu, function(i, arr) {
					if (i) {
						htmlMenu = htmlMenu + '<li class="'+ clKey +'li_separate">&nbsp;</li>';	
					}
					
					if ($.isArray(arr)) {
						$.each(arr, function(j, obj) {
							var text = obj.text, htmlMenuLi = "", strTitle = "", rand = Math.random().toString().replace(".", ""),iconClass = obj.iconClass || '',wrapW =obj.width ? obj.width+'px' : 'auto' ;
							if (text) {
								if (text.length > params.textLimit) {
									text = text.slice(0, params.textLimit)	+ "…";
									strTitle = ' title="'+ obj.text +'"';
								}
								if ($.isArray(obj.data) && obj.data.length) {
									htmlMenuLi = '<li class="'+ clKey +'li" data-hover="true" style="width:'+wrapW+'">' + htmlCreateMenu(obj.data) +
										'<a href="javascript:" class="'+ clKey +'a"'+ strTitle +' data-key="'+ rand +'"><i class="'+ clKey +'icon bg_icon '+iconClass
											+'"></i><i class="'+ clKey +'triangle"></i>'+ text +'</a>' + 
									'</li>';
								} else {
									htmlMenuLi = '<li class="'+ clKey +'li" style="width:'+wrapW+'">' +
										'<a href="javascript:" class="'+ clKey +'a"'+ strTitle +' data-key="'+ rand +'">'
											+' <i class="'+ clKey +'icon bg_icon '+iconClass
											+'"></i>'
											+ text +'</a>' + 
									'</li>';
								}
								
								htmlMenu += htmlMenuLi;
								
								var objFunc = D.data("func");
								objFunc[rand] = obj.func;
								D.data("func", objFunc);								
							}
						});	
					}
				});
				
				htmlMenu = htmlMenu + '</ul>' +
									'</div>' +
								'</div>';
			}
			return htmlMenu;
		}, funSmartMenu = function() {
			var idKey = "#smartMenu_", clKey = "smart_menu_", jqueryMenu = $(idKey + params.name);
			
			//如果没有创建
			if (!jqueryMenu.size()) {
				$("body").append(htmlCreateMenu());
				
				//事件
				$(idKey + params.name +" a").bind("click", function() {
					var key = $(this).attr("data-key"),
						callback = D.data("func")[key];

					if ($.isFunction(callback)) {
						if(params.ztree){
							callback.call(D.data("trigger"),params.ztree);
						}else{
							callback.call(D.data("trigger"));
						}
							
					}
					$.smartMenu.remove();
					return false;
				});

				

				$(idKey + params.name +" li").each(function() {
					var isHover = $(this).attr("data-hover"), clHover = clKey + "li_hover";
					$(this).hover(function() {
						var jqueryHover = $(this).siblings("." + clHover);
						jqueryHover.removeClass(clHover).children("."+ clKey +"box").hide();
						jqueryHover.children("."+ clKey +"a").removeClass(clKey +"a_hover");
						/*给当前放上去的a标签加上hover类*/
						$(this).siblings().children("."+ clKey +"a").removeClass(clKey +"a_hover");
						if (isHover) {						
							$(this).addClass(clHover).children("."+ clKey +"box").show();
							$(this).children("."+ clKey +"a").addClass(clKey +"a_hover");	
						}else{
							$(this).children("."+ clKey +"a").addClass(clKey +"a_hover");

						}
						
					});
					
				});
				return $(idKey + params.name);
			} 
			return jqueryMenu;
		};

		$(this).each(function() {
			if(params.ztree){
				rmenu(params.ztree.event,true);
			}else{
				this.oncontextmenu = rmenu;
			};
			function rmenu(e,isZtree){
				//回调
				if ($.isFunction(params.beforeShow)) {
					params.beforeShow.call(this);	
				}
				e = e || window.event;
				//阻止冒泡
				e.cancelBubble = true;
				if (e.stopPropagation) {
					e.stopPropagation();
				}
				//隐藏当前上下文菜单，确保页面上一次只有一个上下文菜单
				$.smartMenu.hide();
				var st = D.scrollTop();
				var jqueryMenu = funSmartMenu();
				if (jqueryMenu) {
					var l = ($(window).width() - e.clientX) < jqueryMenu.width() ? (e.clientX - jqueryMenu.width()) : e.clientX;
					var t = ($(window).height() - e.clientY) < jqueryMenu.height() ? (e.clientY - jqueryMenu.height()) : e.clientY;
					jqueryMenu.css({
						display: "block",
						left: l,
						top: t
					});
					D.data("target", jqueryMenu);

					//如果是ztree上的右键
					if(isZtree){
						D.data("trigger", $(e.target));
					}else{
						D.data("trigger", this);
					}
					
					//回调
					if ($.isFunction(params.afterShow)) {
						params.afterShow.call(this);	
					}
					return false;
				}
			};
		});
		if (!B.data("bind")) {
			B.bind("click", $.smartMenu.hide).data("bind", true);
		}
	};
	$.extend($.smartMenu, {
		hide: function(){
			var target = D.data("target");
			if (target && target.css("display") === "block") {
				target.hide();
			}		
		},
		remove: function() {
			var target = D.data("target");
			if (target) {
				target.remove();
			}
		}
	});
})(jQuery);