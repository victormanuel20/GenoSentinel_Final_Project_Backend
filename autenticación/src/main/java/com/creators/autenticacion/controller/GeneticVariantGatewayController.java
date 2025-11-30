package com.creators.autenticacion.controller;


import com.creators.autenticacion.models.dto.GeneticVariant.CreateGeneticVariantInDto;
import com.creators.autenticacion.models.dto.GeneticVariant.PatchGeneticVariantInDto;
import com.creators.autenticacion.models.dto.GeneticVariant.UpdateGeneticVariantInDto;
import com.creators.autenticacion.service.GeneticVariantGatewayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gateway/genetic-variants")
@Tag(name = "Gateway Variantes Genéticas", description = "Endpoints para gestionar variantes genéticas a través del gateway")
@RequiredArgsConstructor
public class GeneticVariantGatewayController {

    private final GeneticVariantGatewayService variantGatewayService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener todas las variantes genéticas")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de variantes obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getAllGeneticVariants() {
        Object variants = variantGatewayService.getAllGeneticVariants();
        return ResponseEntity.ok(variants);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener una variante genética por ID")
    @Parameter(name = "id", description = "ID de la variante genética", example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variante encontrada"),
            @ApiResponse(responseCode = "400", description = "ID inválido"),
            @ApiResponse(responseCode = "404", description = "Variante no encontrada"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getGeneticVariantById(@PathVariable Long id) {
        Object variant = variantGatewayService.getGeneticVariantById(id);
        return ResponseEntity.ok(variant);
    }

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Crear una nueva variante genética",
            description = "Crea una variante genética asociada a un gen existente"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Variante creada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Gen no encontrado"),
            @ApiResponse(responseCode = "409", description = "La variante ya existe"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> createGeneticVariant(@RequestBody CreateGeneticVariantInDto createDto) {
        Object variant = variantGatewayService.createGeneticVariant(createDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(variant);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Actualizar una variante genética (PUT)",
            description = "Actualiza una variante genética. El gene_id es opcional, si no se envía mantiene el actual."
    )
    @Parameter(name = "id", description = "ID de la variante a actualizar", example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variante actualizada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Variante o gen no encontrado"),
            @ApiResponse(responseCode = "409", description = "Variante duplicada"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> updateGeneticVariant(
            @PathVariable Long id,
            @RequestBody UpdateGeneticVariantInDto updateDto
    ) {
        Object variant = variantGatewayService.updateGeneticVariant(id, updateDto);
        return ResponseEntity.ok(variant);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Actualizar parcialmente una variante genética (PATCH)",
            description = "Actualiza solo los campos enviados de una variante existente"
    )
    @Parameter(name = "id", description = "ID de la variante a actualizar", example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variante actualizada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Variante o gen no encontrado"),
            @ApiResponse(responseCode = "409", description = "Variante duplicada"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> patchGeneticVariant(
            @PathVariable Long id,
            @RequestBody PatchGeneticVariantInDto patchDto
    ) {
        Object variant = variantGatewayService.patchGeneticVariant(id, patchDto);
        return ResponseEntity.ok(variant);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Eliminar una variante genética",
            description = "Elimina una variante del sistema"
    )
    @Parameter(name = "id", description = "ID de la variante a eliminar", example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Variante eliminada exitosamente"),
            @ApiResponse(responseCode = "400", description = "ID inválido"),
            @ApiResponse(responseCode = "404", description = "Variante no encontrada"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> deleteGeneticVariant(@PathVariable Long id) {
        Object result = variantGatewayService.deleteGeneticVariant(id);
        return ResponseEntity.ok(result);
    }

}
