package com.goodkiritsu.backend.Security;

import com.goodkiritsu.backend.Dtos.UserRegisterRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

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
    public User registerUser(UserRegisterRequest request) {
        // if(request == null) {} Cover null case later
        User user = request.toUser(passwordEncoder);

        userRepo.save(user);
        return user;
    }

    // Add a get user by username Get end point
    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username).orElse(null);

    }

}
