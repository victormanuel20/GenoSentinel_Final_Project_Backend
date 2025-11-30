package com.creators.autenticacion.models.dto.TumorType;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)  // ✅ Filtra nulls automáticamente
@Schema(description = "DTO para actualizar un tipo de tumor existente")
public class UpdateTumorTypeInDto {

    @Schema(description = "Nombre del tipo de tumor", example = "Cáncer de pulmón")
    private String name;

    @Schema(description = "Sistema afectado por el tumor", example = "Sistema respiratorio")
    @JsonProperty("systemAffected")  // Esto asegura que se envíe como systemAffected
    private String systemAffected;
}
