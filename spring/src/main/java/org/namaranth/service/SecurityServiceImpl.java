package org.namaranth.service;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.namaranth.domain.UsersVO;
import org.namaranth.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SecurityServiceImpl implements SecurityService {
    @Autowired
    private UserMapper userMapper;

//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username)
                                throws UsernameNotFoundException {
        // 로그인 한 user 객체
        UsersVO user = userMapper.searchUserByEmail(username);
        // user 없는 경우
        if(user == null){
            throw new UsernameNotFoundException(username + " not found");
        }
        System.out.println("?");
        System.out.println(user + "돼?");
        // 스프링 시큐리티의 User 리턴

        return new User(user.getUser_email(), "{noop}" + user.getUser_pwd(),
                true, true, true, true,
                new ArrayList<>());
    }

    @Override
    public UsersVO createUser(UsersVO usersVO) {
        return null;
    }

    @Override
    public UsersVO getUserById(int user_id) {
        return userMapper.searchUserById(user_id);
    }

    @Override
    public UsersVO getUserByEmail(String user_email) {
        UsersVO user = userMapper.searchUserByEmail(user_email);

        if(user == null){
            throw new UsernameNotFoundException(user_email + "not found");
        }

        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        System.out.println("출력" + user);

        UsersVO vo = mapper.map(user, UsersVO.class);
        System.out.println("제발..." + vo);
        return user;
    }
}
