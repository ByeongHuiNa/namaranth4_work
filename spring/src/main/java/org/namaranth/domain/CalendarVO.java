package org.namaranth.domain;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
