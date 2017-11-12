package com.qcit.util;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;

public class FileUtil {
	@Value("${Pic.path.macos}")
	private  String picpath;
	@Value("${Pic.itemspic.path.macos}")
	private  String itemspic; 
	
	public String getItemspic() {
		return itemspic;
	}

	public void setItemspic(String itemspic) {
		this.itemspic = itemspic;
	}

	public  String getPicpath() {
		return picpath;
	}

	public void setPicpath(String picpath) {
		this.picpath = picpath;
	}

	public  boolean createDir(String destDirName) {
		File dir = new File(destDirName);
		if (dir.exists()) {// 判断目录是否存在
			System.out.println("创建目录失败，目标目录已存在！");
			return false;
		}
		if (!destDirName.endsWith(File.separator)) {// 结尾是否以"/"结束
			destDirName = destDirName + File.separator;
		}
		if (dir.mkdirs()) {// 创建目标目录
			System.out.println("创建目录成功！" + destDirName);
			return true;
		} else {
			System.out.println("创建目录失败！");
			return false;
		}
	}
}
