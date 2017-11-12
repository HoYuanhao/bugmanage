<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>奇创bug管理系统</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
    <meta charset="utf-8">
		<title>我的项目</title>
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/base.css" type="text/css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/iconfont.css" type="text/css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/bugdone.css" type="text/css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/jquery-ui.css" type="text/css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/project.info.css" type="text/css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/animate.min.css" type="text/css">
		<link rel="stylesheet" href="<%=request.getContextPath()%>/css/layer.css" type="text/css">
		<script src="<%=request.getContextPath()%>/js/jquery-3.2.1.min.js"></script>
		<script src="<%=request.getContextPath()%>/js/index.js"></script>
  </head>
  
  	<body class="of-hidden">
		 <div class="header bg-white">
        <div class="logo f-l" style="cursor: pointer;" onclick="window.location.href='https://www.bugdone.cn/home'">
            <img src="<%=request.getContextPath()%>/image/logo.png" alt="BUGDONE"/>
        </div>
        <div class="m-p fz-14 fw-bold f-l p-relative" id="hoverShow1">
            <input type="hidden" id="hidtype" />
            <i class="animated iconfont icon-arrow-copy p-absolute"></i>
            <label id="type0">我参与的项目</label>
            <div id="types" class="show-box p-absolute bg-white bd-e2 b-radius4 d-none">
                <a id="type1" href="javascript:void(0)" class="on" onclick="GetProjects(1);">我参与的项目</a>
                <a id="type2" href="javascript:void(0)" onclick="GetProjects(2);">我拥有的项目</a>
                <a id="type3" href="javascript:void(0)" onclick="GetProjects(3);">隐藏的项目</a>
                <a id="type4" href="javascript:void(0)" onclick="GetProjects(4);">关闭的项目</a>
            </div>
        </div>
        <div class="user-info f-r p-relative" id="hoverShow2">
            <div class="avatar p-absolute loaduserdiv">
                <i class="online-status" id="bugtalkStatus"></i>
                <img id="imgUser" src="<%=request.getContextPath()%>/image/22.png" alt="" class='loaduser' />
                 <style>
                    .loaduser{width:100% !important;height:100% !important;}
                    .loaduserdiv{top:5px !important;left:10px !important;}
                    .online-status{width: 8px;height: 8px;border-radius: 50%;border: 2px solid #fff;position: absolute;right: -10px; top: 0;background: #1ab064}
                    .online-status-off{background:#ababab}
                </style>
            </div>
            <div class="name fz-14 fw-bold p-relative">
                <i class="iconfont icon-arrow-copy p-absolute"></i>
                <div id="lblUser" style='min-width:44px;min-height:10px'>${user.username}</div>
                <div id="userinfo" class="show-box p-absolute bg-white bd-e2 b-radius4 d-none fz-14">
                    <div class="avatar1 p-absolute" onclick="changePhoto();">
                        <img id="imgUserEdit" src="" alt="" />
                        <span class="changeBj" style="display: none;"></span>
                        <span class="changeTxt" style="display: none;">修改头像</span>
                        <input type="hidden" id="hidCurrentUserId" value=""/>
                    </div>
                    <br>
                    <a href="javascript:void(0)" onclick="changeUserEmail();" class="logout"><i class="iconfont icon-youxiang"></i>修改邮箱</a>
                    <a href="javascript:void(0)" onclick="changeUserName();"><i class="iconfont icon-name"></i>修改姓名</a>
                    <a href="javascript:void(0)" onclick="changeUserPassword();"><i class="iconfont icon-lock"></i>修改密码</a>
                    <a href="javascript:void(0)" onclick="openlogin();" class="logout"><i class="iconfont icon-shouji"></i>手机登陆</a>
                    <a href="javascript:void(0)" onclick="logout();"><i class="iconfont icon-tuichu"></i>退出</a>
                </div>
            </div>
        </div>
        <div class="f-r notice p-relative" style='display:none'>
            <span class="num textbg-1 ta-center p-absolute">2</span>
            <a href="#" title="消息"><i class="iconfont icon-tongzhi"></i></a>
            </div>
            <!--关于-->
            <div class="f-r">
                <i class="iconfont icon-banben" onClick="aboutClick()" style="margin: -0.2rem 1.5rem;"  title="关于BugDone"></i>
            </div>
            <div class="f-r">
                <i class="iconfont icon-huiyuanquanyi" id="userPackage" onClick="packageClick()"  title="了解付费版本"></i>
            </div>
            <!--二维码-->
            <div class="f-r shouji">
                <i class="iconfont icon-shouji" style="margin: -0.2rem 1.9rem 0 .5rem;font-size: 24px;line-height:64px;cursor:pointer;" onclick='opencode()' title="扫一扫"></i>
            </div>
                        <!--消息-->
            <div class="f-r">
                <i class="iconfont icon-chat1" style="margin: -0.2rem 1rem 0 .5rem;font-size: 24px;line-height:65px;cursor:pointer;" onclick='getchat()' title="暂无新消息"></i>
            </div>
                    <!--二维码弹出窗-->
        <style>
            .code-grag-bg{width:100%;height:100%; position:fixed; background:url(/image/rgba0_25.png);left:0;top:0; z-index:90;}
            .code-system{width:410px; position:absolute;top:50%;height:12rem; overflow:hidden;margin-top:-160px;left:50%;margin-left:-305px; background:#fff; z-index:99;border-radius:6px;padding:3rem 0 0 3rem}
            .code-system .icon-guanbi1{ font-size:24px; position:absolute;right:10px;top:20px; cursor:pointer;}
            .code-system .icon-guanbi1:hover{color:#264d79;}
            .imgdiv{float:left}
        </style>
        <div class="code-grag-bg d-none" onClick="closecode()"></div>
        <div class="code-system d-none" style='width:580px'>
            <i class="iconfont icon-guanbi1 color-8" onclick="closecode()" style="margin-right: 20px;"></i>
            <div class='imgdiv'><img src='<%=request.getContextPath()%>/image/phonebugdone.png' style='width:10rem'><span style='position: absolute;top: 13.5rem;left: 5rem;'>bugdone手机端</span></div>
            <div style="float:left;border: 1px solid #0c8bb5;height: 11rem;margin: 0 1rem;"></div>
            <div class='imgdiv'><img src='<%=request.getContextPath()%>/image/wechat.jpg' style='width:10rem'><span style='position: absolute;top: 13.5rem;left: 17.6rem;'>bugdone公众号</span></div>
            <div style="float:left;border: 1px solid #0c8bb5;height: 11rem;margin: 0 1rem;"></div>
            <div class='imgdiv'><img src='<%=request.getContextPath()%>/image/xiaochengxu.jpg' style='width:10rem'><span style='position: absolute;top: 13.5rem;right: 4.1rem;'>bugdone小程序</span></div>
        </div>
        <!--手机登录弹出窗-->
        <style>
            .login-grag-bg,.package-grag-bg{width:100%;height:100%; position:fixed; background:url(/image/rgba0_25.png);left:0;top:0; z-index:90;}
            .login-system{width:200px; position:absolute;top:50%;height:12rem; overflow:hidden;margin-top:-160px;left:60%;margin-left:-305px; background:#fff; z-index:99;border-radius:6px;padding:3rem 0 .5rem 2.2rem}
            .login-system .icon-guanbi1{ font-size:24px; position:absolute;right:10px;top:20px; cursor:pointer;}
            .login-system .icon-guanbi1:hover{color:#264d79;}
        </style>
        <div class="login-grag-bg d-none" onClick="closelogin()"></div>
        <div class="login-system d-none">
            <i class="iconfont icon-guanbi1 color-8" onclick="closelogin()" style="margin-right: 20px;"></i>
            <div class='imgdiv'><img id='logincodeimg' src='' style='width:10rem'><span style="position: absolute;top: 13.5rem;padding: 0 1.5rem;left: .7rem;">该登录二维码含有您的个人信息，请勿转发给其它用户。</span></div>
        </div>
        <!--关于弹出窗-->
        <style>
            .about-grag-bg{width:100%;height:100%; position:fixed; background:url(/image/rgba0_25.png);left:0;top:0; z-index:90;}
        </style>
        <div class="about-grag-bg d-none" onClick="closeAbout()"></div>
        <div class="about-system d-none">
            <div class="logo"><img src="<%=request.getContextPath()%>/image/logo.png" style="display: initial;" /></div>
            <div class="info">
            	<i class="iconfont icon-guanbi1 color-8" onClick="closeAbout()" style="margin-right: 20px;"></i>
            	<h1>奇创bug管理系统</h1>
                <p>版本号：V1.0.0 BETA</p>
                <p><a href="/newslist/" class="button">版本更新日志</a></p>
                <p class="copyright">奇创版权所有<br />qcit.cn</p>
            </div>
        </div>
        <div class="package-grag-bg d-none" onClick="closePackage()"></div>
        <div class="package-system d-none">
            <div class="logo"><img src="<%=request.getContextPath()%>/image/logo.png" style="display: initial;" /></div>
            <div class="info">
                <i class="iconfont icon-guanbi1 color-8" onClick="closePackage()" style="margin-right: 20px;"></i>
                <h1>BugDone现已永久免费</h1>         
                <p style="height: 40px;line-height: 40px;margin: 15px 0px 50px 0px;color:#264d79">无限项目数、无限成员数，无限bug数</p>
                <p class="copyright">如有疑问欢迎联系BugDone团队<br />Email：support@bugdone.cn</p>
            </div>
        </div>
<!--        <div class="f-r notice p-relative">
            <span class="num textbg-1 ta-center p-absolute">2</span>
            <a href="#" title="消息"><i class="iconfont icon-tongzhi"></i></a>
        </div>-->
    </div>
    <!--header-->
    <div id="scrollCont">
        <div class="projectList mainbox">
            <div class="p-head p-relative">
                <a href="javascript:void(0)" class="button p-absolute fz-14 bg-white color-0 b-radius4 bd-08 animated tada" onclick="addProject();">
                    <img src="<%=request.getContextPath()%>/image/icon-add.png" class="f-l" />添加项目
                </a>
                <div class="tab bd-e2 b-radius4 p-relative of-hidden">
                    <ul id="tabShow" class="ta-center color-a">
                        <i class="line p-absolute"></i>
                        <li class="f-l on" data-id="1">
                            <i class="icon icon-b"></i>大图标
                        </li>
                        <li class="f-l" data-id="2">
                            <i class="icon icon-s"></i>小图标
                        </li>
                    </ul>
                </div>
            </div>

            <div id="tabBox">
                <div class="p-cont p-cont1 animated bounceInUp">
                    <ul id="ulb">
                    </ul>
                </div>
                <div class="clear"></div>
                <div class="p-cont p-cont2 d-none">
                    <ul id="uls">
                    </ul>
                </div>
            </div>
            <!--tabBox-->

        </div>
        <!--projectList-->

        <div class="clear blank40"></div>
    </div>
      <style>
        .proinfo-problem .list strong{width:28px}
        .proinfo-problem .list li{cursor:pointer}
    </style>
    <div class="aside-project-info" style="right:-460">
        <div class="proinfo-title"><span class="on"><i style="display:none" class="iconfont icon-biaoji"></i></span><i class="iconfont icon-arrow-right f-l" onclick="asideProjectHide()"></i>项目总览</div>
        <div id="proinfo-cont">
            <div class="proinfo-data">
                <ul class="clearfix">
                    <li><strong id="cpcount">28</strong><p class="color-a">创建项目数</p></li>
                    <li><strong id="pccount">64</strong><p class="color-a">参与项目数</p></li>
                    <li><strong id="tdcount" class="color-red">24</strong><p class="color-a">待办问题数</p></li>
                    <li><strong id="sdcount">168</strong><p class="color-a">解决问题数</p></li>
                    <li><strong id="ctcount">32</strong><p class="color-a">创建问题数</p></li>
                </ul>
            </div>
            <div class="proinfo-chart">
                <div class="name">创建问题与解决报表（近7天）</div>   
                <div class="reportbox" id="bugcount" style="height: 180px">
                </div>
            </div> 
            <div class="proinfo-problem">
                <div class="title">待办问题
                    <div class="tabs">
                        <ul>
                            <li class="active" onclick="ChangeLi(1,this)">按项目</li>
                            <li onclick="ChangeLi(2,this)">按优先级</li>
                            <li onclick="ChangeLi(3,this)">按时间</li>
                        </ul>
                    </div>
                </div>
                <div id="bindate">
                </div>
            </div>
            <!--//proinfo-problem-->
        </div>
        <!--//proinfo-cont-->
    </div>
    
    <!--//aside-project-info-->
    <div class="aside-project-click" onClick="asideProjectShow()"></div>
    <input type="hidden" value="currentPage" id="bugtalkOnlinePage"/>
	</body>
</html>
