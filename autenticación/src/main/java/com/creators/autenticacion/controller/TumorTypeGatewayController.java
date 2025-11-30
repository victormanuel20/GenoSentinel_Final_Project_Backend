package com.creators.autenticacion.controller;

import com.creators.autenticacion.service.TumorTypeGatewayService;
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
@RequestMapping("/gateway/tumor-types")
@Tag(name = "Gateway Tipos de Tumor", description = "Endpoints para gestionar tipos de tumor a través del gateway")
@RequiredArgsConstructor
public class TumorTypeGatewayController {

    private final TumorTypeGatewayService tumorTypeGatewayService;

    @GetMapping("")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener todos los tipos de tumor")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Lista de tipos de tumor obtenida exitosamente"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getAllTumorTypes() {
        Object tumorTypes = tumorTypeGatewayService.getAllTumorTypes();
        return ResponseEntity.ok(tumorTypes);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    @Operation(summary = "Obtener un tipo de tumor por ID")
    @Parameter(name = "id", description = "ID del tipo de tumor", example = "1")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Tipo de tumor encontrado"),
            @ApiResponse(responseCode = "404", description = "Tipo de tumor no encontrado"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> getTumorTypeById(@PathVariable Long id) {
        Object tumorType = tumorTypeGatewayService.getTumorTypeById(id);
        return ResponseEntity.ok(tumorType);
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('USER')")
    @Operation(
            summary = "Buscar tipos de tumor por nombre o sistema afectado",
            description = "Busca tipos de tumor por nombre o sistema afectado. Al menos un criterio es requerido."
    )
    @Parameter(name = "name", description = "Nombre del tipo de tumor (búsqueda parcial)", example = "cáncer")
    @Parameter(name = "systemAffected", description = "Sistema afectado (búsqueda parcial)", example = "Sistema urinario")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Tipos de tumor encontrados"),
            @ApiResponse(responseCode = "400", description = "Debe proporcionar al menos un criterio de búsqueda"),
            @ApiResponse(responseCode = "404", description = "No se encontraron tipos de tumor con los criterios proporcionados"),
            @ApiResponse(responseCode = "401", description = "No autenticado")
    })
    public ResponseEntity<Object> searchTumorTypes(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String systemAffected
    ) {
        Object tumorTypes = tumorTypeGatewayService.searchTumorTypes(name, systemAffected);
        return ResponseEntity.ok(tumorTypes);
    }


}
