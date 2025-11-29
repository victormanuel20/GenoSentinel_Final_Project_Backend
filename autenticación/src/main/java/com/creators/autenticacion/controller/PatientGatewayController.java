package com.creators.autenticacion.controller;

import com.creators.autenticacion.service.PatientGatewayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gateway/patients")
@Tag(name = "Gateway Pacientes")
@RequiredArgsConstructor
public class PatientGatewayController {

    private final PatientGatewayService patientGatewayService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener todos los pacientes")
    public ResponseEntity<Object> getAllPatients() {
        Object patients = patientGatewayService.getAllPatients();
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener paciente por ID")
    public ResponseEntity<Object> getPatientById(@PathVariable Long id) {
        Object patient = patientGatewayService.getPatientById(id);
        return ResponseEntity.ok(patient);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Buscar pacientes por criterios")
    public ResponseEntity<Object> searchPatients(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String birthDate
    ) {
        Object patients = patientGatewayService.searchPatients(firstName, lastName, birthDate);
        return ResponseEntity.ok(patients);
    }
}