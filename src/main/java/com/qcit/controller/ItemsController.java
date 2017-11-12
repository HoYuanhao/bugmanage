package com.qcit.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
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
import com.qcit.model.ItemsPo;
import com.qcit.model.User;
import com.qcit.service.ItemsService;
import com.qcit.service.UserService;
import com.qcit.util.DateUtil;
import com.qcit.util.FileUtil;
import com.qcit.util.StringUtil;

@Controller
@RequestMapping("items")
public class ItemsController {

	Logger logger = Logger.getLogger(ItemsController.class);
	@Autowired
	ItemsService itemsService;
	@Autowired
	FileUtil fileUtil;
	@Autowired
	UserService userService;

	/**
	 * 显示主页信息接口
	 * 显示登陆后项目主页的信息
	 * @param session
	 * @param id
	 * @param ishidden
	 *            是否隐藏
	 * @return 集合名称 itemslistvo 集合中的元素字段：actionnumber 活动的问题数|problemnumber
	 *         问题总数|name 项目名称|id 项目id|pic 项目图片
	 */
	@RequestMapping(value = "getpage")
	public @ResponseBody String getItemsList(HttpSession session, @RequestParam("id") int id,
			@RequestParam("ishidden") String ishidden,@RequestParam("page")int page) {
		List<ItemsListVo> list = itemsService.getItemsList(id, ishidden,(page-1)*16,page*16);
		JSONObject json = new JSONObject();
		json.put("itemslistvo", list);
		return json.toJSONString();

	}

	/**
	 * 新建项目接口
	 * 必须以post方式提交 
	 * @param name
	 *            项目标题
	 * @param description
	 *            项目描述
	 * @param base64Data
	 *            base64格式的图片 可以为空
	 * @param request
	 * @return result：1 创建有图片的项目成功| result：3 数据格式有误 | result：2 照片为空(成功) items：
	 *         creater：创建人ID creationtime：项目创建时间 description：描述 id：项目id
	 *         itemspic：项目头像路径 name：项目名称 owner：拥有者id
	 */
	@RequestMapping(value = "newitems", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody String setItems(@RequestParam("name") String name,
			@RequestParam("description") String description,
			@RequestParam(value = "pic", required = false) String base64Data, HttpServletRequest request) {
		String result = null;
		Map<String, String> map = new HashMap<String, String>();
		ItemsPo items = new ItemsPo();
		JSONObject json = new JSONObject();
		User user = (User) request.getSession().getAttribute("user");
		try {
			logger.debug("上传文件的数据：" + base64Data);
			String dataPrix = "";
			String data = "";
			logger.debug("对数据进行判断");
			if (base64Data == null || "".equals(base64Data)) {
				logger.debug("上传数据为空");
				result = "3";
			} else {
				String[] d = base64Data.split("base64,");
				if (d != null && d.length == 2) {
					dataPrix = d[0];
					data = d[1];
				} else {
					logger.debug("上传数据非法");
					result = "3";
				}
			}
			logger.debug("对数据进行解析，获取文件名和流数据");
			String suffix = "";
			if ("data:image/jpeg;".equalsIgnoreCase(dataPrix)) {// data:image/jpeg;base64,base64编码的jpeg图片数据
				suffix = ".jpg";
			} else if ("data:image/x-icon;".equalsIgnoreCase(dataPrix)) {// data:image/x-icon;base64,base64编码的icon图片数据
				suffix = ".ico";
			} else if ("data:image/gif;".equalsIgnoreCase(dataPrix)) {// data:image/gif;base64,base64编码的gif图片数据
				suffix = ".gif";
			} else if ("data:image/png;".equalsIgnoreCase(dataPrix)) {// data:image/png;base64,base64编码的png图片数据
				suffix = ".png";
			} else {
				logger.debug("上传非图片");
				result = "3";
			}
			String picpath = fileUtil.getItemspic();
			String realpicpath = picpath + "/" + DateUtil.getNowDate();
			boolean filecreate = fileUtil.createDir(realpicpath);
			if (filecreate) {
				logger.debug("目录已经创建");
			}
			String tempFileName = "itemspic" + StringUtil.getUUID() + suffix;
			logger.debug("生成文件名为：" + tempFileName);

			// 因为BASE64Decoder的jar问题，此处使用spring框架提供的工具包
			byte[] bs = Base64Utils.decodeFromString(data);
			try {
				// 使用apache提供的工具类操作流
				FileUtils.writeByteArrayToFile(new File(realpicpath, tempFileName), bs);
			} catch (Exception ee) {
				throw new Exception("上传失败，写入文件失败，" + ee.getMessage());
			}
			result = "1";
			int itemsid = itemsService.setItemsPicPath(name, description, realpicpath + "/" + tempFileName,
					user.getId(), user.getId());
			logger.debug("查找id为：" + itemsid + "的项目创建时间");
			items.setCreationtime(itemsService.getItemsCreateDate(itemsid));
			items.setId(itemsid);
			items.setCreater(userService.getUsernameById(user.getId()));
			items.setOwner(userService.getUsernameById(user.getId()));
			items.setName(name);
			items.setDescription(description);
			items.setItemspic(realpicpath + "/" + tempFileName);

			map.put("result", result);
			logger.debug("上传成功");

		} catch (Exception e) {
			int itemsid = itemsService.setItemsPicPath(name, description, "", user.getId(), user.getId());
			logger.debug("查找id为：" + itemsid + "的项目创建时间");
			items.setCreationtime(itemsService.getItemsCreateDate(itemsid));
			items.setId(itemsid);
			items.setCreater(userService.getUsernameById(user.getId()));
			items.setOwner(userService.getUsernameById(user.getId()));
			items.setName(name);
			items.setDescription(description);
			items.setItemspic("");
			logger.debug("空照片," + e.getMessage());
			result = "2";
			map.put("result", result);
		}

		json.putAll(map);
		json.put("items", items);
		return json.toJSONString();
	}

	
	/**
	 * 改变项目的隐藏状态接口
	 * @param id 项目ID
	 * @param hidden 隐藏状态码  0隐藏 1非隐藏
	 * @return 成功result返回1 失败返回0
	 */
	@RequestMapping("changehidden")
	public @ResponseBody String changeItemsHidden(@RequestParam("id")int id,@RequestParam("hidden")int hidden){
		String result=null;
		try{
		itemsService.changeHiddenState(id, hidden);
		result="1";
		}catch(Exception e){
			result="0";
		}
		JSONObject json =new JSONObject();
		json.put("result", result);
		return json.toJSONString();
		
	}
	
	
	/**
	 * 改变项目存在状态接口
	 * @param id 项目ID
	 * @param exist 存在码 0存在 1不存在
	 * @return 成功result返回1 失败返回0
	 */
	@RequestMapping("changeexist")
	public @ResponseBody String changeItemsExist(@RequestParam("id")int id,@RequestParam("exist")int exist){
		String result=null;
		try{
		itemsService.changeExistState(id, exist);
		result="1";
		}catch(Exception e){
			result="0";
		}
		JSONObject json =new JSONObject();
		json.put("result", result);
		return json.toJSONString();
		
	}
}
