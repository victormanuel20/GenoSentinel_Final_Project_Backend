package com.creators.autenticacion.models.dto.GeneticVariant;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "DTO para actualizar una variante genética (PUT - todos los campos)")
public class UpdateGeneticVariantInDto {

    @Schema(description = "ID del gen asociado (opcional - si no se envía, mantiene el actual)", example = "1")
    @JsonProperty("gene_id")
    private Long geneId;

    @Schema(description = "Cromosoma", example = "chr17", required = true)
    private String chromosome;

    @Schema(description = "Posición en el cromosoma", example = "43045701", required = true)
    private Integer position;

    @Schema(description = "Base de referencia", example = "A", required = true)
    @JsonProperty("reference_base")
    private String referenceBase;

    @Schema(description = "Base alternativa", example = "G", required = true)
    @JsonProperty("alternate_base")
    private String alternateBase;

    @Schema(description = "Tipo de impacto", example = "Missense", required = true,
            allowableValues = {"Missense", "Frameshift", "Nonsense", "Synonymous", "Unknown"})
    private String impact;



}
