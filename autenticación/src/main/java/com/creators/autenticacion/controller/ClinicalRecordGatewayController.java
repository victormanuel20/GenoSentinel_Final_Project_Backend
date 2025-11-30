package com.creators.autenticacion.controller;

import com.creators.autenticacion.service.ClinicalRecordGatewayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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




}
