package com.goodkiritsu.backend.auth;

import com.goodkiritsu.backend.Security.User;
import com.goodkiritsu.backend.Security.UserService;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public JwtAuthenticationFilter (
            JwtUtil jwtUtil,
            UserService userService
    ) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        if (request.getMethod().equals("OPTIONS")) {
            filterChain.doFilter(request, response);
            return;
        }
        //Extract the authorization header from the request
        String authHeader = request.getHeader("Authorization");

        // Check if the header exists and starts with "Bearer"
        if(authHeader == null || !authHeader.startsWith("Bearer ")) {
            // no token found, let request continue with no authentication
            filterChain.doFilter(request, response);// Spring security will handle it
            return;
        }

        // Extract the actual token (remove Bearer)
        String token = authHeader.substring(7);

        try {
            //Extract the username from the token
            String username = jwtUtil.extractUsername(token);

            //Check if we extracted a username and user is not already authenticated
            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                //Load the user from the database
                User user = userService.getUserByUsername(username);

                //Validate the token
                if(user != null && jwtUtil.validateToken(token)) {

                    //create authentication object, tells spring the user is authenticated
                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    user, // Principal (the user)
                                    null, // Credentials
                                    user.getAuthorities() // Roles/permissions (from UserDetails)
                            );

                    // add request details to the auth token
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // Tell spring security this user is authenticated
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // if anything goes wrong just continue
            // request will just be treated unauthenticated
            System.out.println("Jwt validation failed: " + e.getMessage());
        }

        filterChain.doFilter(request, response);

    }



}
