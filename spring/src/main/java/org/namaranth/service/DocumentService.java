package org.namaranth.service;

import org.namaranth.domain.DocumentVO;
import org.namaranth.domain.UsersVO;
import org.namaranth.mapper.DocumentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


public interface DocumentService {
    public List<DocumentVO> getList();
    public DocumentVO getDocument(int id);
    public List<UsersVO> getDocRefList(int id);
    public UsersVO getDocFirstApp(int id);
    public UsersVO getDocSecondApp(int id);
    public List<Integer> getAppCheck(int id);
    public List<Integer> getRejCheck(int id);
    public String getRejContent(int id);
    public void addRefUser(int id, List<UsersVO> users);
}
