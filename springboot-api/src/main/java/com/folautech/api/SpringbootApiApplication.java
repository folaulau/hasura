package com.folautech.api;

import com.folautech.api.dataloader.ChatDataLoaderService;
import com.folautech.api.dataloader.UserDataLoaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;

import java.net.InetAddress;
import java.util.Arrays;
import java.util.Date;
import java.util.TimeZone;

@SpringBootApplication
public class SpringbootApiApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootApiApplication.class, args);
    }
    @Autowired
    private UserDataLoaderService userDataLoaderService;
    @Autowired
    private ChatDataLoaderService chatDataLoaderService;

    @Order(Integer.MAX_VALUE)
    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {

        userDataLoaderService.load();

        chatDataLoaderService.load();

        System.out.println("Data loaded!");

        return args -> {

            // Display Environmental Useful Variables
            try {
                System.out.println("\n");
                Runtime runtime = Runtime.getRuntime();
                double mb = 1048576;// megabtye to byte
                double gb = 1073741824;// gigabyte to byte
                Environment env = ctx.getEnvironment();
                TimeZone timeZone = TimeZone.getDefault();

                String hasuraServerPort = env.getProperty("server.hasura.port");

                System.out
                        .println("************************ Hasura API ***********************************");
                System.out.println("** Port: " + env.getProperty("server.port"));
                System.out.println("** Timezone: " + timeZone.getID());
                System.out.println("** TimeStamp: " + new Date().toInstant().toString());

                System.out.println("** Internal Url: http://localhost:" + env.getProperty("server.port"));
                System.out.println("** External Url: http://" + InetAddress.getLocalHost().getHostAddress() + ":" + env.getProperty("server.port"));

                System.out.println("** Internal Swagger: http://localhost:" + env.getProperty("server.port") + "/swagger-ui/index.html");

                System.out.println("\n************************* Hasura *************************************");
                System.out.println("** (double check port in docker-composer.yaml file) ");
                System.out.println("** API Url: http://localhost:" + hasuraServerPort + "/v1/api");
                System.out.println("** Console Url: http://localhost:" + hasuraServerPort + "/console");
                System.out.println("** Health Check Url: http://localhost:" + hasuraServerPort + "/healthz");
                System.out.println();

            } catch (Exception e) {
                e.printStackTrace();
                System.err.println("Exception, commandlineRunner -> " + e.getMessage());
            }
            System.out.println("\n");
        };
    }

    @Override
    public void run(String... args) throws Exception {

        if (args == null || args.length == 0) {
            return;
        }

        System.out.println("************************* CommandLineRunner **************************");
        for (String arg : args) {
            System.out.println("arg: " + arg);
        }


        System.out.println("**********************************************************************");
    }
}
