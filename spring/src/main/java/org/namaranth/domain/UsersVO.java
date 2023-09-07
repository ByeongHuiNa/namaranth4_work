package org.namaranth.domain;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsersVO {
	private int user_no;
	private String user_name;
	private Date user_birth;
	private String user_phone;
	private String user_position;
	private String user_email;
	private String user_pwd;
	private String user_profile;
	private DeptVO dept;

	//private List<AuthVO> authList;
}
