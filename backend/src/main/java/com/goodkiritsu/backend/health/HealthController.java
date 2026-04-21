package com.goodkiritsu.backend.health;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public String getHealth() {
        return "Good-Kiritsu is running";
    }


}
