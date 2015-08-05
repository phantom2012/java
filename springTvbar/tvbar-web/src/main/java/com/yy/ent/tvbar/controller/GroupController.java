package com.yy.ent.tvbar.controller;

import com.yy.ent.tvbar.service.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Created by Administrator on 2015-08-04.
 */
@Controller
public class GroupController {
    @Autowired
    private GroupService groupService;

    @RequestMapping(value = "/testGroupPage", method = RequestMethod.GET)//tvbar.yy.com/testGroupPage.action?groupId=1
    public String groupPage(@RequestParam("groupId") Integer groupId, Model model) throws Exception {
        groupService.queryGroupByGroupId(groupId);
        return "index";
    }
}
