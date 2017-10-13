$(function(){
	$("#login_title").on("click", "li", function(){
		// alert($(this).index())
		$(this).css("color", "#f19108");
		$(this).siblings("li").css("color", "#666");
		if ($(this).index() == 0) {

			$("#qrbox").css("display", "block");
			$("#login").css("display", "none");
		}else if($(this).index() == 1){
			$("#login").css("display", "block");
			$("#qrbox").css("display", "none");
		}
	});
	$("#login_password").on("focus", function(){
		$(".login_verify").css("display", "block");
		$(".login_second i").css("background-position", "-19px -20px");
		// alert($("#login_password").val())
		$("#login_password").css("border", "1px solid rgb(255, 173, 119)").css("box-shadow","0 1px 1px rgba(0,0,0,.075),0 0 5px rgba(240,157,5,.4)");
	});
	$("#login_password").on("blur", function(){
		$(".login_second i").css("background-position", "0px -20px");
		$("#login_password").css("border", "1px solid rgb(222, 222, 222)").css("box-shadow","");
	});
	$("#login_username").on("focus", function(){
		$(".login_first i").css("background-position", "-19px 0px");
		$(this).css("border", "1px solid rgb(255, 173, 119)").css("box-shadow","0 1px 1px rgba(0,0,0,.075),0 0 5px rgba(240,157,5,.4)");
	});
	$("#login_username").on("blur", function(){
		$(".login_first i").css("background-position", "0px 0px");
		$(this).css("border", "1px solid rgb(222, 222, 222)").css("box-shadow","");
	});
	$("#verifyText").on("focus", function(){
		$(this).css("border", "1px solid rgb(255, 173, 119)").css("box-shadow","0 1px 1px rgba(0,0,0,.075),0 0 5px rgba(240,157,5,.4)");
	})
	$("#verifyText").on("blur", function(){
		$(this).css("border", "1px solid rgb(222, 222, 222)").css("box-shadow","");
	})
	$("#verify").html(authCode(4));
	$("#verify").on("click", function(){
		$("#verify").html(authCode(4));
	});
	$("#change").on("click", function(){
		$("#verify").html(authCode(4));
	});
	$("#login_submit").on("click", function(){
		// alert($("#verifyText").val())
		if ($("#verifyText").val() != $("#verify").html()) {
			$(".error").css("display", "block").html("验证码错误！");
		}else if($("#verifyText").val() == ""){
			$(".error").css("display", "block").html("请输入验证码！");
		}else if($("#verifyText").val() == $("#verify").html()){
			$(".error").css("display", "none")
		}
		
		var data = `${$("#login_username")[0].name}=${$("#login_username")[0].value}&${$("#login_password")[0].name}=${$("#login_password")[0].value}`;

		data += "&status=login";
		$.ajax({
			method: "post",
			url: "http://datainfo.duapp.com/shopdata/userinfo.php",
			data: data,
			success: function(data){
				if(data == 0){
					alert("用户名不存在")
				}else if(data == 2){
					alert("用户名与密码不符");
				}else{
					//成功
					alert("登陆成功");
				}
			}
		})




	})
	//登陆
	


});
//随机验证码函数
function authCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var num = parseInt(Math.random() * 100);
		if(num >= 0 && num < 10){
			arr.push(num);
		}else if(num >= 10 && num <= 35){
			arr.push(String.fromCharCode(num + 87));
		}else if(num >= 65 && num <= 90){
			arr.push(String.fromCharCode(num));
		}else{
			//无用数
			i--;
			continue;
		}
	}
	return arr.join("");
}