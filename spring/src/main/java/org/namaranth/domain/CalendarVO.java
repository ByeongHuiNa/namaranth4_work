package org.namaranth.domain;

import java.util.List;

<<<<<<< HEAD
import lombok.Data;

@Data
=======
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
>>>>>>> jsg
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
