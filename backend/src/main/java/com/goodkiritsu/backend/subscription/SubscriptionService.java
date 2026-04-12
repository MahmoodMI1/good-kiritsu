package com.goodkiritsu.backend.subscription;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubscriptionService {
    private SubscriptionRepository subscriptionRepo;

    public  SubscriptionService(SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepo = subscriptionRepository;
    }

    public List<Subscription> getAllSubscriptions() {
        List<Subscription> subs = subscriptionRepo.findAll();
        return subs;
    }

    public void addSubscription(Subscription sub) {
        subscriptionRepo.save(sub);
    }

    public void deleteSubscription(Long id) {
        subscriptionRepo.deleteById(id);
    }

    public Double getMonthlyTotal() {
        Double sum = 0D;
        List<Subscription> subs = getAllSubscriptions();
        for (Subscription sub : subs) {
            sum += sub.getCost();
        }
        return sum;
    }
}