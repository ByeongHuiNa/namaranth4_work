package org.namaranth.domain;

import lombok.Data;

import java.util.Date;

@Data
public class EmailtsVO {

    private int mailts_no;
    private int user_no;
    private String user_email;
    private String mailts_title;
    private String mailts_content;
    private Date mailts_regdate;
    private String user_name;
}
