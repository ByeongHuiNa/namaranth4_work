package org.namaranth.service;

import java.util.List;

import org.namaranth.domain.ScheduleVO;

public interface ScheduleService {
	public List<ScheduleVO> getSchedule();
	public List<ScheduleVO> getScheduleByCalNo(int cal_no);
	
	public void registerSch(ScheduleVO sch);
}
