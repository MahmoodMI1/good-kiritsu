ALTER TABLE subscription
    ADD CONSTRAINT fk_subscription_user
        FOREIGN KEY (user_id) REFERENCES users(id);