package org.namaranth.service;

import org.namaranth.domain.NoteVO;
import org.namaranth.mapper.NoteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteServiceImpl implements NoteService {
    @Autowired
    private NoteMapper noteMapper;

    @Override
    public List<NoteVO> getList(int user_no) {
        return noteMapper.noteList(user_no);
    }

    @Override
    public NoteVO get(int note_no) {
        return noteMapper.noteDetail(note_no);
    }

    @Override
    public int register(NoteVO vo) {
        return noteMapper.noteInsert(vo);
    }

    @Override
    public int modify(NoteVO vo) {
        return noteMapper.noteUpdate(vo);
    }

    @Override
    public int remove(int note_no) {
        return noteMapper.noteDelete(note_no);
    }
}
