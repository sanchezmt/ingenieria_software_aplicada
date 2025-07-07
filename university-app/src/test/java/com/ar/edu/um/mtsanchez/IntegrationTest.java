package com.ar.edu.um.mtsanchez;

import com.ar.edu.um.mtsanchez.config.AsyncSyncConfiguration;
import com.ar.edu.um.mtsanchez.config.EmbeddedSQL;
import com.ar.edu.um.mtsanchez.config.JacksonConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = { UniversityApp.class, JacksonConfiguration.class, AsyncSyncConfiguration.class })
@EmbeddedSQL
public @interface IntegrationTest {
}
