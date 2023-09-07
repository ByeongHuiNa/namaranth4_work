package org.namaranth.service;

import java.util.List;

//import org.namaranth.domain.DocumentVO;
//import org.namaranth.domain.EmailVO;
import org.namaranth.domain.ScheduleVO;
import org.namaranth.domain.UsersVO;
import org.namaranth.mapper.UserMapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j;

@Service
@AllArgsConstructor
@Repository
public class UserServiceImpl implements UserService {

	private UserMapper mapper;
	
//	@Override
//	public List<UsersVO> getUserList() {
//
//		return mapper.list();
//	}
//
//	@Override
//	public UsersVO getUser(String user_email) {
//
//		return mapper.readUser(user_email);
//	}
//
//	@Override
//	public List<UsersVO> getUserByName(String user_name) {
//		return mapper.searchUserByName(user_name);
//	}
//
//	@Override
//	public String getDept(String user_email) {
//
//		return mapper.readDept(user_email);
//	}
//
	@Override
	  public List<UsersVO> getdeptUserList() {

	      return mapper.listUser();
	 }

//	@Override
//	public List<EmailVO> getEmails(int user_no) {
//
//		return mapper.readEmail(user_no);
//	}
//
////	@Override
////	public List<DocumentVO> getDocComplete(int user_no) {
////		log.info("get Doc Complete");
////		return mapper.readDocComplete(user_no);
////	}
//
//	@Override
//	public List<DocumentVO> getDoc(int user_no) {
//
//		return mapper.readDoc(user_no);
//	}

//	@Override
//	public List<ScheduleVO> getSchedules(int user_no) {
//		return mapper.readSch(user_no);
//	}

}
