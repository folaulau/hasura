package com.folautech.api.user;

import com.folautech.api.jwt.JwtTokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository  userRepository;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Override
    public String generateApiToken(User user) {
        return jwtTokenService.generateToken(user);
    }

    @Override
    public AuthenticationResponseDTO login(AuthenticatorDTO authenticatorDTO) {
        AuthenticationResponseDTO auth = new AuthenticationResponseDTO();
        User user = userRepository.findById(authenticatorDTO.getUserId()).get();
        String jwtToken = jwtTokenService.generateToken(user);
        auth.setFirstName(user.getFirstName());
        auth.setLastName(user.getLastName());
        auth.setEmail(user.getEmail());
        auth.setUuid(user.getUuid());
        auth.setId(user.getId());
        auth.setToken(jwtToken);
        return auth;
    }

    @Override
    public User update(UserUpdateDTO userUpdateDTO) {

        User user = userRepository.findById(userUpdateDTO.getId()).orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(userUpdateDTO.getFirstName());
        user.setLastName(userUpdateDTO.getLastName());

        return userRepository.saveAndFlush(user);
    }

    @Override
    public User getById(long id) {
        
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        return user;
    }
}
