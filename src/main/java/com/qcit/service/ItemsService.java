package com.qcit.service;

import java.util.List;

import com.qcit.model.ItemsListVo;

public interface ItemsService {

	
	public List<ItemsListVo> getItemsList(int id,String ishidden,int start,int end);
	
	public int setItemsPicPath(String name,String description,String picpath,int creater,int owner);
	
	public String getItemsCreateDate(int id);
	
	
	public void changeHiddenState(int id,int hidden);
	
	public void changeExistState(int id,int exist);
	
	public int countUserItems(int id,String ishidden);
}
