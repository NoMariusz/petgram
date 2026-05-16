package com.petgram.petgrambackend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Added a leading slash to the handler pattern
        registry.addResourceHandler("/data/uploads/**")
                .addResourceLocations("file:./data/uploads/");
    }
}