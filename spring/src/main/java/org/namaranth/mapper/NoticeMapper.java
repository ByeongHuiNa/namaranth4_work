package org.namaranth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.namaranth.domain.NoticeVO;

import java.util.List;

@Mapper
public interface NoticeMapper {
    // 공지 사항 전체 조회
    public List<NoticeVO> noticeList();
    // 공지 사항 상세 조회
    public NoticeVO noticeDetail(int noti_no);
    // 공지 사항 등록
    public int noticeInsert(NoticeVO vo);
    // 공지 사항 삭제
    public int noticeDelete(int noti_no);
    // 공지 사항 수정
    public int noticeUpdate(NoticeVO vo);
}