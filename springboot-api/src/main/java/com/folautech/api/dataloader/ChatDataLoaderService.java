package com.folautech.api.dataloader;

import com.folautech.api.address.Address;
import com.folautech.api.chat.Chat;
import com.folautech.api.chat.ChatRepository;
import com.folautech.api.chat.message.Message;
import com.folautech.api.chat.message.MessageRepository;
import com.folautech.api.user.User;
import com.folautech.api.user.UserRepository;
import com.folautech.api.user.UserType;
import com.folautech.api.utils.RandomGeneratorUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@DependsOn(value = {"userDataLoaderService"})
@Slf4j
@Component
public class ChatDataLoaderService {
    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private MessageRepository messageRepository;

    public void load(){
        loadChats();

        // load messages
        for (int i=1;i<=20;i++){
            Message message = Message.builder().build();
            message.setMessage("say this asdf"+RandomGeneratorUtils.getIntegerWithin(100,999999));
            message.setUser(User.builder()
                    .id(Long.valueOf(""+RandomGeneratorUtils.getIntegerWithin(1,3)))
                    .build());
            message.setChat(Chat.builder()
                    .id(Long.valueOf(""+RandomGeneratorUtils.getIntegerWithin(1,3)))
                    .build());
            messageRepository.saveAndFlush(message);
        }
    }

    private void loadChats(){

        for (int i=1;i<=3;i++){
            Chat chat = Chat.builder()
                    .id(Long.valueOf(""+i))
                    .title("chat-"+i)
                    .build();
            chatRepository.saveAndFlush(chat);
        }
    }

}
