package com.petgram.petgrambackend.service;

import com.petgram.petgrambackend.entity.UserEntity;
import com.petgram.petgrambackend.repository.UsersRepository;
import org.springframework.stereotype.Service;

@Service
public class UserActivationEmailServiceImpl implements UserActivationEmailService {

    private final UsersRepository usersRepository;

    public UserActivationEmailServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public void sendActivationEmail(UserEntity user) {
        // TODO: build and send an activation email with a confirmation link.
        // For now this service only marks the activation flow as a separate module.
        
        // At the end of acctivation flow user account will be activated
        user.setIsActive(true);
        usersRepository.save(user);
    }
}