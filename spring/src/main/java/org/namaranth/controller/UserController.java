package org.namaranth.controller;

import org.namaranth.domain.UsersVO;
import org.namaranth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService service;

    @GetMapping("/userlist")
    public List<UsersVO> userList(){
        return service.getList();
    }
}
