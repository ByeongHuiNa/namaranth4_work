package org.namaranth.vo;

import lombok.Data;

@Data
public class RequestLogin {
    private String user_email;
    private String user_pwd;
}
