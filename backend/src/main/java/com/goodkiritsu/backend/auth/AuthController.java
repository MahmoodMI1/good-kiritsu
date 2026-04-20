package com.goodkiritsu.backend.auth;

import com.goodkiritsu.backend.Security.UserService;
import io.jsonwebtoken.Jwts;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;

@Controller
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    // Bean injection
    public AuthController(
            UserService userService,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // register user method with Post
        //parm request of register dto
        //create user, add username and password
        //add new user with userService.save()
        //Return success message

    // login user method with get
        // use service to get user by username
            // if user is null -> return an error message
            // check if password match if not -> return error message
        //generate a token using jwtUtil.generateToken(username)
        // return a new LoginResponse(Token) dto
}
