package org.namaranth.mapper;

import org.apache.ibatis.annotations.Mapper;


import org.namaranth.domain.EmailVO;
import org.namaranth.domain.EmailtsVO;

import java.util.List;

@Mapper
public interface EmailMapper {

    public List<EmailVO> all();
    //public List<EmailVO> getAllList(int user_no); //전체메일함
    public List<EmailVO> getSendList(int user_no); //보낸메일함
    public List<EmailVO> getReceiveList(int user_no); //받은메일함
    public List<EmailtsVO> getTsList(int user_no);  //임시메일함
    public List<EmailVO> getDelList(int user_no);  //휴지통

    public EmailVO read(int mail_no); //일반메일조회

    public EmailtsVO readts(int mailts_no); //임시메일조회

    public int tsdelete(int mailts_no); //임시메일삭제

    public List<EmailVO> readReceiver(int mail_no); //메일수신자조회

    public void insert(EmailVO email); //메일작성

    public void tsinsert(EmailVO email); //임시저장메일작성

    public void insertReceiver(int receiver_no);//메일작성수신자

    public void mailDel(EmailVO email); //메일삭제

    public int mailRestore(int mail_no); //메일복구
}
