package com.folautech.api.chat.message;

import com.folautech.api.utils.ObjectUtils;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.HttpStatus.OK;

@Tag(name = "Message", description = "Message Endpoints")
@RequestMapping("/messages")
@RestController
@Slf4j
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
