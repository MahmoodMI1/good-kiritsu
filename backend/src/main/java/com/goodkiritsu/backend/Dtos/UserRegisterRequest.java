package com.goodkiritsu.backend.Dtos;

import com.goodkiritsu.backend.Security.User;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class UserRegisterRequest {



    private String username;
    private String password;
    private String email;

    public User toUser(PasswordEncoder passwordEncoder) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        return user;
    }
}
