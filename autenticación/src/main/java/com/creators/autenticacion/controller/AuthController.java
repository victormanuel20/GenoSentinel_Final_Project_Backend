package com.creators.autenticacion.controller;



import com.creators.autenticacion.exceptions.InvalidEmailException;
import com.creators.autenticacion.exceptions.MissingFieldsException;
import com.creators.autenticacion.exceptions.UserNotFoundException;
import com.creators.autenticacion.models.dto.RegisterRequest;
import com.creators.autenticacion.models.entities.Role;
import com.creators.autenticacion.models.entities.Users;
import com.creators.autenticacion.repository.RoleRepository;
import com.creators.autenticacion.repository.UsersRepository;
import com.creators.autenticacion.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Controlador para la autenticación y registro de usuarios.
 * Proporciona endpoints para login y registro, así como manejo de errores de autenticación.
 * Utiliza JWT para la generación de tokens y roles para la autorización.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    /**
     * AuthenticationManager de Spring Security para autenticar usuarios.
     */
    private final AuthenticationManager authManager;
    /**
     * Repositorio para la gestión de usuarios.
     */
    private final UsersRepository usuarioRepo;
    /**
     * Repositorio para la gestión de roles.
     */
    private final RoleRepository rolRepo;
    /**
     * Servicio para la gestión de JWT.
     */
    private final JwtService jwt;
    /**
     * PasswordEncoder para encriptar contraseñas.
     */
    private final PasswordEncoder passwordEncoder;

    /**
     * Endpoint para el login de usuarios.
     * Autentica las credenciales y retorna un token JWT si son válidas.
     * @param req mapa con username y password
     * @return mapa con el token, tipo y roles
     */
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String email = req.get("email");
        String password = req.get("password");

        // Validar campos obligatorios
        if (username == null || username.isBlank()
                || password == null || password.isBlank()
                || email == null || email.isBlank()) {
            throw new MissingFieldsException("username, email y password son obligatorios");
        }

        // Buscar usuario
        var user = usuarioRepo.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("El usuario con ese username no existe"));

        var roles = user.getRoles().stream().map(Role::getName).toList();

        // Validar email
        if (!email.equals(user.getEmail())) {
            throw new InvalidEmailException("El correo electrónico no coincide con el registrado.");
        }

        //  Autenticar credenciales (si falla, lanza AuthenticationException -> 401)
        authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

        String token = jwt.generate(user.getUsername(), roles);


        return Map.of(
                "access_token", token,
                "token_type", "Bearer",
                "roles", roles
        );
    }

    /**
     * Endpoint para el registro de nuevos usuarios.
     * Valida los datos, asigna roles y retorna un token JWT.
     * @param req datos de registro (username, password, roles)
     * @return mapa con el token, tipo y roles
     */



    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> register(@RequestBody RegisterRequest req) {
        if (req.getUsername() == null || req.getPassword() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing username or password");
        }
        if (usuarioRepo.findByUsername(req.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }

        // Maanejo de solo un rol
        Role userRole = rolRepo.findByName("USER").orElseGet(() -> {
            Role newRole = new Role();
            newRole.setName("USER");
            return rolRepo.save(newRole);
        });

        Users user = new Users();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRoles(Set.of(userRole));
        usuarioRepo.save(user);

        String token = jwt.generate(user.getUsername(), List.of("USER"));

        return Map.of(
                "access_token", token,
                "token_type", "Bearer",
                "roles", List.of("USER")
        );
    }

    /**
     * Maneja errores de autenticación devolviendo un mensaje estándar.
     * @param e excepción de autenticación
     * @return mapa con el error
     */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(org.springframework.security.core.AuthenticationException.class)
    public Map<String, String> onAuthError(Exception e) {
        return Map.of("error", "Bad credentials");
    }
}

