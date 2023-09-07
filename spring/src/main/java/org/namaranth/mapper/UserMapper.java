package org.namaranth.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.namaranth.domain.DocumentVO;

import org.namaranth.domain.EmailVO;
import org.namaranth.domain.ScheduleVO;
import org.namaranth.domain.UsersVO;

@Mapper
public interface UserMapper {
    public List<UsersVO> list();
    public UsersVO readUser(String user_email);
    public List<UsersVO> searchUserByName(String user_name);
    public String readDept(String user_email);
    public List<UsersVO> listUser();
    public List<EmailVO> readEmail(int user_no);
    public List<DocumentVO> readDoc(int user_no);
    public List<ScheduleVO> readSch(int user_no);
}
