package org.namaranth.domain;

import java.util.Date;

import lombok.Data;

@Data
public class EmailtsVO {

	
	private int mailts_no;
	private int user_no;
	private String user_email;
	private String mailts_title;
	private String mailts_content;
	private Date mailts_regdate;
	
}
