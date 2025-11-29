package com.creators.autenticacion.auth;

// Lombok: genera constructor automáticamente para campos final, útil en clases de configuración
import lombok.RequiredArgsConstructor;

// Marca métodos como proveedores de beans gestionados por el contenedor Spring
import org.springframework.context.annotation.Bean;

// Declara que esta clase contiene definiciones de configuración para el contexto de Spring
import org.springframework.context.annotation.Configuration;

// Encargado de coordinar el proceso de autenticación entre múltiples proveedores
import org.springframework.security.authentication.AuthenticationManager;

// Interfaz que define cómo se autentican los usuarios (por ejemplo, con base de datos o tokens)
import org.springframework.security.authentication.AuthenticationProvider;

// Implementación que agrupa varios proveedores de autenticación en una sola instancia
import org.springframework.security.authentication.ProviderManager;

// Proveedor que autentica usuarios consultando una base de datos mediante UserDetailsService
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;

// Habilita el uso de anotaciones como @PreAuthorize y @Secured en métodos específicos
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

// Permite definir reglas de seguridad para rutas HTTP (autenticación, autorización, filtros)
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

// Controla cómo se crean y gestionan las sesiones (por ejemplo, sin estado para JWT)
import org.springframework.security.config.http.SessionCreationPolicy;

// Interfaz para cargar usuarios desde una fuente (base de datos, memoria, etc.)
import org.springframework.security.core.userdetails.UserDetailsService;

// Encargado de encriptar contraseñas y verificar coincidencias durante el login
import org.springframework.security.crypto.password.PasswordEncoder;

// Define la cadena de filtros que interceptan y procesan las peticiones HTTP
import org.springframework.security.web.SecurityFilterChain;

// Filtro que intercepta peticiones con credenciales de usuario y contraseña
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// Permite configurar reglas CORS para aceptar peticiones desde otros dominios
import org.springframework.web.cors.CorsConfiguration;

// Interfaz que define la fuente de configuración CORS para el sistema
import org.springframework.web.cors.CorsConfigurationSource;

// Implementación que aplica configuración CORS basada en rutas URL específicas
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// Utilidad estándar de Java para manejar listas de elementos
import java.util.List;


/**
 * Esta clase configura la seguridad de la aplicación.
 * Aquí se definen los filtros, las reglas de acceso, el proveedor de autenticación y la configuración CORS.
 * Los permisos por rol se asignan usando anotaciones (@PreAuthorize) en los controladores.
 */
@Configuration // Indica que esta clase es de configuración para Spring
@EnableMethodSecurity // Permite usar anotaciones como @PreAuthorize en los métodos de los controladores
@RequiredArgsConstructor // Genera el constructor con los campos 'final' automáticamente
public class SecurityConfig {
    // Filtro que valida el JWT en cada petición. Si el token es válido, permite el acceso.
    private final JwtAuthFilter jwtFilter;
    // Servicio que obtiene los datos del usuario desde la base de datos.
    private final UserDetailsService uds;
    // Codificador de contraseñas, por ejemplo BCrypt. Se usa para guardar y verificar contraseñas de forma segura.
    private final PasswordEncoder encoder;

    /**
     * Configura la cadena de filtros de seguridad y las reglas de acceso.
     * - Desactiva CSRF porque no se usa en APIs REST.
     * - Configura CORS para permitir peticiones desde el frontend.
     * - Define que no se usan sesiones (stateless).
     * - Permite el acceso público a login y registro.
     * - El resto de endpoints requieren autenticación.
     * - Los permisos por rol se asignan en los controladores con @PreAuthorize.
     */
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // Desactiva la protección CSRF (no necesaria para APIs REST)
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Aplica la configuración CORS definida abajo
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // No se usan sesiones, cada petición se valida por sí sola
                .authorizeHttpRequests(auth -> auth

                        /*
                        // Permite el acceso sin autenticación a los endpoints de login y registro
                        .requestMatchers("/auth/login", "/auth/register").permitAll()
                        // El resto de endpoints requieren autenticación
                        .anyRequest().authenticated()
                         */

                        .requestMatchers("/auth/login", "/auth/register").permitAll()
                        // Endpoints públicos de Swagger / OpenAPI
                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()
                        // Todo lo demás requiere estar autenticado con JWT

                        .requestMatchers("/gateway/**").authenticated()

                        .anyRequest().authenticated()

                )
                // Usa el proveedor de autenticación definido abajo
                .authenticationProvider(authenticationProvider())
                // Agrega el filtro JWT antes del filtro estándar de usuario/contraseña
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build(); // Construye y retorna la cadena de filtros
    }

    /**
     * Define el proveedor de autenticación.
     * Este proveedor usa el servicio de usuarios y el codificador de contraseñas para validar credenciales.
     */
    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(); // Proveedor que usa la base de datos para autenticar
        provider.setUserDetailsService(uds); // Usa el servicio para obtener los datos del usuario
        provider.setPasswordEncoder(encoder); // Usa el codificador para verificar la contraseña
        return provider; // Retorna el proveedor configurado
    }

    /**
     * Define el manager de autenticación.
     * El manager usa el proveedor de autenticación para procesar los intentos de login.
     */
    @Bean
    AuthenticationManager authenticationManager() {
        return new ProviderManager(authenticationProvider()); // Usa el proveedor definido arriba
    }

    /**
     * Configura CORS para permitir peticiones desde el frontend (por ejemplo, React o Angular).
     * Aquí se definen los orígenes, métodos y cabeceras permitidas.
     */
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration(); // Crea la configuración CORS
        // Permite peticiones desde estos orígenes (URLs del frontend)
        cfg.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:4200", "http://127.0.0.1:3000"));
        // Permite estos métodos HTTP
        cfg.setAllowedMethods(List.of("GET","POST","PUT","PATCH","DELETE","OPTIONS"));
        // Permite estas cabeceras en las peticiones
        cfg.setAllowedHeaders(List.of("Authorization","Content-Type","Accept"));
        // Expone la cabecera Authorization en las respuestas
        cfg.setExposedHeaders(List.of("Authorization"));
        // Permite enviar credenciales (cookies, tokens)
        cfg.setAllowCredentials(true);
        // Define cuánto tiempo se cachea la configuración CORS en el navegador
        cfg.setMaxAge(3600L);
        // Aplica la configuración a todas las rutas de la API
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}
