package org.namaranth.service;

import org.namaranth.domain.AttendVO;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface AttendanceService {
    public List<AttendVO> getList(int user_no);
    public AttendVO get(int user_no);
    public int updateStart(AttendVO vo);
    public int updateEnd(int at_no, Date end_time);
    public boolean isExistStart(Map<String, Object> params);
    public boolean isExistStartToday(int user_no);
    public boolean isExistEndToday(int user_no);

}
