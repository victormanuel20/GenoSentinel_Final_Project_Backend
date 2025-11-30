package com.creators.autenticacion.controller;

import com.creators.autenticacion.models.dto.patients.CreatePatientInDto;
import com.creators.autenticacion.models.dto.patients.UpdatePatientInDto;
import com.creators.autenticacion.service.PatientGatewayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gateway/patients")
@Tag(name = "Gateway Pacientes", description = "Endpoints para gestionar pacientes a través del gateway")
@RequiredArgsConstructor
public class PatientGatewayController {

    private final PatientGatewayService patientGatewayService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener todos los pacientes")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de pacientes obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getAllPatients() {
        Object patients = patientGatewayService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener paciente por ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente encontrado"),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getPatientById(@PathVariable Long id) {
        Object patient = patientGatewayService.getPatientById(id);
        return ResponseEntity.ok(patient);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Buscar pacientes por criterios",
            description = "Busca pacientes por nombre, apellido o fecha de nacimiento. Al menos un criterio es requerido."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Pacientes encontrados"),
            @ApiResponse(responseCode = "400", description = "Debe proporcionar al menos un criterio de búsqueda"),
            @ApiResponse(responseCode = "404", description = "No se encontraron pacientes con los criterios proporcionados"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> searchPatients(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String birthDate
    ) {
        Object patients = patientGatewayService.searchPatients(firstName, lastName, birthDate);
        return ResponseEntity.ok(patients);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Crear un nuevo paciente",
            description = "Crea un paciente en el microservicio de clínica"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Paciente creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "401", description = "No autenticado"),
            @ApiResponse(responseCode = "409", description = "El paciente ya existe")
    })
    public ResponseEntity<Object> createPatient(@RequestBody CreatePatientInDto createPatientDto) {
        Object patient = patientGatewayService.createPatient(createPatientDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(patient);
    }


    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Actualizar un paciente",
            description = "Actualiza los datos de un paciente existente en el microservicio de clínica"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente actualizado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado"),
            @ApiResponse(responseCode = "409", description = "Ya existe otro paciente con esos datos")
    })
    public ResponseEntity<Object> updatePatient(
            @PathVariable Long id,
            @RequestBody UpdatePatientInDto updatePatientDto
    ) {
        Object patient = patientGatewayService.updatePatient(id, updatePatientDto);
        return ResponseEntity.ok(patient);
    }


    @PatchMapping("/{id}/desactivate")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Desactivar un paciente",
            description = "Cambia el estado de un paciente a Inactivo"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente desactivado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado"),
            @ApiResponse(responseCode = "409", description = "El paciente ya está inactivo")
    })
    public ResponseEntity<Object> desactivatePatient(@PathVariable Long id) {
        Object patient = patientGatewayService.desactivatePatient(id);
        return ResponseEntity.ok(patient);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Eliminar un paciente",
            description = "Elimina un paciente inactivo del sistema"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Paciente eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado"),
            @ApiResponse(responseCode = "409", description = "No se puede eliminar un paciente activo")
    })
    public ResponseEntity<Object> deletePatient(@PathVariable Long id) {
        Object result = patientGatewayService.deletePatient(id);
        return ResponseEntity.ok(result);
    }




}