package com.folautech.api.user;

import com.folautech.api.utils.ObjectUtils;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.OK;


@Tag(name = "User", description = "User Endpoints")
@RequestMapping("/users")
@RestController
@Slf4j
public class UserRestController {

    @Autowired
    private UserService userService;
    
    @PostMapping(value = "/login")
    public ResponseEntity<AuthenticationResponseDTO> login(
            @RequestBody AuthenticatorDTO authenticatorDTO) {
        log.info("login authenticatorDTO={}", ObjectUtils.toJson(authenticatorDTO));

        AuthenticationResponseDTO authenticationResponseDTO = userService.login(authenticatorDTO);

        return new ResponseEntity<>(authenticationResponseDTO, OK);
    }

    @PostMapping(value = "/update")
    public ResponseEntity<User> update(
            @RequestBody UserUpdateDTO userUpdateDTO) {
        log.info("update userUpdateDTO={}", ObjectUtils.toJson(userUpdateDTO));

        User user = userService.update(userUpdateDTO);

        return new ResponseEntity<>(user, OK);
    }

    @GetMapping(value = "/details")
    public ResponseEntity<User> getDetails(@RequestParam long id) {
        log.info("get user details");
        
        User user = userService.getById(id);

        return new ResponseEntity<>(user, OK);
    }
}
