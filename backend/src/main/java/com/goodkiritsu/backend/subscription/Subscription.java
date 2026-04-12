package com.goodkiritsu.backend.subscription;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subscription {
    private Long id;
    private String name;
    private Double cost;
    private String category;
    private String billingCycle;
}
