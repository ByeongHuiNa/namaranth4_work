package org.namaranth.service;

import org.namaranth.domain.UsersVO;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface SecurityService extends UserDetailsService {
    UsersVO createUser(UsersVO usersVO); // 회원가입
    UsersVO getUserById(int user_id); // 사용자 번호로 조회
    UsersVO getUserByEmail(String user_email); // 사용자 이메일(아이디)로 조회
}
