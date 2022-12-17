package com.folautech.api.chat.message;

import com.folautech.api.chat.Chat;
import com.folautech.api.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class MessageServiceImp implements MessageService{

    @Autowired
    private MessageRepository messageRepository;
    @Override
    public Message save(MessageCreateDTO msg) {

        Message message = Message.builder()
                .message(msg.getMessage())
                .chat(Chat.builder()
                        .id(msg.getChatId())
                        .build())
                .user(User.builder()
                        .id(msg.getUserId())
                        .build())
                .build();

        return messageRepository.saveAndFlush(message);
    }
}
