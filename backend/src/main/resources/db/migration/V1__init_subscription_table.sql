CREATE TABLE subscription
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cost DOUBLE NOT NULL,
    category VARCHAR(255),
    billing_cycle VARCHAR(255)

);