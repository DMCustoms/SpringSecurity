package com.dmcustoms.backend.controllers;

import java.util.Collections;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dmcustoms.backend.data.SigninRequest;
import com.dmcustoms.backend.data.SignupRequest;
import com.dmcustoms.backend.data.User;
import com.dmcustoms.backend.data.UserRepository;
import com.dmcustoms.backend.jwt.JwtCore;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	private AuthenticationManager authenticationManager;
	private JwtCore jwtCore;
	
	public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder,
			AuthenticationManager authenticationManager, JwtCore jwtCore) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;
		this.jwtCore = jwtCore;
	}

	@PostMapping("/signup")
	ResponseEntity<Map<String, String>> signup(@RequestBody SignupRequest signupRequest) {
		if (userRepository.existsUserByUsername(signupRequest.getUsername())) {
			return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("registrationResult", "Choose different name"));
		}
		if (userRepository.existsUserByEmail(signupRequest.getEmail())) {
			return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("registrationResult", "Choose different email"));
		}
		userRepository.save(new User(signupRequest.getUsername(), signupRequest.getEmail(), passwordEncoder.encode(signupRequest.getPassword())));
		return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("registrationResult", "Success"));
	}
	
	@PostMapping("/signin")
	ResponseEntity<Map<String, String>> signin(@RequestBody SigninRequest signinRequest) {
		Authentication authentication = null;
		try {
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getUsername(), signinRequest.getPassword()));
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		if (authentication == null) return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("authenticationResult", "Authentication failed"));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtCore.generateToken(authentication);
		return ResponseEntity.status(HttpStatus.OK).body(Collections.singletonMap("authenticationResult", jwt));
	}
	
}





