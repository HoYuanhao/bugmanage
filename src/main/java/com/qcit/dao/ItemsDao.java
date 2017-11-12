package com.qcit.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.qcit.model.ItemsListVo;
import com.qcit.model.ItemsPo;
import com.qcit.model.ProblemCount;

public interface ItemsDao {

	
	public List<ItemsListVo> getItemsListVo(@Param("id")int id,@Param("ishidden")String ishidden,@Param("start")int start,@Param("end")int end);
	
	public List<ProblemCount> getMyProblemNumberByUid(@Param("id")int id);
	
	public List<ProblemCount> getNeedSolveProblemNumberByUid(@Param("id")int id);
	
	public int setItems(ItemsPo itemspo);
	
	public String getItemsDate(@Param("id") int id);
	
	public void updateItemsHidden(@Param("id")int id,@Param("hidden")int hidden);
	
	public void updateItemsExist(@Param("id")int id,@Param("exist")int exist);
	
	public String getProjectPicPathById(@Param("id")int id);
	
	public int getItemsListVoCount(@Param("id")int id,@Param("ishidden")String ishidden);
}
