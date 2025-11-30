package com.creators.autenticacion.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.security.SecurityRequirement;


/**
 * Configuración de OpenAPI/Swagger para la API de autenticación.
 * Define la info básica de la API y el esquema de seguridad Bearer JWT
 * para que Swagger muestre el botón "Authorize".
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        String securitySchemeName = "bearer-jwt";

        SecurityScheme securityScheme = new SecurityScheme()
                .name(securitySchemeName)
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT")
                .description("Introduce solo el token JWT (sin 'Bearer')");

        return new OpenAPI()
                .info(new Info()
                        .title("Genosentinel - API Gateway")
                        .description("API Gateway con autenticación JWT para el proyecto Genosentinel")
                        .version("1.0.0")
                )
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName, securityScheme)
                )
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName));
    }
}
