package com.goodkiritsu.backend.subscription;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    //Injection of service
    private final SubscriptionService subscriptionService;

    public SubscriptionController(SubscriptionService subscriptionService) {
        this.subscriptionService = subscriptionService;
    }

    @GetMapping
    public List<Subscription> getAllSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

    @PostMapping
    public Subscription addSubscription(@RequestBody Subscription subscription) {
        subscriptionService.addSubscription(subscription);
        return subscription;
    }

    @DeleteMapping("/{id}")
    public void deleteSubscription(@PathVariable Long id) {
        subscriptionService.deleteSubscription(id);
    }

    @GetMapping("/total")
    public Double getMonthlyTotal() {
        return subscriptionService.getMonthlyTotal();
    }

}
