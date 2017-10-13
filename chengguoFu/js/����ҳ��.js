$(function(){

	$.ajax({
		url:"../data/watch.json",
		method:"get",
		success:function(data){
			// alert(1);
			var html = '';
			html = '<i></i><i></i><span><i></i><i></i>'+data[0].name+'</span>';
			$(".watch_title").html(html);
			var html1 = '';
			for (var i = 1; i < data.length; i++) {
				html1 +='<li><div><a href="商品详情页.html"><img src="'+data[i].src+'" alt=""></a></div><p><a href="">'+data[i].title+'</a></p><p><span>'+data[i].price+'</span></p></li>'
			}
			$(".product_list ul").html(html1);
		}
	})

	$(".product_list ul").on("mouseenter", "li", function(){
		$(this).attr("class", "active");
	})
});





















































































