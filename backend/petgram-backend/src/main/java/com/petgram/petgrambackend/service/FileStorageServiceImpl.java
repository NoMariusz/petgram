package com.petgram.petgrambackend.service;

import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {
    public static final String BASE_URL = "data/uploads/"; // From your original code

    private final Path root = Paths.get(BASE_URL);

    @PostConstruct
    public void init() {
        try {
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!", e);
        }
    }

    /**
     * Decodes a Base64 string and saves it as an image file.
     * Supports both raw base64 and Data URL prefixed strings (e.g., data:image/png;base64,...)
     */
    public String saveBase64(String base64Image) {
        try {
            if (base64Image == null || base64Image.trim().isEmpty()) {
                throw new IllegalArgumentException("Cannot save empty or null base64 string.");
            }

            String extension = ".jpg"; // default fallback
            String base64Data = base64Image;

            // 1. Handle common frontend Data URL prefix: "data:image/png;base64,iVBORw..."
            if (base64Image.contains(",")) {
                String[] parts = base64Image.split(",");
                String metadata = parts[0]; // e.g., "data:image/png;base64"
                base64Data = parts[1];      // The actual encoded data

                // Dynamically extract the file extension from the mime-type
                if (metadata.contains("image/png")) {
                    extension = ".png";
                } else if (metadata.contains("image/jpeg") || metadata.contains("image/jpg")) {
                    extension = ".jpg";
                } else if (metadata.contains("image/gif")) {
                    extension = ".gif";
                } else if (metadata.contains("image/webp")) {
                    extension = ".webp";
                }
            }

            // 2. Decode the Base64 string into a byte array
            // .trim() removes any accidental trailing newlines or whitespace
            byte[] imageBytes = Base64.getDecoder().decode(base64Data.trim());

            // 3. Generate a unique filename
            String filename = UUID.randomUUID().toString() + extension;

            // 4. Write the byte array directly to the target directory
            Path targetPath = this.root.resolve(filename);
            Files.write(targetPath, imageBytes);

            // Return the relative database URL path
            return "/" + BASE_URL + filename;

        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid Base64 string format: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Could not store the base64 file. Error: " + e.getMessage(), e);
        }
    }
}