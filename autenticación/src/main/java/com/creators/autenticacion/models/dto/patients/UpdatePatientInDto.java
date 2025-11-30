package com.creators.autenticacion.models.dto.patients;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "DTO para actualizar un paciente existente")
public class UpdatePatientInDto {

    @Schema(description = "Nombre del paciente", example = "Juan Carlos")
    private String firstName;

    @Schema(description = "Apellido del paciente", example = "Pérez López")
    private String lastName;

    @Schema(description = "Fecha de nacimiento (YYYY-MM-DD)", example = "1990-05-10")
    private String birthDate;

    @Schema(description = "Género del paciente", example = "Masculino", allowableValues = {"Masculino", "Femenino", "Otro"})
    private String gender;

    @Schema(description = "Estado clínico del paciente", example = "Seguimiento", allowableValues = {"Activo", "Seguimiento", "Inactivo"})
    private String status;
}
