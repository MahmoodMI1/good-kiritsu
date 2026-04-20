package com.goodkiritsu.backend.subscription;

import com.goodkiritsu.backend.Security.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    List<Subscription> findByUser(User user);

}
