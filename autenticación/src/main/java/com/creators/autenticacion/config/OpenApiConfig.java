package com.creators.autenticacion.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuración de OpenAPI/Swagger para la API de autenticación.
 * Define la info básica de la API y el esquema de seguridad Bearer JWT
 * para que Swagger muestre el botón "Authorize".
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        // Esquema de seguridad Bearer JWT (para el botón Authorize en Swagger)
        SecurityScheme securityScheme = new SecurityScheme()
                .name("bearer-jwt")                      // Nombre interno del esquema
                .type(SecurityScheme.Type.HTTP)          // Tipo HTTP (usa header Authorization)
                .scheme("bearer")                        // Palabra "Bearer"
                .bearerFormat("JWT")                     // Formato (solo informativo)
                .description("Introduce el token en formato: Bearer {token}");

        return new OpenAPI()
                .info(new Info()
                        .title("Genosentinel - Servicio de Autenticación")
                        .description("API de autenticación con JWT para el proyecto Genosentinel")
                        .version("1.0.0")
                )
                // Registramos el esquema, pero NO marcamos todos los endpoints como seguros
                .components(new Components().addSecuritySchemes("bearer-jwt", securityScheme));
    }
}
