package com.dmcustoms.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.Primary;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.dmcustoms.backend.data.User;
import com.dmcustoms.backend.data.UserRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfigurator {
	
	private TokenFilter tokenFilter;
	
	public SecurityConfigurator(@Lazy TokenFilter tokenFilter) {
		this.tokenFilter = tokenFilter;
	}

	@Bean
	@Primary
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

    @Bean
    @Primary
    AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
    @Bean
    @Primary
    AuthenticationManagerBuilder configureAuthenticationManagerBuilder(AuthenticationManagerBuilder authenticationManagerBuilder, UserDetailsService userDetailsService) throws Exception {
    	authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    	return authenticationManagerBuilder;
    }
    
	@Bean
	UserDetailsService userDetailsService(UserRepository userRepo) {
		return username -> {
			User user = userRepo.findUserByUsername(username);
			if (user != null) return user;
			throw new UsernameNotFoundException("User '" + username + "' not found");
		};
	}
    
    @Bean
    @Primary
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	http
    			.csrf(AbstractHttpConfigurer::disable)
    			.cors(httpSecurityCorsConfigurer -> 
    					httpSecurityCorsConfigurer.configurationSource(request ->
    							new CorsConfiguration().applyPermitDefaultValues())
    			)
    			.sessionManagement(session -> session
    					.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    			)
    			.authorizeHttpRequests(authorize -> authorize
    					.requestMatchers("/auth/**").permitAll()
    					.requestMatchers("/secured/user").hasRole("USER")
    					.anyRequest().permitAll()
    			)
    			.addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class);
    	return http.build();
    }
    
}






