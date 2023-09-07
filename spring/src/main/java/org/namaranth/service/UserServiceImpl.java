package org.namaranth.service;

import org.namaranth.domain.UsersVO;
import org.namaranth.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserMapper mapper;

    @Override
    public List<UsersVO> getList() {
        return mapper.listUser();
    }
}
