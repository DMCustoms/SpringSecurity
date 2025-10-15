package com.dmcustoms.backend.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findUserByUsername(String username);
	Boolean existsUserByUsername(String username);
	Boolean existsUserByEmail(String email);
	
}
