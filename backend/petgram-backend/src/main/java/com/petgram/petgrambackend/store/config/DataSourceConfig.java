package com.petgram.petgrambackend.store.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class DataSourceConfig {

    @Autowired
    private Environment env;

    @Bean
    public DataSource dataSource() {
        String url = env.getProperty("spring.datasource.url");
        // If using a file-based SQLite URL, ensure the parent directory exists so the driver can create the database file.
        if (url != null && url.startsWith("jdbc:sqlite:")) {
            String dbPath = url.substring("jdbc:sqlite:".length());
            // skip in-memory special urls
            if (!dbPath.equals(":memory:") && !dbPath.startsWith("file:") && !dbPath.trim().isEmpty()) {
                try {
                    Path dbFile = Paths.get(dbPath).toAbsolutePath();
                    Path parent = dbFile.getParent();
                    if (parent != null && !Files.exists(parent)) {
                        Files.createDirectories(parent);
                    }
                } catch (Exception e) {
                    throw new IllegalStateException("Failed to create parent directories for SQLite database file: " + dbPath, e);
                }
            }
        }

        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(env.getProperty("spring.datasource.driver-class-name"));
        dataSource.setUrl(url);
        dataSource.setUsername(env.getProperty("spring.datasource.username", ""));
        dataSource.setPassword(env.getProperty("spring.datasource.password", ""));
        return dataSource;
    }
}
