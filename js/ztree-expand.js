var TcolModel = [
        {
            "name": "名称",
            "index": "title",
            "width": "40%",
            "sortable": "true"
        },
        {
            "name": "类型",
            "index": "type",
            "width": "20%",
            "sortable": "false",
            "optional": [
                 {
                    "name": "全部",
                    "value": "0"
                },
                {
                    "name": "视频",
                    "value": "1"
                },
                {
                    "name": "音频",
                    "value": "2"
                },
                {
                    "name": "图片",
                    "value": "3"
                },
                {
                    "name": "文本",
                    "value": "4"
                },
                {
                    "name": "包",
                    "value": "5"
                }
            ]
        },
        {
            "name": "状态",
            "index": "status",
            "width": "20%",
            "sortable": "false",
            "optional": [
                {
                    "name": "全部",
                    "value": "0"
                },
                {
                    "name": "已下发",
                    "value": "1"
                },
                {
                    "name": "已审核",
                    "value": "2"
                },
                {
                    "name": "未审核",
                    "value": "3"
                }
            ]
        },
        {
            "name": "时间",
            "index": "type",
            "width": "20%",
            "sortable": "false"
        },
        {
            "name": "操作人",
            "index": "type",
            "width": "20%",
            "sortable": "false"
        }
    ];

    /**
    * 视屏管理页面动态计算高度
    */
    var vmsH = {
        //主界面高度
        CalContentH : function (){
            var clientH = $(window).height();
            var locationBarH = $('.location-bar').outerHeight(true);
            var conFooterH = $('.con-footer').outerHeight(true);
            var conH = clientH - locationBarH - conFooterH;
            var tabbleH = conH - 28 - 35 -48;//46为pager盒子高度 35为表头 48为顶部批量删除按钮栏
            var rowsH = 36;//行高
            var a = tabbleH/rowsH;
            var rowsNum = Math.floor(tabbleH/rowsH);
            var tableData = [];
            var gridFooter = conH-(36*rowsNum)-35-48;
            tableData.push(tabbleH);
            tableData.push(rowsNum);
            $('.gridFooter').css('height',gridFooter+'px');
            $('.ztree-box').css('height',conH+'px');
            $('.cpk-box').css('height',conH+'px');
            $('.table-wrap').css('height',conH-48-gridFooter+'px');
            return tableData;
        },
        //包编辑界面高度
        packageH : function (){
            var windowH = $(window).height();
            var cpk_box = $('.cpk-box').outerHeight(true);
            var package_width = $('.package_section').outerWidth(true);
            var package_height = $('.package_section').outerHeight(true);
            var slider_btn_H = $('.slider_btn_wrap').outerHeight(true);
            var package_editor_nav_H = $('.package_editor_nav_wrap').outerHeight(true);
            var package_select_head_H = $('.package_select_head').outerHeight(true);
            var footer_btn=$('.package .footer_btn').outerHeight(true);
            /*计算包内容区高度*/ 
            $('.package_c').css('height',cpk_box-slider_btn_H-package_editor_nav_H-2);
            $('.package_ztree,.package_select_c_inner').css('height',cpk_box-slider_btn_H-package_select_head_H-2);
            $('.package_information').css('height',cpk_box-slider_btn_H-2);
            $('.package_information_inner').css('height',cpk_box-slider_btn_H-60-2)
        },
        //预览编辑界面高度
        previewH : function(){
            var clientH = $(window).height(); 
            var locationBarH = $('.location-bar').outerHeight(true);
            var previewH = clientH - locationBarH;
           $('.sliderLayer_r_fullScreen').css({'height':previewH,'top':locationBarH+1});
           $('.sliderLayer_fullScreen_c').css('height',previewH-68);
           $('.sliderLayer_r').css('height',previewH-68);
        },
        //文本编辑框自适应宽度
        editorW : function(){
            var editMainW = $('.edit-content-main').width(); 
            var editMainW = editMainW >= 850 ? 850 : editMainW; 

            if($('#edui1').length){
                $('#edui1').css('width',editMainW);
            }else{
                var ue = UE.getEditor('editor');
                $('#editor').css('width',editMainW);
            }

        }
    }

    $(window).resize(function(){
        var tableData = vmsH.CalContentH();
        
        if(!$('.package').is(':hidden')){
           vmsH.packageH();
        }
        vmsH.previewH(); 
        if( typeof $.smartGrid.reload == 'function'){
            $.smartGrid.reload(false,{
                height: tableData[0],
                rowNum : tableData[1]
            });
        }

        vmsH.editorW();
        
    });
    
var ztreeExpand = {
    first : {
        OnClick : true, //主界面ztree
        moveOnClick : true //移动至ztree
    }, //判断是都首次加载
    //动态计算ztree宽度,看是否需要加载横向滚动条
    horiscrollW : function(event, treeId, treeNode,w){
        var treeLiW = w || 118,
        oTree = $('#'+treeId),
        treeW = $('#'+treeId).width(),
        _this = $('#'+treeNode.tId+'_a', oTree),
        _thisW = _this.outerWidth(),
        _thisPositionL = _this.position().left,
        newTreeW = _thisPositionL+_thisW;
        newTreeW >= treeW ? oTree.css('width',
            (_thisW+10) > treeLiW ? treeLiW+_thisPositionL+10 : newTreeW+_thisPositionL
            ) : oTree.css('width',newTreeW);
        console.log(111111);
   /*     console.log('treeW'+treeW);
        console.log('treeLiW'+treeLiW);*/
        console.log('_thisW:treeW  '+_thisW + ':' + treeW);
        console.log('_thisPositionL:'+_thisPositionL);
       /* console.log('newTreeW:'+newTreeW);*/
    },
	/**
	*右键操作
	*/
	OnRightClick : function(event, treeId, treeNode){
        /*con_batch_nav.showSection();*/
        con_batch_nav.popLayerHide();
		//节点数据为空&&事件标签名不为button&&父辈元素中没有a标签
		if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
			zTree.cancelSelectedNode();
		} else if (treeNode && !treeNode.noR) {
			$(this).smartMenu(cpkLmData, {
				name: "ztreeMenu", 
				ztree:{
					  	'event' : event,
						'treeId': treeId, 
						'treeNode': treeNode
					}
			});
		}
	},
    beforeClick : function(treeId, treeNode, clickFlag){
        if(treeNode.parentTId == null){
            return false;
        }else{
            return true;
        } 
    },
	OnClick : function(event, treeId, treeNode){
        con_batch_nav.showSection();
        con_batch_nav.popLayerHide();
        con_batch_nav.preViewClose();
        ztreeExpand.horiscrollW(event, treeId, treeNode);

        var tableData = vmsH.CalContentH();
		$('.cpk-box-t').smartGrid({
            name:'aa1',
            url:'data.php',
            colModel : TcolModel,
            height: tableData[0],
            rowNum : tableData[1],
            templateName:cpkTemplate,
          	afterShow : tableEvent
        });

        

        $('.cpk_add_column').hide();
        $('.cpk-box-main').fadeIn();
        $('.preview_aside_close').click(); 
        /*初始化ztree滚动条*/
        $.smartScroll($('#'+treeNode.tId));

        //$('.cpk-box-t').smartGrid.aa();
	},
	/**
	*选中节点
	*/
	checkTreeNode: function (checked) {
		var nodes = zTree.getSelectedNodes();
		if (nodes && nodes.length>0) {
			zTree.checkNode(nodes[0], checked, true);
		}
		this.hideRMenu();
	},
	onBodyMouseDown : function(event){
		if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
			rMenu.css({"display" : "none"});
		}
	},//移动至
    addDiyDom : function(treeId,treeNode) {
        var spaceWidth = 20;
        var switchObj = $("#" + treeNode.tId + "_switch"),
        icoObj = $("#" + treeNode.tId + "_ico");
        switchObj.remove();
        icoObj.before(switchObj);

        if (treeNode.level >= 1) {
            var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
            switchObj.before(spaceStr);
        }
    },
    moveOnClick : function(event, treeId, treeNode){
    },
    expandNode : function(event, treeId, treeNode){
        var treeId = $.trim(treeId),
        sent = /^sent/,
            move = /^move/;
        var srcollConfig;
        if( sent.test(treeId) ){
            if(treeId == 'sent_to_packageL' || treeId == 'sent_to_packageR'){
                ztreeExpand.horiscrollW(event, treeId, treeNode,200);
            }else{
                ztreeExpand.horiscrollW(event, treeId, treeNode,323);
             }
        }else if(move.test(treeId)){
            ztreeExpand.horiscrollW(event, treeId, treeNode,200);
        }else{
            ztreeExpand.horiscrollW(event, treeId, treeNode);
        };
        $.smartScroll('#'+treeNode.tId);
    },
    onCollapse : function(){
        ztreeExpand.horiscrollW(event, treeId, treeNode);
    }

}	


var zNodes  =  [
			{id:1, name:"收藏夹收藏夹收藏夹收藏夹收藏夹收藏夹收藏夹收藏夹收藏夹收藏夹",open:true,
				"isCreatable": 1,
	            "isUpdatable": 1,
	            "isDeletable": 1,
	            "isResearchable": 1,
	            'iconSkin':"z_skin_01",
	            "contentTypes": [1,2,3],  //1:视频  2: 音频  3: 图片  4: 文字  5: 包
				"isContentExtend": 1, //是否支持类型扩展。1：支持  0：不支持
				children:[
					   {id:11, name:"节点 1-1", noR:true},
					   {id:12, name:"节点 1-2", noR:true}

				]},
			{id:33, name:"回收站",open:true,
				"iconSkin":"z_skin_02", 
				"isCreatable": 1,
	            "isUpdatable": 1,
	            "isDeletable": 0,
	            "isResearchable": 1,
	            "contentTypes": [1,2,3,4],  //1:视频  2: 音频  3: 图片  4: 文字  5: 包
				"isContentExtend": 0, //是否支持类型扩展。1：支持  0：不支持
				children:[
					   {id:21, name:"节点 2-1",
						   	"isCreatable": 1,
				         	"isUpdatable": 1,
				            "isDeletable": 0,
				            "isResearchable": 1},
					   {id:22, name:"节点 2-2",
							"isCreatable": 1,
				         	"isUpdatable": 1,
				            "isDeletable": 1,
				            "isResearchable": 1},
					   {id:23, name:"节点 2-3",
							"isCreatable": 1,
				         	"isUpdatable": 1,
				            "isDeletable": 0,
				            "isResearchable": 1},
					   {id:24, name:"节点 2-4",
							"isCreatable": 1,
				         	"isUpdatable": 1,
				            "isDeletable": 1,
				            "isResearchable": 1}
				]},
			{id:3, name:"右键操作 3",open:true,
				"iconSkin":"z_skin_03", 
				"isCreatable": 0,
	            "isUpdatable": 0,
	            "isDeletable": 1,
	            "isResearchable": 1,
	            "contentTypes": [1,2,3,4],
				children:[
					   {id:31, name:"节点 3-1","contentTypes": [1,2,3],
					   		children:[
							   {id:31, name:"节点 3-1","contentTypes": [1,2,3,4] },
							   {id:32, name:"节点 3-2"},
							   {id:33, name:"节点 3-3"},
							   {id:34, name:"节点 3-4",children:[
                                   {id:31, name:"节点 3-1","contentTypes": [1,2,3,4] },
                                   {id:32, name:"节点 3-2"},
                                   {id:33, name:"节点 3-3"},
                                   {id:34, name:"节点 3-4",
                                        children:[
                                           {id:31, name:"节点 3-1111111111111","contentTypes": [1,2,3,4] },
                                           {id:32, name:"节点 3-2111111111"},
                                           {id:33, name:"节点 3-311111111"},
                                           {id:34, name:"节点 3-4111111111111111",
                                           children:[
                               {id:31, name:"节点 3-1111111111111","contentTypes": [1,2,3,4] },
                               {id:32, name:"节点 3-2111111111111111"},
                               {id:33, name:"节点 3-311111111111"},
                               {id:34, name:"节点 3-4",children:[
                               {id:31, name:"节点 3-1","contentTypes": [1,2,3,4] },
                               {id:32, name:"节点 3-2"},
                               {id:33, name:"节点 3-3"},
                               {id:34, name:"节点 3-4",children:[
                               {id:31, name:"节点 3-1","contentTypes": [1,2,3,4] },
                               {id:32, name:"节点 3-2"},
                               {id:33, name:"节点 3-3"},
                               {id:34, name:"节点 3-4"}
                            ]}
                            ]}
                            ]
                                       }
                                        ]
                                    }
                                ]}
							]
					    },
					   {id:32, name:"节点 3-2",},
					   {id:33, name:"节点 3-3"},
					   {id:34, name:"节点 3-4"}
				]},
                {id:3, name:"右键操作 3",open:true,
                "iconSkin":"z_skin_03", 
                "isCreatable": 0,
                "isUpdatable": 0,
                "isDeletable": 1,
                "isResearchable": 1,
                "contentTypes": [1,2,3,4],
                children:[
                       {id:31, name:"节点 3-1","contentTypes": [1,2,3],
                            children:[
                               {id:31, name:"节点 3-1","contentTypes": [1,2,3,4] },
                               {id:32, name:"节点 3-2"},
                               {id:33, name:"节点 3-3"},
                               {id:34, name:"节点 3-4"}
                            ]
                        },
                       {id:32, name:"节点 3-2",},
                       {id:33, name:"节点 3-3"},
                       {id:34, name:"节点 3-4"}
                ]},
                {id:3, name:"右键操作 3",open:true,
                "iconSkin":"z_skin_03", 
                "isCreatable": 0,
                "isUpdatable": 0,
                "isDeletable": 1,
                "isResearchable": 1,
                "contentTypes": [1,2,3,4],
                children:[
                       {id:31, name:"节点 3-1","contentTypes": [1,2,3],
                            children:[
                               {id:31, name:"节点 3-1","contentTypes": [1,2,3,4] },
                               {id:32, name:"节点 3-2"},
                               {id:33, name:"节点 3-3"},
                               {id:34, name:"节点 3-4"}
                            ]
                        },
                       {id:32, name:"节点 3-2",},
                       {id:33, name:"节点 3-3"},
                       {id:34, name:"节点 3-4"}
                ]},
                {id:3, name:"右键操作 3",open:true,
                "iconSkin":"z_skin_03", 
                "isCreatable": 0,
                "isUpdatable": 0,
                "isDeletable": 1,
                "isResearchable": 1,
                "contentTypes": [1,2,3,4],
                children:[
                       {id:31, name:"节点 3-1","contentTypes": [1,2,3],
                            children:[
                               {id:31, name:"节点 3-1","contentTypes": [1,2,3,4] },
                               {id:32, name:"节点 3-2"},
                               {id:33, name:"节点 3-3"},
                               {id:34, name:"节点 3-4"}
                            ]
                        },
                       {id:32, name:"节点 3-2",},
                       {id:33, name:"节点 3-3"},
                       {id:34, name:"节点 3-4"}
                ]},
				{id:4, name:"右键操作 4",open:true,
				 
				"isCreatable": 0,
	            "isUpdatable": 0,
	            "isDeletable": 1,
	            "isResearchable": 1,
				children:[
					   {id:41, name:"节点 4-1", },
					   {id:42, name:"节点 4-2" },
					   {id:44, name:"节点 4-4" },
					   {id:44, name:"节点 4-4"}
				]},
				{id:4, name:"右键操作 4",
				"iconSkin":"bg_icon z_skin_03", 
				"isCreatable": 1,
	            "isUpdatable": 1,
	            "isDeletable": 1,
	            "isResearchable": 1,
				children:[
					   {id:31, name:"节点 3-1", },
					   {id:32, name:"节点 3-2" },
					   {id:33, name:"节点 3-3"},
					   {id:34, name:"节点 3-4"}
				]},
				{id:3, name:"右键操作 3",
				"iconSkin":"bg_icon z_skin_03", 
				"isCreatable": 1,
	            "isUpdatable": 1,
	            "isDeletable": 1,
	            "isResearchable": 1,
				children:[
					   {id:31, name:"节点 3-1", },
					   {id:32, name:"节点 3-2","iconSkin":"bg_icon z_skin_05", },
					   {id:33, name:"节点 3-3","iconSkin":"bg_icon z_skin_06", },
					   {id:34, name:"节点 3-4","iconSkin":"bg_icon z_skin_06", "nocheck":true}
				]}
			
  	 	];
		

 	var setting = {
	view: {
		showLine: false,
		dblClickExpand: true 
	},
	callback: {
		onClick : ztreeExpand.OnClick,
		onRightClick: ztreeExpand.OnRightClick,
        onExpand : ztreeExpand.expandNode,
        onCollapse : ztreeExpand.expandNode
	}
};

var zNodes_move  =  [
    {id:3, name:"成品库",open:true,
        "iconSkin":"z_skin_03", 
        "isCreatable": 0,
        "isUpdatable": 0,
        "isDeletable": 1,
        "isResearchable": 1,
        "contentTypes": [1,2,3,4],
        children:[
               {id:31, name:"节点 3-1","contentTypes": [1,2,3],
                    children:[
                       {id:31, name:"节点 3-1","contentTypes": [1,2,3,4] },
                       {id:32, name:"节点 3-2"},
                       {id:33, name:"节点 3-3"},
                       {id:34, name:"节点 3-4"}
                    ]
                },
               {id:32, name:"节点 3-2",},
               {id:33, name:"节点 3-3"},
               {id:34, name:"节点 3-4"}
        ]},
        {id:4, name:"成品库",open:true,
        "iconSkin":"z_skin_03", 
        "isCreatable": 0,
        "isUpdatable": 0,
        "isDeletable": 1,
        "isResearchable": 1,
        "contentTypes": [1,2,3,4],
        children:[
               {id:31, name:"节点 3-1","contentTypes": [1,2,3],
                    children:[
                       {id:31, name:"节点 3-1","contentTypes": [1,2,3,4] },
                       {id:32, name:"节点 3-2"},
                       {id:33, name:"节点 3-3"},
                       {id:34, name:"节点 3-4"}
                    ]
                },
               {id:32, name:"节点 3-2",},
               {id:33, name:"节点 3-3"},
               {id:34, name:"节点 3-4"}
        ]}, 
];

var setting_move = {
    view: {
        showLine: false,
        showIcon: false,
        selectedMulti: false,
        dblClickExpand: true,
        addDiyDom: ztreeExpand.addDiyDom
    },
    callback: {
        beforeClick : ztreeExpand.beforeClick,
        onClick : ztreeExpand.moveOnClick,
        onExpand : ztreeExpand.expandNode,
        onCollapse : ztreeExpand.expandNode
    }
};

 var setting_sent = {
    view: {
        showLine: false,
        dblClickExpand: true 
    },
    callback: {
        beforeClick : ztreeExpand.beforeClick,
        onClick : ztreeExpand.moveOnClick,
        onExpand : ztreeExpand.expandNode,
        onCollapse : ztreeExpand.expandNode
    }
};

/*包ztree配置*/
var setting_package = {
    view: {
        showLine: false,
        showIcon: false,
        selectedMulti: false,
        dblClickExpand: true,
        addDiyDom: ztreeExpand.addDiyDom
    },
    callback: {
        beforeClick : ztreeExpand.beforeClick,
        onClick : ztreeExpand.moveOnClick,
        onExpand : ztreeExpand.expandNode,
        onCollapse : ztreeExpand.expandNode
    }
};



var zTree, rMenu;
var navTree =[];
var i=0;
$(document).ready(function(){
	var z_this = ztreeExpand;
    /*左边栏目树*/
	$.fn.zTree.init($("#cpktree"), setting , zNodes);
    /*移动至树*/
    var treeObj = $("#move_to");
    $.fn.zTree.init(treeObj,setting_move, zNodes_move);
    /*包操作树*/
    $.fn.zTree.init($("#package_ztree"),setting_package, zNodes_move);

    /*发送至树*/
    $.fn.zTree.init($("#sent_to_cpk"),setting_sent  , zNodes);
    $.fn.zTree.init($("#sent_to_zzk"),setting_sent , zNodes);
    $.fn.zTree.init($("#sent_to_packageL"),setting_sent ,zNodes);
    $.fn.zTree.init($("#sent_to_packageR"),setting_sent ,zNodes);
	/**
	*地址树
	*单机地址树时ztree选中的节点跳到可视区
	*右边表格列表刷新
	*/
	
	$('.navTree li').live('click',function(){
		var _this = $(this);
		var treeSelect_id = _this.attr('type');
		var level0Id = $('#'+treeSelect_id).parents('li.level0').attr('id');
		var level0_id_top = $('#'+level0Id).position().top;
		$('.zTreeDemoBackground').scrollTop(level0_id_top);
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		treeObj.selectNode(navTree[_this.attr('index')][0]);
		var _height = $('#treeDemo').height();
		console.log('#treeDemo: '+_height);
		console.log('本级高: '+level0_id_top);
		
	})
	//首次加载时选中哪一个
	$('#cpktree_9_a').click();
	
});	


	/**
	*ztree右键操作
	*/

 var  ztreeRfun = {//ztree右键相关操作函数
            //新增栏目
            addColumn : function(ztreeData){
                var pre_data = ztreeData.treeNode;
                var contentTypes = pre_data.contentTypes;
                var isContentExtend = pre_data.isContentExtend;
                var parentTId = pre_data.parentTId;
                
                /**
                *对于classArr数组说明
                *[
                *	0：当前分类具有该类型内容的权限（且用户有权修改
                *	1：当前分类具有该类型内容的权限（但用户无权修改）   
				*	2：当前分类没有该类型内容的权限（且用户有权修改）    
				*	3：当前分类没有该类型内容的权限（但用户无权修改）
                *]
                */
                var classArr = [
                [
                    'type-video root-modify',
                    'type-img root-modify',
                    'type-audio root-modify',
                    'type-manuscripts root-modify',
                    'type-package root-modify'
                ],
                [
                    'type-video root',
                    'type-img root',
                    'type-audio root',
                    'type-manuscripts root',
                    'type-package root'
                ],
                [
                    'type-video modify',
                    'type-img modify',
                    'type-audio modify',
                    'type-manuscripts modify',
                    'type-package modify'
                ],
                [
                    'type-video',
                    'type-img',
                    'type-audio',
                    'type-manuscripts',
                    'type-package'
                ],

            ];
            var permissions_html='';
            if(pre_data.isCreatable && pre_data.isUpdatable){
                
                for(var i=1;i<=5;i++){

                    if($.inArray(i,contentTypes) > -1){
                        permissions_html += '<li><i class="'+classArr[0][i-1]+' bg_icon"></i></li>';
                    }else{
                        if(pre_data.isContentExtend){
                            permissions_html += '<li><i class="'+classArr[2][i-1]+' bg_icon"></i></li>';
                        }else{
                            permissions_html += '<li><i class="'+classArr[3][i-1]+' bg_icon"></i></li>';
                        }
                        
                    }

                }              
            }else{

               for(var i=1;i<=5;i++){

                    if($.inArray(i,contentTypes) > -1){
                        permissions_html += '<li><i class="'+classArr[1][i-1]+' bg_icon"></i></li>';
                    }else{
                        permissions_html += '<li><i class="'+classArr[3][i-1]+' bg_icon"></i></li>';
                    }

                }
            }
            $('.column-footer-type ul').html('').html(permissions_html);
            $('.cpk_add_column').fadeIn();
            $('.cpk-box-main').hide();
           
            ztreeRfun.addColumnfun();   
            },
            //为栏目添加下方5个按钮绑定事件
            addColumnfun : function(){
                $('.column-footer-type .bg_icon').on('click',function(){
                        var _this = $(this); 
                        if(_this.hasClass('root-modify')){
                             _this.addClass('modify').removeClass('root-modify');
                        }else if(_this.hasClass('modify')){
                            _this.addClass('root-modify').removeClass('modify');
                        }
                    });
            },
            moveTo : function(ztreeData){
               con_batch_nav.popLayerHide();
               $('.moving_to').fadeIn(); 
            }
        }

    var cpkData = [
        [{
            iconClass:'r-sort',
            width:'200',
            text: "排序方式",
            data: [[{
                iconClass:'r-type',
                width:'130',
                text: "类型",
                func: function() {
                    $(this).css("border", "5px solid #34538b");
                }
            }, {
                iconClass:'r-state',
                text: "状态",
                func: function() {
                    $(this).css("border", "5px solid #a0b3d6");
                }
            }, {
                iconClass:'r-storage-time',
                text: "入库时间",
                func: function() {
                    $(this).css("border", "5px solid #cad5eb");
                }
            }]]
        }, {
            iconClass:'r-code',
            text: "播放代码",
            func: function() {
                $(this).css("padding", "10px");
            }
        } , {
            iconClass:'r-material',
            text: "下载素材",
            func: function() {
                $(this).css("background-color", "#beceeb");
            }
        },
        {   
            iconClass:'r-application',
            text: "打点应用",
            func: function() {
                var src = $(this).attr("src");
                window.open(src.replace("/s512", ""));    
            }
        },
        {   
            iconClass:'r-property',
            text: "视屏回迁",
            func: function() {
                var src = $(this).attr("src");
                window.open(src.replace("/s512", ""));    
            }
        },
        {   
            iconClass:'r-issued',
            text: "推送下发",
            func: function() {
                var src = $(this).attr("src");
                window.open(src.replace("/s512", ""));    
            }
        },
        {   
            iconClass:'r-audit',
            text: "推送审核",
            func: function() {
                var src = $(this).attr("src");
                window.open(src.replace("/s512", ""));    
            }
        }],[
        {   
            iconClass:'r-del',
            text: "删除",
            func: function() {
                var src = $(this).attr("src");
                window.open(src.replace("/s512", ""));    
            }
        },
        {   
            iconClass:'r-moving',
            text: "移动至",
            func: ztreeRfun.moveTo
        },
        {   
            iconClass:'r-rename',
            text: "重命名",
            func: function() {
                var src = $(this).attr("src");
                window.open(src.replace("/s512", ""));    
            }
        }],[
        {   
            iconClass:'r-historical',
            text: "历史记录",
            func: function() {
                var src = $(this).attr("src");
                window.open(src.replace("/s512", ""));    
            }
        },
        {  
            iconClass:'r-attribute',
            text: "属性",
            func: function() {
                var src = $(this).attr("src");
                window.open(src.replace("/s512", ""));    
            }
        }]
    ];

/*
* 右键菜单数据
*/
var cpkLmData =[
[{
    width:'200',
    iconClass:'r-add-column',
    text: "建子栏目",
    func: ztreeRfun.addColumn
},
{
    width:'200',
    iconClass:'r-editor',
    text: "编辑",
    func: function() {
        var src = $(this).attr("src");
        window.open(src.replace("/s512", ""));    
    }
},
{
    width:'200',
    iconClass:'r-moving',
    text: "移动至",
    func: ztreeRfun.moveTo
}],
[{
    width:'200',
    iconClass:'r-del',
    text: "删除",
    func: function() {
        $('.grid').html('');    
    }
},
{
    width:'200',
    iconClass:'r-rename',
    text: "重命名",
    func: function(a) {
        $(this).css('color','red');
    }
}],
[{
    width:'200',
    iconClass:'r-collection',
    text: "收藏",
    func: function() {
        console.log(this.text());    
    }  
}]

]; 


        var btnDataTable ={
            "batch_btns" :
                [
                    {'name':'添加','iconClass':''},
                    {'name':'移动至','iconClass':''},
                    {'name':'推送下发','iconClass':''},
                    {'name':'删除','iconClass':''},               
                    {'name':'推送审核','iconClass':''}
                ],
            "video_move_btns" : 
            [
                {'name':'添加','iconClass':''},
                {'name':'移动至','iconClass':''},
                {'name':'删除','iconClass':''},
                {'name':'推送下发','iconClass':''},
                {'name':'推送审核','iconClass':''}
            ],
            "audio_move_btns" : {
                'num1':{'name':'添加','iconClass':''},
                'num2':{'name':'移动至','iconClass':''},
                'num3':{'name':'删除','iconClass':''},
                'num4':{'name':'推送下发','iconClass':''},
                'num5':{'name':'推送审核','iconClass':''}
            },
            "img_move_btns" : {
                'num1':{'name':'添加','iconClass':''},
                'num2':{'name':'移动至','iconClass':''},
                'num3':{'name':'删除','iconClass':''},
                'num4':{'name':'推送下发','iconClass':''},
                'num5':{'name':'推送审核','iconClass':''}
            },
            "article_move_btns" : {
                'num1':{'name':'添加','iconClass':''},
                'num2':{'name':'移动至','iconClass':''},
                'num3':{'name':'删除','iconClass':''},
                'num4':{'name':'推送下发','iconClass':''},
                'num5':{'name':'推送审核','iconClass':''}
            },
            "video_rtclick_btns" : {
                'num1':{'name':'添加','iconClass':''},
                'num2':{'name':'移动至','iconClass':''},
                'num3':{'name':'删除','iconClass':''},
                'num4':{'name':'推送下发','iconClass':''},
                'num5':{'name':'推送审核','iconClass':''}
            },
            "audio_rtclick_btns" : {
                'num1':{'name':'添加','iconClass':''},
                'num2':{'name':'移动至','iconClass':''},
                'num3':{'name':'删除','iconClass':''},
                'num4':{'name':'推送下发','iconClass':''},
                'num5':{'name':'推送审核','iconClass':''}
            },
            "img_rtclick_btns" : {
                'num1':{'name':'添加','iconClass':''},
                'num2':{'name':'移动至','iconClass':''},
                'num3':{'name':'删除','iconClass':''},
                'num4':{'name':'推送下发','iconClass':''},
                'num5':{'name':'推送审核','iconClass':''}
            },
            "article_rtclick_btns" : {
                'num1':{'name':'添加','iconClass':''},
                'num2':{'name':'移动至','iconClass':''},
                'num3':{'name':'删除','iconClass':''},
                'num4':{'name':'推送下发','iconClass':''},
                'num5':{'name':'推送审核','iconClass':''}
            }
        }
        function getBtnsPrivs(){
            var a = {
                "batch_btns" : [1,2,3],
                "video_move_btns" : [1,2],
                "audio_move_btns" : [1,2,3],
                "img_move_btns" : [1,2],
                "article_move_btns" : [1,2],
                "video_rtclick_btns" : [1,2,3,4,5,6],
                "audio_rtclick_btns" : [1,2,3,4,5,6],
                "img_rtclick_btns" : [1,2,3,4,5],
                "article_rtclick_btns" : [1,2,3,4,5]
            };
           return a;
        }



