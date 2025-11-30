package com.creators.autenticacion.controller;

import com.creators.autenticacion.service.GeneGatewayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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


}
