package org.namaranth.security;

import org.namaranth.service.SecurityService;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private SecurityService securityService;
    // private BCryptPasswordEncoder bCryptPasswordEncoder;
    private Environment env;

    public WebSecurity(SecurityService securityService,
                       Environment env) {
        this.securityService = securityService;
        // this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.env = env;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
//                .antMatchers("/**")
//                .hasIpAddress("127.0.0.1")
//                .and()
//                .addFilter(getAuthenticationFilter());
                .antMatchers("/**").permitAll() // 로그인 URL 패턴
                .anyRequest().authenticated() // 다른 URL 패턴에 대한 권한 설정
                .and()
                .addFilter(getAuthenticationFilter());
        http.headers().frameOptions().disable();
    }

    private AuthenticationFilter getAuthenticationFilter() throws Exception {
        AuthenticationFilter authenticationFilter =
                new AuthenticationFilter(authenticationManager(), securityService, env);
        return authenticationFilter;
    }
}
