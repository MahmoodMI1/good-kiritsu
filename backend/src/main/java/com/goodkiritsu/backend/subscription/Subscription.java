package com.goodkiritsu.backend.subscription;

import com.goodkiritsu.backend.Security.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor()
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Double cost;
    private String category;
    private String billingCycle;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}



