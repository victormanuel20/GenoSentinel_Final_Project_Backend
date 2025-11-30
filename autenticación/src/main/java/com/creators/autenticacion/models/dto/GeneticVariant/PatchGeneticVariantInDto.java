package com.creators.autenticacion.models.dto.GeneticVariant;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Schema(description = "DTO para actualizar parcialmente una variante genética (PATCH - campos opcionales)")

public class PatchGeneticVariantInDto {
    @Schema(description = "ID del gen asociado", example = "1")
    @JsonProperty("gene_id")
    private Long geneId;

    @Schema(description = "Cromosoma", example = "chr17")
    private String chromosome;

    @Schema(description = "Posición en el cromosoma", example = "43045701")
    private Integer position;

    @Schema(description = "Base de referencia", example = "A")
    @JsonProperty("reference_base")
    private String referenceBase;

    @Schema(description = "Base alternativa", example = "G")
    @JsonProperty("alternate_base")
    private String alternateBase;

    @Schema(description = "Tipo de impacto", example = "Missense",
            allowableValues = {"Missense", "Frameshift", "Nonsense", "Synonymous", "Unknown"})
    private String impact;
}
