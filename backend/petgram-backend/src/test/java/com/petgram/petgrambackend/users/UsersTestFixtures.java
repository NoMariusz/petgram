package com.petgram.petgrambackend.users;

import com.petgram.petgrambackend.entity.RoleEntity;
import com.petgram.petgrambackend.entity.UserEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.util.ReflectionTestUtils;

public class UsersTestFixtures {
    public static RoleEntity sampleRole() {
        return new RoleEntity("Pet owner", "Default role");
    }

    public static UserEntity sampleUser(String username, long id) {
        RoleEntity role = sampleRole();
        UserEntity u = new UserEntity(username, username + "@example.com", "hash", "First", "Last", role);
        ReflectionTestUtils.setField(u, "id", id);
        return u;
    }

    public static Authentication auth(String username) {
        return new UsernamePasswordAuthenticationToken(username, null);
    }
}