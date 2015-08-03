package com.yy.ent.tvbar.action.test;


import com.yy.ent.cherrice.ret.Forward;
import com.yy.ent.commons.base.JsonUtil;
import com.yy.ent.cherrice.Return;
import com.yy.ent.cherrice.annotation.Read;
import com.yy.ent.commons.base.dto.Property;
import com.yy.ent.commons.base.inject.Inject;
import com.yy.ent.mobile.bs2.EntBs2Client;
import com.yy.ent.tvbar.base.BaseAction;
import com.yy.ent.tvbar.common.constants.Constants;
import com.yy.ent.tvbar.common.model.info.HistoryGroup;
import com.yy.ent.tvbar.common.model.info.Topic;
import com.yy.ent.tvbar.dao.base.MultiDao;
import com.yy.ent.tvbar.dao.info.TopicDao;
import com.yy.ent.tvbar.service.DemoService;
import com.yy.ent.tvbar.service.info.PageService;
import com.yy.ent.tvbar.service.info.TopicService;
import javassist.bytecode.ByteArray;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.util.JSONUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.lang.reflect.Method;
import java.sql.*;
import java.util.*;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2015-06-25.
 */


public class TestAction extends BaseAction {

    @Inject(instance = TopicService.class)
    private TopicService topicService;

    @Inject(instance = PageService.class)
    private PageService pageService;

    @Inject(instance = TopicDao.class)
    private TopicDao topicDao;

    @Inject(instance = EntBs2Client.class)
    private EntBs2Client entBs2Client;

    @Inject(instance = MultiDao.class)
    private MultiDao multiDao;

    public Return test(@Read(key = "cmd") String cmd) throws Exception {
        HttpServletRequest req = getRequest();
        String retStr = new String();
        try {
            if (cmd.equals("pushTopic")) {
                SimpleDateFormat dateformat = new SimpleDateFormat("yyyyMMdd HH:mm:ss");
                Topic topic = new Topic();
                topic.setTitle("何以琛为什么会喜欢赵默笙");
                topic.setType(new Integer(1).byteValue());
                topic.setDescription("关于这个话题讨论得很多");
                topic.setSouName("何以笙箫默");
                topic.setCreatorId("1");
                topic.setCreateTime(new Date());
                topic.setLastReplyTime(new Date());
                topic.setTopicPic("http://baike.baidu.com/picture/590814/590814/16943870/f11f3a292df5e0fe23ae6649586034a85fdf72c0.html?fr=lemma&ct=cover#aid=16943870&pic=1b4c510fd9f9d72a24a622bad02a2834359bbb52");
                int ret = topicDao.insert(topic);
                retStr = String.valueOf(ret);
            } else if (cmd.equals("getTopicBySql")) {
                String sql = "select * from topic where topic_id = 1;";
                Property queryTopic = multiDao.query("QueryTopicById", 1);
                retStr = queryTopic.toJSONString();
            } else if (cmd.equals("queryMoreTopics")) {
//                List<Property> p = topicService.queryMoreTopics(5, 2);
//                retStr = JsonUtil.toString(p);
            } else if (cmd.equals("pushPointpushPoint")) {
                SimpleDateFormat dateformat = new SimpleDateFormat(Constants.DATEPATTERN1);
                JSONObject jsonEvidence = new JSONObject();
                jsonEvidence.put("topicId", 1);
                jsonEvidence.put("pointId", 1);
                jsonEvidence.put("picture", "small_pic_url");
                jsonEvidence.put("description", "show a explain");
                jsonEvidence.put("createTime", dateformat.format(new Date()));
                JSONObject jsonEvidence1 = new JSONObject();
                jsonEvidence1.put("topicId", 1);
                jsonEvidence1.put("pointId", 1);
                jsonEvidence1.put("picture", "small_pic_url1");
                jsonEvidence1.put("description", "show a explain1");
                jsonEvidence1.put("createTime", dateformat.format(new Date()));
                JSONObject jsonPoint = new JSONObject();
                jsonPoint.put("title", "某某为什么和某某离婚");
                jsonPoint.put("topicId", 1);
                jsonPoint.put("creatorId", 1);
                jsonPoint.put("createTime", dateformat.format(new Date()));
                jsonPoint.put("viewPic", "sdafsdfd");
                JSONArray jsonArray = new JSONArray();
                jsonArray.add(jsonEvidence);
                jsonArray.add(jsonEvidence1);
                jsonPoint.put("evidences", jsonArray);
                pageService.insertPoint(jsonPoint);
            } else if (cmd.equals("getTopic")) {
                retStr = pageService.queryTopicByTopicId(1, 0).toString();
            } else if (cmd.equals("getMoreTopic")) {
                retStr = JsonUtil.toString(pageService.queryMoreTopic(1, 0, Constants.VIEWPOINT_MORECNT));
            } else if (cmd.equals("upLoad")) {
                Byte byteData = new Byte("12");
                retStr = "23435";
//                entBs2Client.uploadMinFileData(byteData.byteValue(), "test.jpg");
            } else if (cmd.equals("queryRelativeGroup")) {
                retStr = JsonUtil.toString(pageService.queryRelativeGroupByGroupId(1));
            } else if (cmd.equals("queryGroup")) {
                retStr = JsonUtil.toString(pageService.queryGroup(1, 10));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return getRender("test.action, " + cmd + ",retStr=" + retStr);
    }

    public Forward indexUpload() throws Exception {
        return getForward("../../testUpload.jsp");
    }

    public static void main(String[] args) throws Exception {
        Connection conn = null;
        String sql;
        // MySQL的JDBC URL编写方式：jdbc:mysql://主机名称：连接端口/数据库的名称?参数=值
        // 避免中文乱码要指定useUnicode和characterEncoding
        // 执行数据库操作之前要在数据库管理系统上创建一个数据库，名字自己定，
        // 下面语句之前就要先创建javademo数据库
        String url = "jdbc:mysql://221.228.79.235:20043/tvbar?"
                + "user=tvbar&password=pPhLbEoOSOhy&useUnicode=true&characterEncoding=UTF8";

        try {
            // 之所以要使用下面这条语句，是因为要使用MySQL的驱动，所以我们要把它驱动起来，
            // 可以通过Class.forName把它加载进去，也可以通过初始化来驱动起来，下面三种形式都可以
            Class.forName("com.mysql.jdbc.Driver");// 动态加载mysql驱动
            // or:
            // com.mysql.jdbc.Driver driver = new com.mysql.jdbc.Driver();
            // or：
            // new com.mysql.jdbc.Driver();

            System.out.println("成功加载MySQL驱动程序");
            // 一个Connection代表一个数据库连接
            conn = DriverManager.getConnection(url);
            // Statement里面带有很多方法，比如executeUpdate可以实现插入，更新和删除等
            Statement stmt = conn.createStatement();
//            sql = "create table student(NO char(20),name varchar(20),primary key(NO))";
//            int result = stmt.executeUpdate(sql);// executeUpdate语句会返回一个受影响的行数，如果返回-1就没有成功
//            if (result != -1) {
//                System.out.println("创建数据表成功");
//                sql = "insert into student(NO,name) values('2012001','陶伟基')";
//                result = stmt.executeUpdate(sql);
//                sql = "insert into student(NO,name) values('2012002','周小俊')";
//                result = stmt.executeUpdate(sql);

            long sysDate = System.currentTimeMillis();

//            sql = "select * from user_info WHERE userId=";
            sql = "update user_info set sex='1' where userId='1'";

            for (int i = 1; i < 100; i++) {
                String exeSql = sql + String.valueOf(i);
//                ResultSet rs =
                        stmt.executeUpdate(sql);// executeQuery会返回结果的集合，否则返回空值
//                System.out.println("学号\t姓名");
//                while (rs.next()) {
//                    System.out.println(rs.getString(1) + "\t" + rs.getString(2));// 入如果返回的是int类型可以用getInt()
//                }

//                System.out.println("学号\t姓名");
//                while (rs.next()) {
//                    System.out
//                            .println(rs.getString(1) + "\t" + rs.getString(2));// 入如果返回的是int类型可以用getInt()
////                }
            }
            long sysDate1 = System.currentTimeMillis();
            System.out.println("makeTime="+(sysDate1-sysDate));
        } catch (SQLException e) {
            System.out.println("MySQL操作错误");
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            conn.close();
        }
    }
}




