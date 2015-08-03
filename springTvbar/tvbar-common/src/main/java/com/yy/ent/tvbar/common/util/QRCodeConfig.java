package com.yy.ent.tvbar.common.util;

public class QRCodeConfig {
	private String fileName;
	private int width;
	private int height;
	
	public QRCodeConfig() {
		super();
	}
	
	public QRCodeConfig(String fileName, int width, int height) {
		this.fileName = fileName;
		this.width = width;
		this.height = height;
	}

	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public int getWidth() {
		return width;
	}
	public void setWidth(int width) {
		this.width = width;
	}
	public int getHeight() {
		return height;
	}
	public void setHeight(int height) {
		this.height = height;
	}
}
