package com.yy.ent.tvbar.service.info;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.IOUtils;

import com.yy.ent.cherrice.multipart.MultipartRequest;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.mobile.bs2.EntBs2Client;
import com.yy.ent.tvbar.service.base.BaseService;

public class UploadService extends BaseService {

	protected static final String TYPE_IMAGE = "image";
	protected static final String TYPE_FULL_IMAGE = "full_image";

	@Inject(instance = EntBs2Client.class)
	private EntBs2Client entBs2Client;

	/** 后缀名列表 */
	private final static HashMap<String, List<String>> SUFFIX_MAP = new HashMap<String, List<String>>();
	static {
		// 初始化文件后缀列表
		initSuffix(TYPE_FULL_IMAGE, "gif,jpg,jpeg,png,bmp");
		initSuffix(TYPE_IMAGE, "jpg,png");
	}

	/**
	 * 初始化后缀名
	 */
	private static void initSuffix(String type, String suffixs) {
		SUFFIX_MAP.put(type, Arrays.<String> asList(suffixs.split(",")));
	}


	/**
	 * 上传文件
	 * 
	 * @param req
	 * @param formName
	 *            提交的表单字段名
	 * @param type
	 *            文件类型 image/flash/media/file
	 * @param maxSize
	 *            单位:k
	 * @return 返回非空字串为成功上传文件url
	 */
/*	public List<String> uploadFile(HttpServletRequest request,
			String formName, String type, long maxSize, boolean throwException)
			throws Exception {
		List<String> result = new ArrayList<String>();
		// 是否是二进制流
		if (!(request instanceof MultipartRequest)) {
			return result;
		}
		MultipartRequest req = (MultipartRequest) request;
		// File file = req.getFile(formName)[0];
		for (File file : req.getFile(formName)) {
			System.out.println();
			System.out.println("@@@      @@@   @@@@");
			System.out.println();
			if (file == null) {
				logger.warn("没有文件");
				if (throwException)
					throw new Exception("没有文件");
				else
					return result;
			}
			// 检测文件大小是否合法
			req.setAttribute("work_size", file.length());
			if (file.length() > maxSize*1024) {
				logger.warn("文件太大:当前文件大小:" + file.length() + " ,maxSize="
						+ maxSize);
				if (throwException)
					throw new Exception("文件太大");
				else
					return result;
					return null;
			}
			String fileName = req.getFileNames(formName)[0];
			// 检测后缀名是否合法
			String suffix = getSuffix(fileName);
			List<String> list = SUFFIX_MAP.get(type);
			if (list == null || !list.contains(suffix)) {
				logger.warn("后缀名不合法:" + suffix + " " + list);
				if (throwException)
					throw new Exception("后缀名不合法");
				else
					return result;
					return null;
			}
			// 合法文件进行上传
			FileInputStream is = null;
			try {
				is = new FileInputStream(file);
				byte[] source = IOUtils.toByteArray(is);
				String uuid = UUID.randomUUID().toString().replaceAll("-", "");
				// 如果大于16M就选择大文件上传，分块上传
				if (file.length() > 1024 * 1024 * 16) {
					result.add(entBs2Client.uploadLargeFileData(source, uuid
							+ "." + suffix, type + "/" + suffix));
				} else {
					result.add(entBs2Client.uploadMinFileData(source, uuid
							+ "." + suffix, type + "/" + suffix, false));
				}
			} catch (Exception e) {
				logger.warn("上传文件出错", e);
				if (throwException)
					throw e;
			} finally {
				IOUtils.closeQuietly(is);
			}
		}
		return result;
	}*/

	public String uploadFile(byte[] source, String type)
			throws Exception {

		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
		String result = entBs2Client.uploadMinFileData(source, uuid
							+ "." + "jpg", type + "/" + "jpg", false);
		return result;
	}
	/**
	 * 返回文件后缀
	 * 
	 */
	protected String getSuffix(String fileName) {
		int lastIndexOfDot = fileName.lastIndexOf(".");
		return lastIndexOfDot != -1 ? fileName.substring(lastIndexOfDot + 1)
				: "";
	}
}
