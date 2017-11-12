package com.qcit.model;

import java.util.Date;

public class ItemsListVo {
private int id;
private String name;
private int problemnumber;
private int actionnumber;
private String pic;
private String creater;
private Date createtime;
public String getCreater() {
	return creater;
}
public void setCreater(String creater) {
	this.creater = creater;
}
public Date getCreatetime() {
	return createtime;
}
public void setCreatetime(Date createtime) {
	this.createtime = createtime;
}
public void setPic(String pic){
	this.pic=pic;
}
public String getPic(){
	return pic;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public int getProblemnumber() {
	return problemnumber;
}
public void setProblemnumber(int problemnumber) {
	this.problemnumber = problemnumber;
}
public int getActionnumber() {
	return actionnumber;
}
public void setActionnumber(int actionnumber) {
	this.actionnumber = actionnumber;
}

}
