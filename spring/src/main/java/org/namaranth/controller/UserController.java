package org.namaranth.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.namaranth.domain.UsersVO;
import org.namaranth.service.SecurityService;
import org.namaranth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class UserController {

    @Value("${token.secret}")
    private String user_token; // application.properties 또는 application.yml에서 설정한 시크릿 값 가져오기

    @Autowired
    private SecurityService securityService;

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public void login(){}

    @GetMapping("/logout")
    public void logout(){}

    @GetMapping("/user")
    public UsersVO getUser(HttpServletRequest request){
        String jwtToken = request.getHeader("Authorization").substring(7);

        // 토큰을 해석해서 클레임(Claims)을 얻습니다.
        Claims claims = Jwts.parser().setSigningKey(user_token).parseClaimsJws(jwtToken).getBody();
        int user_no = Integer.parseInt(claims.getSubject());
        System.out.println("**" + userService.getUserById(user_no));
        return userService.getUserById(user_no);
    }
    
    @GetMapping("/userlist")
    public List<UsersVO> userList(){
        return userService.getList();
    }
}
