package org.namaranth.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeptVO {
   private int dept_no;
   private String dept_name;
   private String dept_local;
}
