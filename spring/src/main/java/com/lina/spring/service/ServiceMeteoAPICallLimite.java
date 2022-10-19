package com.lina.spring.service;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicInteger;

@Component
@Configuration
@EnableScheduling
public class ServiceMeteoAPICallLimite {
  private static AtomicInteger hitCount = new AtomicInteger(0);

  // https://openweathermap.org/price
  // 60 calls/minute
  // 1 minute = 60 secondes = 60000 millisecondes
  @Scheduled(fixedDelay = 60000)
  public static void scheduleClean() {
    hitCount.set(0);
  }

  public static boolean canMakeCall() {
    return hitCount.incrementAndGet() < 60;  // 60 calls
  }
}
