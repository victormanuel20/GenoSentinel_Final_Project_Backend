package com.creators.autenticacion.models.entities;


import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;


/**
 * Entidad que representa a un usuario autenticado en el sistema.
 *
 * <p>Esta clase está mapeada a la tabla {@code users} en la base de datos y contiene
 * la información básica del usuario, incluyendo nombre de usuario, correo, contraseña
 * y estado de activación.</p>
 *
 * <p>Implementa la interfaz {@code UserDetails} de Spring Security, lo que permite
 * que esta entidad sea utilizada directamente en el proceso de autenticación y autorización.</p>
 *
 * <p>Cada usuario puede tener uno o más roles, definidos en la entidad {@code Role},
 * que se transforman en autoridades reconocidas por Spring Security.</p>
 *
 * <p>Utiliza JPA para la persistencia y Lombok para generar automáticamente
 * los métodos estándar como getters, setters, equals y hashCode.</p>
 *
 * @author Victor
 * @version 1.0
 */


@Entity // Marca la clase como entidad JPA
@Table(name = "users") // Define la tabla en la base de datos
@Data // Lombok: genera getters/setters y otros métodos
public class Users  implements UserDetails{
    @Id // Clave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autoincremental
    private Long id; // Identificador único del usuario

    @Column(nullable = false, unique = true, length = 100) // Username único y obligatorio
    private String username; // Nombre de usuario

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false) // Contraseña obligatoria
    private String password; // Contraseña encriptada

    private Boolean active = true; // Indica si el usuario está activo

    @ManyToMany(fetch = FetchType.EAGER) // Relación muchos a muchos con roles, carga inmediata
    @JoinTable(
            name = "user_role", // Tabla intermedia
            joinColumns = @JoinColumn(name = "user_id"), // FK usuario
            inverseJoinColumns = @JoinColumn(name = "role_id") // FK rol
    )
    private Set<Role> roles = new HashSet<>(); // Conjunto de roles asignados al usuario

    // Devuelve las autoridades (roles) del usuario para Spring Security
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Transforma cada rol en una autoridad con prefijo "ROLE_"
        return roles.stream()
                .map(r -> (GrantedAuthority) () -> "ROLE_" + r.getName())
                .collect(Collectors.toSet());
    }

    // Métodos requeridos por UserDetails para el control de la cuenta
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return active; }


}
