package com.qcit.controller;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.qcit.model.ItemsListVo;
import com.qcit.model.User;
import com.qcit.service.ItemsService;
import com.qcit.service.UserService;
import com.qcit.util.DateUtil;
import com.qcit.util.FileUtil;
import com.qcit.util.ImageCodeUtil;

/**
 * 用户控制类
 * 
 * @author yuanhaohe
 *
 */
@RequestMapping("user")
@Controller
public class UserController {
	Logger logger = Logger.getLogger(UserController.class);
	@Autowired
	ImageCodeUtil imageCodeUtil;
	@Autowired
	FileUtil fileUtil;
	@Autowired
	UserService userService;
   @Autowired
   ItemsService itemsService;
	/**
	 * 获取验证码
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("getcode")
	public void getcode(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);
		response.setContentType("image/jpeg");
		// 将图像输出到Servlet输出流中。
		ServletOutputStream sos = response.getOutputStream();
		ImageIO.write(imageCodeUtil.getImage(request), "jpeg", sos);
	   logger.debug(request.getSession().getAttribute(imageCodeUtil.getSessionKey()));
		sos.close();
	}

	/**
	 * 登录模块
	 * 
	 * @param email
	 *            邮箱
	 * @param password
	 *            密码
	 * @param code
	 *            验证码
	 * @param request
	 *            请求
	 * @return json
	 */
	@RequestMapping(value="login",produces="application/json;charset=UTF-8")
	public @ResponseBody String login(String email,String password,String code,HttpServletRequest request) {
		String result = userService.login(email, password, request, code);
		return result;

	}

	@RequestMapping("index")
	public String index(HttpSession session,HttpServletRequest request) throws IllegalAccessException, InstantiationException, InvocationTargetException, NoSuchMethodException{
		
		User user = (User) session.getAttribute("user");
		int count =itemsService.countUserItems(user.getId(), "1");
		List<ItemsListVo> items=itemsService.getItemsList(user.getId(), "1",0,16);
		int pagenumber =count/16+1;
		request.setAttribute("items", items);
		request.setAttribute("pagenumber", pagenumber);
		return "index";
		
	}
	/**
	 * 注册模块
	 * 
	 * @param email
	 *            邮箱
	 * @param username
	 *            用户名
	 * @param password
	 *            密码
	 * @param code
	 *            验证码
	 * @param request
	 *            请求
	 * @return json
	 */
	@RequestMapping(value="register",produces="application/json;charset=UTF-8")
	public @ResponseBody String register(@RequestParam("email") String email, @RequestParam("username") String username,
			@RequestParam("password") String password, @RequestParam("code") String code, HttpServletRequest request) {
		String result = userService.register(email, password, username, request, code);
		JSONObject jsonObject = new JSONObject();
		if (result.equals("1")) {
			jsonObject.put("user", (User) request.getSession().getAttribute("user"));
		}
		jsonObject.put("result", result);
		return jsonObject.toJSONString();

	}

	/**
	 * 验证邮箱模块
	 * 
	 * @param email
	 *            待验证的邮箱
	 * @return
	 */

	@RequestMapping("checkemail")
	public @ResponseBody String checkEmail(@RequestParam("email") String email) {
		int result = userService.checkEmailExist(email);
		JSONObject jsonobj=new JSONObject();
		jsonobj.put("result", result);
		return jsonobj.toJSONString();

	}

	/**
	 * 通过密码修改邮箱
	 * 
	 * @param email 修改后的邮箱
	 * @param password  密码
	 * @param request
	 * @return
	 */
	@RequestMapping(value="alteremail",produces="application/json;charset=UTF-8")
	public @ResponseBody String alterEmail(@RequestParam("email") String email,
			@RequestParam("password") String password, HttpServletRequest request) {
		int result = userService.alterEmail(email, password, request);
		
		JSONObject jsonobj=new JSONObject();
		jsonobj.put("result", result);
		return jsonobj.toJSONString();

	}

	/**
	 * 直接修改用户名
	 * 
	 * @param username 用户名
	 * @param request
	 * @return
	 */
	@RequestMapping(value="alterusername",produces="application/json;charset=UTF-8")
	public @ResponseBody String alterUsername(@RequestParam("username") String username, HttpServletRequest request) {
		int result = userService.alterUsername(username, request);
		JSONObject jsonobj=new JSONObject();
		jsonobj.put("result", result);
		return jsonobj.toJSONString();

	}

	
	/**
	 * 密码修改模块
	 * @param newpassword 新密码
	 * @param oldpassword 旧密码
	 * @param request
	 * @return
	 */
	@RequestMapping("alterpassword")
	public @ResponseBody String alterPassword(@RequestParam("newpassword") String newpassword,
			@RequestParam("oldpassword") String oldpassword, HttpServletRequest request) {
		int result = userService.alterPassword(oldpassword, newpassword, request);
		JSONObject jsonobj=new JSONObject();
		jsonobj.put("result", result);
		return jsonobj.toJSONString();

	}
	
	/**
	 * 登出销毁session
	 * @param session
	 * @return
	 */
	@RequestMapping("logout")
	public @ResponseBody String logout(HttpSession session){
		session.invalidate();
		JSONObject jsonobj=new JSONObject();
		jsonobj.put("result", 1);
		return jsonobj.toJSONString();
	}
	/**
	 * 上传用户头像
	 * @param base64Data
	 * @param request
	 * @param response
	 * @return 上传成功：1 上传失败：2 上传数据非法 3
	 */
	@RequestMapping(value="uploaduserpic",method = RequestMethod.POST)
	public @ResponseBody String uploadUserPic(
			@RequestParam("pic") String base64Data,
			HttpServletRequest request, 
			HttpServletResponse response){
		String result=null;
		 Map<String,String> map =new HashMap<String,String>();
		 JSONObject json =new JSONObject();
		 try{  
	            logger.debug("上传文件的数据："+base64Data);
	            String dataPrix = "";
	            String data = "";

	            logger.debug("对数据进行判断");
	            if(base64Data == null || "".equals(base64Data)){
	            	logger.debug("上传数据为空");
	            	json.put("result", 3);
	                return json.toJSONString();
	            }else{
	                String [] d = base64Data.split("base64,");
	                if(d != null && d.length == 2){
	                    dataPrix = d[0];
	                    data = d[1];
	                }else{
	                	logger.debug("上传数据非法");
		            	json.put("result", 3);
		                return json.toJSONString();
	                }
	            }

	            logger.debug("对数据进行解析，获取文件名和流数据");
	            String suffix = "";
	            if("data:image/jpeg;".equalsIgnoreCase(dataPrix)){//data:image/jpeg;base64,base64编码的jpeg图片数据
	                suffix = ".jpg";
	            } else if("data:image/x-icon;".equalsIgnoreCase(dataPrix)){//data:image/x-icon;base64,base64编码的icon图片数据
	                suffix = ".ico";
	            } else if("data:image/gif;".equalsIgnoreCase(dataPrix)){//data:image/gif;base64,base64编码的gif图片数据
	                suffix = ".gif";
	            } else if("data:image/png;".equalsIgnoreCase(dataPrix)){//data:image/png;base64,base64编码的png图片数据
	                suffix = ".png";
	            }else{
	            	logger.debug("上传非图片");
	            	json.put("result", 3);
	                return json.toJSONString();
	                
	            }
	           User user=(User)request.getSession().getAttribute("user");
	           String picpath=fileUtil.getPicpath();
	           String realpicpath=picpath+"/"+DateUtil.getNowDate();
	           boolean filecreate=fileUtil.createDir(realpicpath);
	           if(filecreate){
	        	   logger.debug("目录已经创建");
	           }
	            String tempFileName = "headpic"+user.getId()+ suffix;
	            logger.debug("生成文件名为："+tempFileName);

	            //因为BASE64Decoder的jar问题，此处使用spring框架提供的工具包
	            byte[] bs = Base64Utils.decodeFromString(data);
	            try{
	                //使用apache提供的工具类操作流
	                FileUtils.writeByteArrayToFile(new File(realpicpath, tempFileName), bs);  
	            }catch(Exception ee){
	                throw new Exception("上传失败，写入文件失败，"+ee.getMessage());
	            }
	            
	            map.put("picpath",realpicpath+"/"+tempFileName);
	            result="1";
	            map.put("result", result);
	            logger.debug("上传成功");
	            userService.alterPic(realpicpath+"/"+tempFileName, user.getId());
	        }catch (Exception e) {  
	            logger.debug("上传失败,"+e.getMessage());
	            result="2"; 
	            map.put("result", result);
	        }  
		 
		 json.putAll(map);
		return json.toJSONString();
		
	}
}

