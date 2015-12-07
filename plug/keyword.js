/**
* 关键词添加
*/

(function($){
    $.fn.addKeywords = function(options){
        var defaults = {
            addKeywords_btn : '.add_keyword_btn_li',//添加按钮
            hiddenInput : '.keyword-hidden',//接受数据的input框
            removeClass : '.remove-icon',//删除框对应的class
            size : 8,  //每个输入input框限制的字数
            addKeywords_len : 5 ,  //允许插入的关键词个数
            name : '' //接收关键词信息表单name
        }
        // 取得当前对象出发的class
        var selectorClass = this.selector.slice(1);

        return this.each(function() {

            var opts = $.extend({},defaults,options);
            var _this = $(this);
            var addKeywords_btn = $(opts.addKeywords_btn,_this);
            var hiddenInputClass = selectorClass + '_' + opts.name;
            var hiddenInput = $('<input type="hidden"  name='+opts.name+' class="'+hiddenInputClass+'"/>');
            var size = opts.size;
            var removeClass = $('.remove-icon',_this);
            var addKeywords_len = opts.addKeywords_len;
            _this.append(hiddenInput);

            function inputW(){
                //输入框 自适应宽度
                var _this=$(this);
                var val =  _this.val();
                var strLen = val.gblen(); 

                if(strLen>1 && strLen< size){
                    _this.attr("size",strLen);
                }else if(strLen >= size){
                    _this.attr("size",size);
                }else{
                     _this.attr("size",'2');
                }

            }

            /**
            * 初始化每个关键字长度
            */
            $('li input',_this).each(function(){
                inputW.call($(this));
            })

            addKeywords_btn.click(function(){
                addKeywords_btn.before('<li><input type="text" class="keyword-input" size="2"><i class="remove-icon"></i></li>');
                if($('li',_this).length == addKeywords_len+1){
                    addKeywords_btn.fadeOut();
                }

            });

            _this.on("mouseover",'li',function(){
                $(this).find('i').show();
            })
            _this.on("mouseout",'li',function(){
                $(this).find('i').hide();
            })
            _this.on("keyup",'input',inputW);

            /**
            * 返给给隐藏表单的数据
            * 插件会创建一个input 框
            */
            function processVal(){
                var val = '';

                $('li input',_this).each(function(){
                    var thisVal = $.trim($(this).val());
                    if(thisVal.length) {
                        val += thisVal + ',';
                    } 
                })
                val = val.slice(0,-1);
                $('.'+hiddenInputClass,_this).val(val);
            }


            _this.on("blur",'input', processVal);

            _this.on('click',opts.removeClass,function(){
                $(this).parent('li').remove();
                addKeywords_btn.fadeIn();
                processVal();
            })

         })
    }
        

    /**
    * 扩展string方法
    * 如果字符串为汉字则长度+2
    * 如果字符串为大小写字母、数字则长度+1
    * return 字符串长度
    */
    String.prototype.gblen = function() {    
        var len = 0;    
        for (var i=0; i<this.length; i++) {    
            if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {    
                 len += 2;    
             } else {    
                 len ++;    
             }    
         }    
         return len;    
    }
 
})(jQuery); 

$(function(){
    $('.add_keywords_wrap').addKeywords({
        'name' : 'demo'
    });
})






