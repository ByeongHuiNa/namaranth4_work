package org.namaranth.domain;

import lombok.Data;

@Data
public class NoteVO {
	
	private int note_no;
	private UsersVO user;
	private String note_title;
	private String note_content;
	
    public int getUser_no() {
        return user.getUser_no();
    }	
}
