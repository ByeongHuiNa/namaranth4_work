package org.namaranth.service;

import org.namaranth.domain.DocumentVO;
import org.namaranth.domain.EmailVO;
import org.namaranth.domain.ScheduleVO;
import org.namaranth.domain.UsersVO;

import java.util.List;

public interface UserService {
    public List<UsersVO> getUserList();
    public List<UsersVO> getdeptUserList();
    public UsersVO getUserByEmail(String user_email);
    public UsersVO getUserById(int user_no);
    public List<UsersVO> getUserByName(String user_name);
    public String getDept(String user_email);
    public List<EmailVO> getEmails(int user_no);
    public List<DocumentVO> getDoc(int user_no);
    public List<ScheduleVO> getSchedules(int user_no);
}
