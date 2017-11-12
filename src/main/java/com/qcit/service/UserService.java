package com.qcit.service;

import javax.servlet.http.HttpServletRequest;

public interface UserService {
	public String login(String email, String password, HttpServletRequest request, String code);

	public String register(String email, String password, String username, HttpServletRequest request, String code);

	public int checkEmailExist(String email);

	public int alterEmail(String email, String password, HttpServletRequest request);

	public int alterUsername(String username, HttpServletRequest request);

	public int alterPassword(String oldpassword, String newpassword, HttpServletRequest request);
	
	public int alterPic(String pic,int id);
	
	public String getUsernameById(int id);
}
