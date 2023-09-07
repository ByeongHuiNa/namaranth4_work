package org.namaranth.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.namaranth.domain.UsersVO;
import org.namaranth.service.SecurityService;
import org.namaranth.vo.RequestLogin;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private SecurityService securityService;
    private Environment env;

    public AuthenticationFilter(AuthenticationManager authenticationManager,
                                SecurityService securityService, Environment env) {
        super.setAuthenticationManager(authenticationManager);
        this.securityService = securityService;
        this.env = env;
    }

    @Override // 로그인 처음 시도 시 호출되는 메소드
    public Authentication attemptAuthentication(HttpServletRequest request,
                                HttpServletResponse response) throws AuthenticationException {
        try {
            // RequestLogin 클래스를 사용하는 것이 사용자 입력을 더 안전하게 처리 가능
            // RequestLogin 클래스에서 수행되는 입력 유효성 검사 및 데이터 처리를 직접
            // 구현해야 하므로 복잡성, 보안 문제 발생 가능
            RequestLogin creds = new ObjectMapper().readValue(request.getInputStream(), RequestLogin.class);
            System.out.println("Test..." + creds);
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken( creds.getUser_email(),
                    creds.getUser_pwd(),
                    new ArrayList<>());
            System.out.println("check");
            System.out.println(token);
            Authentication authentication = getAuthenticationManager().authenticate(token);

            System.out.println(authentication.getPrincipal());

            return authentication;
//            return getAuthenticationManager().authenticate(
//                    new UsernamePasswordAuthenticationToken(
//                            creds.getUser_email(),
//                            creds.getUser_pwd(),
//                            new ArrayList<>()
//                    )
//            );

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {
        System.out.println("돼..?");
        String user_email = ((User)authResult.getPrincipal()).getUsername(); // 아이디
        System.out.println(user_email);
        UsersVO user = securityService.getUserByEmail(user_email);
        System.out.println(user);
        String token = Jwts.builder()
                .setSubject(String.valueOf(user.getUser_no())) // User를 구분할 수 있는 값 (아이디)
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(env.getProperty("token.expiration_time"))))
                .signWith(SignatureAlgorithm.HS512, env.getProperty("token.secret"))
                .compact();
        response.addHeader("token", token);
        response.addHeader("user_no", String.valueOf(user.getUser_no()));
    }
}
