package com.creators.autenticacion.repository;

import com.creators.autenticacion.models.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repositorio JPA para la entidad {@code Role}.
 *
 * <p>Proporciona acceso a la tabla {@code roles} en la base de datos,
 * permitiendo operaciones CRUD y búsqueda por nombre.</p>
 *
 * <p>Este repositorio se utiliza principalmente para obtener el rol único del sistema: {@code USER}.</p>
 */

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
