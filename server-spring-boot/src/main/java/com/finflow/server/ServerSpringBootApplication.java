package com.finflow.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerSpringBootApplication.class, args);
		System.out.println("FinFlow Application started...");
	}

}
