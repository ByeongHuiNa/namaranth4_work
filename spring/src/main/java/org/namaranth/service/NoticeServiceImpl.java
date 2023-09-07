package org.namaranth.service;

import org.namaranth.domain.NoticeVO;
import org.namaranth.mapper.NoticeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService {

    @Autowired
    private NoticeMapper noticeMapper;

    @Override
    public List<NoticeVO> getNoticeList() {
        return noticeMapper.noticeList();
    }

    @Override
    public NoticeVO getNotice(int noti_no) {
        return noticeMapper.noticeDetail(noti_no);
    }

    @Override
    public boolean register(NoticeVO vo) {
        return noticeMapper.noticeInsert(vo) == 1;
    }

    @Override
    public boolean remove(int noti_no) {
        return noticeMapper.noticeDelete(noti_no) == 1;
    } // 잘 처리되면 1 : true

    @Override
    public boolean modify(NoticeVO vo) {
        return noticeMapper.noticeUpdate(vo) == 1;
    } // 잘 처리되면 1 : true

}
