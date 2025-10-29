package edu.infosys.lostAndFoundApplication.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import edu.infosys.lostAndFoundApplication.service.CampusUserService;

@Configuration
@EnableMethodSecurity
public class SystemConfig {
	@Autowired
	private EncoderConfig encoderConfig;
	
	@Autowired
	private CampusUserService service;
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
	  return configuration.getAuthenticationManager();
	
    }
	
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http.csrf().disable()
	        .authorizeHttpRequests(authorize -> authorize
	            .requestMatchers(HttpMethod.POST, "/lost-found/login/**").permitAll() // allow POST login
	            .requestMatchers(HttpMethod.GET, "/lost-found/login/**").permitAll()  // allow GET login
	            .requestMatchers("/lost-found/**").permitAll() // open all lost-found endpoints
	            .anyRequest().authenticated()
	        );
	    return http.build();
	}


}