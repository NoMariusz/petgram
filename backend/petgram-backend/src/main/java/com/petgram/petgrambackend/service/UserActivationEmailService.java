package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.entity.UserEntity;

public interface UserActivationEmailService {
    void sendActivationEmail(UserEntity user);
}
