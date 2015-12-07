/**
 * 憧憬 on 2015/4/10
 * updata 2015/5/14
 */
 $(function(){
    /*
    * 高级搜索
    */
    $('.c-search-btn-senior').click(function(e){
        $(e).css('border','1px solid red');
        con_batch_nav.popLayerHide();
        var sreach_column = $(this).siblings('.sreach-column');
        sreach_column.is(':hidden') ? sreach_column.fadeIn() : '';
    })

    var clientH = $(window).height();
    var locationBarH = $('.location-bar').outerHeight(true);
    var conFooterH = $('.con-footer').outerHeight(true);
    var conH = clientH - locationBarH - conFooterH;
    $('.cpk-box').css('height',conH+'px');
  
    $('.con_add_nav a').hover(function(){
        $(this).addClass('now');
    },function(){
        $(this).removeClass('now');
    })
    $('.btn-refresh').click(function(){
        location.reload(); 
    })
    $(".cpk_add_column").hide();

    $(".pentagram i").on('click',function(){
        var _this = $(this);
        if(_this.hasClass('rot-collection')){
            _this.attr('title','收藏').removeClass('rot-collection');
        }
        else{
            _this.attr('title','取消收藏').addClass('rot-collection');
        }
     });

    /*开启拖拽*/
    $('.moving_to').contentDragdrop();
    $('.sent_to_zzk').contentDragdrop({
            DragdropTitleBox : '.sent_to_title',
    });
    $('.sent_to_cpk').contentDragdrop({
            DragdropTitleBox : '.sent_to_title',
    });
    $('.sent_to_package').contentDragdrop({
            DragdropTitleBox : '.sent_to_title',
    });
    
    /*移动至确认按钮*/
    $('.moving_to_confirm').click(function(){
        var treeObj = $.fn.zTree.getZTreeObj("move_to");
        var nodes = treeObj.getSelectedNodes();
        
        if(nodes.length){
            alert('等待移动');
            con_batch_nav.popLayerHide();
        }else{
            alert('请选择移动至的栏目') ;
        }
        
    })

    /*
    * 绑定顶部批量导航点击、左边ztree 隐藏.popLayer
    * 下面子元素注意阻止冒泡
    */
    $('.cpk-dh,.ztree-box').click(function(){
        con_batch_nav.popLayerHide();
        con_batch_nav.preViewClose();
    })

    $('.con_add_nav').on('click','li',function(){
        var _this = $(this);
        var thisType = _this.attr('type'); 
        con_batch_nav.popLayerHide();
        switch(thisType){
            case 'video' : 
                con_batch_nav.showSection('.videoUpdata');
                vmsH.packageH();
            break;
            case 'picture' : 
            break; 
            case 'audio' : 
            break; 
            case 'article' : 
                con_batch_nav.showSection('.manuscriptsUpdata');
                vmsH.packageH();
                vmsH.editorW();

            break; 
            case 'package' :
                con_batch_nav.showSection('.package');
                vmsH.packageH();
                $('.package_add_btn').click();
            break; 
            default:;
        }
    })

    /**
    * 包操作
    */
/*    var windowH = $(window).height();
    var cpk_box = $('.cpk-box').outerHeight(true);
    var package_width = $('.package_section').outerWidth(true);
    var package_height = $('.package_section').outerHeight(true);
    var slider_btn_H = $('.slider_btn_wrap').outerHeight(true);
    var package_editor_nav_H = $('.package_editor_nav_wrap').outerHeight(true);
    var package_select_head_H = $('.package_select_head').outerHeight(true);*/
    /*计算包内容区高度*/
/*    $('.package_c').css('height',cpk_box-slider_btn_H-package_editor_nav_H-2);
    $('.package_ztree').css('height',cpk_box-slider_btn_H-package_select_head_H-2);
    $('.package_information_inner').css('height',cpk_box-slider_btn_H-62-2-36);*///62为footerbtn的高度
   /* vmsH.packageH();*/
    /*包添加按钮(+)*/
    $('.package_add_btn').click(function(){
        $('.package_select_wrap').show().animate({'right':0},function(){
            $('.package_c').addClass('section_now');
        });
        $('.package_choose').html5drag();
        
    });

    $('.package_del_btn').click(function(){
        var aa = $.html5drag.getInputData();
        console.log(aa);
        var demoHtml = '<li >'+
'                   <img src="./images/pic_1.png" alt="">'+
'                   <p title="这是图片全名称">这是图片名称</p>'+
'               </li>'+
'               <li>'+
'                   <img src="./images/pic_2.png" alt="">'+
'                   <p title="这是图片全名称">这是图片名称</p>'+
'               </li>'+
'               <li>'+
'                   <img src="./images/pic_3.png" alt="">'+
'                   <p title="这是图片全名称">这是图片名称</p>'+
'               </li>';
        for(var i=0;i<100;i++){
            $('.package_c_ul').append(demoHtml);
        }

    })


    /*与全选按钮配合的li*/
    $('.package_c_selected').on('click','li',function(){
        alert(11);
        var _this = $(this);
        if(_this.hasClass('package_cur')){
            _this.removeClass('package_cur')
            $('#package_checkall').attr('checked',false);
        }else{
            _this.addClass('package_cur');
            var isChecked = 1;

            _this.siblings('li').each(function(){
                if(!$(this).hasClass('package_cur')){
                    isChecked = 0;
                    return;
                }
            })

            isChecked ? $('#package_checkall').attr('checked',true) : $('#package_checkall').attr('checked',false);

        }
    })

    $('.package_choose').on('click','li',function(){
        var _this = $(this);
        if(_this.hasClass('package_cur')){
            _this.removeClass('package_cur');
        }else{
            _this.addClass('package_cur').siblings('li').removeClass('package_cur');
        }
    })

    /*包编辑全选与全不选*/
    $('#package_checkall').click(function(){
         var isChecked=$(this).is(':checked');
         var ocheckLi=$('.package_c_selected li');
         isChecked ? ocheckLi.addClass('package_cur') : ocheckLi.removeClass('package_cur');
    })

    /*展开收起包添加*/
    $('.slider_btn').click(function(){

        var package_section = $('.package_section');
        var package_infor = $('.package_information');

        if(package_section.is(':hidden')){
            $(this).removeClass('slider_up');
            package_section.slideDown();
            package_infor.slideUp();
        }else{
            $(this).addClass('slider_up');
            package_section.slideUp();
            package_infor.slideDown();
        }

        smart_scoll.packageSection();
        
        
    })
    /*包完成与取消按钮*/
    $('.package_cancel_btn').click(function(){
        con_batch_nav.showSection();
    })
    $('.package_complete_btn').click(function(){
        con_batch_nav.showSection();
    })

    $(".more-top a").hover(
        function(){
            $(this).find('i').addClass('rot-add-form');
        },function(){
            $(this).find('i').removeClass('rot-add-form');
    });

    $(".more-top a").click(function(){
        var moreMain = $(this).parent().next(".more-main ");
        moreMain.is(':hidden') ?  moreMain.show() :  moreMain.hide();
        $.smartScroll( $(this) );
    });
    /*包操作 end*/

 })

/*批量菜单、右侧划出弹出层*/
var con_batch_nav = {
    index : 10,
    /**
    * 成品库添加弹出层
    */
    add : function(e){
        var oNav =  $('.con_add_nav');
        con_batch_nav.popLayerHide();
        oNav.is(":hidden") ? $('.con_add_nav').stop().fadeIn() : $('.con_add_nav').stop().fadeOut();
        e.stopPropagation();
        
    },
    /**
    * 成品库批量移动
    */
    move : function(e){
        var oMove =  $('.moving_to');
        con_batch_nav.popLayerHide();
        oMove.stop().fadeIn();
        $('.move_to_wrap').showScroll();
        e.stopPropagation();
    },
    del : function(){
        e.stopPropagation();
    },
    /**
    * 隐藏含有 .pop_layer 类的元素
    */
    popLayerHide : function(){
        //弹出层
        var oPopLayer = $('.pop_layer');
        //右边划出层
        var oSliderLayer_r = $('.sliderLayer_r');
        oPopLayer.each(function(){
             $(this).is(":hidden") ? '' : $('.pop_layer').stop().fadeOut();
        })
       
        oSliderLayer_r.is(":hidden") ? '' : con_batch_nav.preViewClose();
    },
    /**
    * 右侧划出
    */
    preView : function(e){
        var __this = $(this);
        var type = __this.parents('tr').attr('datatype');
        var preview_manuscriptsW = $('.cpk-box').outerWidth();

        if(!__this.parents('tr').hasClass('tr_cur_click')){
           __this.parents('tr').siblings('tr').removeClass('tr_cur_click').find('input').attr('checked',false);  
           __this.parents('tr').addClass('tr_cur_click').find('input').attr('checked',true);          
        }
        vmsH.previewH();
        if(type==4){
            $('.preview_manuscripts').css({'zIndex':++con_batch_nav.index,'width':preview_manuscriptsW,'right':-preview_manuscriptsW}).show().stop().animate({'right':0}); 
        }else if(type == 5){
            $('.preview_package').css({'zIndex':++con_batch_nav.index,'width':preview_manuscriptsW,'right':-preview_manuscriptsW}).show().stop().animate({'right':0}); 
            var preview_package_colModel = [{
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
                                    "name": "时间",
                                    "index": "type",
                                    "width": "20%",
                                    "sortable": "false"
                                }];

            $('.preview_package_table').smartGrid({
                name:'aa1',
                url:'data.php',
                colModel : preview_package_colModel,
                height: '',
                rowNum : 110,
                templateName:preview_package_Template,
                afterShow : packageTableEvent
            });

            function packageTableEvent(){
                /**
                *   包预览菜单处理
                *   类型
                *   状态
                *   时间
                *   菜单
                */
                var package_table = $('.preview_package_table');
                var _ni = $(".thead_choice li",package_table);
                var _jp = $(".cpk-nx-zt",package_table);
                var thead_choice_data = {};
                _jp.off().on("mouseover mouseout",function(event){
                    if(event.type == "mouseover"){
                        $(this).addClass('cpk-show');
                    }else if(event.type == "mouseout"){
                        $(this).removeClass('cpk-show');
                    }
                });
                  
                _ni.off().on('click',function(){
                    var _this = $(this);
                    var _index = _this.index();
                    var parentUl = _this.parents('.thead_choice');
                    var typeName = parentUl.attr('type');
                    var val = '';

                    //表头下拉框非第一个(非全部)点击时
                    if(_index && !_this.hasClass('checked') ){
                        _this.addClass('checked');
                        $('li:eq(0)',parentUl).removeClass('checked');
                    }else if(_index){
                        _this.removeClass('checked');
                    }

                    //表头下拉框第一个(全部)点击时
                    if(!_index && !_this.hasClass('checked')){
                        _this.addClass('checked');
                        _this.siblings('li').removeClass('checked');
                    }else if(!_index){
                        _this.removeClass('checked');
                    }

                    $('.checked',parentUl).each(function(i,elem){
                        val += $(this).attr('val')+',';
                    }); 

                    val = val.slice(0,-1);
                    thead_choice_data[typeName] = val;
                    $.smartGrid.setGridParam(thead_choice_data);
                    _jp.removeClass('cpk-show');
                });
                

                $(".cpk-time-jt-a").off('click').on('click',function(){
                    $(this).addClass();
                });


                /*时间排序*/
                var _arrow = $(".cpk-time-asc")
                _arrow.off('click').on('click',function(){

                    if(!_arrow.hasClass('cpk-time-desc')){
                        _arrow.addClass('cpk-time-desc');
                        $.smartGrid.setGridParam({'sort':'desc'});
                    }else{
                        _arrow.removeClass('cpk-time-desc');
                        $.smartGrid.setGridParam({'sort':'esc'});
                    };

                    console.log($.smartGrid.getGridParam());
                });
            }

        }else{
           $('.preview_aside').css('zIndex',++con_batch_nav.index).show().stop().animate({'right':0}); 
        }  

    },
    /**
    * 关闭右侧划出
    * 5中类型的预览
    */
    preViewClose : function(e){
        var preview_aside_w = 0;
        $('.sliderLayer_r_fullScreen').stop().animate({'right':'-1920px'}); 
        $('.preview_aside').animate({'right':'-500px'});
        e ? e.stopPropagation() : '';
    },
    /**
    * 关闭新建栏目 新建包 修改视屏 修改包 等占据主内容等操作
    * 默认回到主界面  如需相因页面显示,则传入对应区块 特有class即可
    * eq: con_batch_nav.showSection('.aa');
    */
    showSection : function(className){
        $('.vms-box-section').hide();
        className ? $(className).fadeIn() : $('.cpk-box-main').fadeIn();
    },
    sentTo : function(e,obj){
        var oSent = obj;
        con_batch_nav.popLayerHide();
        
        if($.isArray(obj)){

            for(var i = 0,len = obj.length; i<len;i++){
                console.log(obj[i]);
                obj[i].showScroll();
            }
            obj[0].parents('.pop_layer').eq(0).stop().fadeIn();
        }else{
            oSent.parents('.pop_layer').eq(0).stop().fadeIn();
            oSent.showScroll();
        }
        
        e.stopPropagation();
    }

}


/*
* 滚动条引用
*/
var smart_scoll = {

    ztree : function(){
            $('.ztree-box').showScroll()
    },
    packageSection : function(){
            $('.package_information_inner').showScroll()
    }
}


/*
* 初始化主表格后的回调事件
* 表格上的各项操作
*/
function tableEvent(num){

     $('.con-footer span').html(num);
    /**
    *导航栏菜单
    */
    var obj = $(".cpk-nav a");
    var img = $(".cpk-nav a span");
    obj.on("mouseover mouseout",function(event){
        if(event.type == "mouseover"){
            var _this = $(this);
            _this.addClass('cur');
            _this.next().addClass('cur_next');
        }else if(event.type == "mouseout"){
            var _this = $(this);
            _this.removeClass('cur');
            _this.next().removeClass('cur_next');
        }
    })

    /**
    *批量操作按钮
    */
    $('.cpk-nav-add').off('click').on('click',con_batch_nav.add);
    $('.cpk-nav-move').off('click').on('click',con_batch_nav.move);
    $('.cpk-nav-delete').off('click').on('click',con_batch_nav.del);
    $('.moving_to_close').off('click').on('click',con_batch_nav.popLayerHide);

    //发送至
    $('.sck-sentTo-zzk').off('click').on('click',function(e){ con_batch_nav.sentTo(e,$('.sent_to_zzk_wrap')) });
    $('.sck-sentTo-cpk').off('click').on('click',function(e){ con_batch_nav.sentTo(e,$('.sent_to_cpk_wrap')) });
    $('.sck-sentTo-package').off('click').on('click',function(e){ con_batch_nav.sentTo(e,[$('.sent_to_package_innerL'),$('.sent_to_package_innerR')]) });



    /**
    *   成品库菜单处理
    *   类型
    *   状态
    *   时间
    *   菜单
    */
    var _ni = $(".thead_choice li");
    var _jp = $(".cpk-nx-zt");
    var thead_choice_data = {};
    _jp.on("mouseover mouseout",function(event){
        if(event.type == "mouseover"){
            $(this).addClass('cpk-show');
        }else if(event.type == "mouseout"){
            $(this).removeClass('cpk-show');
        }
    });
      
    _ni.on('click',function(){
        var _this = $(this);
        var _index = _this.index();
        var parentUl = _this.parents('.thead_choice');
        var typeName = parentUl.attr('type');
        var val = '';

        //表头下拉框非第一个(非全部)点击时
        if(_index && !_this.hasClass('checked') ){
            _this.addClass('checked');
            $('li:eq(0)',parentUl).removeClass('checked');
        }else if(_index){
            _this.removeClass('checked');
        }

        //表头下拉框第一个(全部)点击时
        if(!_index && !_this.hasClass('checked')){
            _this.addClass('checked');
            _this.siblings('li').removeClass('checked');
        }else if(!_index){
            _this.removeClass('checked');
        }

        $('.checked',parentUl).each(function(i,elem){
            val += $(this).attr('val')+',';
        }); 

        val = val.slice(0,-1);
        thead_choice_data[typeName] = val;
        $.smartGrid.setGridParam(thead_choice_data);
        _jp.removeClass('cpk-show');
    });
    

    $(".cpk-time-jt-a").on('click',function(){
        $(this).addClass();
    });


    /*时间排序*/
    var _arrow = $(".cpk-time-asc")
    _arrow.off('click').on('click',function(){

        if(!_arrow.hasClass('cpk-time-desc')){
            _arrow.addClass('cpk-time-desc');
            $.smartGrid.setGridParam({'sort':'desc'});
        }else{
            _arrow.removeClass('cpk-time-desc');
            $.smartGrid.setGridParam({'sort':'esc'});
        };

        console.log($.smartGrid.getGridParam());
    });


    /*
    * 名称处改名
    */
    var cpkNameKey = true ,cpkNameisBlur = false;//改名时是否触发tr事件的开关
    var cpkNameVal = '';

    $('.cpk-name-name').off().focus(function(e){
        cpkNameVal = $(this).text();
        var parentTr = $(this).parents('tr');
        parentTr.siblings('tr').removeClass('tr_cur_click').find('input').attr('checked',false);
        parentTr.addClass('tr_cur_click').find('input').attr('checked',true);           
        cpkNameKey = false;
        cpkNameisBlur = false;
    })

    $('.cpk-name-name').blur(function(){
        cpkNameisBlur = true;
        if(cpkNameVal != $(this).text()){
            alert('ajax请求该数据');
        }
        
    })

    /*
    * 表格事件
    * 行事件
    * 右键事件
    */
    $('tbody tr td:not(".cpk-Check")').on('mouseup',function(e){
        if (e.which == 1){
            con_batch_nav.popLayerHide();
        };

        if(cpkNameKey){
            var parentTr = $(this).parents('tr');
            if(!parentTr.hasClass('tr_cur_click')){
                parentTr.siblings('tr').removeClass('tr_cur_click').find('input').attr('checked',false);
                parentTr.addClass('tr_cur_click').find('input').attr('checked',true);           
            }else{
                parentTr.removeClass('tr_cur_click').find('input').attr('checked',false);
            }  
        }else{
            cpkNameKey =  cpkNameisBlur ?  true : false ;
        }
    })

    $('tbody tr input','.grid').on("mousedown",function(event){
        var __this = $(this);
        var parentTr = __this.parents('tr');
        var type = parentTr.attr('type');
        if(!parentTr.hasClass('tr_cur_click')){
            parentTr.addClass('tr_cur_click');             
        }else{
            parentTr.removeClass('tr_cur_click');
        }
        return false;
    }).on("mouseup",function(event){
        return false;
    });

    /*
    * input所在的td
    */
    $('tbody tr .cpk-Check','.grid').on("mousedown",function(event){
        var __this = $(this);
        var parentTr = __this.parents('tr');
        var type = parentTr.attr('type');
        if(!parentTr.hasClass('tr_cur_click')){
            parentTr.addClass('tr_cur_click');
            __this.find('input').attr('checked',true);            
        }else{
            parentTr.removeClass('tr_cur_click');
            __this.find('input').attr('checked',false); 
        }
        return false;
    }).on("mouseup",function(event){
        return false;
    });

    /**
    * 表格tr右键
    */

    $('tbody tr').smartMenu(cpkData, {
        name: 'trRmenu',
        beforeShow : function(){
            var __this = $(this);
            var type1 = __this.attr('dataType');
            var id1 = __this.attr('dataId');
            if(!__this.hasClass('tr_cur_click')){
               __this.addClass('tr_cur_click').find('input').attr('checked',true);           
            }
         } 
    }); 

    //名称处的快捷按钮
    $('.cpk-name-conter .preview_btn').on('mousedown',con_batch_nav.preView).on('mouseup',function(){
        return false;
    }) 
    $('.preview_aside').html(videoHtml);
    $('.preview_aside_close_btn').off('click').on('click',con_batch_nav.preViewClose);

}
    
/**
* 成品库模板
*/
var cpkTemplate = {
    'thead' : template.compile(
           '<thead>'+
'                <tr class="cpk-tb-na">'+
                '<th class="cpk-kong"></th>'+
                '{{each data as val i}}'+
                '{{if i==0}}'+
                    '<th class="cpk-name">{{val.name}}</th>'+
                '{{/if}}' +  
                '{{if i==1}}'+            
'                    <th class="cpk-kind">'+
'                        {{val.name}}'+
'                    <span class="cpk-nx-zt">'+
'                        <span class="cpk-nx-zt-left">'+
'                            <div class="cpk-kind-choose cpk-kind-show">'+
'                                <ul class="thead_choice"  type="{{val.index}}">'+
'                                    {{each val.optional as status j}}' + 
'                                       <li val="{{status.value}}" class= {{if status.value == 0 }}"allType"{{/if}} ><a >{{status.name}}</a></li>'+
                                   ' {{/each}}' +
'                                </ul>'+
'                            </div>'+
'                        </span>'+
'                    </span>'+
'                    </th>'+
                 '{{/if}}'+
                 '{{if i==2}}'+ 
'                    <th class="cpk-status">{{val.name}}'+
'                        <span class="cpk-nx-zt">'+
'                        <span class="cpk-nx-zt-left">'+
'                               <div class="cpk-kind-choose cpk-kind-show">'+                               
'                              <ul class="thead_choice" type="{{val.index}}">'+
'                                   {{each val.optional as status j}}' + 
'                                       <li val="{{status.value}}" class= {{if status.value == 0 }}"allType"{{/if}} ><a>{{status.name}}</a></li>'+
                                   ' {{/each}}' +                               
'                                   </ul>'+
'                               </div>'+
'                        </span>'+
'                    </span>'+
'                    </th>'+
                 '{{/if}}'+
                 '{{if i==3}}'+ 
'                    <th class="cpk-time">{{val.name}}'+
'                        <span class="cpk-time-arrow">'+
'                            <span class="bg_icon cpk-time-asc"></span>'+
'                        </span>'+
'                    </th>'+
                '{{/if}}'+
                '{{if i==4}}'+ 
'                    <th class="cpk-personnel">{{val.name}}</th>'+
                '{{/if}}'+
            '{{/each}}'+
'                </tr>'+
'                </thead>'
            ),
    'tbody' : template.compile(
        '<tbody>'+
        '{{each data as val i}}'+
            '<tr dataType="{{val.type}}" dataId="{{val.id}}">'+
'                    <td class="cpk-Check"><input type="checkbox" /></td>'+
'                    <td class="cpk-file-name">'+
'                     <img src="images/mv.png"/>'+
'                     <div class="cpk-name-name" contenteditable = "true">{{val.name}}</div>'+
'                          <div class="cpk-name-conter">'+
'                            <a href="javscript:void(0);" class="preview_btn">预览</a>'+
'                            <a href="javscript:void(0);">快坼</a>'+
'                            <a href="javscript:void(0);">编辑</a>'+
'                          </div>'+
'                    </td>'+
'                    <td class="cpk-video">{{val.typeName}}</td>'+
'                    <td class="cpk-published">{{val.status}}</td>'+
'                    <td class="cpk-time-data"><span>{{val.time}}</span></td>'+
'                    <td class="cpk-user">{{val.operator}}</td>'+
'                </tr>'+
        '{{/each}}'+
         '</tbody>'
        )
}

/**
* 右侧预览模板
*/
var  videoHtml =
'<div class="preview_aside_close">'+
        '<i class="bg_icon preview_aside_close_btn"></i>'+
'   </div>'+
'    <div class="trailer">'+
'        <img src="images/video_preview .png" />'+
'    </div>'+
'    <div class="file-details">'+
'            <ul>'+
'                <li class="details-name"><a>文件名:</a><ins>&nbsp;文件名1</ins></li>'+
'                <li class="details-type"><a>文件类型:</a><ins>&nbsp;视频/音频</ins></li>'+
'                <li class="details-location"><a>位置:</a><ins>&nbsp;成品区/aa/bb/cc</ins></li>'+
'                <li class="details-size"><a>大小:</a><ins>&nbsp;298.KB(305298Byte)</ins></li>'+
'                <li class="details-time"><a>创建时间:</a><ins>&nbsp;2014年1月1日&nbsp;12:12:12</ins></li>'+
'                <li class="Modify-time"><a>修改时间:</a><ins>&nbsp;2014年1月1日&nbsp;12:12:13</ins></li>'+
'                <li class="access-time" style="border-bottom:none "><a>最后访问:</a><ins>&nbsp;2014年1月1日&nbsp;12:12:14</ins></li>'+
'            </ul>'+
'    </div>';


var preview_package_Template = {
    'thead' : template.compile(
           '<thead>'+
'                <tr class="cpk-tb-na">'+
                '{{each data as val i}}'+
                '{{if i==0}}'+
                    '<th class="cpk-name">{{val.name}}</th>'+
                '{{/if}}' +  
                '{{if i==1}}'+            
'                    <th class="cpk-kind">'+
'                        {{val.name}}'+
'                    <span class="cpk-nx-zt">'+
'                        <span class="cpk-nx-zt-left">'+
'                            <div class="cpk-kind-choose cpk-kind-show">'+
'                                <ul class="thead_choice"  type="{{val.index}}">'+
'                                    {{each val.optional as status j}}' + 
'                                       <li val="{{status.value}}" class= {{if status.value == 0 }}"allType"{{/if}} ><a >{{status.name}}</a></li>'+
                                   ' {{/each}}' +
'                                </ul>'+
'                            </div>'+
'                        </span>'+
'                    </span>'+
'                    </th>'+
                 '{{/if}}'+                
                 '{{if i==2}}'+ 
'                    <th class="cpk-time">{{val.name}}'+
'                        <span class="cpk-time-arrow">'+
'                            <span class="bg_icon cpk-time-asc"></span>'+
'                        </span>'+
'                    </th>'+
                '{{/if}}'+
            '{{/each}}'+
'                </tr>'+
'                </thead>'
            ),
    'tbody' : template.compile(
        '<tbody>'+
        '{{each data as val i}}'+
            '<tr dataType="{{val.type}}" dataId="{{val.id}}">'+
'                    <td class="cpk-file-name">'+
'                     <img src="images/mv.png"/>'+
'                     <div class="cpk-name-name">{{val.name}}</div>'+
'                    </td>'+
'                    <td class="cpk-video">{{val.typeName}}</td>'+
'                    <td class="cpk-time-data"><span>{{val.time}}</span></td>'+
'            </tr>'+
        '{{/each}}'+
         '</tbody>'
        )
}



 /** 
 * 对日期进行格式化， 
 * @param date 要格式化的日期 
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有： 
 *     y:年, 
 *     M:年中的月份(1-12), 
 *     d:月份中的天(1-31), 
 *     h:小时(0-23), 
 *     m:分(0-59), 
 *     s:秒(0-59), 
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @author yanis.wang
 * @see http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
 */

template.helper('dateFormat', function (date, format) {

    date = new Date(date);
    var map = {
        "M": date.getMonth() + 1, //月份 
        "d": date.getDate(), //日 
        "h": date.getHours(), //小时 
        "m": date.getMinutes(), //分 
        "s": date.getSeconds(), //秒 
        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    

    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
        });
        return format;
    });

    // --------

    var data = {
        time: 1408536771253,
    };


    /*
    *判断2个数组中相同的元素
    *返回数组顺序以a1顺序为准
    */
    Array.ExistsSameValues = function(a1, a2) {
                    var exists = [];
                    if(a1 instanceof Array && a2 instanceof Array)
                    {
                        for (var i=0,iLen=a1.length; i<iLen; i++)
                        {
                            for (var j=0,jLen=a2.length; j<jLen; j++)
                            {
                                if (a1[i]==a2[j])
                                {
                                    exists.push(a1[i]);
                                }
                            }
                        }
                    }
                    return exists;
                };



/*拖拽插件*/
(function($){
    $.fn.contentDragdrop = function(options){
        var defaults = {
            DragdropTitleBox : '.moving_to_title',
            DragdropScope : ''
        }
           var _this = $(this);
           var opts = $.extend({},defaults,options);
           var DragdropTitleBox = $(opts.DragdropTitleBox, _this);
           DragdropTitleBox.mousedown(function(e){
                // e.pageX
                var positionDiv = _this.offset();
                var distenceX = e.pageX - positionDiv.left;
                var distenceY = e.pageY - positionDiv.top;
                $(document).mousemove(function(e){

                    var x = e.pageX - distenceX;
                    var y = e.pageY - distenceY;
                    console.log(x);
                    console.log(y);
                    if(x<0){
                        x=0;
                    }else if(x>$(document).width()-_this.outerWidth(true)){
                        x = $(document).width()-_this.outerWidth(true);
                    }

                    if(y<0){
                        y=0;
                    }else if(y>$(document).height()-_this.outerHeight(true)){
                        y = $(document).height()-_this.outerHeight(true);
                    }

                    _this.css({
                        'left':x+'px',
                        'top':y+'px'
                    });
                });
                $(document).mouseup(function(){
                    $(document).off('mousemove');
                    $(document).off('mouseup'); 
                }); 
            return false;
        });
  }
})(jQuery);









   
 
