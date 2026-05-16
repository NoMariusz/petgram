package com.petgram.petgrambackend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PetgramBackendApplicationTests {

    // smoke test for Spring Boot startup, have 2 major use cases:
    // It verifies that the application context can be created with current configuration.
    // It helps catch broken wiring, missing beans, bad config properties, etc.

    @Test
    void contextLoads() {
    }

}
