package com.creators.autenticacion.repository;

import com.creators.autenticacion.models.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Repositorio JPA para la entidad {@code Users}.
 *
 * <p>Proporciona acceso a la tabla {@code users} en la base de datos,
 * permitiendo operaciones CRUD y búsqueda por nombre de usuario.</p>
 *
 * <p>Este repositorio es utilizado por el sistema de autenticación para
 * recuperar usuarios durante el proceso de inicio de sesión.</p>
 */

public interface UsersRepository extends JpaRepository<Users,Long> {
    Optional<Users> findByUsername(String username);
}
