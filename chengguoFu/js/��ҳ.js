$(function(){
	//ajax动态添加banner图
	$.ajax({
		url:"../data/banner.json",
		method:"get",
		success:function(data){
			var html = "";
			var html1 = ""
			for (var i = 0; i < data.length; i++) {
				if (i == 0) {
					html += '<li class="on"><a href="二级页面.html"><img src="'+data[i].banner[0].src +'"></a></li>';
					html1 += '<li class="on"></li>';
				}else{
					html += '<li><a href=""><img src="'+data[i].banner[0].src+'"></a></li>"';
					html1 += '<li></li>';
				}
			}
			$("#banner_img").html(html);
			$("#banner_list").html(html1);
		}
	});
	//购物车
	var cookieStr = $.cookie("cargo");
	var arr = eval(cookieStr);
	for(var i in arr){
		if(arr[i].id == "buyCar"){
			// alert(++arr[i].num + 1)
			
			var Num = arr[i].num
			console.log(arr[i].num);
			$("#shopcount").html('('+Num+')');
		}
	}
	//动态添加图片
	$.ajax({
		url:"../data/imglist.json",
		method:"get",
		success:function(data){
			
			var htmlcontent = "";

			for (var i = 0; i < data.length; i++) {
				htmlcontent += '<a href="商品详情页.html" class="img"><div class="show"><img src="'+data[i].src+'" /><div class="hid"></div></div><h3>'+data[i].h3+'</h3><p>'+data[i].p+'</p></a>';
			}
			$("#activityImgList").html(htmlcontent);
		}
	});
	//动态添加Nav
	$.ajax({
		url:"../data/nav.json",
		method:"get",
		success:function(data){
			
			for (var i = 0; i < data.length; i++) {
				var html = '';
				html += '<a href="">'+ data[i].title+'</a>';
				$(".nav_show").eq(i + 1).html(html);
			}
		}
	})
	/*$("#navList").on("mouseenter",".nav_show",function(){
		// alert($(this).index());
		var iNow = $(this).index() - 1;
		// alert(iNow);
		$.ajax({
			url:"../data/nav.json",
			method:"get",
			success:function(data){
				for (var i = 0; i < data[iNow].content1.length; i++) {
					var html = '';
					if (i == 0) {
						html += '<h4>'+data[iNow].content1[0]+'</h4>';
					}else{
						html += '<a href="">'+data[iNow].content1[i]+'</a>';
					}
					$(".content1").html(html);
				}

			}
		})

	})
	*/
/*	$.ajax({
		url:"../data/data.json",
		method:"get",
		success:function(data){
			var html ='';
			for(var i = 0 ;i < data.length; i ++){
				html += '<div class="nav_show"><a href="" style="color:#f8a120">' + data[i].title +'</a></div>';
			}
			$("#navList").html(html);
		}
	})*/

	$("#navList").on("mouseenter",".nav_show",function(){
		// alert($(this).index());
		$("#content").css("display", "block");
		var iNow = $(this).index() - 1;
		if (iNow >= 0) {
					var html1 ='',html2 = '',html3 = '',html = '';
			$.ajax({
			url:"../data/nav.json",
			method:"get",
			success:function(data){
				for(var i = 0; i < data[iNow].content1.length; i++){
					if (i == 0) {
						html1 += '<h4>'+data[iNow].content1[0]+'</h4>';
					}else{
						html1 += '<a href ="#">' + data[iNow].content1[i] + '</a>';
					}
					
				}
				$(".content1").html(html1);
				for(var j = 0; j < data[iNow].content2.length; j++){

					if (j == 0) {
						html2 += '<h4>'+data[iNow].content2[0]+'</h4>';
						// alert(data[iNow].content2[0]);
					}else{
					 	html2 += '<a href ="#">' + data[iNow].content2[j] + '</a>';
					}
				}
				$(".content2").html(html2);
				for(var k = 0; k < data[iNow].content3.length; k ++){
					 if (k == 0) {
						html3 += '<h4>'+data[iNow].content3[0]+'</h4>';
						// alert(data[iNow].content2[0]);
					}else{
					 	html3 += '<a href ="#">' + data[iNow].content3[k] + '</a>';
					}
				}
				$(".content3").html(html3);
				
			}
			})
		}else if(iNow == -1){
			$("#content").css("display", "none");
		}
		// alert(iNow)

	})
			//完美移入移除
	$(".nav_show").on("mouseleave",function(){
		$("#content").on("mouseenter",function(){
			$("#content").css("display", "block");

		})
		$("#content").on("mouseleave",function(){
			$("#content").css("display", "none");
		})
		$(".nav_show").on("mouseleave",function(){
				$("#content").css("display", "none");
		})
		
	})

	$(".nav_show").eq(0).on("mouseenter",function(){
		$("#content").css("display", "none");
	})


	//动态添加页面底部的轮播图
	$.ajax({
		url:"../data/down.json",
		method:"get",
		success:function(data){
			// alert(1);
			var html = '';
			for (var i = 0; i < data.length; i++) {
				// alert(data[i].src);
				if (i == 0) {
					html += '<li class="active"><a href=""><img src="'+data[0].src +'"></a></li>';
				}else{
					html += '<li><a href=""><img src="'+data[i].src +'"></a></li>';
				}
				
			}
			$("#downlist").html(html);
		}
	})
	//底部轮播图轮播
	var iNow = 0;
	var time = null;
	time = setInterval(function(){
		if (iNow < $("#downlist li").length - 1) {
			iNow++;
		}else{
			iNow = 0;
		}
		// console.log(iNow)
		goGOGO(iNow);
	},6000);
	//点击转换事件
	$(".slide_left").on("click", function(){
		if (iNow == 0) {
			$("#downlist").animate({left:-(iNow)*1200},1000);
		}else{
			$("#downlist").animate({left:-(iNow - 1)*1200},1000);
		}
		
		if (iNow <= 0) {
			iNow = 0;
		}else{
			iNow = iNow - 1;
		}
		timer();
		console.log(iNow)
		
	})
	$(".slide_right").on("click", function(){
		if (iNow == $("#downlist li").length - 1) {
			$("#downlist").animate({left:-(iNow)*1200},1000);
		}else{
			$("#downlist").animate({left:-(iNow + 1)*1200},1000);
		}
		if (iNow <= $("#downlist li").length - 1) {
			iNow = iNow + 1;
		}else{
			iNow = $("#downlist li").length - 1;
		}
		
	})

	//封装一个轮播函数
	function goGOGO(num){
		$("#downlist li").attr("class", "");
		$("#downlist li").eq(num).attr("class", "active");
		$("#downlist").animate({left:-num * 1200},1000,function(){
			// if (num ==) {}
		})
	}




	/*$.ajax({
		url:"../data/imglist.json",
		method:"get",
		success:function(data){
			alert(1);
			var htmlcontent = "";

			for (var i = 0; i < data.length; i++) {
				htmlcontent += '<a href="" class = "img"><div class = "show"><img src="'+data[i].src+'" /><div class = "hid"></div></div><h3>'+data[i].h3+'</h3><p>'+data[i].p+'</p></a>'
			}
			$("#activityImgList").html(htmlcontent);
		}
	});*/






	var index = 0;
	var timer = null;
	timer = setInterval(function(){
		if (index < $("#banner_img li").length - 1) {
			index++;
		}else{
			index = 0;
		}
		changeTo(index)
	},4500);

	//banner左点击
	$("#banner_left").click(function(){
		//点击时往左移动一个
		if (index == 0) {
			index = $("#banner_img li").length;
		}
		changeTo(index - 1);
		
		index = index - 1;

	});
	//banner右点击
	$("#banner_right").click(function(){
		//点击时右移动一个
		if (index == $("#banner_img li").length - 1) {
			index = -1;
		}
		changeTo(index + 1);
		
		index = index + 1;
	});
	//banner下点击
	
	$("#banner_list").on("click", "li", function(){
		var iNow = $(this).index();
		changeTo(iNow);
	})
	
	function changeTo(num){
		
		$("#banner_img li").attr("class", "").css("opacity", "0.6");
		$("#banner_img li").eq(num).animate({opacity:"1"},700).addClass("on");
		
		$("#banner_list li").attr("class", "");
		$("#banner_list li").eq(num).attr("class", "on").animate({opacity:"1"},700);
	}
})




