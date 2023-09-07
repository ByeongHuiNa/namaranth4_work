package org.namaranth.service;

import org.namaranth.domain.NoticeVO;
import org.namaranth.mapper.NoticeMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public interface NoticeService {
    public List<NoticeVO> getNoticeList();
    public NoticeVO getNotice(int noti_no);
    public boolean register(NoticeVO vo);
    public boolean modify(NoticeVO vo);
    public boolean remove(int noti_no);
}
