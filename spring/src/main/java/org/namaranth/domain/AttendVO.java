package org.namaranth.domain;

import java.util.Date;

import lombok.Data;

@Data
public class AttendVO {
	
	private int at_no;
	private UsersVO user;
	private Date start_time;
	private Date end_time;
	
    public int getUser_no() {
        return user.getUser_no();
    }	
}
