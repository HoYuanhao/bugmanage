$('.textbox').find('input[type=password]').focus(function(){
				$(this).siblings('.lined').addClass('lined-on');
				$(this).siblings('.text-tit').removeClass('text-tit-color').addClass('text-tit-focus');
			}).blur(function(){
				if(jQuery.trim($(this).val())==''){
					$(this).siblings('.lined').removeClass('lined-on');
					$(this).siblings('.text-tit').removeClass('text-tit-focus');
				}else{
					$(this).siblings('.lined').removeClass('lined-on');
					$(this).siblings('.text-tit').addClass('text-tit-color');
				};
			});	
            $('.textbox').find('input[type=text]').focus(function(){
    			$(this).siblings('.lined').addClass('lined-on');
				$(this).siblings('.text-tit').removeClass('text-tit-color').addClass('text-tit-focus');
			}).blur(function(){
				if(jQuery.trim($(this).val())==''){
					$(this).siblings('.lined').removeClass('lined-on');
					$(this).siblings('.text-tit').removeClass('text-tit-focus');
				}else{
					$(this).siblings('.lined').removeClass('lined-on');
					$(this).siblings('.text-tit').addClass('text-tit-color');
				};
			});	
/*弹出选项框*/
$(document).ready(function(){
	$('.btnBox').hide();
});
$('.operate').on('click','span',function(e){
				$(this).siblings('.btnBox').fadeToggle(300);
				e.stopPropagation();
	});
	$(document).on('click',function(){
				$('.operate').find('.btnBox').fadeOut(300);
			});
function login(){
	
	 var regex=/^\w+@\w+.\w+$/;  // /^(.+)@(.+)$/
	 var email=document.getElementById("txtEmail");
	 if(!email.value){
	 	alert("请输入您的邮件地址.");
	 	return  false;
	 }
	 else if(!regex.test(email.value)){
	 	alert("该地址不合法！请重新输入.");
	 	return false;
	 }
	 var password1=document.getElementById('txtPassword1');
	 if(!password1.value){
	 	alert("请输入您的密码.");
	 	return false;
	 }else {
            $.ajax({
                type: "get",
                url: "/bugmanage/user/login?password="+$("#txtPassword1").val()+"&email="+$("#txtEmail").val()+"&code="+$("#txtCode").val(),
                async: false,
                dataType:"Json",
                success: function (data) {
               
                    var result=data;
                    if (result==2) {
                        alert("验证码错误！");
                        window.location.href="/bugmanage/bugdone.html";
                    }
                    else if(result==0){
                    	 alert("账号或密码错误！");
                    	 window.location.href="/bugmanage/bugdone.html";
                    }
                    else if(result==1){
                    window.location.href="/bugmanage/user/index";
                    }else{
                    	alert("其他错误！");
                   	 window.location.href="/bugmanage/bugdone.html";
                    }
                },
                
                error: function ( jqXHR, textStatus,errorThrown) { 
                	alert("服务器繁忙！");
                }
              
                
            });
        }
}
    