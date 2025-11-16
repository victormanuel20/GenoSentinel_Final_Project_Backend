package com.creators.autenticacion.models.entities;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Representa el rol único del sistema: "USER".
 *
 * Esta entidad se guarda en la tabla "roles" y permite asociar usuarios
 * al único rol disponible en la aplicación.
 *
 * se utiliza JPA para la persistencia y Lombok para generar automáticamente
 * los métodos estándar.
 */


@Entity
@Table(name = "roles")
@Data
public class Role {
    /**
     * Identificador único del rol.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Nombre del rol. Solo se usará "USER".
     */
    @Column(nullable = false, unique = true, length = 50)
    private String name; // USER only.


}
