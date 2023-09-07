package org.namaranth.service;

import java.util.List;

//import org.namaranth.domain.DocumentVO;
//import org.namaranth.domain.EmailVO;
import org.namaranth.domain.ScheduleVO;
import org.namaranth.domain.UsersVO;

public interface UserService {
//	public List<UsersVO> getUserList();
//	public UsersVO getUser(String user_email);
//	public List<UsersVO> getUserByName(String user_name);
//	public String getDept(String user_email);
	public List<UsersVO> getdeptUserList();
	//public List<EmailVO> getEmails(int user_no);
	//public List<DocumentVO> getDoc(int user_no);
//	public List<ScheduleVO> getSchedules(int user_no);
}
