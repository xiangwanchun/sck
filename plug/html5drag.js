/*
* html5drag 为html5拖动插件
* Date: 2015-05-18
* chongjing
*/
;(function($){
	$.html5drag = $.noop;
	$.fn.html5drag = function(options){
		var defaults = {
			 'oDrag'  : '.package_choose li',//被拖放盒子
			 'oDragCur': '.package_cur',//拖动当前元素对应的class
			 'oDrop'  : '#package_c',//目标盒子id
			 'collectionImg' : '',//批量拖动时的背景图
			 'iSrepeat': ['ctype','cid']//判断目标盒子里面相应元素是否存在,需传数组形式
		} 
		var _this = $(this);
		var dataInput = [];
		return this.each(function(){
			var opts = $.extend({},defaults,options);
			var aLi = $('li',_this);
			var oDrop = document.getElementById(opts.oDrop.slice(1));			
			oDrop.style.border = '2px dashed transparent';
			for(var i=0,len = aLi.length;i<len;i++){
				
				aLi[i].ondragstart = function(ev){

					ev = ev || window.event;
					$(this).hasClass('package_cur') ? '' : $(this).addClass('package_cur').siblings('li').removeClass('package_cur');
					oDrop.style.borderColor = '#95C8F1';

					if(!$(opts.oDrop).find('p.drag_prompt_txt').length){
						$(opts.oDrop).append('<p class="drag_prompt_txt">请将选择的文件拖到此区域</p>');
						$('.drag_prompt_txt').css({
									'color':'#999',
									'zIndex':'99',
									'position':'absolute',
									'top':'50%',
									'textAlign':'center',
									'width':'100px',
									'left':'50%',
									'marginLeft':'-50px',
									'fontSize':'14px',
									'backgroundColor':'#fff'})
					}else{
						$('.drag_prompt_txt').html('请将选择的文件拖到此区域');
					}
					
					ev.dataTransfer.effectAllowed = 'copyMove';
					ev.dataTransfer.setData('type',1);
					ev.dataTransfer.setDragImage(this,10,10);
				};

				aLi[i].ondragend = function(ev){
					oDrop.style.borderColor = 'transparent';
					ev = ev || window.event;
					$('.drag_prompt_txt').html('');
				};
			}
			
			oDrop.ondragenter = function(ev){
				ev = ev || window.event;
				$('.drag_prompt_txt').html('请释放鼠标');
			}
			oDrop.ondragover = function(ev){
				ev = ev || window.event;
				ev.preventDefault();
			};
			oDrop.dragleave = function(ev){
				ev = ev || window.event;
				$('.drag_prompt_txt').html('请将选择的文件拖到此区域');
			}
			
			oDrop.ondrop = function(ev){
				ev = ev || window.event;
				$('.drag_prompt_txt').html('');
				oDrop.style.borderColor = 'transparent';

				var sType = ev.dataTransfer.getData('type');
				var package_cur = $(opts.oDrag+opts.oDragCur).eq(0);
				var iSrepeatData = {} ; //判断是否重复数组
				var iSrepeatCompareData = {} ; //判断是否重复数组
				//获取节点待比较数据
				package_cur.each(function(i){
					iSrepeatData[i] = {}
					var _this = $(this);
					$.each(opts.iSrepeat,function(j,val){
						iSrepeatData[i][val]= _this.attr(val);
					})
				});
				//获取目标节点比较数据集
				$('ul li',oDrop).each(function(i){
					iSrepeatCompareData[i] = {}
					var _this = $(this);
					$.each(opts.iSrepeat,function(j,val){
						iSrepeatCompareData[i][val] = _this.attr(val);
					})
				})
				//比较待比较数据和比较数据集 看看是否存在
				package_cur.each(function(i){
					var _this = this;
						_this.num = 0
					$('ul li',oDrop).each(function(j){
						var __this = this ;
						__this.num = 0;
						var cur = iSrepeatData[i],
						compare = iSrepeatCompareData[j];
						$.each(opts.iSrepeat,function(k,val){
							var ___this = this;
							if(cur[val] == compare[val]){
								__this.num++;
							}
							
						})
						if(__this.num == opts.iSrepeat.length){
							_this.num  = __this.num;
						}
					})

					if(_this.num != opts.iSrepeat.length){
						$(this).clone().appendTo($('ul',oDrop));
						$('ul li',oDrop).attr('draggable',false);
						var value = {};
						var that = $(this);
						$.each(opts.iSrepeat,function(k,val){
							value[val] = that.attr(val);
						})
						dataInput.push(value);
					}else{
						
						alert('已有重复数据');
					}
					
				})
				
				if(ev.preventDefault){
				   ev.preventDefault(),
				   ev.stopPropagation();
				}else{
				   ev.returnValue=false,
				   ev.cancelBubble=true;                                                        
				} 

				
			};

			$.extend($.html5drag, {
				/*
				* 外部取得拖动的数据
				*/
				getInputData : function(){
					return  dataInput;
				}
			})
		
	   }) /*this.each End*/
	}/*html5drag End*/
})(jQuery)

/*
* 调用本插件,其中$('.package_choose')为被拖动元素父级元素
* $('.package_choose').html5drag();
* 外部取得拖动的数据
* $.html5drag.getInputData() 调用该方法
*/

