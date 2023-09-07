package org.namaranth.service;

import org.namaranth.domain.DocumentVO;
import org.namaranth.domain.UsersVO;
import org.namaranth.mapper.DocumentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService{

    @Autowired
    DocumentMapper mapper;

    @Override
    public List<DocumentVO> getList() {
        return mapper.list();
    }

    @Override
    public DocumentVO getDocument(int id) {
        return mapper.get(id);
    }

    @Override
    public List<UsersVO> getDocRefList(int id) {
        return mapper.selectRefList(id);
    }

    @Override
    public UsersVO getDocFirstApp(int id) {
        return mapper.docFirstApp(id);
    }

    @Override
    public UsersVO getDocSecondApp(int id) {
        return mapper.docSecondApp(id);
    }

    @Override
    public List<Integer> getAppCheck(int id) {
        return mapper.appCheck(id);
    }

    @Override
    public List<Integer> getRejCheck(int id) {
        return mapper.rejCheck(id);
    }

    @Override
    public String getRejContent(int id) {
        return mapper.rejContent(id);
    }

    @Override
    public void addRefUser(int id, List<UsersVO> users) {
        if(users!=null) {
            for (UsersVO user : users) {
                try {
                    mapper.insertRef(id, user.getUser_no());
                } catch (Exception e) {
                    System.out.println(id+"에 중복값 "+user.getUser_no()+" 존재");
                }

            }
        }
    }
}
