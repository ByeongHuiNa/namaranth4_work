package org.namaranth.service;

import org.namaranth.domain.NoteVO;

import java.util.List;

public interface NoteService {
    public List<NoteVO> getList(int user_no);
    public NoteVO get(int note_no);
    public int register(NoteVO vo);
    public int modify(NoteVO vo);
    public int remove(int note_no);
}
