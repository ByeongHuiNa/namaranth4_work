package org.namaranth.domain;

import java.util.Date;

import lombok.Data;

@Data
public class ScheduleVO {
	private int sch_no;
	private String sch_name;
	private Date sch_start;
	private Date sch_end;
	private String sch_place;
	private String sch_noti;
	private String sch_con;
	private int sch_allday;
	
	private CalendarVO calendar;
	private UsersVO users;
}
