package com.qcit.interceptor;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.qcit.model.User;

/**
 * 
 * @author yuanhaohe 用户登录认证全局拦截器
 */
public class LoginInterceptor implements HandlerInterceptor {
	private List<String> list = null;

	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO 自动生成的方法存根

	}

	public List<String> getList() {
		return list;
	}

	public void setList(List<String> list) {
		this.list = list;
	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO 自动生成的方法存根

	}

	public boolean preHandle(HttpServletRequest request, HttpServletResponse arg1, Object arg2) throws Exception {
		String requestURI = request.getRequestURI();
		// 遍历通过控制反转注入的拦截器过滤地址，不拦截这些地址
		for (String path : list) {
			if (requestURI.indexOf(path) > 0) {
				return true;
			}
		}

		HttpSession session = request.getSession();
		User user = (User) session.getAttribute("user");
		if (user != null) {
			// 登陆成功的用户
			return true;

		} else {
			// 没有登陆，转向登陆界面
			arg1.sendRedirect("/bugmanage/bugdone.html");
			return false;
		}
	}

}