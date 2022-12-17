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

    @PostMapping(value = "/users/update")
    public ResponseEntity<User> update(
            @RequestBody User user) {
        log.info("update user={}", ObjectUtils.toJson(user));

        user.setLastName("updated lastname");

        log.info("updated user={}", ObjectUtils.toJson(user));

        return new ResponseEntity<>(user, OK);
    }
}
