package com.qcit.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qcit.dao.ItemsDao;
import com.qcit.model.ItemsListVo;
import com.qcit.model.ItemsPo;
import com.qcit.model.ProblemCount;
import com.qcit.service.ItemsService;

@Service
public class ItemsServiceImpl implements ItemsService {
	@Autowired
	ItemsDao itemsDao;

	public List<ItemsListVo> getItemsList(int id, String ishidden,int start,int end) {
		List<ItemsListVo> list=itemsDao.getItemsListVo(id, ishidden,start,end);

		
		for(ItemsListVo items:list){
			List<ProblemCount> myproblemcount =itemsDao.getMyProblemNumberByUid(items.getId());
			List<ProblemCount> needsolveproblemcount =itemsDao.getNeedSolveProblemNumberByUid(items.getId());
			for(ProblemCount problemcount:myproblemcount){
				if(items.getId()==problemcount.getPid()){
					
					items.setProblemnumber(problemcount.getCount());
				}
			}
			
            for(ProblemCount problemcount:needsolveproblemcount){
                if(items.getId()==problemcount.getPid()){
                	items.setActionnumber(problemcount.getCount());
				}
               
			}
		}
		
		return list;
	}

	
	public int setItemsPicPath(String name, String description, String picpath, int creater, int owner) {
		ItemsPo items = new ItemsPo();
		items.setCreater(String.valueOf(creater));
		items.setOwner(String.valueOf(owner));
		items.setName(name);
		items.setDescription(description);
		items.setItemspic(picpath);
		itemsDao.setItems(items);
		return items.getId();
	}

	public String getItemsCreateDate(int id) {

		return itemsDao.getItemsDate(id);
	}

	public void changeHiddenState(int id, int hidden) {
		itemsDao.updateItemsHidden(id, hidden);
		
	}

	public void changeExistState(int id, int exist) {
		itemsDao.updateItemsExist(id, exist);
		
	}

	@Override
	public int countUserItems(int id, String ishidden) {
		
		return itemsDao.getItemsListVoCount(id, ishidden);
	}

}
