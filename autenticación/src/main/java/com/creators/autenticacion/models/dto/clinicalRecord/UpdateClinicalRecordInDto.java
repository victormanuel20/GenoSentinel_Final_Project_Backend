package com.creators.autenticacion.models.dto.clinicalRecord;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "DTO para actualizar la evolución de una historia clínica (stage y/o tratamiento)")

public class UpdateClinicalRecordInDto {

    @Schema(description = "Nueva etapa del cáncer (ej: IIA, III, IV)", example = "III")
    private String stage;

    @Schema(description = "Nuevo protocolo de tratamiento", example = "Quimioterapia de segunda línea + inmunoterapia")
    private String treatmentProtocol;

}
