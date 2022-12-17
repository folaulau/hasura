package com.folautech.api.chat.message;

import com.folautech.api.user.AuthenticationResponseDTO;
import com.folautech.api.user.AuthenticatorDTO;
import com.folautech.api.user.User;
import com.folautech.api.user.UserService;
import com.folautech.api.utils.ObjectUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@Slf4j
@RestController
public class MessageRestController {

    @Autowired
    private MessageService messageService;

    @PostMapping(value = "/messages")
    public ResponseEntity<Message> addMessage(
            @RequestBody MessageCreateDTO msg) {
        log.info("addMessage msg={}", ObjectUtils.toJson(msg));

        Message message = messageService.save(msg);

        return new ResponseEntity<>(message, OK);
    }

}
