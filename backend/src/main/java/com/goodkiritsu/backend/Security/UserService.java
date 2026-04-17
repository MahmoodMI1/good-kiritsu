package com.goodkiritsu.backend.Security;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    // Add PasswordEncoder declaration
    private final PasswordEncoder passwordEncoder;
    // Add User repository declaration
    private final UserRepository userRepo;

    // Add constructor injection of both
    public UserService(
            PasswordEncoder passwordEncoder,
            UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepository;
    }

    // Add a register Post end point

    // Add a get user by username Get end point

}
