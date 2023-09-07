package org.namaranth.domain;


import java.util.Date;

import lombok.Data;

@Data
public class NoticeVO {
	
	private int noti_no;
	private String noti_title;
	private String noti_content;
	private Date noti_regdate;
	private UsersVO user;
	
    public int getUser_no() {
        return user.getUser_no();
    }	
}
