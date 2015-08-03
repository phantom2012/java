package com.yy.ent.tvbar.common.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.Key;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.PBEParameterSpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;

import com.yy.ent.commons.base.dto.Property;

/**
 * 公共平台api工具类
 * @author lin
 *
 */
public class SnsUtil {
	
	 public static final String KEY_MD5 = "MD5";
	 
	 public static final String PBE_ALGORITHM = "PBEWITHMD5andDES";
	 
	 public static final String PBE_PASSWORD = "@#$@254390!@#4sazvbhtrf";
	 
	 public static final byte [] PBE_SALT = {-125, 40, 15, -50, 88, -77, -95, -58};
	
	public static Logger logger = Logger.getLogger(SnsUtil.class);
	/**
	 * 请求类型
	 * @author lin
	 */
	public enum RequestType{
		
		POST("POST"),GET("GET");
		private String value;
		private RequestType(String value){
			this.value = value;
		}
		public String getValue(){
			return value;
		}
	}
	
	/**
	 * 请求url，并获得内容
	 * @param urlStr 请求地址
	 * @param params 请求参数，比如：access_token=2.006oUvQC0wbhSS7704cd897dJKfYxB&uid=5064087664
	 * @param requestType 请求类型：POST、GET
	 * @return property 总会包含responseCode
	 */
	public static Property getUrlContent(String urlStr,String params,RequestType requestType){
		BufferedReader reader = null;
		HttpURLConnection connection = null;
		OutputStream os = null;
		
		try{
			URL url = new URL(urlStr);
			connection = (HttpURLConnection)url.openConnection();
			connection.setRequestMethod(requestType.getValue());
			connection.setDoOutput(true);
	        connection.setDoInput(true);
			connection.connect();
			int responseCode = connection.getResponseCode();
			
			Property result = new Property();
			if(responseCode == 200){
				/*
				 * 输入参数
				 */
				if(params!=null){
					os = connection.getOutputStream();
					os.write(params.getBytes());
					os.flush();
				}
				/*
				 * 输出参数
				 */
				reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
				String readLine = null;
				StringBuilder content = new StringBuilder();
				while((readLine=reader.readLine())!=null){
					content.append(readLine);
				}
				result = CommonUtils.string2property(content.toString());
				
			}
			result.put("responseCode", responseCode);
			return result;
			
		}catch(MalformedURLException me){
			logger.error("getUrlContent is error MalformedURLException:" + urlStr);
		}catch(IOException ioe){
			logger.error("getUrlContent is error IOException:" + urlStr);
		}finally{
			try{
				if(reader!= null){
					reader.close();
				}
				if(connection!=null){
					connection.disconnect();
				}
				if(os!=null){
					os.close();
				}
			}catch(IOException ios){
				logger.error("getUrlContent close stream error IOException:" + urlStr,ios);
			}
		}
		return null;
	}
	
	/**
	 * MD5加密
	 * @param data
	 * @return
	 */
	public static String encryptMD5(String data){
		try {
			MessageDigest md5 = MessageDigest.getInstance(KEY_MD5);
			md5.update(data.getBytes());
			return new String(Base64.encodeBase64(md5.digest()));  
		} catch (NoSuchAlgorithmException e) {
			logger.warn(e);
		}  
		return null;
		
	}
	
	/**
	 * PBE加密
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static String encryptPBE(String data)throws Exception{
		Key key = toKey(PBE_PASSWORD);
		PBEParameterSpec paramSpec = new PBEParameterSpec(PBE_SALT, 100);  
		Cipher cipher = Cipher.getInstance(PBE_ALGORITHM);  
		cipher.init(Cipher.ENCRYPT_MODE, key, paramSpec);
		return new String(Base64.encodeBase64(cipher.doFinal(data.getBytes())));
	}

	/**
	 * 获得key
	 * @param password
	 * @return
	 * @throws Exception
	 */
	private static Key toKey(String password)throws Exception{
		PBEKeySpec keySpec = new PBEKeySpec(password.toCharArray());  
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance(PBE_ALGORITHM);  
		SecretKey secretKey = keyFactory.generateSecret(keySpec);  
		return secretKey;  
	}

	/**
	 * PBE解密
	 * @param encodedData
	 * @return
	 * @throws Exception
	 */
	public static String decryptPBE(String encodedData)throws Exception{
		Key key = toKey(PBE_PASSWORD);  
		
		PBEParameterSpec paramSpec = new PBEParameterSpec(PBE_SALT, 100);  
		Cipher cipher = Cipher.getInstance(PBE_ALGORITHM);  
		cipher.init(Cipher.DECRYPT_MODE, key, paramSpec);
		//base64解码
		byte[] dataBytes = Base64.decodeBase64(encodedData.getBytes());
		return new String(cipher.doFinal(dataBytes));  
	}

	public static void main(String[] args)throws Exception {
		String data = "2.006oUvQC0wbhSS68163a2bd60sJGdS";
		String enString = encryptPBE(data);
		System.out.println(enString);
		System.out.println(decryptPBE("/oqJlX+TYEhLr+z6tTsag3YL+YBM7diClemo48FiZY56MAdqkPmHWA=="));
	}



}
