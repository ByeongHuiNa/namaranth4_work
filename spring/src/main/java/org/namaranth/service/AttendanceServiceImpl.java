package org.namaranth.service;

import org.namaranth.domain.AttendVO;
import org.namaranth.mapper.AttendanceMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceServiceImpl implements AttendanceService{
    @Autowired
    private AttendanceMapper attendanceMapper;

    @Override
    public List<AttendVO> getList(int user_no) {
        return attendanceMapper.attendList(user_no);
    }

    @Override
    public AttendVO get(int user_no) {
        return attendanceMapper.attend(user_no);
    }

    @Override
    public int updateStart(AttendVO vo) {
        return attendanceMapper.attendStart(vo);
    }

    @Override
    public int updateEnd(int at_no, Date end_time) {
        return attendanceMapper.attendEnd(at_no, end_time);
    }

    @Override
    public boolean isExistStart(Map<String, Object> params) {
        return attendanceMapper.attendCount(params) > 0;
    }

    @Override
    public boolean isExistStartToday(int user_no) {
        return attendanceMapper.attendStartTodayCount(user_no) > 0;
    }

    @Override
    public boolean isExistEndToday(int user_no) {
        return attendanceMapper.attendEndTodayCount(user_no) > 0;
    }
}
