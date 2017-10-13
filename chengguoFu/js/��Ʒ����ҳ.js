$(function(){
	$.ajax({
		url:"../data/smallNav.json",
		method:"get",
		success:function(data){
			var html = '';
			for (var i = 0; i < data.length - 1; i++) {
				if (i < data.length - 2) {
					html += '<a href="">'+ data[i].title +'</a>> ';
				}else{
					html += '<a href="">'+ data[i].title +'</a> ';
				}
				
			}
			$(".smallNav p").html(html);
		}
	})
	
	$.ajax({
		url:"../data/smallNav.json",
		method:"get",
		success:function(data){
			var html = "";
			for (var i = 0; i < data.length; i++) {
				html = '<span>商品编码：'+data[i].code+'</span>';
			}
		
			
			$(".smallNav").append(html);
		}
	})


	$(".littleimg").on("mouseenter", "a", function(){
		$(".littleimg a").find("i").remove();
		$(".littleimg a").attr("class", "");
		$(this).attr("class", "active");
		var html = '';
		html = '<i></i>';
		$(this).append(html);
		// alert($(this))
		var html1 = '';
		html1 = '<img src="../images/shopsShow/'+ ($(this).index() + 4) +'.jpg"><div class="zoomspan"></div><div class="zoomdiv"><img src="../images/shopsShow/'+($(this).index() + 4)+'.jpg" class="moveImg" style="width:400px;height:400px;"></div>';
		$(".bigimg").html(html1);
		
	})
	/*$(".littleimg").on("mouseleave", "a", function(){
		$(this).removeClass("active");
		// alert(1);
		$(this).find("i").remove();
		// alert($(this))
		
	})*/

	//放大镜
	$(".bigimg").on("mouseenter", function(){
		$(".zoomspan").css("display","block");
		$(".zoomdiv").css("display","block");
		


	})
	$(".bigimg").on("mouseleave", function(){
		$(".zoomspan").css("display","none");
		$(".zoomdiv").css("display","none");
		
	})

	$(".bigimg").on("mousemove", function(ev){
		var left = ev.pageX - $(this).offset().left - $(".zoomspan").width()/2;
		// alert(left)
		var top = ev.pageY - $(this).offset().top - $(".zoomspan").height()/2;
		// alert(top)	
		if (left < 0) {
			left = 0;
		}else if (left > $(this).width() -$(".zoomspan").width()) {
			left = $(this).width() -$(".zoomspan").width();
		}
		if (top < 0) {
			top = 0;
		}else if (top > $(this).height() - $(".zoomspan").height()) {
			top = $(this).height() - $(".zoomspan").height();
		}
		var proportionX = left/($(".bigimg").width() - $(".zoomspan").width());
		var proportionY = top/($(".bigimg").height() - $(".zoomspan").height());
		$(".zoomspan").css("left", left).css("top", top);
		if (proportionX * $(".zoomdiv").width() < 140 && proportionX * $(".zoomdiv").width() > 0) {
			// proportionX * $(".zoomdiv").width() = 60;
			$(".moveImg").css("right",proportionX * $(".zoomdiv").width() - 40);
		}
		if (proportionY * $(".zoomdiv").height() < 140 && proportionY * $(".zoomdiv").height() > 0) {
			$(".moveImg").css("top",proportionY * $(".zoomdiv").height() - 40);
		}
		// document.title = proportionY * $(".zoomdiv").height()
		

	})
	$("#addshop").on("click",function(){
		var num = $("#shops").val();
		num++;
		if (num > $("#restshop").html()) {
			num = $("#restshop").html();
		}
		$("#shops").val(num);
	})
	$("#subshop").on("click",function(){
		var num = $("#shops").val();
		num--;
		if (num < 0) {
			num = 0
		}
		$("#shops").val(num);
	})
	$("#buyCar").on("click",function(){
		$(".successAdd").css("display","block");
		$(".shopbg").css("display","block");
		var first = $.cookie("cargo") == null ? true : false;
		// alert(this.id)
		if(first){
			// var Str = $.cookie("cargo");
			// var arr = eval(Str);
			// var cookieStr = JSON.stringify(arr);
			var arr = [];
			var obj = {id: this.id, num: 1};
			arr.push(obj);
			var cookieStr = JSON.stringify(arr);
			$.cookie("cargo", cookieStr, {expires: 7});
			
			// alert(0);
		}else{
			//<2>将之前存储的cookie全部取出
			var Str = $.cookie("cargo");
			// console.log(JSON.stringify(cookieStr))
			// alert((cookieStr))
			var arr = eval(Str);
			// var arr = Array.from(cookieStr)
			//<3>判断是否之前存储过
			var isYes = false;
			for(var i in arr){ 
				if(arr[i].id == this.id){
					arr[i].num++;
					var cookieStr = JSON.stringify(arr);
						$.cookie("cargo", cookieStr,  {
							expires: 7
						});
					isYes = true;
					// alert(2)
				}
				
			}

			if(!isYes){
				//<4>如果之前没有存储过
				var obj = {id: this.id, num: 1};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
					$.cookie("cargo", cookieStr, {
						expires: 7
					});
					// alert(3);
			}

			
		}
		sc_car();
		console.log(cookieStr)
		// $(".shop_text").css("display","none");
	})
	//购物车数目
	function sc_car(){
		var cookieStr = $.cookie("cargo");
		var arr = eval(cookieStr);
		var sum = 0; //用于累加的和
		for(var i in arr){
			sum += Number(arr[i].num)
		}

		$("#shopcount").html('('+sum+')');
	}


	$("#closeCar,#goShopping").on("click",function(){
		$(".successAdd").css("display","none");
		$(".shopbg").css("display","none");
	})
})