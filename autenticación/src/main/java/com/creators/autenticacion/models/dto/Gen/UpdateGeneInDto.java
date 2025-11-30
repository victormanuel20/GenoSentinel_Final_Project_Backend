package com.creators.autenticacion.models.dto.Gen;


import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO para actualizar un gen (PUT - todos los campos requeridos)")
public class UpdateGeneInDto {

    @Schema(description = "Símbolo del gen", example = "TP53", required = true)
    private String symbol;

    @Schema(description = "Nombre completo del gen", example = "Tumor protein p53", required = true)
    @JsonProperty("full_name")
    private String fullName;

    @Schema(description = "Resumen de la función del gen", example = "Tumor suppressor protein", required = true)
    @JsonProperty("function_summary")
    private String functionSummary;

}
