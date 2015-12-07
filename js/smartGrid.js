/*
 * smartGrid.js 智能表格插件
 *
 * Copyright 2015, 憧憬
 *
 * 2015-04-16 Beta 1.0	编写
 */

(function($) {
	var D = $(document).data("func", {});	
	$.smartGrid = $.noop;
	$.fn.smartGrid = function( options,data) {
		var _this = $(this);
		var defaults = {
			name: "",
			url: "", //异步请求后台url
        	dataType: "json", //返回数据格式
        	mType: "GET",     //http 请求方法
        	colModel : "",   //列信息描述
        	jsonReader : {
        		"data":'',
            	"currentPage" : '1',//当前页
            	"totalPages" : '',//总页数
            	"totalRecords" : '',//查询出的记录数
            	"repeatitems": false
        	}, //分页数据
			offsetX: 2,//右键x方向偏移位置
			offsetY: 2,//右键y方向偏移位置
			textLimit: 6,//右键显示字数长度
			templateName:"",//模板名称
			postData :{},//自定义参数
    		pager: ".pager",//分页盒子ID
    		rowNum: 10,//行数
    		height: 450,//表格高度
			beforeShow: $.noop,
			afterShow: $.noop
		};
		var params = $.extend(defaults, options || {});
		
		/**
		*初始化表格
		*/
		var init = function(){
			ajaxData(true);
		};

		/**
		*服务器端请求数据
		*/
		var ajaxData = function(isLoadMeter,requestParameters){
			var data = '';
			//回调
			if ($.isFunction(params.beforeShow)) {
				params.beforeShow.call();	
			}
			$.each(params.postData,function(k,v){
					data += k + '=' + v + '&';
				});	
			data += 'currentPage=' + params.jsonReader.currentPage + '&rowNum=' + params.rowNum;
			
			if(requestParameters){
				data += '&' + requestParameters;
			}
			$.ajax({
				url : params.url,
				dataType : params.dataType,
				type : params.mType,
				data : data,
				success:function(data1){
					$.extend(params.jsonReader, data1 || {});
					htmlCreateTable(isLoadMeter);
					if(params.jsonReader.currentPage == 1){
						tPage();
					}
				}
			})
		}

		/**
		* 创建表格
		* isLoadMeter判断是不是第一次初始化
		* 可选值为true和false
		* true表示需要加载表头,false表示不加载表头
		*/
		var htmlCreateTable = function(isLoadMeter){
			//渲染模板
			if(isLoadMeter){
				var thead_html = params.templateName.thead({
					data : params.colModel
			    });
			    var tbody_html = params.templateName.tbody({
					data : params.jsonReader.data
		    	});
		    	_this.html('');
			    _this.prepend(thead_html+tbody_html);
			}else{
				var tbody_html = params.templateName.tbody({
					data : params.jsonReader.data
		    	});
		    	$('tbody',_this).remove();
			    $('thead',_this).after(tbody_html);
			}
			//回调
			if ($.isFunction(params.afterShow)) {
				params.afterShow.call(this,params.jsonReader.totalRecords);	
			}
		};

		/**
		*分页处理
		*/
		var tPage = function(){
			if(params.pager){
				var pagerData = params.jsonReader;
				
				//调用分页插件
				laypage({
				    cont: $(params.pager), //容器。值支持id名、原生dom对象，jquery对象,
				    pages: pagerData.totalPages, //总页数
				    skip: true, //是否开启跳页
				    skin: 'xcontent',
				    curr: pagerData.currentPage,
				    groups: 4, //连续显示分页数,
				    jump: function(obj, first){
					    //得到了当前页，用于向服务端请求对应数据
					    var curr = obj.curr;
					    params.jsonReader.currentPage = curr;
					    if(!first){
					    	ajaxData();
					    }
					}
			});
			}
		}

		init();
		
		$.extend($.smartGrid, {

			//支持用户设置外部自定义参数
			//data必须为json数据
			setGridParam : function(data){
				$.extend(params.postData, data);
			},

			/**
			*支持用户调用，重新加载列表
			*isLoadMeter可选值为true或者false
			*true表示重新加载整个表格,false表示只加载tbody
			*data表示可以传的插件初始化参数
			*/
			reload : function(isLoadMeter, data){
				$.extend(params,data);
				ajaxData(isLoadMeter);
			},

			/**
			*支持用户调用，清除设置参数（支持到可根据具体key删除)
			*delkey参数可选
			*不传参数则全部清空postData,否则删除传入的key
			*eg: $.smartGrid.clear('name');则删除params.postData.name
			*/
			clear : function(delkey){

				if(delkey){
					if(params.postData[delkey]){
						delete params.postData[delkey];
						return true;
					}else{
						return false;
					}
				}else{
					params.postData = '';
					return true;
				}
					
				
			},

			/**
			*支持用户获取设置的参数(支持到可根据具体key获取)
			*getKey 参数可选
			*如果传了getKey则获取对应的一级Key对应的值
			*不传则返回params.postData对应的数据
			*/
			getGridParam : function(getKey){	

				if(getKey){
					return params.postData[getKey];
				}else{
					return params.postData;
				}	

			},

			/**
			* 返回用户选中行数据
			* 必须 需要返回选中行的自定义,传入格式为一个数组
			* 不传参数会直接返回false
			* eq: $.smartGrid.getSelectedRows(['getkey','getkey1']);
			*/
			getSelectedRows : function(getKey){
				var checkedTr = [];

				if(getKey){
					var getKeyLen =  getKey.length;
					$('tbody tr.tr_cur_click',_this).each(function(i){
					var key = {};

					for(j =0;j<getKeyLen;j++){
						key[getKey[j]] = $(this).attr(getKey[j]);	
					}
					checkedTr.push(key);

					})
					return checkedTr;
				}else{
					return false;
				}

				
			}
				
		});

	}

	
})(jQuery);