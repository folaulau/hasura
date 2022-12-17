package com.folautech.api;

import com.folautech.api.address.Address;
import com.folautech.api.jwt.JwtTokenService;
import com.folautech.api.user.User;
import com.folautech.api.user.UserRepository;
import com.folautech.api.user.UserType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.UUID;

class HasuraAuthTokenGenerators {

	@Autowired
	private JwtTokenService jwtTokenService = new JwtTokenService();

	@Test
	void generateAdminToken() {

		Address address = Address.builder()
				.id(1L)
				.uuid("address-" + UUID.randomUUID().toString())
				.street("123 Halloween St")
				.city("Lehi")
				.state("UT")
				.zipcode("83043")
				.build();

		User folau = User.builder()
				.id(1L)
				.uuid("user-" + UUID.randomUUID().toString())
				.firstName("Folau")
				.lastName("Kaveinga")
				.dob(LocalDate.of(1986,12,03))
				.email("folaukaveinga@gmail.com")
				.phoneNumber("3109934731")
				.type(UserType.admin)
				.address(address)
				.build();

		address.setUser(folau);

		String jwtToken = jwtTokenService.generateToken(folau);

		System.out.println(folau.getFullName()+" jwtToken, userType="+folau.getType().name()+"\n"+jwtToken+"\n");

	}

	@Test
	void generateUserToken() {

		Address address = Address.builder()
				.id(1L)
				.uuid("address-" + UUID.randomUUID().toString())
				.street("123 Halloween St")
				.city("Lehi")
				.state("UT")
				.zipcode("83043")
				.build();

		User lisa = User.builder()
				.id(2L)
				.uuid("user-" + UUID.randomUUID().toString())
				.firstName("Lisa")
				.lastName("Kaveinga")
				.dob(LocalDate.of(1987,04,12))
				.email("lisakaveinga@gmail.com")
				.phoneNumber("3439934731")
				.type(UserType.user)
				.address(address)
				.build();

		address.setUser(lisa);

		String jwtToken = jwtTokenService.generateToken(lisa);

		System.out.println(lisa.getFullName()+" jwtToken, userType="+lisa.getType().name()+"\n"+jwtToken+"\n");

	}

}
