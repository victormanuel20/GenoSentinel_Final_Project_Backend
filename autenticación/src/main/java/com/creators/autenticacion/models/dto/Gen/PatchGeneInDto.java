package com.creators.autenticacion.models.dto.Gen;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)


public class PatchGeneInDto {

    @Schema(description = "Símbolo del gen", example = "TP53")
    private String symbol;

    @Schema(description = "Nombre completo del gen", example = "Tumor protein p53")
    @JsonProperty("full_name")
    private String fullName;

    @Schema(description = "Resumen de la función del gen", example = "Tumor suppressor protein")
    @JsonProperty("function_summary")
    private String functionSummary;


}
