package org.namaranth.domain;

import java.util.List;

import lombok.Data;

@Data
public class CalendarVO {
	private int cal_no;
	private String cal_name;
	private String cal_color;
	private String cal_con;
	private boolean sharedCalendar; 
	
	private UsersVO users;

	public void setUserCalParti_no(List<Integer> calPartiUserNoList) {
	
		
	}
}
