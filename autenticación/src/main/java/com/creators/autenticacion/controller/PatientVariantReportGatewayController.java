package com.creators.autenticacion.controller;

import com.creators.autenticacion.models.dto.PatientVariantReportInDto.CreatePatientVariantReportInDto;
import com.creators.autenticacion.models.dto.PatientVariantReportInDto.UpdatePatientVariantReportInDto;
import com.creators.autenticacion.service.PatientVariantReportGatewayService;
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
@RequestMapping("/gateway/patient-variant-reports")
@Tag(name = "Gateway Reportes de Variantes de Pacientes", description = "Endpoints para gestionar reportes de variantes de pacientes")
@RequiredArgsConstructor

public class PatientVariantReportGatewayController {

    private final PatientVariantReportGatewayService reportGatewayService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener todos los reportes de variantes de pacientes")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de reportes obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getAllPatientVariantReports() {
        Object reports = reportGatewayService.getAllPatientVariantReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener un reporte de variantes por ID")
    @Parameter(name = "id", description = "ID del reporte", example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reporte encontrado"),
            @ApiResponse(responseCode = "400", description = "ID inválido"),
            @ApiResponse(responseCode = "404", description = "Reporte no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getPatientVariantReportById(@PathVariable Long id) {
        Object report = reportGatewayService.getPatientVariantReportById(id);
        return ResponseEntity.ok(report);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Crear un reporte de variantes de paciente",
            description = "Crea un reporte asociando un paciente (validado en clínica) con una variante genética. " +
                    "La frecuencia alélica debe estar entre 0 y 1."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Reporte creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos (frecuencia alélica fuera de rango, campos faltantes, etc.)"),
            @ApiResponse(responseCode = "404", description = "Paciente no encontrado en microservicio de clínica o variante no encontrada"),
            @ApiResponse(responseCode = "409", description = "El reporte ya existe (mismo paciente, variante y fecha)"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> createPatientVariantReport(@RequestBody CreatePatientVariantReportInDto createDto) {
        Object report = reportGatewayService.createPatientVariantReport(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(report);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Actualizar un reporte de variantes (PUT)",
            description = "Actualiza solo la frecuencia alélica de un reporte. " +
                    "NO se pueden modificar patient_id, variant_id ni detection_date."
    )
    @Parameter(name = "id", description = "ID del reporte a actualizar", example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reporte actualizado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos (frecuencia alélica fuera de rango)"),
            @ApiResponse(responseCode = "404", description = "Reporte no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> updatePatientVariantReport(
            @PathVariable Long id,
            @RequestBody UpdatePatientVariantReportInDto updateDto
    ) {
        Object report = reportGatewayService.updatePatientVariantReport(id, updateDto);
        return ResponseEntity.ok(report);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Eliminar un reporte de variantes",
            description = "Elimina un reporte del sistema"
    )
    @Parameter(name = "id", description = "ID del reporte a eliminar", example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reporte eliminado exitosamente"),
            @ApiResponse(responseCode = "400", description = "ID inválido"),
            @ApiResponse(responseCode = "404", description = "Reporte no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> deletePatientVariantReport(@PathVariable Long id) {
        Object result = reportGatewayService.deletePatientVariantReport(id);
        return ResponseEntity.ok(result);
    }




}
