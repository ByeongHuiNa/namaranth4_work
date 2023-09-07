package org.namaranth.domain;

import java.util.Date;

import lombok.Data;

@Data
public class EmailVO {
	
	private int mail_no;
	private String user_name;
	private String user_email;
	private int user_no;
	private String mail_title;
	private String mail_content;
	private Date mail_regdate;
	private String user_email_rcver;
	
	
}
