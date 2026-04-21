package com.goodkiritsu.backend.subscription;

import com.goodkiritsu.backend.Security.User;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

        List<Subscription> subs = subscriptionRepo.findByUser(getCurrentUser());
        return subs;
    }

    public void addSubscription(Subscription sub) {
        sub.setUser(getCurrentUser());
        subscriptionRepo.save(sub);
    }

    public void deleteSubscription(Long id) {

        Subscription sub = subscriptionRepo.findById(id)
                        .orElseThrow(() -> new RuntimeException("Subscription not found"));
        if (!sub.getUser().getId().equals(getCurrentUser().getId())) {
            throw new RuntimeException("Not authorized to delete this subscription");
        }
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

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

}