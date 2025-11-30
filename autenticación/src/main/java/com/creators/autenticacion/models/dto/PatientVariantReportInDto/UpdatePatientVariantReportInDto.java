package com.creators.autenticacion.models.dto.PatientVariantReportInDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Schema(description = "DTO para actualizar un reporte de variantes (PUT - solo allele_frequency)")

public class UpdatePatientVariantReportInDto {

    @Schema(description = "Frecuencia alélica (VAF) - valor entre 0 y 1", example = "0.42", required = true)
    @JsonProperty("allele_frequency")
    private BigDecimal alleleFrequency;
}
