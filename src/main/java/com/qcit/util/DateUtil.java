package com.qcit.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
public static String getNowDate(){
	Date date =new Date();
	SimpleDateFormat simpledate =new SimpleDateFormat("yyyy-MM-dd");
	return simpledate.format(date);
	
}

public static String getNowWholeDate(){
	Date date =new Date();
	SimpleDateFormat simpledate =new SimpleDateFormat("yyyy年MM月dd日 HH:mm:ss");
	return simpledate.format(date);
}
}
