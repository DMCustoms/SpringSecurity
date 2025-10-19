package com.dmcustoms.backend.controllers;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/secured")
public class MainController {
	
	@GetMapping("/user")
	public Map<String, String> userAccess(Principal principal) {
		if (principal == null) 
			return null;
		return Collections.singletonMap("username", principal.getName());
	}
	
}
