package org.namaranth.config;

import org.namaranth.filter.MyFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class FilterConfig {
    @Autowired
    private Environment env;

    @Bean
    public FilterRegistrationBean<MyFilter> myFilter(){
        FilterRegistrationBean<MyFilter> bean =
                new FilterRegistrationBean<>(new MyFilter(env));
        System.out.println(bean);
        bean.addUrlPatterns("/*");
        bean.setOrder(0);
        System.out.println(bean);
        return bean;
    }
}
