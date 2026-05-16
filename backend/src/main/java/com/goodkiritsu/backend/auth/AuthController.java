package com.goodkiritsu.backend.auth;

import com.goodkiritsu.backend.Dtos.LoginRequest;
import com.goodkiritsu.backend.Dtos.LoginResponse;
import com.goodkiritsu.backend.Dtos.UserRegisterRequest;
import com.goodkiritsu.backend.Security.User;
import com.goodkiritsu.backend.Security.UserService;
import io.jsonwebtoken.Jwts;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
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

    @PostMapping("/register")
    public String registerUser(@RequestBody UserRegisterRequest request) {
        userService.registerUser(request);
        return "User registered successfully";
    }
    // login user method with get
        // use service to get user by username
            // if user is null -> return an error message
            // check if password match if not -> return error message
        //generate a token using jwtUtil.generateToken(username)
        // return a new LoginResponse(Token) dto
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.getUserByUsername(request.getUsername());
        if(user == null) {
            return  ResponseEntity.status(401).body("Invalid username or password");
        }
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            return  ResponseEntity.status(401).body("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return ResponseEntity.ok(new LoginResponse(token));
    }


}
