package org.namaranth.domain;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
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
