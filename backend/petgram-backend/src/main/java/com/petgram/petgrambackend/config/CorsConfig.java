package com.petgram.petgrambackend.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

    private final Dotenv dotenv;

    public CorsConfig() {
        this.dotenv = Dotenv.load();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        String mode = dotenv.get("MODE", "PROD");
        String corsEnabledStr = dotenv.get("CORS_ENABLED", "false");
        String allowedOriginsStr = dotenv.get("CORS_ALLOWED_ORIGINS", "");

        CorsConfiguration configuration = new CorsConfiguration();

        System.out.println("=== CORS Configuration ===");
        System.out.println("MODE: " + mode);
        System.out.println("CORS_ENABLED: " + corsEnabledStr);
        System.out.println("CORS_ALLOWED_ORIGINS: " + allowedOriginsStr);

        // If mode is DEV, enable CORS
        if ("DEV".equalsIgnoreCase(mode) && "true".equalsIgnoreCase(corsEnabledStr)) {
            System.out.println("✓ CORS is ENABLED for DEV mode");

            // Parse allowed origins
            if (!allowedOriginsStr.trim().isEmpty()) {
                List<String> allowedOrigins = Arrays.asList(allowedOriginsStr.split(","));
                allowedOrigins.forEach(origin -> {
                    String trimmedOrigin = origin.trim();
                    configuration.addAllowedOrigin(trimmedOrigin);
                    System.out.println("  - Allowed origin: " + trimmedOrigin);
                });
            } else {
                // Fallback: allow all origins in DEV mode
                System.out.println("  - No specific origins configured, allowing all origins (*)");
                configuration.addAllowedOriginPattern(".*");
            }

            configuration.addAllowedMethod("*");
            configuration.addAllowedHeader("*");
            configuration.setAllowCredentials(true);
            configuration.setMaxAge(3600L);

            System.out.println("  - Allowed methods: ALL");
            System.out.println("  - Allowed headers: ALL");
            System.out.println("  - Allow credentials: true");
            System.out.println("  - Max age: 3600 seconds");
        } else {
            System.out.println("✗ CORS is DISABLED (MODE must be DEV and CORS_ENABLED must be true)");
        }

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public CorsFilter corsFilter(CorsConfigurationSource corsConfigurationSource) {
        return new CorsFilter(corsConfigurationSource);
    }
}
