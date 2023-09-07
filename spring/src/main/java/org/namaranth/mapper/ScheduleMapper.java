package org.namaranth.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.namaranth.domain.ScheduleVO;

@Mapper
public interface ScheduleMapper {
	public List<ScheduleVO> getSchedule();
	public List<ScheduleVO> getScheduleByCalNo(int cal_no);
	
	public void insertSelectKey(ScheduleVO sch);
	
	public void deleteSchWithCal(int cal_no);
}
