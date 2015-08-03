package com.yy.ent.tvbar.service.base;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import com.yy.ent.commons.base.dto.OrderMapProperty;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.commons.base.valid.BlankUtil;
import com.yy.ent.commons.base.valid.CommUtil;
import com.yy.ent.commons.protopack.util.Uint;
import com.yy.ent.external.service.SubChannelOnLineService;
import com.yy.ent.external.webdb.WebResultConst;


/**
 * @author HuangJunHua
 *
 */
public class BatchGetInfoService extends BaseService {	
	
	@Inject(instance = SubChannelOnLineService.class)
	private SubChannelOnLineService subChannelOnLineService;
	
	private static final Logger m_logger = Logger.getLogger(BatchGetInfoService.class);
	
	/**
	 * @param list
	 * @param uid
	 * @param yynum
	 * @param nick
	 */
	public void listUserInfoByUids(List<Property> list, String uidKey, String yyNumKey, String nickKey) throws Exception {
		if (list == null || list.size() == 0) {
			return;
		}
		List<String> uids = new ArrayList<String>();
		for (Property prop : list) {
			String uid = prop.get(uidKey);
			if (CommUtil.isNumeric(uid)) {
				uids.add(uid);
			}
		}

		OrderMapProperty omp = webdb.listUserInfoByUids(uids);

		for (Property prop : list) {
			String uid = prop.get(uidKey);
			if (uid == null) {
				continue;
			}
			Property yyUidProp = omp.get(uid);
			if (yyUidProp == null) {
				continue;
			}
			String yyNum = yyUidProp.get(WebResultConst.User.YY_NUM);
			prop.put(yyNumKey, yyNum);
			if (!BlankUtil.isBlank(nickKey)) {
				String nick1 = prop.get(nickKey);
				if (!BlankUtil.isBlank(nick1)) {
					continue;
				}
				String nick2 = yyUidProp.get(WebResultConst.User.NICK);
				prop.put(nickKey, nick2);
			}
		}
	}	
	
	private static List<Uint> toUintList(List<Long> list){
		List<Uint> result = new ArrayList<Uint>(list.size());
		for (Long l : list){
			result.add(new Uint(l));
		}
		return result;
	}
	
	public void listAsidBySid(List<Property> list, String sidKey, String asidKey) throws Exception {
		if (list == null || list.size() == 0) {
			return;
		}
		List<String> sids = new ArrayList<String>();
		for (Property prop : list) {
			String uid = prop.get(sidKey);
			if (CommUtil.isNumeric(uid)) {
				sids.add(uid);
			}
		}
		Property sidToAsid = new Property();
		sidToAsid = webdb.listAsidsBySIds(sids);
//		LOGGER.info("ChannelService prop size:" + sidToAsid.size());
		for (Property prop : list) {
			prop.put(asidKey, sidToAsid.get(prop.get(sidKey)));
		}
	}	
	
	
	public void listSubOnlineUsers(List<Property> list, String chnlKey,String subchnlKey, String usersKey) throws Exception {
		// 批量获取在线人数		
		if (list == null || list.size() == 0) {
			return;
		}
		List<Property> cids = new ArrayList<Property>();
		for (Property prop : list) {
			String channel = prop.get(chnlKey);
			String subchannel = prop.get(subchnlKey);
			if (CommUtil.isNumeric(channel)&&CommUtil.isNumeric(subchannel)) {
				Property p = new Property();
				p.put("parentChannel", channel);
				p.put("subChannel", subchannel);
				cids.add(p);
			}
		}
		
		Property onlines = new Property();
		try {
			onlines = subChannelOnLineService.listSubChannelOnlineCount(cids);
			for (Property p : list) {
				String count=onlines.get(p.get(chnlKey)+"_"+p.get(subchnlKey));
				if (StringUtils.isBlank(count)) {
					p.put(usersKey, 0);
				} else {
					p.put(usersKey, count);
				}
			}
		} catch (Exception e) {
			m_logger.warn("invoke listOnlineUsers查询在线人数失败,cause: "+e.getMessage(), e);
			throw e;
		}
	}
	
}
