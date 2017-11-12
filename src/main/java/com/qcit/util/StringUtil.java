package com.qcit.util;

import java.util.UUID;

public class StringUtil {
public static String getUUID(){
	String uuid=UUID.randomUUID().toString();
	
	return uuid.replaceAll("-", "");
}
}
