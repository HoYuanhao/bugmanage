package com.qcit.util;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;

/**
 * @Description: 图片验证码生成类
 * @Author:
 * @Date:
 * @Copyright:
 */
/*
 * @Component 有一个可选的入参，用于指定 Bean 的名称，在 Boss 中，我们就将 Bean 名称定义为“boss”。 一般情况下，Bean
 * 都是 singleton 的，需要注入 Bean 的地方仅需要通过 byType 策略就可以自动注入了， 所以大可不必指定 Bean 的名称。
 * 在使用 @Component 注释后，Spring 容器必须启用类扫描机制以启用注释驱动 Bean 定义和注释驱动 Bean 自动注入的策略。
 * Spring 2.5 对 context 命名空间进行了扩展，提供了这一功能 通过 <bean> 元素定义 Bean 的配置内容已经被移除，仅需要添加一行
 * <context:component-scan/> 配置就解决所有问题了 Spring XML
 * 配置文件得到了极致的简化（当然配置元数据还是需要的，只不过以注释形式存在罢了）。<context:component-scan/> 的
 * base-package 属性指定了需要扫描的类包，类包及其递归子包中所有的类都会被处理。 <context:component-scan/>
 * 还允许定义过滤器将基包下的某些类纳入或排除。
 */
public class ImageCodeUtil {
	/*
	 * Spring 3支持@value注解的方式获取properties文件中的配置值，大简化了读取配置文件的代码。
	 * 在applicationContext.xml文件中配置properties文件,在bean中使用@value注解获取配置文件的值
	 * 即使给变量赋了初值也会以配置文件的值为准。
	 */
	@Value("${ImageCode.width}")
	private int width;
	@Value("${ImageCode.height}")
	private int height;
	@Value("${ImageCode.codeLength}")
	private int codeLength;
	@Value("${ImageCode.randomString}")
	private String randomString;
	@Value("${ImageCode.sessionKey}")
	private String sessionKey;
	@Value("${ImageCode.font.name}")
	private String fontName;
	@Value("${ImageCode.font.style}")
	private int fontStyle;
	@Value("${ImageCode.font.size}")
	private int fontSize;

	public BufferedImage getImage(HttpServletRequest request) {
		// 在内存中创建图象
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		// 获取图形上下文
		Graphics g = image.getGraphics();
		// 生成随机类
		Random random = new Random();
		// 设定背景色
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, width, height);
		// 设定字体
		g.setFont(new Font(fontName, fontStyle, fontSize));
		g.setColor(getRandColor(160, 200));
		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}
		String sRand = randomRand(codeLength);// 取随机产生的认证码
		int strWidth = width / 2 - g.getFontMetrics().stringWidth(sRand) / codeLength - 24;
		int strHeight = height / 2 + 12;
		for (int i = 0; i < codeLength; i++) {
			String rand = sRand.substring(i, i + 1);
			// 将认证码显示到图象中
			g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));// 调用函数出来的颜色相同，
			int zz = new Random().nextInt(8);
			zz = zz % 2 == 0 ? zz - 10 : zz;
			g.drawString(rand, strWidth + (13 + 16 * i), strHeight + zz);
		}
		request.getSession().setAttribute(sessionKey, sRand.replaceAll(" ", ""));
		g.dispose();
		return image;
	}

	public BufferedImage getImage(HttpServletRequest request, int width_, int height_, int fontSize_, int codeLength_) {
		// 在内存中创建图象
		BufferedImage image = new BufferedImage(width_, height_, BufferedImage.TYPE_INT_RGB);
		// 获取图形上下文
		Graphics g = image.getGraphics();
		// 生成随机类
		Random random = new Random();
		// 设定背景色
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, width_, height_);
		// 设定字体
		Font f = new Font(fontName, fontStyle, fontSize_);
		g.setFont(f);
		g.setColor(getRandColor(160, 200));
		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(width_);
			int y = random.nextInt(height_);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}
		String sRand = randomRand(codeLength_);// 取随机产生的认证码
		int strWidth = width_ / 2 - g.getFontMetrics().stringWidth(sRand) / codeLength_ - fontSize_;
		int strHeight = height_ / 2 + g.getFontMetrics(f).getHeight() / 4;
		for (int i = 0; i < codeLength_; i++) {
			String rand = sRand.substring(i, i + 1);
			// 将认证码显示到图象中
			g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));// 调用函数出来的颜色相同，
			g.drawString(rand, 13 * i + 6 + strWidth, strHeight);
		}

		request.getSession().setAttribute(sessionKey, sRand.replaceAll(" ", ""));
		g.dispose();
		return image;
	}

	public static String randomResult(int length) {
		String i[] = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };
		List<String> l = new ArrayList<String>();
		l.addAll(Arrays.asList(i));
		Random ran = new Random();
		String s = "";
		while (l.size() > 10 - length)
			s += l.remove(ran.nextInt(l.size()));
		s = s.replaceAll("^(0)(\\d)", "$2$1");
		return s;
	}

	private Color getRandColor(int fc, int bc) {// 给定范围获得随机颜色
		Random random = new Random();
		if (fc > 255)
			fc = 255;
		if (bc > 255)
			bc = 255;
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}

	private String randomRand(int n) {
		String rand = "";
		int len = randomString.length() - 1;
		double r;
		for (int i = 0; i < n; i++) {
			r = (Math.random()) * len;
			rand = rand + randomString.charAt((int) r);
		}
		return rand;
	}

	public String getSessionKey() {
		return sessionKey;
	}

	public void setSessionKey(String sessionKey) {
		this.sessionKey = sessionKey;
	}

}