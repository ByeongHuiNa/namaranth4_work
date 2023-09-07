package org.namaranth.service;

import org.namaranth.domain.DocumentVO;
import org.namaranth.domain.EmailVO;
import org.namaranth.domain.ScheduleVO;
import org.namaranth.domain.UsersVO;
import org.namaranth.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserMapper userMapper;

    // 전체 User 목록
    @Override
    public List<UsersVO> getUserList() {
        return userMapper.list();
    }

    // 전체 User 목록, 부서 이름도 함께 조회
    @Override
    public List<UsersVO> getdeptUserList() {
        return userMapper.listUser();
    }

    // User 이메일로 조회
    @Override
    public UsersVO getUserByEmail(String user_email) {
        return userMapper.searchUserByEmail(user_email);
    }

    // User 번호로 조회
    @Override
    public UsersVO getUserById(int user_no) {
        return userMapper.searchUserById(user_no);
    }

    // User 이름 조회 (검색을 위해)
    @Override
    public List<UsersVO> getUserByName(String user_name) {
        return userMapper.searchUserByName(user_name);
    }

    // User 이메일로 부서명 조회
    @Override
    public String getDept(String user_email) {
        return userMapper.readDept(user_email);
    }

    // User 번호로 이메일 목록 조회
    @Override
    public List<EmailVO> getEmails(int user_no) {
        return userMapper.readEmail(user_no);
    }

    // User 번호로 문서 목록 조회
    @Override
    public List<DocumentVO> getDoc(int user_no) {
        return userMapper.readDoc(user_no);
    }

    // User 번호로 일정 목록 조회
    @Override
    public List<ScheduleVO> getSchedules(int user_no) {
        return userMapper.readSch(user_no);
    }

}
