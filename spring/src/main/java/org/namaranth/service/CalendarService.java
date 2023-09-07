package org.namaranth.service;

import java.util.List;

import org.namaranth.domain.CalendarVO;
import org.namaranth.domain.RequestVO;
import org.namaranth.domain.UsersVO;

public interface CalendarService {
	public List<CalendarVO> getList();
	
	public CalendarVO get(int cal_no);
	public List<UsersVO> readUserFromCalParti(int cal_no);


	//public void register(CalendarVO cal);

	public void registerCal(CalendarVO cal, List<Integer> calParti_no);

	public void deleteCal(int cal_no);

	public void updateCal(CalendarVO cal, List<Integer> calParti_no);
	
}
