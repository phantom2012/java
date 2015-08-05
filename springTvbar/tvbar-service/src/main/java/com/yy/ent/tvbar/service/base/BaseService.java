package com.yy.ent.tvbar.service.base;

import com.yy.ent.commons.base.exception.ServerException;
import com.yy.ent.commons.jsonpclient.JSONPClient;
import org.apache.log4j.Logger;

import com.yy.ent.tvbar.service.bs2.Bs2Service;
import com.yy.ent.clients.cache.redis.RedisCCache;
import com.yy.ent.clients.halb.proxy.JSONPClientHALBProxy;
import com.yy.ent.clients.halb.proxy.YYPClientHALBProxy;
import com.yy.ent.clients.state.redis.YYClientState;
import com.yy.ent.commons.base.accessctrl.AccessPolicy;
import com.yy.ent.commons.base.cache.RedisEnv;
import com.yy.ent.commons.base.exception.BusinessException;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.commons.base.thread.ThreadTaskExecutor;
import com.yy.ent.commons.jsonpclient.adapter.JSONPClientRequest;
import com.yy.ent.commons.jsonpclient.adapter.JSONPClientResponse;
import com.yy.ent.commons.jsonpclient.pool.JSONPClientPool;
import com.yy.ent.commons.yypclient.adapter.ClientResponse;
import com.yy.ent.commons.yypclient.pool.YYPClientPool;
import com.yy.ent.external.service.EntProxyHalbService;
import com.yy.ent.external.service.WebdbHalbService;

public class BaseService {
    protected final Logger logger = Logger.getLogger(getClass());

    public static final int SUCCESS = 0;

    @Inject(instance = EntProxyHalbService.class)
    protected EntProxyHalbService entProxy;

    @Inject(instance = YYClientState.class)
    protected YYClientState stateProxy;

  /*  @Inject(instance = RedisCCache.class)*/
    protected RedisCCache cacheProxy;

    @Inject(instance = RedisEnv.class)
    protected RedisEnv redisEnv;

   /* @Inject(instance = WebdbHalbService.class)*/
    protected WebdbHalbService webdb;

    @Inject(instance = ThreadTaskExecutor.class)
    protected  ThreadTaskExecutor executor ;

  /*  @Inject(instance = YYPClientHALBProxy.class)*/
    private YYPClientHALBProxy yyProxy;

/*    @Inject(instance = JSONPClientHALBProxy.class)*/
    private JSONPClientHALBProxy jsonProxy;

    @Inject(instance = AccessPolicy.class)
    private AccessPolicy policy;

    @Inject(instance = Bs2Service.class)
    private Bs2Service bs2Service;


    /**
     * 验证业务异常
     */
    public void assertResult(ClientResponse rsp) throws BusinessException {
        int result = rsp.popInteger();
        if (result != SUCCESS) {
            throw new BusinessException(rsp.getHeader().toString(), result);
        }
    }

    /**
     * 项目中确实需要单独的线程池用该方法
     * @param corePoolSize
     * @param maximumPoolSize
     * @return
     */
    public ThreadTaskExecutor getCustomExecutor(int corePoolSize, int maximumPoolSize){
        return new ThreadTaskExecutor(corePoolSize,maximumPoolSize);
    }

    public JSONPClientResponse sendAndWait(JSONPClientRequest req, int timeOut) throws Exception {
    	try {
    		return jsonProxy.getClient().sendAndWait(req, timeOut);
        } catch (Exception e) {
            logger.error("sendAndWait error:", e);
            String key = jsonProxy.getClient().getIp() + ":" + jsonProxy.getClient().getPort();
            checkIfNeedToChangeClient(jsonProxy.getClient(), key);
            throw e;
        }
	}

    public JSONPClientResponse sendAndWait(JSONPClientRequest req) throws Exception {
        try {
            return jsonProxy.getClient().sendAndWait(req);
        } catch (Exception e) {
            logger.error("sendAndWait error:", e);
            String key = jsonProxy.getClient().getIp() + ":" + jsonProxy.getClient().getPort();
            checkIfNeedToChangeClient(jsonProxy.getClient(), key);
            throw e;
        }
    }

    public void sendOnly(JSONPClientRequest req) throws Exception {
        JSONPClientPool jsonpClientPool = jsonProxy.getClient();
        JSONPClient jsonpClient = null;
        try {
            jsonpClient = jsonpClientPool.borrowConn();
            jsonpClient.send(req);
        } catch (Exception e) {
            logger.error("ent sendOnly error:", e);
            String key = jsonpClientPool.getIp() + ":" + jsonpClientPool.getPort();
            checkIfNeedToChangeClient(jsonpClientPool, key);
            throw new ServerException(jsonpClientPool.getIp(),jsonpClientPool.getPort(),req.getHeader().uri(),e);
        }finally {
            jsonpClientPool.returnConn(jsonpClient);
        }
    }

    private void checkIfNeedToChangeClient(JSONPClientPool sender, String key) throws Exception {
        policy.addHit(key); //错误次数+1
        //当超过限制时切换client
        if (!policy.getFilterResult(key)) {
        	jsonProxy.changeClient(sender);
        }
    }

    private void checkIfNeedToChangeClient(YYPClientPool sender, String key) throws Exception {
        policy.addHit(key); //错误次数+1
        //当超过限制时切换client
        if (!policy.getFilterResult(key)) {
        	yyProxy.changeClient(sender);
        }
    }
}
