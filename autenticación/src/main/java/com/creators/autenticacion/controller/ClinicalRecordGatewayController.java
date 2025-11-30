package com.creators.autenticacion.controller;

import com.creators.autenticacion.models.dto.clinicalRecord.CreateClinicalRecordInDto;
import com.creators.autenticacion.models.dto.clinicalRecord.UpdateClinicalRecordInDto;
import com.creators.autenticacion.service.ClinicalRecordGatewayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gateway/clinical-records")
@Tag(name = "Gateway Historias Clínicas", description = "Endpoints para gestionar historias clínicas a través del gateway")
@RequiredArgsConstructor


public class ClinicalRecordGatewayController {

    private final ClinicalRecordGatewayService clinicalRecordGatewayService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener todas las historias clínicas")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de historias clínicas obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getAllClinicalRecords() {
        Object records = clinicalRecordGatewayService.getAllClinicalRecords();
        return ResponseEntity.ok(records);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener una historia clínica por ID")
    @Parameter(name = "id", description = "ID de la historia clínica", example = "3")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Historia clínica encontrada"),
            @ApiResponse(responseCode = "404", description = "Historia clínica no encontrada"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getClinicalRecordById(@PathVariable Long id) {
        Object record = clinicalRecordGatewayService.getClinicalRecordById(id);
        return ResponseEntity.ok(record);
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Obtener historias clínicas de un paciente",
            description = "Retorna todas las historias clínicas asociadas a un paciente específico"
    )
    @Parameter(name = "patientId", description = "ID del paciente", example = "30")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Historias clínicas del paciente encontradas"),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado o no tiene historias clínicas"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getClinicalRecordsByPatient(@PathVariable Long patientId) {
        Object records = clinicalRecordGatewayService.getClinicalRecordsByPatient(patientId);
        return ResponseEntity.ok(records);
    }

    @GetMapping("/tumor-type/{tumorTypeId}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Obtener historias clínicas de un tipo de tumor",
            description = "Retorna todas las historias clínicas asociadas a un tipo de tumor específico"
    )
    @Parameter(name = "tumorTypeId", description = "ID del tipo de tumor", example = "14")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Historias clínicas del tipo de tumor encontradas"),
            @ApiResponse(responseCode = "404", description = "Tipo de tumor no encontrado o no tiene historias clínicas"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getClinicalRecordsByTumorType(@PathVariable Long tumorTypeId) {
        Object records = clinicalRecordGatewayService.getClinicalRecordsByTumorType(tumorTypeId);
        return ResponseEntity.ok(records);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Crear una nueva historia clínica",
            description = "Crea una historia clínica asociada a un paciente y tipo de tumor"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Historia clínica creada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Paciente o tipo de tumor no encontrado"),
            @ApiResponse(responseCode = "409", description = "Ya existe una historia clínica con esos datos"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> createClinicalRecord(@RequestBody CreateClinicalRecordInDto createDto) {
        Object record = clinicalRecordGatewayService.createClinicalRecord(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(record);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Actualizar la evolución de una historia clínica",
            description = "Actualiza el stage y/o protocolo de tratamiento de una historia clínica existente"
    )
    @Parameter(name = "id", description = "ID de la historia clínica a actualizar", example = "3")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Historia clínica actualizada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Historia clínica no encontrada"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> updateClinicalRecord(
            @PathVariable Long id,
            @RequestBody UpdateClinicalRecordInDto updateDto
    ) {
        Object record = clinicalRecordGatewayService.updateClinicalRecord(id, updateDto);
        return ResponseEntity.ok(record);
    }






}
