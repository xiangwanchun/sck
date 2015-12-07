/*
****滚动条
	父层必须给个class scrollparent,要滚动的层必须加个class overscroll,另外可以再加一个class来调用如user
	可选参数change_tag:".classname"，就是点击某个标签时会改变滚动层的宽高
	$(".user").showScroll({change_tag:".classname"});
*/
(function($){
	/*
	各种操作引起的是否显示树形滚动条
	传入点击的展开显示class如：change_tag:".classname"
	*/
	$.fn.showScroll = function(options) {
		var defaults = {
			change_tag: ' ',
			comw: 7,
			background: "#c3c3c3",
			objright: "5px"
		};
		this.each(function() {
			var opts = $.extend(defaults, options),
			childhei,
			childwidth,
			mainh = this.offsetHeight,
			mainw = this.offsetWidth,
			childbox = $(this).children(".overscroll"),
			changeid = opts.change_tag,
			comw = opts.comw,
			back_color = opts.background,
			right = opts.objright;
			if (childbox.size() == 0) {
				return;
			}
			var verh, vern, horw, horn
			var versrcoll, horisrcoll;
			childhei = childbox.get(0).offsetHeight;
			childwidth = childbox.get(0).offsetWidth;
			var methods = {
				/*初始化垂直方向的滚动条*/
				init: function(obj) {
					$(obj).children("span.verscroll_line").remove();
					$(obj).children("span.horiscroll_line").remove();
					if (childhei > mainh && $(obj).children("span.verscroll_line").size() == 0) {
						verh = childhei / mainh;
						vern = ((mainh - 10) / verh) < 50 ? 50 : ((mainh - 10) / verh);
						methods.createveLine(obj, vern);

					}
					/*初始化水平方向的滚动条*/
					if (childwidth > mainw && $(obj).children("span.horiscroll_line").size() == 0) {
						horw = childwidth / mainw;
						horn = mainw / horw;
						methods.createhorLine(obj, horn);

					}
				},
				/*创建垂直滚动条*/
				createveLine: function(obj, size) {
					versrcoll = document.createElement("span");
					versrcoll.className = "verscroll_line";
					versrcoll.style.display = "inline-block";
					versrcoll.style.cursor = "pointer";
					versrcoll.style.borderRadius = "5px";
					versrcoll.style.width = comw + "px";
					versrcoll.style.height = size + "px";
					versrcoll.style.minHeight = "50px";
					versrcoll.style.position = "absolute";
					versrcoll.style.top = "5px";
					versrcoll.style.right = right;
					versrcoll.style.backgroundColor = back_color;
					obj.appendChild(versrcoll);
					var martop = Math.abs(parseFloat(childbox.css("margin-top")));
					if (martop > 0) {
						versrcoll.style.top = martop * size / mainh + "px";
						$(obj).find(".verscroll_line").animate({
							"top": martop * size / mainh + "px"
						});
					}
				},
				/*创建水平滚动条*/
				createhorLine: function(obj, size) {
					horisrcoll = document.createElement("span");
					horisrcoll.className = "horiscroll_line";
					horisrcoll.style.display = "inline-block";
					horisrcoll.style.cursor = "pointer";
					horisrcoll.style.height = comw + "px";
					horisrcoll.style.width = size + "px";
					horisrcoll.style.borderRadius = "5px";
					horisrcoll.style.position = "absolute";
					horisrcoll.style.left = "5px";
					horisrcoll.style.bottom = "5px";
					horisrcoll.style.backgroundColor = back_color;

					obj.appendChild(horisrcoll);
					var marLeft = Math.abs(parseFloat(childbox.css("margin-left")));
					if (marLeft) {
						$(obj).find(".horiscroll_line").animate({
							"margin-left": marLeft * size / mainw + "px"
						});
					}

				},
				/*点击节点改变滚动条的高度和宽度*/
				changeline: function(obj) {

					/*改变垂直滚动条*/
					childhei = obj.children(".overscroll").get(0).offsetHeight;
					mainh = obj.get(0).offsetHeight;
					mainw = obj.get(0).offsetWidth;
					childwidth = obj.children(".overscroll").get(0).offsetWidth;
					if (obj.children("span.verscroll_line").size() == 0) {
						if (childhei <= mainh) {
							return;
						}
						verh = childhei / mainh;
						//vern=mainh/verh;
						vern = (mainh / verh) < 50 ? 50 : (mainh / verh);
						methods.createveLine(obj.get(0), vern);
					} else {
						var hei1 = childhei;
						childhei = obj.children(".overscroll").get(0).offsetHeight;
						if (childhei <= mainh) {
							$(obj).children("span.verscroll_line").remove();
							return;
						}
						var cha = childhei - hei1,
						pretop = parseFloat(versrcoll.style.top);
						verh = childhei / mainh;
						vern = mainh / verh;
						versrcoll.style.height = vern + "px";
						versrcoll.style.top = pretop - cha + "px";
					}
					/*改变水平滚动条*/
					if (obj.children("span.horiscroll_line").size() == 0) {

						if (childwidth <= mainw) {
							return;
						}
						horw = childwidth / mainw;
						horn = mainw / horw;
						methods.createhorLine(obj.get(0), horn);
					} else {
						var width1 = childwidth;
						childwidth = obj.children(".overscroll").get(0).offsetWidth;
						if (childwidth <= mainw) {
							obj.children("span.horiscroll_line").remove();
							return;
						}
						var cha = childwidth - width1,
						preleft = parseFloat(horisrcoll.style.left);
						horw = childwidth / mainw;
						horn = mainw / horw;
						horisrcoll.style.width = vern + "px";
						horisrcoll.style.left = preleft - cha + "px";
					}
				},
				/*拖动滚动条*/
				mousefun: function(obj, event) {
					mainh = $(obj).parent().get(0).offsetHeight;
					var e = event || window.event,
					child = $(obj).parent().children(".overscroll");
					if (e.preventDefault) {
						e.preventDefault(),
						e.stopPropagation();
					} else {
						e.returnValue = false,
						e.cancelBubble = true;
					}
					if (obj.setCapture) {
						obj.setCapture();
					} else if (window.captureEvents) {
						window.captureEvents(event.mousemove | event.mouseup);
					}
					var clientx = event.clientX,
					clienty = event.clientY;
					var elobj = e.srcElement || e.target,
					elem = elobj.className;
					var pretop = parseFloat(elobj.style.top) || 0,
					preleft = parseFloat(elobj.style.left) || 0;
					document.onmousemove = function(event) {
						var event = event || window.event
						var nowclientx = event.clientX,
						nowclienty = event.clientY;
						if (elem == "verscroll_line") {
							var nowtop = pretop + (nowclienty - clienty);
							if (nowtop <= 5) {
								child.css("margin-top", "0px");
								return;
							} else if (nowtop + elobj.offsetHeight >= mainh - 15) {
								child.css("margin-top", -(childhei - mainh + 5) + 'px');
								return;
							}
							elobj.style.top = nowtop + "px";
							var newmar = nowtop * childhei / mainh;
							child.css("margin-top", -newmar + "px");
						}
						if (elem == "horiscroll_line") {
							var nowleft = preleft + (nowclientx - clientx);
							if (nowleft <= 5) {
								child.css("margin-left", "0px");
								return;
							} else if (nowleft + elobj.offsetWidth >= mainw - 15) {
								child.css("margin-left", -(childwidth - mainw + 5) + 'px');
								return;
							}
							elobj.style.left = nowleft + "px";
							var newmar = nowleft * childwidth / mainw;
							child.css("margin-left", -newmar + "px");
						}
					}
					document.onmouseup = function() {
						if (!obj) return;
						if (obj.setCapture) {
							obj.releaseCapture();
						} else if (window.captureEvents) {
							window.captureEvents(event.mousemove | event.mouseup);
						}
						document.onmousemove = null;
						document.onmouseup = null;
					}
					return false;
				},
				/*滚轮滚动*/
				mouseScroll: function(obj, event) {

					mainh = $(obj).get(0).offsetHeight;
					childhei = childbox.get(0).offsetHeight;
					childwidth = childbox.get(0).offsetWidth;
					verh = childhei / mainh;
					vern = ((mainh - 10) / verh) < 50 ? 50 : ((mainh - 10) / verh);
					if ($(obj).children("span.verscroll_line").size() == 0) {
						return;
					}
					var versrcoll = $(obj).children("span.verscroll_line").get(0);
					versrcoll.style.height = vern + 'px';
					var margin_top = parseFloat(childbox.get(0).style.marginTop) || 0;
					var top = parseInt($(obj).children("span.verscroll_line").get(0).style.top) || 0;
					var sroollh = $(obj).children("span.verscroll_line").get(0).offsetHeight;
					var direct = 0;
					var event = event || window.event;
					if (event.wheelDelta) { //IE/Opera/Chrome
						direct = event.wheelDelta / 120;
					} else if (event.detail) { //Firefox
						direct = event.detail / 120;
					}
					//向下滚动
					if (direct < 0) {

						if (top + sroollh >= (mainh - 20)) {

							childbox.css("margin-top", -(childhei - mainh + 5) + 'px');
							versrcoll.style.top = (mainh - vern - 5) + 'px';
							return;
						} else {
							margin_top = margin_top - 5;
							childbox.css("margin-top", margin_top + "px");
							versrcoll.style.top = Math.abs(margin_top) * mainh / childhei + "px";
						}
					}
					//向上滚动
					if (direct > 0) {
						if (top <= 10) {
							childbox.css("margin-top", 0);
							return;
						} else {
							margin_top = margin_top + 10;
							childbox.css("margin-top", margin_top + "px");
							versrcoll.style.top = Math.abs(margin_top) * mainh / childhei + "px";
						}
					}
				}
			};
			methods.init(this);
			var that = this;	
			/*窗口变换时滚动条对应消失 显示*/
			$(window).resize(function(){
				$(that).children("span.verscroll_line").remove();
				$(that).children("span.horiscroll_line").remove();
				mainh = that.offsetHeight,
				mainw = that.offsetWidth,
				childbox = $(that).children(".overscroll"),
				childhei = childbox.get(0).offsetHeight,
				childwidth = childbox.get(0).offsetWidth;

				childbox.css("margin-top", 0);
				if (childhei > mainh ) {
					verh = childhei / mainh;
					vern = ((mainh - 10) / verh) < 50 ? 50 : ((mainh - 10) / verh);
					methods.createveLine(that, vern);

					}
				/*初始化水平方向的滚动条*/
				if (childwidth > mainw) {
					horw = childwidth / mainw;
					horn = mainw / horw;
					methods.createhorLine(that, horn);

				}
			})


			this.addEventListener("DOMMouseScroll",
			function(event) {
				methods.mouseScroll(that, event)
			},
			false);
			this.addEventListener("mousewheel",
			function(event) {
				methods.mouseScroll(that, event)
			},
			false);
			$(changeid).unbind("click");
			$(changeid).bind("click",
			function() {
				var parent = $(this).parent();
				while (parent.get(0).className.indexOf("scrollparent") == -1) {
					parent = parent.parent();
				}
				setTimeout(function() {
					methods.changeline(parent);
				},
				500);

			});
			$("span", this).live("mousedown",
			function(event) {
				methods.mousefun(this, event);
			});
		});
	}
	/*
	* 参数e为出发事件的对象 如:$('.demo');
	* 调用 $.smartScroll($('.demo'));
	*/
	  $.extend({ smartScroll : function(obj){
        var _this = obj instanceof jQuery ? obj : $(obj),
            _thisPositionTop = _this.position().top,
            _thisPositionLeft = _this.position().left,
            childhei,
            parents = _this.parents('.scrollparent').eq(0),
            mainH = parents.outerHeight(),
            mainW = parents.outerWidth(),
            scrollBox = parents.children(".overscroll"),
            scrollBoxH = scrollBox.outerHeight(true),
            scrollBoxW = scrollBox.outerWidth(true),
            scrollBox_offsetT = Math.abs( parseInt( scrollBox.css('marginTop') ) ),
	        scrollBox_offsetL = Math.abs( parseInt( scrollBox.css('marginLeft') ) ),
	        versrcoll =parents.children(".verscroll_line"),//竖向
	        horiscroll = parents.children(".horiscroll_line");//横向

        if(scrollBoxH > mainH || scrollBoxW > mainW ){
            var verh=scrollBoxH/mainH,
                vern=((mainH-10)/verh)<50? 50 : ((mainH-10)/verh),
                horw = scrollBoxW/mainW,
                horn = ((mainW-10)/horw)<50? 50 : ((mainW-10)/horw);
            //竖向滚动条
            if(scrollBoxH > mainH  && versrcoll.length){
                var newscrollBox_offsetT = scrollBox_offsetT + _thisPositionTop;

                //判断剩余的部分是否够可视区的高度
                if (newscrollBox_offsetT <= mainH/2 ) {
                    scrollBox_offsetT = 0;
                    scrollBox.animate({'marginTop':0});
                }else if(scrollBoxH - newscrollBox_offsetT >= mainH || _this.outerHeight() >= mainH){
                    scrollBox_offsetT = newscrollBox_offsetT;
                    scrollBox.animate({'marginTop':'-' + newscrollBox_offsetT + 'px'});
                }else{
                    scrollBox_offsetT = scrollBoxH - mainH;
                    scrollBox.animate({'marginTop':'-' + ( scrollBoxH - mainH ) + 'px'});
                }

                versrcoll.css({
                    'top' : ((scrollBox_offsetT*vern/mainH)+5) + 'px',
                    'height' : vern+"px"
                });

            }else{
                parents.showScroll();
            }

            //横向滚动条
            if(scrollBoxW > mainW  && horiscroll.length){
                horiscroll.css({
                    'width' : horn+"px"
                });
            }else{
                setTimeout(function() {
						parents.showScroll();
					},
					500);
            }
            if(scrollBoxH <= mainH){
            	parents.children(".overscroll").css("margin-top",0);
            	versrcoll.remove();
            }
            /*console.log('mainW : '+mainW);
             console.log('scrollBoxW : '+scrollBoxW);*/
            if( scrollBoxW <= mainW){
            	parents.children(".overscroll").css("margin-left",0);
            	horiscroll.remove();
            }

        }else{
            parents.children(".overscroll").css({"margin-top":0,"margin-left":0});
            versrcoll.remove();
            horiscroll.remove();
        }

	 }
	});

	$.fn.returnColumn=function(options){
		 var defaults = {    
			click_id : "",
			childbox : ".overscroll"
		  };  
		this.each(function(){
			var opts = $.extend(defaults, options),
				childhei,
				mainh=this.offsetHeight,
				childbox=$(this).children(".overscroll"),
				clickid=opts.click_id,
				versrcoll=$(this).children("span.verscroll_line").get(0);
				childhei=childbox.get(0).offsetHeight;
			if(!versrcoll){
				return;
			}
			var parentnode=document.getElementById(clickid).offsetParent,parentHei=document.getElementById(clickid).offsetTop;
			var martop=Math.abs( parseFloat(childbox.get(0).style.marginTop)) ||0;
			if(parentHei>martop+mainh){
				var c=parentHei-martop-mainh,cn=Math.ceil(c/mainh);
				if(cn<1){
					var newt=martop+c/2;
				}
				else{
					var newt=martop+mainh*cn;
				}
				childbox.css("margin-top",-newt+"px");
				versrcoll.style.top=newt*mainh/childhei+"px";
			}
		});
	}
	
})(jQuery)





