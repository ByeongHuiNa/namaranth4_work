package org.namaranth.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DocumentVO {
    private int doc_no;
    private String doc_title;
    private Date doc_regdate;
    private String doc_content;
    private String doc_status;
    private UsersVO user;
}
