package org.namaranth.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmailResponseVO {
    private EmailVO email;
    private List<EmailVO> receivers;


}
