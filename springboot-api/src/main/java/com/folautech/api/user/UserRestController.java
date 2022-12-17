package com.folautech.api.user;

import com.folautech.api.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
public class UserRestController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/users/update")
    public ResponseEntity<User> update(
            @RequestBody User user) {
        log.info("update user={}", ObjectUtils.toJson(user));

        user.setLastName("updated lastname");

        log.info("updated user={}", ObjectUtils.toJson(user));

        return new ResponseEntity<>(user, OK);
    }

    @PostMapping(value = "/users/login")
    public ResponseEntity<AuthenticationResponseDTO> login(
            @RequestBody AuthenticatorDTO authenticatorDTO) {
        log.info("login authenticatorDTO={}", ObjectUtils.toJson(authenticatorDTO));

        AuthenticationResponseDTO authenticationResponseDTO = userService.login(authenticatorDTO);

        return new ResponseEntity<>(authenticationResponseDTO, OK);
    }

    @GetMapping(value = "/users/details")
    public ResponseEntity<User> getDetails() {
        log.info("get user details");
        User user = User.builder()
                .id(1L)
                .firstName("Folau")
                .lastName("Kaveinga")
                .build();
        log.info("user={}", ObjectUtils.toJson(user));

        return new ResponseEntity<>(user, OK);
    }
}
