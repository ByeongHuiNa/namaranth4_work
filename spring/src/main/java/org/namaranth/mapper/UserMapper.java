package org.namaranth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.namaranth.domain.DocumentVO;
import org.namaranth.domain.EmailVO;
import org.namaranth.domain.ScheduleVO;
import org.namaranth.domain.UsersVO;

import java.util.List;

@Mapper
public interface UserMapper {
    // 전체 User 목록
    public List<UsersVO> list();

    // 전체 User 목록, 부서 이름도 함께 조회
    public List<UsersVO> listUser();

    // User 이메일로 조회
    public UsersVO searchUserByEmail(String user_email);

    // User 번호로 조회
    public UsersVO searchUserById(int user_no);

    // User 이름으로 조회 (검색)
    public List<UsersVO> searchUserByName(String user_name);

    // User 이메일로 부서명 조회
    public String readDept(String user_email);

    // User 번호로 이메일 목록 조회
    public List<EmailVO> readEmail(int user_no);

    // User 번호로 문서 목록 조회
    public List<DocumentVO> readDoc(int user_no);

    // User 번호로 일정 목록 조회
    public List<ScheduleVO> readSch(int user_no);
}
