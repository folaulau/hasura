package com.folautech.api.user;

public interface UserService {
    
    String generateApiToken(User user);

    AuthenticationResponseDTO login(AuthenticatorDTO authenticatorDTO);
}
