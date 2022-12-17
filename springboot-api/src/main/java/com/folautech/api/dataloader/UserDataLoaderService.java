package com.folautech.api.dataloader;

import com.folautech.api.address.Address;
import com.folautech.api.user.User;
import com.folautech.api.user.UserRepository;
import com.folautech.api.user.UserType;
import com.folautech.api.utils.RandomGeneratorUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Slf4j
@Component
public class UserDataLoaderService {
    @Autowired
    private UserRepository userRepository;

    public void load(){

        loadAdminUsers();

        Address address = Address.builder()
                .street("123 Halloween St")
                .city("Lehi")
                .state("UT")
                .zipcode("83043")
                .build();

        User user = null;

        for (int i=3;i<=20;i++){
            String firstName = RandomGeneratorUtils.getRandomFirstname();
            String lastName = RandomGeneratorUtils.getRandomLastname();

            user = User.builder()
                    .id(Long.valueOf(""+i))
                    .firstName(firstName)
                    .lastName(lastName)
                    .type(UserType.user)
                    .dob(LocalDate.of(RandomGeneratorUtils.getIntegerWithin(1880,2010),RandomGeneratorUtils.getIntegerWithin(1,12),RandomGeneratorUtils.getIntegerWithin(1,27)))
                    .email((firstName+lastName).toLowerCase()+"@gmail.com")
                    .phoneNumber(RandomGeneratorUtils.getRandomPhone())
                    .address(address)
                    .build();

            address.setUser(user);

            userRepository.saveAndFlush(user);
        }

    }

    private void loadAdminUsers(){
        Address address = Address.builder()
                .street("123 Halloween St")
                .city("Lehi")
                .state("UT")
                .zipcode("83043")
                .build();

        User folau = User.builder()
                .id(1L)
                .firstName("Folau")
                .lastName("Kaveinga")
                .dob(LocalDate.of(1986,12,03))
                .email("folaukaveinga@gmail.com")
                .phoneNumber("3109934731")
                .type(UserType.admin)
                .address(address)
                .build();

        address.setUser(folau);

        userRepository.saveAndFlush(folau);

        User lisa = User.builder()
                .id(2L)
                .firstName("Lisa")
                .lastName("Kaveinga")
                .dob(LocalDate.of(1987,04,12))
                .email("lisakaveinga@gmail.com")
                .phoneNumber("3439934731")
                .type(UserType.user)
                .address(address)
                .build();

        address.setUser(lisa);

        userRepository.saveAndFlush(lisa);
    }

}
