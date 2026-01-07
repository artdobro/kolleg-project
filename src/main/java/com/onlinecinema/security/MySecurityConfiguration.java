package com.onlinecinema.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class MySecurityConfiguration {

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);

        jdbcUserDetailsManager.setUsersByUsernameQuery(
                "select username, user_password, active from users WHERE username=?");
        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery(
                "select username, user_role FROM roles WHERE username=?");
        return jdbcUserDetailsManager;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests( configer -> configer // Настройки доступа к ссылкам
                .requestMatchers("/homepage").permitAll()
                .requestMatchers(HttpMethod.GET,"/films/all").hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.GET,"/actors/all").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET,"/films/film/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers(HttpMethod.GET,"/actors/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST,"/films/add").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST,"/actors/add").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT,"/films/update/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT,"/actors/update/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE,"/films/delete/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE,"/actors/delete/**").hasRole("ADMIN")
        );
        http.httpBasic(Customizer.withDefaults()); // БУдет кидать на /login при попытке без доступа перейти на ссылку
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }
}

