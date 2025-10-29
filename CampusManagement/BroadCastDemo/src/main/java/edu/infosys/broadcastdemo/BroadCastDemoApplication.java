package edu.infosys.broadcastdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration.class})
public class BroadCastDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(BroadCastDemoApplication.class, args);
    }
}
