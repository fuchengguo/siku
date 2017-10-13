$(function(){
	$(".register_username").on("focus", function(){
		$(this).css("box-shadow", "0 1px 1px rgba(0,0,0,.075),0 0 5px rgba(240,157,5,.4)").css("border", "1px solid red");
		$("#pleasePhone").css("color", "#999").css("font-weight", "normal");
		$("#importPassword").css("display", "none")
	})
	$("#register_username").on("blur", function(){
		$(this).css("box-shadow", "");
		$("#pleasePhone").css("color", "red").css("font-weight", "bold");
		
		var oValue = this.value.replace(/\s/ig, "");
		// alert(oValue)
		this.value = oValue;
		var checkPhone = /^1\d{10}$/;
		var checkEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		if (this.value.length == 0) {
			$("#pleasePhone").html("请输入用户名");
		}else if (oValue.length > 25 || oValue.length < 4) {
			$("#pleasePhone").html("用户名长度应为4~25个字符");
		}else if(!(checkPhone.test(oValue) || checkEmail.test(oValue))){
			$("#pleasePhone").html("请输入正确的手机号或者邮箱");
		}else if(checkPhone.test(oValue) || checkEmail.test(oValue)){
			$("#pleasePhone").css("display", "none");
		}
		
	})
	$("#register_password").on("blur", function(){
		$("#importPassword").css("display", "block").css("color", "red");
		// alert(this.value.length)
		if (this.value.length == 0) {
			$("#importPassword").html("请输入密码");
		}else if (this.value.length > 25 || this.value.length < 6) {
			$("#importPassword").html("密码的长度只能在6~25位之间");
		}else{
			$("#importPassword").css("display", "none");
		}
		

	})
	$("#beSurePassword").on("blur", function(){
		
		$("#importPassword2").css("display", "block").css("color", "red");
		if (this.value.length == 0) {
			$("#importPassword2").html("请再次确认密码");
		}else if (this.value != $("#register_password").val()) {
			$("#importPassword2").html("两次密码输入不一致，请重新输入");
		}else{
			$("#importPassword2").css("display", "none");
		}

	})
	//注册
	$("#submit").on("click",function(){
		var data = `${$("#register_username")[0].name}=${$("#register_username")[0].value}&${$("#register_password")[0].name}=${$("#register_password")[0].value}`;

		data += "&status=register";

		$.ajax({
			method: "post",
			url: "http://datainfo.duapp.com/shopdata/userinfo.php",
			data: data,
			success: function(data){
				if(data == 0){
					alert("用户名重名")
				}else if(data == 2){
					alert("数据库报错");
				}else{
					//成功
					alert("注册成功");
				}
			}
		})
		alert(data);
		// alert(1);
		// alert($("#register_username")[0].name);
	})
	
	var isClick = false;
	$("#requestCheck").on("click", function(){
		isClick = !isClick;
		if (!isClick) {
			$("#requestCode").css("display", "none");
		}else if(isClick){
			$("#requestCode").css("display", "block");
		}
		
	})
})