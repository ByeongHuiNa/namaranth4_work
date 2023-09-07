package org.namaranth.domain;

import lombok.Data;

@Data
public class NoticeAttachVO {
	
	private String noti_uuid;
	private int noti_no;	
	private String noti_filepath;
	private String noti_filename;
	private String noti_filetype;
	
}
