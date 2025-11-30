package com.creators.autenticacion.models.dto.PatientVariantReportInDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "DTO para crear un reporte de variantes de paciente")

public class CreatePatientVariantReportInDto {

    @Schema(description = "ID del paciente (se valida en microservicio de clínica)", example = "1", required = true)
    @JsonProperty("patient_id")
    private Long patientId;

    @Schema(description = "ID de la variante genética", example = "1", required = true)
    @JsonProperty("variant_id")
    private Long variantId;

    @Schema(description = "Fecha de detección (YYYY-MM-DD)", example = "2023-01-20", required = true)
    @JsonProperty("detection_date")
    private String detectionDate;

    @Schema(description = "Frecuencia alélica (VAF) - valor entre 0 y 1", example = "0.325", required = true)
    @JsonProperty("allele_frequency")
    private BigDecimal alleleFrequency;


}
