package org.namaranth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.namaranth.domain.DocumentVO;
import org.namaranth.domain.UsersVO;

import java.util.List;


@Mapper
public interface DocumentMapper {
    public List<DocumentVO> list();
    public DocumentVO get(int doc_no);
//    public List<DocumentVO> doclist(int user_no);
//    public List<DocumentVO> appReqList(int user_no);
//    public String getDocAppDegree(@Param("doc_no") int doc_no, @Param("user_no") int user_no);
//    public List<DocumentVO> appRejList(int user_no);
//    public List<DocumentVO> appComplList(int user_no);
    public UsersVO docFirstApp(int doc_no);
    public UsersVO docSecondApp(int doc_no);
//    public int appCheck(@Param("doc_no") int doc_no,@Param("user_no") int user_no);
//    public int rejCheck(@Param("doc_no") int doc_no,@Param("user_no") int user_no);
    public List<Integer> appCheck(int doc_no);
    public List<Integer> rejCheck(int doc_no);
    public List<UsersVO> selectRefList(int doc_no);
//    public List<DocumentVO> refBoardList(int user_no);
    public String rejContent(int doc_no);
//    public int getDocTotal(int doc_no);

    //criSelect
    //public List<DocumentVO> docList(@Param("user_no") int user_no, @Param("cri") Criteria cri);


    //insert
//    public void writeDoc(DocumentVO vo);
//    public void insertFisrtApp(@Param("doc_no") int doc_no,@Param("user_no") int user_no);
//    public void insertSecondApp(@Param("doc_no") int doc_no,@Param("user_no") int user_no);
//    public void docAppInsert(@Param("doc_no") int doc_no,@Param("user_no") int user_no);
//    public void docRejInsert(@Param("doc_no") int doc_no,@Param("user_no") int user_no, @Param("docrej_content") String docrej_content);
    public void insertRef(@Param("doc_no") int doc_no,@Param("user_no") int user_no);


    //update
//    public void docAppUpdate(int doc_no);
//    public void docRejUpdate(int doc_no);
}
