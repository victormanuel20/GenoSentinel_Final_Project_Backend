package com.creators.autenticacion.models.dto.TumorType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO para crear un nuevo tipo de tumor")
public class CreateTumorTypeInDto {
    @Schema(description = "Nombre del tipo de tumor", example = "Cáncer de mama")
    private String name;

    @Schema(description = "Sistema afectado por el tumor", example = "Glándulas")
    private String systemAffected;

}
