package com.creators.autenticacion.controller;

import com.creators.autenticacion.models.dto.Gen.CreateGeneInDto;
import com.creators.autenticacion.models.dto.Gen.PatchGeneInDto;
import com.creators.autenticacion.models.dto.Gen.UpdateGeneInDto;
import com.creators.autenticacion.service.GeneGatewayService;
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
@RequestMapping("/gateway/genes")
@Tag(name = "Gateway Genes", description = "Endpoints para gestionar genes a través del gateway")
@RequiredArgsConstructor

public class GeneGatewayController {

    private final GeneGatewayService geneGatewayService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener todos los genes")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de genes obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getAllGenes() {
        Object genes = geneGatewayService.getAllGenes();
        return ResponseEntity.ok(genes);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener un gen por ID")
    @Parameter(name = "id", description = "ID del gen", example = "16")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Gen encontrado"),
            @ApiResponse(responseCode = "400", description = "ID inválido"),
            @ApiResponse(responseCode = "404", description = "Gen no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getGeneById(@PathVariable Long id) {
        Object gene = geneGatewayService.getGeneById(id);
        return ResponseEntity.ok(gene);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Buscar genes por símbolo",
            description = "Busca genes cuyo símbolo coincida parcial o totalmente"
    )
    @Parameter(name = "symbol", description = "Símbolo del gen a buscar", example = "EGFR", required = true)
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Genes encontrados"),
            @ApiResponse(responseCode = "400", description = "Parámetro symbol requerido"),
            @ApiResponse(responseCode = "404", description = "No se encontraron genes"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> searchGeneBySymbol(@RequestParam String symbol) {
        Object genes = geneGatewayService.searchGeneBySymbol(symbol);
        return ResponseEntity.ok(genes);
    }


    @PostMapping
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Crear un nuevo gen",
            description = "Crea un gen en el microservicio de genómica"
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Gen creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "409", description = "El gen ya existe"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> createGene(@RequestBody CreateGeneInDto createGeneDto) {
        Object gene = geneGatewayService.createGene(createGeneDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(gene);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Actualizar un gen (PUT)",
            description = "Actualiza todos los campos de un gen existente"
    )
    @Parameter(name = "id", description = "ID del gen a actualizar", example = "16")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Gen actualizado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Gen no encontrado"),
            @ApiResponse(responseCode = "409", description = "Símbolo duplicado"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> updateGene(
            @PathVariable Long id,
            @RequestBody UpdateGeneInDto updateGeneDto
    ) {
        Object gene = geneGatewayService.updateGene(id, updateGeneDto);
        return ResponseEntity.ok(gene);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Actualizar parcialmente un gen (PATCH)",
            description = "Actualiza solo los campos enviados de un gen existente"
    )
    @Parameter(name = "id", description = "ID del gen a actualizar", example = "16")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Gen actualizado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Gen no encontrado"),
            @ApiResponse(responseCode = "409", description = "Símbolo duplicado"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> patchGene(
            @PathVariable Long id,
            @RequestBody PatchGeneInDto patchGeneDto
    ) {
        Object gene = geneGatewayService.patchGene(id, patchGeneDto);
        return ResponseEntity.ok(gene);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Eliminar un gen",
            description = "Elimina un gen del sistema"
    )
    @Parameter(name = "id", description = "ID del gen a eliminar", example = "16")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Gen eliminado exitosamente"),
            @ApiResponse(responseCode = "400", description = "ID inválido"),
            @ApiResponse(responseCode = "404", description = "Gen no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> deleteGene(@PathVariable Long id) {
        Object result = geneGatewayService.deleteGene(id);
        return ResponseEntity.ok(result);
    }


}
