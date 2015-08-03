package com.yy.ent.tvbar.common.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.yy.ent.commons.base.valid.BlankUtil;

/**
 * 临时用于el函数的工具类
 *
 * @author Administrator
 *
 */
public class PathUtil {

	private static List<String> res_agency_paths = new ArrayList<String>();
	private static List<String> res_img_paths = new ArrayList<String>();
	public static ThreadLocal<Integer> dream_tl = new ThreadLocal<Integer>();
	public static ThreadLocal<Integer> img_tl = new ThreadLocal<Integer>();
	static {
		res_agency_paths.add("http://res.tvbar.yystatic.com");
		res_agency_paths.add("http://res.tvbar.yystatic.com");
		res_agency_paths.add("http://res.tvbar.yystatic.com");
		res_agency_paths.add("http://res.tvbar.yystatic.com");

		res_img_paths.add("http://res.tvbar.yystatic.com");
		res_img_paths.add("http://res.tvbar.yystatic.com");
		res_img_paths.add("http://res.tvbar.yystatic.com");
		res_img_paths.add("http://res.tvbar.yystatic.com");
	}

	/**
	 *
	 * getResDreamPath： dream 项目中用到的CDN资源路径
	 *
	 * @return
	 * @author:<a href="mailto:chenxu@yy.com">Kyle</a>
	 */
	public static String getResDreamPath() {
		return getResPath(res_agency_paths);
	}

	/**
	 * getResDreamPath： dream 项目中用到的CDN资源路径 同样的资源返回一样的域名前缀
	 * @param key 哈希key 例如：资源名称
	 * @return
	 */
	public static String getHashResDreamPath(String key) {
		return res_agency_paths.get(hashIndex(key, res_agency_paths.size())) + "/";
	}

	private static int hashIndex(String value, int size) {
		if(BlankUtil.isBlank(value) || size <= 0){
			return 0;
		}
		return Math.abs(value.hashCode()) % (size);
	}

	/**
	 *
	 * getResImgPath：上传到dfs的图片CDN资源路径
	 *
	 * @return
	 * @author:<a href="mailto:chenxu@yy.com">Kyle</a>
	 */
	public static String getResImgPath() {
		return getResPath(res_img_paths);
	}
	
	public static String getResImgPath(String url) {
		return res_img_paths.get(hashIndex(url, res_img_paths.size())) + "/" + url;
	}
	
	/**
	 * 返回指定域名的图片url
	 * @param index
	 * @param url
	 * @return
	 */
	public static String getResImgPath(int index,String url){
		return new StringBuilder().append(res_img_paths.get(index)).append("/").append(url).toString();
	}

	/**
	 * getResImgPath：上传到dfs的图片CDN资源路径 同样的资源返回一样的域名前缀
	 * @param key 资源路径
	 * @return
	 */
	public static String getHashResImgPath(String key) {
		return res_img_paths.get(hashIndex(key, res_img_paths.size())) + "/";
	}

	public static String getHashImgDomain(String url){
		return res_img_paths.get(hashIndex(url, res_img_paths.size()));
	}

	public static Map<String, String> getPhotoUrl(String path) {
		Map<String, String> json = new HashMap<String, String>();
		if (BlankUtil.isBlank(path)) {
			json.put("path", "");
			json.put("min", "");
			json.put("min208", "");
			return json;
		}
		path = getAssembledUrl(path);
		int index = path.lastIndexOf('.');
		String extension = "jpg";//FilenameUtils.getExtension(path);
		String min = path.substring(0, index) + "_min." + extension;
		String min208 = path.substring(0, index) + "_min_208." + extension;
		json.put("path", path);
		json.put("min", min);
		json.put("min208", min208);
		return json;
	}

	public static String getAssembledUrl(String url) {
//		String res_path = getResImgPath();
		String res_path = getHashImgDomain(url);
		if (BlankUtil.isBlank(url)) {
			return "";
		}
		int t = url.indexOf(res_path);
		if (t != -1) {
			return url;
		}
		return res_path + "/" + url;
	}

	private static String getResPath(List<String> paths) {
		Integer index = roundIndex();
		return paths.get(index);
	}

	private static int roundIndex() {
		// 0与4出现的概率减半,故出现0或4都当0使用
		long r = Math.round(Math.random() * 4);
		long index = r % 4;
		if ((index != 0) && (index != 1) && (index != 2) && (index != 3)) {
			index = 0;
		}
		return (int) index;
	}

}
