package com.creators.autenticacion.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;




import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Servicio encargado de la generación y validación de tokens JWT.
 *
 * <p>En esta aplicación todos los usuarios comparten un único rol funcional
 * (por ejemplo {@code USER}), pero igualmente se incluye un claim llamado
 * {@code roles} para mantener el diseño preparado por si en el futuro se
 * agregan más tipos de rol.</p>
 *
 * <p>La clave secreta y el tiempo de expiración del token se leen desde
 * el archivo de configuración {@code application.properties} mediante
 * las propiedades {@code jwt.secret} y {@code jwt.exp-min}.</p>
 */


@Service // Indica que esta clase es un servicio gestionado por Spring
public class JwtService {
    /**
     * Clave secreta utilizada para firmar y verificar los tokens JWT.
     * Se construye a partir del valor configurado en {@code jwt.secret}.
     */
    private final SecretKey key;
    /**
     * Tiempo de expiración del token expresado en minutos.
     * Se obtiene de la propiedad {@code jwt.exp-min}.
     */
    private final long expMinutes;

    /**
     * Crea una nueva instancia del servicio de JWT.
     *
     * @param secret     valor de la clave secreta definida en {@code jwt.secret}.
     *                   Puede estar en Base64 o en texto plano.
     * @param expMinutes tiempo de expiración del token en minutos.
     */
    public JwtService(@Value("${jwt.secret}") String secret,
                      @Value("${jwt.exp-min}") long expMinutes) {
        // Decodifica la clave secreta desde base64 si corresponde, o la usa como texto plano
        byte[] raw = secret.matches("^[A-Za-z0-9+/=]+$") ? Decoders.BASE64.decode(secret) : secret.getBytes();
        // Genera la clave secreta para firmar/verificar JWT
        this.key = Keys.hmacShaKeyFor(raw);
        // Guarda el tiempo de expiración configurado
        this.expMinutes = expMinutes;
    }

    /**
     * Genera un token JWT con el sujeto y los roles proporcionados.
     * @param subject identificador del usuario (username)
     * @param roles lista de roles del usuario
     * @return token JWT firmado
     */
    public String generate(String subject, List<String> roles) {
        Instant now = Instant.now(); // Obtiene el instante actual
        List<String> safeRoles = roles == null ? List.of() : roles; // Asegura que la lista de roles no sea nula
        // Construye el token JWT
        return Jwts.builder()
                .subject(subject) // Establece el sujeto (username)
                .claims(Map.of("roles", safeRoles)) // Agrega los roles como claim personalizado
                .issuedAt(Date.from(now)) // Fecha de emisión
                .expiration(Date.from(now.plusSeconds(expMinutes * 60))) // Fecha de expiración
                // Firma el token con la clave y algoritmo seguro
                .signWith(key)
                .signWith(key, Jwts.SIG.HS256)
                .compact(); // Finaliza y retorna el token JWT
    }

    /**
     * Valida y parsea un token JWT devolviendo sus {@link Claims}.
     *
     * <p>Si el token viene con el prefijo {@code "Bearer "} se elimina
     * automáticamente antes de intentar parsearlo.</p>
     *
     * @param token token JWT a validar. Puede incluir o no el prefijo {@code "Bearer "}.
     * @return los claims contenidos en el token si la firma y la expiración son válidas.
     * @throws io.jsonwebtoken.JwtException si el token es inválido, está mal formado
     *                                     o ha expirado.
     */
    public Claims parse(String token) {
        // Elimina el prefijo "Bearer " si está presente
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        // Parsea y valida el token JWT, devolviendo los claims
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
