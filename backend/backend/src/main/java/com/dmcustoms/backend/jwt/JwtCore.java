package com.dmcustoms.backend.jwt;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;
import com.dmcustoms.backend.data.User;

import io.jsonwebtoken.*;

@Component
public class JwtCore {

	SecretKey key = Jwts.SIG.HS256.key().build();
	
	public String generateToken(Authentication authentication) {
		UserDetails userDetails = (UserDetails)authentication.getPrincipal();
		return Jwts.builder().subject(((User) userDetails).getUsername()).signWith(key).compact();
	}
	
	public String getNameFromJwt(String jwt) {
		Jws<Claims> jwtc = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt);
		return jwtc.getPayload().getSubject();
	}
}
