package org.namaranth.service;

import java.util.List;

import org.namaranth.domain.ScheduleVO;
import org.namaranth.mapper.ScheduleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScheduleServiceImpl implements ScheduleService {

	@Autowired
	private ScheduleMapper mapper;
	
	@Override
	public List<ScheduleVO> getSchedule() {
		return mapper.getSchedule();
	}

	@Override
	public List<ScheduleVO> getScheduleByCalNo(int cal_no) {
		return mapper.getScheduleByCalNo(cal_no);
	}

	@Override
	public void registerSch(ScheduleVO sch) {
		mapper.insertSelectKey(sch);
	}

}
