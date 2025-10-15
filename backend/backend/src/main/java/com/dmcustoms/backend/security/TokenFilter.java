package com.dmcustoms.backend.security;

import java.io.IOException;
import java.util.Arrays;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.dmcustoms.backend.jwt.JwtCore;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class TokenFilter extends OncePerRequestFilter {
	
	private JwtCore jwtCore;
	private UserDetailsService userDetailsService;
	
	public TokenFilter(JwtCore jwtCore, UserDetailsService userDetailsService) {
		this.jwtCore = jwtCore;
		this.userDetailsService = userDetailsService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String jwt = null;
		String username = null;
		UserDetails userDetails = null;
		UsernamePasswordAuthenticationToken auth = null;
		SecurityContext context = SecurityContextHolder.getContext();
		try {
			String headerAuth = request.getHeader("Authorization");
			if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
				jwt = headerAuth.substring(7);
			}
			if (jwt != null) {
				username = jwtCore.getNameFromJwt(jwt);
			}
			if (username != null && context.getAuthentication() == null) {
				userDetails = userDetailsService.loadUserByUsername(username);
				auth = new UsernamePasswordAuthenticationToken(userDetails, null, Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
				context.setAuthentication(auth);
			}
		} catch (Exception e) {
			e.getMessage();
		}
		filterChain.doFilter(request, response);
	}

	
}






