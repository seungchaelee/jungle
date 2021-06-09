var main = {};
var sub;

$(function(){
	main.loadHtml();
	main.init();
})

main.init = function(){
	$('.menu a').click(function(){
		$('#wrap-loading').css('display','block')
		setTimeout(function(){
			$('#wrap-loading').addClass('on');
		},50)
		setTimeout(main.loadHtml,600)
		
	})
	$('#nav .btn-nav').click(function(){
		$('#nav').addClass('on');
	})
	$('#nav').mouseleave(function(){
		$('#nav').removeClass('on');
	})
}

main.loadHtml = function(){
	var url = $(location).attr('href');
	url = url.split('#');
	var _url = url[1]
	if(!_url) _url = "home";
	_url = "page/"+_url+".html";

	$.ajax({
		url: _url,
		cache: false
	})
	.done(function(data, textStatus, jqXHR) {
		if(sub) sub.outroFn()
		sub = {}
		$("#content").html(data);
	})
}

main.loadCompleteFn = function(){
	$('#wrap-loading').addClass('finish');
	setTimeout(function(){
		$('#wrap-loading').removeClass('on finish');
		$('#wrap-loading').css('display','none')
	},600)
}