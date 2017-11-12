// JavaScript Document 
 function addLoadEvent(func){  
        var oldonload = window.onload;  //将现有的事件处理函数的值存入变量中
        if( typeof window.onload != 'function'){  
            window.onload = func;  //如果这个事件处理函数没有绑定任何函数，就把新函数添加给它
            }  
        else{  
            window.onload = function(){  
                oldonload();  
                func();  //如果已经绑定了函数，就把新函数追加到现有指令的末尾
                }  
            }  
   }  
        var loginfrom="";
        var type=1;
        jQuery(function(){
            $("#txtPassword,#txtPassword1").keydown(function(){
                if(event.keyCode==13){
                    login();
                }
            });
            $("#txtEmail").keydown(function(){
                if(event.keyCode==13){
                    if(type!=1)
                        $('#accountBox.textbox').find('input[type=password]').focus();
                }
            });
        })
        function fromwhere() {
            var reg = new RegExp("(^|&)" + "from" + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
            
        function login() {
            var email="";
            var password="";
            if(type==1){
                email = $("#buser").find("span").html();
                password = $("#txtPassword").val();
            }else
            {
                email = $("#txtEmail").val();
                password = $("#txtPassword1").val();
            }
            var ischeck=1;
            if(password=="")
    		{			
                alert("密码不能为空！");
				return;
			}
            var from=fromwhere();//获取url的from参数是在web还是客户端登陆
            if(loginfrom=="2")
            {
                from=1;
            }
            else
            {
                from=2;
            }
            apiUserLogin(email, password,ischeck,from);
        }
        
        
        
var record = true; //是否有帐号记录
jQuery(function(){
    var datas = "method=GetLoginUserList";
    jQuery.ajax({
        type:"POST",
        url:"/Service/TestCaseService.ashx",
        data:datas,
        success:function(msg){
            var obj=jQuery.parseJSON(msg);
            var html="";
            var dhtml="";
            for(var i=0;i<obj.length;i++)
            {
                html+='<li onClick="accountClick(\''+obj[i].email+'\',\''+obj[i].name+'\',\''+obj[i].headimg+'\',\''+obj[i].status+'\')">';
                html+='<div class="avatar"><img src="'+obj[i].headimg+'" /></div>';
                html+='</div><div class="info"><p class="name">'+obj[i].name+'</p><p class="mail">'+obj[i].email+'</p>';
                html+='<p class="staus">'+obj[i].status+'</p></div></li>';
                
                dhtml+='<li><div class="icon-delete" onClick="deleteClick(\''+obj[i].email+'\')"></div><div class="avatar">';
                dhtml+='<img src="'+obj[i].headimg+'" /></div><div class="info"><p class="name">'+obj[i].name+'</p>';
                dhtml+='<p class="mail">'+obj[i].email+'</p><p class="staus">'+obj[i].status+'</p></div></li>';
            }
            html+='<li onClick="otherAccount()"><div class="avatar"><img src="/Templates/Default/images/avatar.png" /></div>使用其他帐号</li>';
            $(".users").html(html);
            $(".deleteusers").html(dhtml);
            if(obj.length<1)
            {
                record=false;
                type=0;
            }
            if(record==true){
    			$('#accountRecord').show();
				$('#accountBox').hide();
			}else{
				$('#accountRecord').hide();
				$('#accountBox').show();
			};
			
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
			
			//获得焦点
			if(record!=true){
				$('#accountBox .textbox').find('input[type=text]').focus();
			};
			$('.operate').on('click','span',function(e){
				$(this).siblings('.btnBox').fadeToggle(300);
				e.stopPropagation();
			});
			
			$(document).on('click',function(){
				$('.operate').find('.btnBox').fadeOut(300);
			});
        }
    })
})
    

				
		var bugdoneLogin = $('.bugdoneLogin');
		var boxWrap = $('.box-wrap');
		var speed = 300;
        
		
		
		//有帐号记���，点击账户名称进入
		function accountClick(email,name,headimg,status){
            $(".nicescroll-rails").hide();
            type=1;
            var islog=1;
            
            var from=fromwhere();//获取url的from参数是在web还是客户端登陆
            if(loginfrom=="2")
            {
                from=1;
                            }
            else
            {
                from=2;
                            }
            if(status=="已登录"){
                jQuery.get("/Service/BugListService.ashx?time=" + new Date().toString(),
                {
                    Method: 'GetUserInfo',
                    IsLog: '1',
                    from:from
                }, function (data, textStatus) {
                    if (textStatus == "success") {
                        var result = JSON.parse(data);
                        if (result!= "1") {
                            
                            layer.msg('登录中...');
                            setTimeout(function () { 
                                window.location.href = "/projects";
                            }, 500);
                        }else
                        {
                            layer.msg('你的账号被禁用或者密码已修改,请重试');
                        }
                    }
                    else {
                        layer.msg('Failed to connect!');
                    }
                });
            }else
            {
                $("#buser").find("h4").text(name);
                $("#buser").find("span").html(email);
                $("#buser").find("img").attr('src',headimg); 
                
    			bugdoneLogin.find('.load-bar,.gray-bg').fadeIn(speed);
        		bugdoneLogin.find('.load-bg').animate({left:'100%'},500).animate({left:'-100%'},0).animate({left:'25%'},500);
    			setTimeout(function(){
    				bugdoneLogin.find('.load-bar,.gray-bg').fadeOut(speed);
    								
    				var mLeft = $('#accountBox').width()+$('#accountRecord').width();
    				if($('#accountBox').css('display')=='none'||$('#accountRecord').css('display')=='none'){
    					mLeft = $('#accountRecord').width();
    				};
    				boxWrap.animate({marginLeft:'-'+mLeft},speed);				
    			},500);
    			setTimeout(function(){
    				$('#passwordBox .textbox').find('input[type=password]').focus();
    			},1200);
            }
		};
		
		//其他方式登录
		function otherAccount(){
            $(".nicescroll-rails").hide();
            type=0;
			$('#accountBox').show();
			prevStep('next');
		};

		//已填写帐号，但按下拉返回上一步
		function prevStep(type){
            if(type=="back")
            {
                $("#ascrail2001,#ascrail2000").show();
            }
            bugdoneLogin.find('.load-bar,.gray-bg').fadeIn(speed);
    		bugdoneLogin.find('.load-bg').animate({left:'25%'},0).animate({left:'100%'},500).animate({left:'-100%'},0).animate({left:'50%'},500);
			
			setTimeout(function(){
				bugdoneLogin.find('.load-bar,.gray-bg').fadeOut(speed);
				
				var mLeft = $('#passwordBox').width();
				if($('#accountBox').css('display')=='none'||$('#accountRecord').css('display')=='none'){
					mLeft = 0;
				};
				boxWrap.animate({marginLeft:'-'+mLeft},speed);
				
			},500);
			setTimeout(function(){
				$('#accountBox .textbox').find('input[type=text]').focus();
			},1200);
		};
        
        function ycClick(){
    		$('.select-account').hide();
			$('.yc-account').show();
		};
		function ycFinished(){
			$('.select-account').show();
			$('.yc-account').hide();
		};
		function deleteClick(mail){
			$('.yc-box').find('#mail').html(mail);
			$('.yc-box-bg,.yc-box').fadeIn(300);
			
		};
		
		function cancelYc(){
			$('.yc-box-bg,.yc-box').fadeOut(300);
		};
		
        function removelist(){
            var email=$("#mail").html();
            var datas = "method=DeleteUserRecord&email="+email;
            jQuery.ajax({
                type:"POST",
                url:"/Service/TestCaseService.ashx",
                data:datas,
                success:function(msg){
                    var obj=jQuery.parseJSON(msg);
                    var html="";
                    var dhtml="";
                    for(var i=0;i<obj.length;i++)
                    {
                        html+='<li onClick="accountClick(\''+obj[i].email+'\',\''+obj[i].name+'\',\''+obj[i].headimg+'\',\''+obj[i].status+'\')">';
                        html+='<div class="avatar"><img src="'+obj[i].headimg+'" /></div>';
                        html+='</div><div class="info"><p class="name">'+obj[i].name+'</p><p class="mail">'+obj[i].email+'</p>';
                        html+='<p class="staus">'+obj[i].status+'</p></div></li>';
                        dhtml+='<li><div class="icon-delete" onClick="deleteClick(\''+obj[i].email+'\')"></div><div class="avatar">';
                        dhtml+='<img src="'+obj[i].headimg+'" /></div><div class="info"><p class="name">'+obj[i].name+'</p>';
                        dhtml+='<p class="mail">'+obj[i].email+'</p><p class="staus">'+obj[i].status+'</p></div></li>';
                    }
                    html+='<li onClick="otherAccount()"><div class="avatar"><img src="/Templates/Default/images/avatar.png" /></div>使用其他帐号</li>';
                    $(".users").html(html);
                    $(".deleteusers").html(dhtml);
                    cancelYc();
                }
            })
        }
		
		$(function(){
			//自定义滚动条
			$("body").niceScroll({  
			cursorcolor:"#c2c2c2",  
			cursoropacitymax:1,  
			touchbehavior:false,  
			cursorwidth:"10px",  
			cursorborder:"0",  
			cursorborderradius:"30px"  
			}); 
            
            $("#recordBox").niceScroll({  
    		cursorcolor:"#c2c2c2",  
			cursoropacitymax:1,  
			touchbehavior:false,  
			cursorwidth:"7px",  
			cursorborder:"0",  
			cursorborderradius:"30px"  
			}); 
			
		});
		
    
    
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?dc4ac6b7522bb46178f7f41bd6410098";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();


(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

    