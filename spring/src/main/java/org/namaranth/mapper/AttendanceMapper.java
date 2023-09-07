package org.namaranth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.namaranth.domain.AttendVO;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Mapper
public interface AttendanceMapper {
    //한 사용자의 출퇴근 목록 : 최근 7일
    public List<AttendVO> attendList(int user_no);

    // 한 사용자의 오늘 날짜 출퇴근
    public AttendVO attend(int user_no);

    // 출근 체크
    public int attendStart(AttendVO vo);
    
    // 퇴근 체크
    public int attendEnd(@Param("at_no") int at_no, @Param("end_time") Date end_time);

    // 한 사용자가 해당 날짜 출근이 되어있는지 확인
    public int attendCount(Map<String, Object> params);

    // 한 사용자가 오늘 날짜 출근이 되어있는지 확인 (사용자 번호)
    public int attendStartTodayCount(int user_no);

    // 한 사용자가 오늘 날짜 퇴근이 되어있는지 확인 (사용자 번호)
    public int attendEndTodayCount(int user_no);
}
