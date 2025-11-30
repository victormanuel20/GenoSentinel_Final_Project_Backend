package com.creators.autenticacion.models.dto.clinicalRecord;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO para crear una nueva historia clínica")

public class CreateClinicalRecordInDto {

    @Schema(description = "ID del paciente", example = "1", required = true)
    private Integer patientId;

    @Schema(description = "ID del tipo de tumor", example = "1", required = true)
    private Integer tumorTypeId;

    @Schema(description = "Fecha de diagnóstico (formato YYYY-MM-DD)", example = "2023-05-20", required = true)
    private String diagnosisDate;

    @Schema(description = "Etapa del cáncer (ej: IIA, III, IV)", example = "IIA")
    private String stage;

    @Schema(description = "Protocolo de tratamiento", example = "Cirugía conservadora + quimioterapia adyuvante con docetaxel")
    private String treatmentProtocol;

}
