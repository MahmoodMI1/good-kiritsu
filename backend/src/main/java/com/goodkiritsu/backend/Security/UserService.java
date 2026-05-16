package com.goodkiritsu.backend.Security;

import com.goodkiritsu.backend.Dtos.UserRegisterRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
    }

    // Add a get user by username Get end point
    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username).orElse(null);
    }

}
