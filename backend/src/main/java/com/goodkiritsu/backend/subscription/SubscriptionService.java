package com.goodkiritsu.backend.subscription;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubscriptionService {

    private List<Subscription> subs = new ArrayList<>(List.of(
            new Subscription(1L, "Netflix", 15.99, "Entertainment", "Monthly"),
            new Subscription(2L, "Spotify", 9.99, "Entertainment", "Monthly"),
            new Subscription(3L, "AWS", 50.00, "Cloud Services", "Monthly")
    ));

    public List<Subscription> getAllSubscriptions() {
        return subs;
    }

    public void addSubscription(Subscription sub) {
        sub.setId((long) (subs.size() + 1));
        subs.add(sub);
    }

    public void deleteSubscription(Long id) {
        subs.removeIf(sub -> sub.getId().equals(id));
    }

    public Double getMonthlyTotal() {
        Double sum = 0D;
        for (Subscription sub : subs) {
            sum += sub.getCost();
        }
        return sum;
    }
}