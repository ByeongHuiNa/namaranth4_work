package org.namaranth.service;

import org.namaranth.domain.EmailVO;
import org.namaranth.domain.EmailtsVO;
import org.springframework.stereotype.Service;

import java.util.List;


public interface EmailService {

        public List<EmailVO> getAll();
        public List<EmailVO> getSendList(int user_no); //보낸메일함

        public List<EmailVO> getReceiveList(int user_no);//받은메일함

        public List<EmailtsVO> getTsList(int user_no); //임시메일리스트select

        public List<EmailVO> getDelList(int user_no);// 휴지통

        public EmailVO get(int mail_no);			//일반메일 조회

        public EmailtsVO getts(int mailts_no);		//임시메일조회

        public boolean tsremove(int mailts_no);		//임시메일 전송시 삭제

        public List<EmailVO> getReceiver(int mail_no); //수신자 리스트 불러오기

        public void register(EmailVO email);			//메일전송

        public void registerUser(int user_no);			//메일 수신자 테이블에 insert

        public void tsregister(EmailVO email); //임시메일저장

        public void emailDel(EmailVO email); //메일삭제

        public boolean restore(int mail_no);  //휴지통메일 복구
    }


