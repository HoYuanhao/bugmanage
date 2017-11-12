        var loginfrom=1;
        var canaddproject="0";
        $(function () {
                        loginfrom="";
            apiGetUserInfo();
            getcanaddproject();
            var screenHeight = window.screen.height;
            if(screenHeight <= 864){
                iPWidth = "55%";
                iPHeight = "90%";
                projectWidth = "70%";
                projectHeight = "90%"
                bugTalkW = "50%"
                bugTalkH = "90%"
            }
        });
        
        var iPWidth = "828px";
        var iPHeight = "644px"
        var projectWidth = "888px";
        var projectHeight = "633px";
        var bugTalkW = "864px",bugTalkH="682px";
        function getinvitelist(){
            var datas = "method=GetInviteList";
            NProgress.start();
            jQuery.ajax({
                type:"POST",
                url:"/Service/UserPackageService.ashx",
                data:datas,
                success:function(msg){
                    var obj=jQuery.parseJSON(msg);
                    bindinvitelist(obj,0,0);
                    NProgress.done();
                }
            })
        }
        function bindinvitelist(datas){
            
        }
        
        function getcanaddproject(){
            var datas = "method=CanCreateProject";
            jQuery.ajax({
                type:"POST",
                url:"/Service/UserPackageService.ashx",
                data:datas,
                success:function(msg){
                    var obj=jQuery.parseJSON(msg);
                    if(obj.result>0)
                        canaddproject=0;
                    else if(obj.result==0){
                        setTimeout(function () { 
                            if(loginfrom==2)
                            {
                                window.location.href = "/login?from=1";
                                //调用客户端方法
                            }else
                            {
                                window.location.href = "/login";
                            }
                        }, 500);
                    }
                    else
                        canaddproject=obj.count;
                }
            })
        }
        function btnClose_Click() {
            var index = parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
        }        
        
        //关于
        function openPackages(){
            showDialogWH("用户套餐", "/packages", iPWidth, iPHeight);
    	};
                
                function bindUserInfo(datas) {
            var defaultPId = "438880d3-a0fd-4bc3-ac27-13f849194545"
            if(datas.PackageId != "" && datas.PackageId != null && datas.PackageId != defaultPId)
                $("#userPackage").css("color","green")
            $("#imgUser").attr("src", datas.HeadImgUrl);
            $("#imgUser").attr("alt", datas.RealName);
            $("#imgUser").removeClass("loaduser");
            $(".loaduserdiv").removeClass("loaduserdiv");
            $("#imgUserEdit").attr("src", datas.HeadImgUrl);
            $("#imgUserEdit").attr("alt", datas.RealName);
            $("#lblUser").text(datas.RealName);
            $("#hidCurrentUserId").val(datas.UserId)
            
            var i=datas.ProjectTabShow-1;
            if(typeof(i)!="undefined"){                
                $('#tabShow').find('li').eq(i).addClass('on').siblings().removeClass('on');
                $('#tabBox').find('.p-cont').eq(i).fadeIn(300).siblings().removeClass('animated bounceInUp').hide();       
                jQuery.cookie('bugdone_tabchange', i, { expires: 100 }); 
            }
            
            GetProjects(1);
        }
                
        var screenType = 1;
        var iconType = 0;
        function GetProjects(type) {
            screenType = type;
            $("#type0").text($("#type" + type).text());
            $("#types").find("a").removeClass("on");
            $("#type" + type).addClass("on");
            $("#hidtype").val(type);
            apiGetProjects();
        }
        function bindProjects(datas) {
            var bigHtml = "";
            var smaHtml = "";
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].ProjectImg == null || datas[i].ProjectImg == "") {
                    datas[i].ProjectImg = "/images/logo/logoshort0.png";
                }
                bigHtml += '<li class="bs-08 ui-state-default" projectId="'+datas[i].ProjectId+'" style="position:relative;">';
                if (datas[i].LoginUserId != datas[i].Ownuser)
                    bigHtml += '<span style="color:white;padding:5px;position:absolute;right:0px;top:0px;background:green;border-radius:2px;">'+datas[i].CreateUserName+'创建</span>';
                bigHtml += '    <div class="name"><a href="/ProjectConsole-'+datas[i].ProjectId+'" title="' + datas[i].ProjectName + '">' + datas[i].ProjectName + '</a></div>';
                bigHtml += '    <div class="image bd-e2 b-radius4">';
                bigHtml += '        <a href="/ProjectConsole-'+datas[i].ProjectId+'"><img src="' + datas[i].ProjectImg + '" alt="' + datas[i].ProjectName + '" /></a>';
                bigHtml += '    </div>';                
                bigHtml += '    <div class="info info-1" style="overflow: visible;"><span class="f-l"><font class="f-l color-8">活动问题</font><i class="num n-bg1 f-l">' + datas[i].UnsolvedProblemNum + '</i></span><span class="f-l"><font class="f-l color-8">我的待办</font><i class="num n-bg2 f-l">' + datas[i].OpenProblemNum + '</i></span></div>';
                bigHtml += '    <div class="btn">';
                if (datas[i].Status == 0) {
                    //关闭
                    bigHtml += '        <a href="javascript:void(0)" onclick="openProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-huifu"></i>恢复</a>';
                    bigHtml += '        <a href="javascript:void(0)" onclick="deleteProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-shanchu"></i>删除</a>';
                }
                if (datas[i].Status == 1) {
                    //正常    
                    bigHtml += '        <a href="javascript:void(0)" onclick="changeSetting(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-iconshezhi01"></i>配置</a>';
                    if (datas[i].LoginUserId == datas[i].Ownuser) {
                       
                        bigHtml += '        <a href="javascript:void(0)" onclick="copyProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-fuzhi"></i>复制</a>';
                        bigHtml += '        <a href="javascript:void(0)" onclick="hideProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-yincang"></i>隐藏</a>';
                        bigHtml += '        <a href="javascript:void(0)" onclick="deleteProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-shanchu"></i>删除</a>';
                    } else {
                        bigHtml += '        <a href="javascript:void(0)" onclick="copyProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-fuzhi"></i>复制</a>';
                        bigHtml += '        <a href="javascript:void(0)" onclick="out(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-tuichu1"></i>退出</a>';
                    }
                }
                if (datas[i].Status == 2) {
                    //隐藏
                    bigHtml += '        <a href="javascript:void(0)" onclick="openProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-yincang1"></i>显示</a>';
                }
                bigHtml += '    </div>';
                bigHtml += '</li>';

                smaHtml += '<li class="bs-08 ui-state-default" projectId="'+datas[i].ProjectId+'" style="position:relative;">';
                if (datas[i].LoginUserId != datas[i].Ownuser)
                    smaHtml+=  '<span style="color:white;padding:5px;position:absolute;right:0px;top:0px;background:green;border-radius:2px;">'+datas[i].CreateUserName+'创建</span>';
                smaHtml += '    <div class="name"><a href="/ProjectConsole-'+datas[i].ProjectId+'" title="' + datas[i].ProjectName + '">' + datas[i].ProjectName + '</a></div>';
                smaHtml += '    <div class="image bd-e2 b-radius4">';
                smaHtml += '        <a href="/ProjectConsole-'+datas[i].ProjectId+'"><img src="' + datas[i].ProjectImg + '" alt="' + datas[i].ProjectName + '" /></a>';
                smaHtml += '    </div>';
                smaHtml += '    <div class="info"><span class="f-l"><font class="f-l color-8">活动问题</font><i class="num n-bg1 f-l">' + datas[i].UnsolvedProblemNum + '</i></span><span class="f-l"><font class="f-l color-8">我的待办</font><i class="num n-bg2 f-l">' + datas[i].OpenProblemNum + '</i></span></div>';
                smaHtml += '    <div class="info color-8">' + datas[i].CreateUserName + '创建于 ' + datas[i].strCreateTime + '</div>';
                smaHtml += '    <div class="btn">';
                if (datas[i].Status == 0) {
                    //关闭
                    smaHtml += '        <a href="javascript:void(0)" onclick="openProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-huifu"></i><span><i class="iconfont"></i>恢复</span></a>';
                    smaHtml += '        <a href="javascript:void(0)" onclick="deleteProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-shanchu"></i><span><i class="iconfont"></i>删除</span></a>';
                }
                if (datas[i].Status == 1) {
                    //正常    
                    smaHtml += '        <a href="javascript:void(0)" onclick="changeSetting(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-iconshezhi01"></i><span><i class="iconfont"></i>配置</span></a>';
                    if (datas[i].LoginUserId == datas[i].Ownuser) {
                        
                        smaHtml += '        <a href="javascript:void(0)" onclick="copyProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-fuzhi"></i><span><i class="iconfont"></i>复制</span></a>';
                        smaHtml += '        <a href="javascript:void(0)" onclick="hideProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-yincang"></i><span><i class="iconfont"></i>隐藏</span></a>';
                        smaHtml += '        <a href="javascript:void(0)" onclick="deleteProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-shanchu"></i><span><i class="iconfont"></i>删除</span></a>';
                    } else {
                        smaHtml += '        <a href="javascript:void(0)" onclick="copyProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-fuzhi"></i><span><i class="iconfont"></i>复制</span></a>';
                        smaHtml += '        <a href="javascript:void(0)" onclick="out(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-tuichu1"></i><span><i class="iconfont"></i>退出</span></a>';
                    }
                }
                if (datas[i].Status == 2) {
                    //隐藏
                    smaHtml += '        <a href="javascript:void(0)" onclick="openProject(\'' + datas[i].ProjectId + '\');"><i class="iconfont icon-yincang1"></i><span><i class="iconfont"></i>显示</span></a>';
                }
                smaHtml += '    </div>';
                smaHtml += '</li>';
            }
            $("#ulb").html(bigHtml);
            $("#uls").html(smaHtml);
           /*  $('.p-cont').each(function() {
                $(this).setDrag({
                    target:'li',
                });
            });
            
        setTimeout(function(){
    			$('.p-cont').removeClass('animated bounceInUp')
    		},1000);*/
            
            var $btn;
            $('.p-cont ul li').hover(function () {               
                $(this).find('.info-1 span').addClass('opacity0');
                $btn = $(this).find('.btn');
                $btn.addClass('btn-show');
                
                if(screenType == 1){
                    $( ".p-cont ul").sortable({
                        placeholder: "ui-state-highlight"                   
                    }); 
                    $(".p-cont ul").disableSelection();
                    $( ".p-cont ul").sortable('enable')       
                }
                else{
                    $( ".p-cont ul").sortable('disable')                    
                }
                setTimeout(function(){
            	$('.p-cont').removeClass('animated bounceInUp')
    		},1);
            }, function () {               
                $(this).find('.info-1 span').removeClass('opacity0');
                $btn.removeClass('btn-show');
            });
            if(screenType == 1){
                $('.p-cont ul').find('li').mouseup(function(){                            
			         setTimeout(sortProject,200)
    			});
            }
        }
        
        function sortProject(){
            if(screenType == 1){                
                var projects = {"ItemList":[]};   
                var sn = 1;
                var userId = $("#hidCurrentUserId").val();                
                if(iconType == 0){
                    $("#ulb").children("li").each(function(){
                        var projectId = $(this).attr("projectId");
                        var item = {"UserId":userId,"ProjectId":projectId,"ProjectSequenceNumber":sn};
                        projects.ItemList.push(item)
                        sn++;               
                    })
                }
                else{                   
                    $("#uls").children("li").each(function(){
                        var projectId = $(this).attr("projectId");
                        var item = {"UserId":userId,"ProjectId":projectId,"ProjectSequenceNumber":sn};
                        projects.ItemList.push(item)
                        sn++;               
                    })
                }
                var pJson = "";
                if(projects.ItemList.length > 0)
                    pJson = JSON.stringify(projects);
                    
                apiSortProjects(pJson)  
            }
        }            
        
        function addProject() {
            if(canaddproject=="0")
                showDialogWH("添加项目", "/projectinfo-0",projectWidth,projectHeight);
            else
                layer.msg("你当前的套餐创建项目数量上限为"+canaddproject+",提高套餐等级即可创建更多项目");
        }
        function changeSetting(id) {
            showDialogWH("编辑项目", "/projectinfo-"+id+"",projectWidth,projectHeight);
        }
        function copyProject(id) {
            if(canaddproject=="0")
                showDialogWH("复制项目", "/copyproject-"+id+"", "600px", "600px");
            else
                layer.msg("你当前的套餐创建项目数量上限为"+canaddproject+",提高套餐等级以创建更多项目");
        }
        function out(id){
            layer.confirm('是否退出该项目？', {
                btn: ['确认', '取消'] //按钮
            }, function () {
                jQuery.get("/Service/ProjectService.ashx?time=" + new Date().toString(),
                {
                    Method: 'OutProject',
                    ProjectId:id
                }, function (data, textStatus) {
                    if (textStatus == "success") {
                        var result = JSON.parse(data);
                        if (result.Result== "1") {
                            //成功后的处理
                            GetProjects(1);
                            layer.msg('退出成功',{time:1000});
                        }
                        else {
                            GetProjects(1);
                            layer.msg(result.Message)
                        }
                    }
                    else {
                        layer.msg('Failed to connect!');
                    }
                });
            })
        }
        
        function hideProject(id) {
            apiHideProject(id);
        }
        function closeProject(id) {
            apiCloseProject(id);
        }
        function deleteProject(id) {
            layer.confirm('是否确认删除？被删除后，项目将无法恢复', {
                btn: ['确认', '取消'] //按钮
            }, function () {
                apiDeleteProject(id);
                layer.msg('删除成功',{time:1000})
            })
        }
        function openProject(id) {
            apiOpenProject(id);
        }

        function changeUserEmail() {
            showDialogWH("修改邮箱", "/Templates/Default/dialogUserEmail.html", "400px", "250px");
        }
        function changeUserName() {
            showDialogWH("修改姓名", "/Templates/Default/dialogUserName.html", "400px", "250px");
        }
        function changeUserPassword() {
            showDialogWH("修改密码", "/Templates/Default/dialogUserPassword.html", "400px", "350px");
        }
        function changePhoto() {
            showDialogWH("修改头像", "/uploaduserphoto","562px","527px");   
        }
        function logout() {
            layer.confirm('是否确认退出？', {
                btn: ['确认', '取消'] //按钮
            }, function () {
                //确认时的处理
                apiUserLogout();
            }, function () {
                //取消时的处理                
            });
        }
   
        function opencode(){
            $('.code-grag-bg,.code-system').fadeIn(300);
        }
        function closecode(){
            $('.code-grag-bg,.code-system').fadeOut(300);
        }
        function openlogin(){
            var datas = "method=GetLoginCode";
            jQuery.ajax({
                type:"POST",
                url:"/Service/BugListService.ashx",
                data:datas,
                success:function(msg){
                    if(msg!="-1")
                    {
                        $("#logincodeimg").attr('src',msg); 
                        $('.login-grag-bg,.login-system').fadeIn(300);
                    }else
                    {
                        layer.msg('您还未登陆');
                        setTimeout(function () { 
                            if(loginfrom==2)
                            {
                                window.location.href = "/login?from=1";
                                //调用客户端方法
                            }else
                            {
                                window.location.href = "/login";
                            }
                        }, 500);
                    }
                }
            })
        }
        function closelogin(){
            $('.login-grag-bg,.login-system').fadeOut(300);
        }
        
        //关于
        function aboutClick(){
			$('.about-grag-bg,.about-system').fadeIn(300);
		};
		function closeAbout(){
			$('.about-grag-bg,.about-system').fadeOut(300);
		};
        
        //套餐
        function packageClick(){           
        	$('.package-grag-bg,.package-system').fadeIn(300);
		};
        //关闭套餐
        function closePackage(){
    		$('.package-grag-bg,.package-system').fadeOut(300);
		};
        
        function changetbl(type){
            var datas = "method=ChangeUserTableShow&showtype="+type;
            jQuery.ajax({
                type:"POST",
                url:"/Service/TestCaseService.ashx",
                data:datas,
                success:function(msg){
                    if(msg=="-1")
                    {
                        if(loginfrom==2)
                        {
                            window.location.href = "/login?from=1";
                            //调用客户端方法
                        }else
                        {
                            window.location.href = "/login";
                        }
                    }
                }
            })
        }
    
    
        var priopage=0;
        var mtimepage=0;
        function asideProjectShow(){
            GetFixeddata();
            GetPdate();
            $('.aside-project-click').fadeOut(300);
            $('.aside-project-info').animate({right:0},300);
            $('#ascrail2001').css({left:'inherit'}).show();
        };
        function asideProjectHide(){
            $('.aside-project-info').animate({right:-460},300);
            setTimeout(function(){
                $('.aside-project-click').fadeIn(300);
            },300);
            $('#ascrail2001').hide();
            priopage=0;
            mtimepage=0;
        };
        
        function ChangeLi(index,e){
            if(index==1)
            {
                GetPdate();
                $(e).addClass("active").siblings().removeClass("active");
            }else if(index==2)
            {
                priopage=0;
                GetBugByPriority();
                $(e).addClass("active").siblings().removeClass("active");
            }else if(index==3)
            {
                mtimepage=0;
                GetBugByModityTime();
                $(e).addClass("active").siblings().removeClass("active");
            }
            
        }
        
        function GetFixeddata(){//开头的数据统计和报表
            var datas = "method=getcount";
            jQuery.ajax({
                type:"POST",
                url:"/Service/ProductControlService.ashx",
                data:datas,
                success:function(msg){
                    if(msg!="-1")
                    {
                        var obj=jQuery.parseJSON(msg);
                        $("#cpcount").html(obj.count.CreatePCount);
                        $("#pccount").html(obj.count.PartakeCount);
                        $("#tdcount").html(obj.count.TodoCount);
                        $("#sdcount").html(obj.count.SolvedCount);
                        $("#ctcount").html(obj.count.CreateBCount);
                        BindChart1(obj.rv.rv1);
                    }else
                    {
                        window.location.href = "/login";
                    }
                }
            })
        }
        
        function BindChart1(datas) {
            $("#bugcount").highcharts({
                title: {
                    text: null
                                    },
                xAxis: {
                    categories: eval(datas.categories)
                },
                yAxis: {
                    title: {
                        text: '数量'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '个'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: eval(datas.series)
            })
        }
        function GetPdate(){
            var datas = "method=getprojectbug";
            jQuery.ajax({
                type:"POST",
                url:"/Service/ProductControlService.ashx",
                data:datas,
                success:function(msg){
                    if(msg!="-1")
                    {
                        msg=jQuery.parseJSON(msg);
                        BindPBug(msg);
                    }else
                    {
                        window.location.href = "/login";
                    }
                }
            })
        }
        function BindPBug(datas){
            var html="";
            for(var i=0;i<datas.length;i++)
            {
                html+='<div class="list">';
                if(datas[i].ProjectName.length>16)
                    datas[i].ProjectName=datas[i].ProjectName.substring(0,16)+"...";
                if(datas[i].ProjectImg==""||datas[i].ProjectImg==null)
                    datas[i].ProjectImg="/images/logo/logoshort0.png";
                html+='<div class="name"><span><a href="/mytodolist_'+datas[i].ProjectId+'">查看所有</a>'+datas[i].BugCount+'个</span><img src="'+datas[i].ProjectImg+'" /><strong>'+datas[i].ProjectName+'</strong></div>';
                html+='<ul>';
                for(var j=0;j<datas[i].List.length;j++)
                {
                    if(datas[i].List[j].BugTitle.length>20)
                        datas[i].List[j].BugTitle=datas[i].List[j].BugTitle.substring(0,20)+"...";
                    html+='<li onclick="window.location.href=\'/allbug_'+datas[i].List[j].ProjectId+'/q1/0/'+datas[i].List[j].BugId+'\'"><strong style="display:inline-block">#'+datas[i].List[j].BugCode+'</strong>';
                    if(datas[i].List[j].BugType==1)
                        html+='<span class="text-bg textbg-1">';
                    else if(datas[i].List[j].BugType==2)
                        html+='<span class="text-bg">';
                    else if(datas[i].List[j].BugType==3)
                        html+='<span class="text-bg textbg-3">';
                    else
                        html+='<span class="text-bg textbg-2">';
                    html+=datas[i].List[j].StrBugType+'</span>';
                    if(datas[i].List[j].IsAT>0)
                                                 html+='<span class="atclass" style="color: red;"><i class="iconfont icon-at" style="font-size: 20px;position: relative;top: 3px;"></i></span>';
                    if(datas[i].List[j].PicCount>0)
                        html+='<i class="iconfont icon-tupian" style="margin-left: 5px;"></i>';
                    if(datas[i].List[j].AttachmentCount>0)
                        html+='<i class="iconfont icon-fujian" style="margin-left: 5px;"></i>';
                    html+='<a href="javascript:void(0);" target="_blank" style="margin-left: 5px;">'+datas[i].List[j].BugTitle+'</a></li>';
                }
                html+='</ul>';
                if(datas[i].List.length<5)
                    html+='<div class="changepagediv"><div class="load-more">没有更多了</div></div>';
                else
                    html+='<div class="changepagediv"><div class="load-more" onclick="GetSinglePdate(this,\''+datas[i].ProjectId+'\',2)">加载更多</div></div>';
                html+='</div>';
            }
            $("#bindate").html(html);
            var t=$('#proinfo-cont').scrollTop();
            $('#proinfo-cont').animate({
                'scrollTop':t-1
            })
            heightAuto();
        }
        function GetSinglePdate(e,pid,page){
            var datas = "method=getsinglepbug&pid="+pid+"&page="+page+"&pagesize=5";
            jQuery.ajax({
                type:"POST",
                url:"/Service/ProductControlService.ashx",
                data:datas,
                success:function(msg){
                    if(msg!="-1")
                    {
                        msg=jQuery.parseJSON(msg);
                        BindSinglePBug(e,msg,page);
                        if(msg.length<5)
                        {
                            $(e).closest(".changepagediv").html('<div class="changepagediv"><div class="load-more">没有更多了</div></div>');
                        }
                        else
                            $(e).closest(".changepagediv").html('<div class="changepagediv"><div class="load-more" onclick="GetSinglePdate(this,\''+pid+'\','+(page+1)+')">加载更多</div></div>');
                    }else
                    {
                        window.location.href = "/login";
                    }
                }
            })
        }
        function BindSinglePBug(e,datas,page){
            var html="";
            for(var i=0;i<datas.length;i++)
            {
                if(datas[i].BugTitle.length>20)
                    datas[i].BugTitle=datas[i].BugTitle.substring(0,20)+"...";
                html+='<li onclick="window.location.href=\'/allbug_'+datas[i].ProjectId+'/q1/0/'+datas[i].BugId+'\'"><strong style="display:inline-block">#'+datas[i].BugCode+'</strong><span class="text-bg textbg-2">'+datas[i].StrBugType+'</span><a href="javascript:void(0);" target="_blank">'+datas[i].BugTitle+'</a></li>';
            }
                                                    $(e).closest(".list").find("ul").append(html);
            var t=$('#proinfo-cont').scrollTop();
            $('#proinfo-cont').animate({
                'scrollTop':t-1
            })
        }
        function GetBugByPriority(){
            priopage=priopage+1;
            var datas = "method=getbugbypriority&page="+priopage+"&pagesize=12";
            
            jQuery.ajax({
                type:"POST",
                url:"/Service/ProductControlService.ashx",
                data:datas,
                success:function(msg){
                    if(msg!="-1")
                    {
                        msg=jQuery.parseJSON(msg);
                        if(priopage==1)
                        {
                            var html="";
                            html+='<div class="list"><ul id="priovalue">';
                            html+='</ul>';
                            if(msg.length<12)
                                html+='<div class="load-more" id="prioloadmore">没有更多了</div></div>';
                            else
                                html+='<div class="load-more" onclick="GetBugByPriority()" id="prioloadmore">加载更多</div></div>';
                            $("#bindate").html(html);
                        }
                        BindPrioBug(msg,1);
                    }else
                    {
                        window.location.href = "/login";
                    }
                }
            })
                     
        }
        function BindPrioBug(datas,index){
            var html="";
            for(var i=0;i<datas.length;i++)
            {
                if(datas[i].BugTitle.length>20)
                    datas[i].BugTitle=datas[i].BugTitle.substring(0,20)+"...";
                html+='<li onclick="window.location.href=\'/allbug_'+datas[i].ProjectId+'/q1/0/'+datas[i].BugId+'\'"><strong style="display:inline-block">#'+datas[i].BugCode+'</strong>'
                if (datas[i].Priority == 1)
                    html += '<span class="text-bg textbg-1">';
                else if (datas[i].Priority == 2)
                    html += '<span class="text-bg textbg-2">';
                else if (datas[i].Priority == 3)
                    html += '<span class="text-bg">';
                else
                    html += '<span class="text-bg textbg-3">';
                if(datas[i].ProjectName.length>10)
                    datas[i].ProjectName=datas[i].ProjectName.substring(0,8)+"...";
                html+=datas[i].StrPriority+'</span><span style="padding-left: 10px;font-weight: 600;">'+datas[i].ProjectName+'</span><a href="javascript:void(0);" target="_blank">'+datas[i].BugTitle+'</a></li>';
            }
            if(index==1){
                $("#priovalue").append(html);
                console.log($('#proinfo-cont').scrollTop());
                var t=$('#proinfo-cont').scrollTop();
                $('#proinfo-cont').animate({
                    'scrollTop':t-1
                })
                 console.log($('#proinfo-cont').scrollTop()-1);
                if(datas.length<12)
                    $("#prioloadmore").html("没有更多了");
            }
            else
            {
                $("#mtimevalue").append(html);
                console.log($('#proinfo-cont').height());
                var t=$('#proinfo-cont').scrollTop();
                $('#proinfo-cont').animate({
                    'scrollTop':t-1
                })
                if(datas.length<12)
                    $("#mtimeloadmore").html("没有更多了");
            }
            
        }
        function GetBugByModityTime(){
            mtimepage=mtimepage+1;
            var datas = "method=getbugbymtime&page="+mtimepage+"&pagesize=12";
            jQuery.ajax({
                type:"POST",
                url:"/Service/ProductControlService.ashx",
                data:datas,
                success:function(msg){
                    if(msg!="-1")
                    {
                        msg=jQuery.parseJSON(msg);
                        if(mtimepage==1)
                        {
                            var html="";
                            html+='<div class="list"><ul id="mtimevalue">';
                            html+='</ul>';
                            if(msg.length<12)
                                html+='<div class="load-more" id="mtimeloadmore">没有更多了</div></div>';
                            else
                                html+='<div class="load-more" onclick="GetBugByModityTime()" id="mtimeloadmore">加载更多</div></div>';
                            $("#bindate").html(html);
                        }
                        BindPrioBug(msg,2);
                    }else
                    {
                        window.location.href = "/login";
                    }
                }
            })
        }
        
    
        $(function () {
            heightAuto();
            //自定义滚动条
            $("#scrollCont,#proinfo-cont").niceScroll({
                cursorcolor: "#c2c2c2",
                cursoropacitymax: 1,
                touchbehavior: false,
                cursorwidth: "5px",
                cursorborder: "0",
                cursorborderradius: "6px"
            });
            var i=jQuery.cookie('bugdone_tabchange');
            if(typeof(i)!="undefined"){                
                $('#tabShow').find('li').eq(i).addClass('on').siblings().removeClass('on');
                $('#tabBox').find('.p-cont').eq(i).fadeIn(300).siblings().removeClass('animated bounceInUp').hide();              
            }
            
        });
        
        $(window).resize(function () {
            heightAuto();
        });
        
        function heightAuto() {
            var height = $(window).height() - $('.header').outerHeight();
            $('#scrollCont').height(height)
            $('#proinfo-cont').height(height-45)
        };

        //菜单
        hoverShow('#hoverShow1', '.show-box');
        hoverShow('#hoverShow2', '.show-box');

        //经过显示方法封装5
        function hoverShow(t, object) {
            $(t).hover(function () {
                $(this).find(object).fadeIn(300);
                $(this).find('.icon-arrow-copy').addClass('animated rotate180');
            }, function () {
                $(this).find(object).stop().fadeOut(300);
                $(this).find('.icon-arrow-copy').removeClass('animated rotate180');
            });
        };

        //切换大小图标
        $('#tabShow').on('click', 'li', function () {
            var i = $(this).attr('data-id') - 1;
            iconType = i;
            changetbl(i+1);
            jQuery.cookie('bugdone_tabchange', i, { expires: 100 }); 
            $(this).addClass('on').siblings().removeClass('on');
            $('#tabBox').find('.p-cont').eq(i).fadeIn(300).siblings().removeClass('animated bounceInUp').hide();
             apiGetUserInfo();
        });
            
        //修改头像
        $(".avatar1").hover(function () {
            $(".changeBj").show();
            $(".changeTxt").show();
        }, function () {
            $(".changeBj").hide();
            $(".changeTxt").hide();
        });
    
        var messageindex=0;
        $(function(){              
            apiGetToken();     
            var i=jQuery.cookie('bugdone_havechat');
            if(i!=""&&i!=null&&i==1)
            {
                $(".icon-chat1").attr("title","你有新消息").css("color","green");
                $(".icon-chat1").parent(".f-r").addClass("animated tada");
            }
        })
        var closechatlog;
        function getchat(){
            jQuery.cookie('bugdone_havechat', 0, { expires: 1 });
            $(".icon-chat1").attr("title","没有新消息").css("color","#264d79");
            layer.open({
                type: 2 //Page层类型
                , area: [bugTalkW, bugTalkH]
                , title: "BugTalk"
                , shade: 0.6 //遮罩透明度
                , maxmin: false //允许全屏最小化
                , content: "/bugtalk"
                                ,cancel: function(){ 
                    //右上角关闭回调
                    bugTalkConnect();      
                    $("#bugtalkOnlinePage").val("currentPage")
                    layer.close(closechatlog);
                }
                
            });
        }
        var appKey = "", token = "";
        function bugTalkConnect()
        {
            RongIMClient.init(appKey);
            RongIMClient.setConnectionStatusListener({
                onChanged: function (status) {
                    switch (status) {
                        case RongIMLib.ConnectionStatus.CONNECTED:
                            console.log("<b>连接成功</b>");
                            $("#bugtalkStatus").removeClass("online-status-off")
                            break;
                        case RongIMLib.ConnectionStatus.CONNECTING:
                            console.log("<b>正在连接</b>");
                            var page = $("#bugtalkOnlinePage").val();                          
                            if(page !="bugTalkPage")
                                $("#bugtalkStatus").addClass("online-status-off")     
                            break;
                        case RongIMLib.ConnectionStatus.DISCONNECTED:
                            console.log("<b>断开连接</b>");
                            $("#bugtalkStatus").addClass("online-status-off")
                            break;
                        case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                            console.log("<b>其他设备登录</b>");
                            var page = $("#bugtalkOnlinePage").val();                          
                            if(page !="bugTalkPage")
                                $("#bugtalkStatus").addClass("online-status-off")     
                            break;
                        case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                            console.log("<b>网络不可用</b>");
                            $("#bugtalkStatus").addClass("online-status-off")
                            break;
                    }
                }
            });
        
            //var mydiv = document.getElementById("mydiv");
            RongIMClient.setOnReceiveMessageListener({
                onReceived: function (message) {
                    if(loginfrom==2)
                    {
                        WinJSLib.flashTaskBar();
                    }
                    switch (message.messageType) {
                        case RongIMClient.MessageType.TextMessage:
                            if(message.senderUserId=="system_10000")
                            {
                                var obj=jQuery.parseJSON(message.content.content);
                                if(obj.type==1)
                                {
                                    layer.close(messageindex)
                                    messageindex=layer.open({
                                        type: 1
                                        ,offset: 'rb' //具体配置参考：offset参数项
                                        ,content: '<div style="width: 250px;padding: 20px 28px;">'+obj.msg+'</div>'
                                        ,btnAlign: 'c' //按钮居中
                                        ,shade: 0 //不显示遮罩
                                        ,btn: '查看详情'
                                        ,yes: function(){
                                            window.location.href="/allbug_"+obj.projectId+"/q1/0/"+obj.bugId;
                                         }
                                    });
                                }else if(obj.type==2)
                                {
                                    layer.close(messageindex)
                                    messageindex=layer.open({
                                        title: '系统通知:'+obj.title
                                        ,type: 1
                                        ,content: '<div style="color: black;padding: 25px 25px;">'+obj.msg+'</div>'
                                        ,btnAlign: 'c' //按钮居中
                                        ,shade: 0 //不显示遮罩
                                        ,area: ['850px', '50%']
                                        ,btn: ['相关链接', '知道了']
                                        ,yes: function(){
                                            window.open(obj.linkurl);
                                        }
                                        ,btn2: function(index, layero){
                                            layer.close(index)
                                        }
                                    });
                                }
                            }
                            else{
                                $(".icon-chat1").attr("title","你有新消息").css("color","green");
                                $(".icon-chat1").parent(".f-r").addClass("animated tada");
                                jQuery.cookie('bugdone_havechat', 1, { expires: 7 });
                                apiGetNewBugTalk(message.targetId);
                            }
                            //message.content.content => 消息内容                               
                            break;                   
                        case RongIMClient.MessageType.ImageMessage:  
                            $(".icon-chat1").attr("title","你有新消息").css("color","green");
                            $(".icon-chat1").parent(".f-r").addClass("animated tada");
                            jQuery.cookie('bugdone_havechat', 1, { expires: 7 });
                            apiGetNewBugTalk(message.targetId);
                            break;
                        case RongIMClient.MessageType.DiscussionNotificationMessage:
                            // message.content.extension => 讨论组中的人员。
                            $(".icon-chat1").attr("title","你有新消息").css("color","green");
                            $(".icon-chat1").parent(".f-r").addClass("animated tada");
                            jQuery.cookie('bugdone_havechat', 1, { expires: 7 });
                            break;
                    }
                }
            });
            RongIMClient.connect(token, {
                onSuccess: function (userId) {
                    console.log("Login successfully." + userId);
                },
                onTokenIncorrect: function () {
                    console.log('token无效');
                },
                onError: function (errorCode) {
                    var info = '';
                    switch (errorCode) {
                        case RongIMLib.ErrorCode.TIMEOUT:
                            info = '超时';
                            break;
                        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                            info = '未知错误';
                            break;
                        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
                            info = '不可接受的协议版本';
                            break;
                        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
                            info = 'appkey不正确';
                            break;
                        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
                            info = '服务器不可用';
                            break;
                    }
                    console.log(errorCode);
                }
            });
        }
        
        function onCompleteGetNewBugTalk(){
            
        }
    