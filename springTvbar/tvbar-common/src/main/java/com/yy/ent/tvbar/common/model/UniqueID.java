package com.yy.ent.tvbar.common.model;

import com.yy.ent.cherroot.entity.EntityBean;
import com.yy.ent.cherroot.entity.annotation.Column;
import com.yy.ent.cherroot.entity.annotation.Entity;

@Entity(table="unique_value")
public class UniqueID extends EntityBean{

	/** 表标记--一般为表名 */
	@Column(name="key_name",isPK=true)
	private String key;
	/** 表使用的id值  */
	@Column(name="value")
	private Long value=0l;
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public Long getValue() {
		return value;
	}
	public void setValue(Long value) {
		this.value = value;
	}
}
