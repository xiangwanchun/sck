(function($){
	/*������ģ��*/
$.fn.selectCopy = function (e){
	var $t=$(this);
	$t.find("a").click(function(){
		
		var ul=$t.children("ul");
		if(ul.is(":hidden")){
			$(".select ul").slideUp('fast');
			$(".select ul").next("span").hide();
			ul.slideDown('fast');
			$t.children("span").show();
		}else{
			ul.slideUp('fast',function(){
				$t.children("span").hide();
			});
		}		
	
//		getUnbind($t,ul);	
		$(document).bind("click", function(e) {
			if($(e.target).parents().hasClass("select")){
				return;
			} else {	
				ul.slideUp(function(){
					$t.children("span").hide();
				});
			}
		});
	});
	
	$t.find("li").click(function(){
		if(!e){
			$t.find("a").text($(this).text());
			$t.find("a").attr("name",this.getAttribute("value"));
		}
		$t.children("a").click();
	});
}
})(jQuery);


$(function(){
	$('.select').each(function(){
		$(this).selectCopy();
	})
})
