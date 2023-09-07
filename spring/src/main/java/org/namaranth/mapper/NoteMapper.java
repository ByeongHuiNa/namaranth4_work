package org.namaranth.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.namaranth.domain.NoteVO;

import java.util.List;

@Mapper
public interface NoteMapper {
    public List<NoteVO> noteList(int user_no);
    public NoteVO noteDetail(int note_no);
    public int noteInsert(NoteVO vo);
    public int noteDelete(int note_no);
    public int noteUpdate(NoteVO vo);
}
