$(function(){
	var html = "";
	for (var i = 0; i < 12; i++) {
		html += '<li><div class="epic"><a href=""><img src="../images/shopping/'+ i +'.jpg" style="width: 120px;height: 120px;" /></a></div><div class="ename"><a href="">Baobao Wan/Baobao Wan 小小系列</a></div><div class="eprice"><p><strong>13500</strong>元</p></div></li>'
		
	}
	$(".shop_listimg ul").html(html);
	// alert(html)
	var rightonclick = 0;
	$(".shop_nav span").eq(1).on("click",function(){
		rightonclick++;
		$(".shop_nav span").eq(0).css("display", "block");
		if (rightonclick == 1) {
			$(".shop_listimg ul").css("margin-left","-920px");
		}else if (rightonclick == 2) {
			$(".shop_listimg ul").css("margin-left","-1281px");
			$(this).css("display", "none");
		}
		
	})
	
	$(".shop_nav span").eq(0).on("click",function(){
		rightonclick--;
		// alert(rightonclick)
		$(".shop_nav span").eq(1).css("display", "block");
		var left = $(".shop_listimg ul").css("margin-left");
		if (left == "-920px" || left == "-361px") {
			$(".shop_listimg ul").css("margin-left","0px");
			$(this).css("display", "none");
		}else if (left == "-1281px") {
			$(".shop_listimg ul").css("margin-left","-361px");
		}
	})
	$(document).scroll(function(){
		var t = document.documentElement.scrollTop || document.body.scrollTop; 
		// alert(1);
		// document.title = t;
		if (t < 20) {
			$(".fixBack").css("display", "none");
		}else if(t >= 20){
			$(".fixBack").css("display", "block");
			
		}
	})
	$(".fixBack").on("click",function(){
		$("html,body").animate({ scrollTop: 0},700);
		// alert(scrollTop);
	})
	// window.onscroll = function(){
		
	// 	document.onclick = function(){
	// 		alert(t);
	// 	} 	
	// 	alert(t);
		

	// }
	
	//请求cookie
	$.ajax({
		url: "../data/shop.json",
		type: "GET",
		success: function(data){
			var arr = eval($.cookie("cargo")); 

			if(!arr){
				$(".shop_img").css("display", "block");
			}

			// alert(JSON.stringify(arr));
			var html = "";
			var html1 = "";
			var listNum = 0;
			var listPrice = 0;
			for(var i = 0; i < arr.length; i++){
					html += '<tr class="addChecked"><td><input type="checkbox" checked class="is"></td><td><img src="'+data[0].src+'" alt=""></td><td><a href="">'+data[0].title+'</a></td><td>中国大陆</td><td><span>￥</span>'+data[0].price+'</td><td><div id="shopSub" >-</div><input type="text" class="numContent" value="'+(arr[i].num)+'"><div id="shopAdd" >+</div></td><td>￥<strong id="shopPrice">'+(data[0].price)*(arr[i].num)+'</strong>元</td><td id="delete"><a href="###" >删除</a></td>';
					listNum += arr[i].num;
					listPrice += (data[i].price)*(arr[i].num);
			}
			html1 = '<p class="numContent">商品数量统计：'+listNum+'件</p><p>包装数量统计：0件</p><p>返利库币：0库币</p><p>商品金额总计（不含税金和运费）：<strong id="shopListPrice">'+ listPrice +'</strong></p><p><a href="主页.html">继续购物</a><a href="">立即结算</a></p>';
			$("#shoplist").html(html);
			$(".cartPrice").html(html1);
			$(".cartNav").css("display","block");
			$(".carBox").css("display","block");

		}
	})
	//删除商品
	$("#shoplist").on("click","#delete",function(){
		$(".cartpop").css("display","block");
		var this_ = $(this);
		$(".cartpop").css("left",$(this).offset().left).css("top",$(this).offset().top + $(".cartpop").height());
		$("#deleteSure").on("click",function(){
			$.cookie("cargo",null);
			this_.parent().remove();
			$(".cartpop").css("display","none");
			
			if ($(".is").length == 0) {

				$(".cartPrice").remove();
				$(".cartNav").remove();
				$(".carBox").remove();
				$(".shop_img").css("display", "block");

			}

			
		})
	})
	$("#deleteCancel").on("click",function(){
		$(".cartpop").css("display","none");
	})
		//添加
	$("#shoplist").on("click","#shopAdd",function(){
		var cookieStr = $.cookie("cargo");
		var arr = eval(cookieStr);
		for(var i in arr){
			if(arr[i].id == "buyCar"){
				// alert(++arr[i].num + 1)
				arr[i].num ++;
				var Num = arr[i].num;
				console.log(arr[i].num);
				$(".numContent").val(Num);
				// alert(arr[i].num)
				$.ajax({
					url: "../data/shop.json",
					type: "GET",
					success: function(data){
						for (var i in arr) {
							if(arr[i].id == "buyCar"){
								$("#shopPrice").html((data[0].price)*(arr[i].num))
							}
						}
						
						
						
						var listNum = 0;
						var listPrice = 0;
						for(var i = 0; i < arr.length; i++){
								listNum += arr[i].num;
								listPrice += (data[0].price)*(arr[i].num);
						}
						$(".numContent").html('商品数量统计：'+ listNum + '件');
						$("#shopListPrice").html(listPrice);
					}
				})
			}
		}
		$.cookie("cargo", JSON.stringify(arr), {expires: 7});

	})
	$("#shoplist").on("click", "#shopSub",function(){
		var cookieStr = $.cookie("cargo");
		var arr = eval(cookieStr);
		
		for(var i in arr){
			if(arr[i].id == "buyCar"){
				arr[i].num--
				if (arr[i].num <= 0) {
					arr[i].num = 1;
				}
				var Num = arr[i].num

				$(".numContent").val(Num);
				$(".numContent").html('商品数量统计：'+ Num + '件');
				$.ajax({
					url: "../data/shop.json",
					type: "GET",
					success: function(data){
						for (var i in arr) {
							if(arr[i].id == "buyCar"){
								$("#shopPrice").html((data[0].price)*(arr[i].num))
							}
						}
						var listNum = 0;
						var listPrice = 0;
						for(var i = 0; i < arr.length; i++){
								listNum += arr[i].num;
								listPrice += (data[0].price)*(arr[i].num);
						}
						$(".numContent").html('商品数量统计：'+ listNum + '件');
						$("#shopListPrice").html(listPrice);
						
					}
				})
			}
		}
		$.cookie("cargo", JSON.stringify(arr), {expires: 7});
		var this_ = $(this);
		
		if (Num <= 1) {
			$(".cartpop").css("display","block");
			$(".cartpop").css("left",$(this).offset().left).css("top",$(this).offset().top + $(".cartpop").height()/2)
		}

		// $(".cartpop").on("click", "#deleteSure", function(){
		// 	$.cookie("cargo",null);
		// 	this_.parent().parent().css("display","none");
		// 	$(".cartpop").css("display","none");
		// 	$(".shop_img").css("display", "block")
		// 	if ($(".is").length == 0) {
				
		// 		$(".shop_img").css("display", "block");
		// 		$(".cartNav").css("display","none");
		// 		$(".carBox").css("display","none");
		// 		$(".cartPrice").remove();
		// 		$(".cartNav").remove();
		// 		$(".carBox").remove();
				
		// 	}
		// })
		$("#deleteSure").on("click",function(){
			$.cookie("cargo",null);
			this_.parent().parent().remove();
			$(".cartpop").css("display","none");
			
			if ($(".is").length == 0) {
				// alert(1);
				$(".cartPrice").remove();
				$(".cartNav").remove();
				$(".carBox").remove();
				$(".shop_img").css("display", "block")

			}

			
		})



	})
//全选按钮
	// $("#nail").prop("checked",true)；

	$("#nail").on("click",function(){
		// alert(1);
		// // alert(isChecked)
		// alert($(this).is(":checked"))
		if ($(this).is(":checked")) {
			$(".is").prop("checked",true);
			$(".is").parent().parent().css("background","#fdf0ef");
		}else{
			$(".is").prop("checked",false);
			$(".is").parent().parent().css("background","#fff");
		}
		
	})
	
	$("#shoplist").on("click",".is",function(){
		
		if ($(this).is(":checked")) {
			$(this).parent().parent().css("background","#fdf0ef");
		}else{
			$(this).parent().parent().css("background","#fff");
		}

		
		// alert(yes);
		if (!$(this).is(":checked")) {
			$("#nail").prop("checked",false);
			// alert(1);
		}
		if ($(".is").not(":checked").length == 0) {
			$("#nail").prop("checked",true);
		}


	})
	
	
})

// function changeColor(node){
	
// 	if (isColor) {
// 		$("#nail").prop("checked",false);
// 		node.parent().parent().css("background","#fff")
	
// 	}else{
// 		node.parent().parent().css("background","#fdf0ef")
// 	}
// 	isColor = !isColor;
// }