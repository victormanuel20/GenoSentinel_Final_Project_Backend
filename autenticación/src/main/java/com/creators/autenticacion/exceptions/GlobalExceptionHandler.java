package com.creators.autenticacion.exceptions;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidEmailException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidEmail(InvalidEmailException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of(
                        "error", "Invalid email",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(MissingFieldsException.class)
    public ResponseEntity<Map<String, Object>> handleMissingFields(MissingFieldsException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "error", "Missing fields",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of(
                        "error", "User already exists",
                        "message", ex.getMessage()
                ));
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "error", "User not found",
                        "message", ex.getMessage()
                ));
    }

    
    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<Map<String, Object>> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Map.of(
                        "error", "Email already exists",
                        "message", ex.getMessage()
                ));
    }


    // Cuando no mandan body o mandan JSON inválido
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, Object>> handleNoBody(HttpMessageNotReadableException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "error", "Invalid or empty body",
                        "message", "El cuerpo de la petición es inválido o está vacío"
                ));
    }

    private final ObjectMapper objectMapper = new ObjectMapper();

    @ExceptionHandler(MicroserviceException.class)
    public ResponseEntity<Map<String, Object>> handleMicroserviceException(MicroserviceException e) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("status", e.getStatusCode().value());
        errorResponse.put("error", e.getStatusCode().getReasonPhrase());

        try {
            JsonNode jsonNode = objectMapper.readTree(e.getErrorMessage());

            // Extraer el mensaje de NestJS
            if (jsonNode.has("message")) {
                JsonNode messageNode = jsonNode.get("message");

                if (messageNode.isArray()) {
                    // Convertir array a string separado por comas
                    List<String> messages = new ArrayList<>();
                    for (JsonNode msg : messageNode) {
                        messages.add(msg.asText());
                    }
                    errorResponse.put("message", String.join(", ", messages));
                } else {
                    // Si es string simple
                    errorResponse.put("message", messageNode.asText());
                }
            } else {
                errorResponse.put("message", e.getErrorMessage());
            }

            // Agregar errorType de NestJS
            if (jsonNode.has("error")) {
                errorResponse.put("errorType", jsonNode.get("error").asText());
            }

        } catch (Exception ex) {
            errorResponse.put("message", e.getErrorMessage());
        }

        return new ResponseEntity<>(errorResponse, e.getStatusCode());
    }

    @ExceptionHandler(MicroserviceGenomicaException.class)
    public ResponseEntity<Map<String, Object>> handleMicroserviceGenomicaException(MicroserviceGenomicaException e) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("microservice", "Genómica");
        errorResponse.put("status", e.getStatusCode().value());
        errorResponse.put("error", e.getStatusCode().getReasonPhrase());

        try {
            JsonNode jsonNode = objectMapper.readTree(e.getErrorMessage());

            // Django envía: {"error": {"campo": "mensaje"}}
            if (jsonNode.has("error")) {
                JsonNode errorNode = jsonNode.get("error");

                // Si es un objeto con múltiples campos
                if (errorNode.isObject()) {
                    Map<String, String> errors = new HashMap<>();
                    errorNode.fields().forEachRemaining(entry -> {
                        errors.put(entry.getKey(), entry.getValue().asText());
                    });
                    errorResponse.put("errors", errors);
                    errorResponse.put("message", "Validation errors");
                } else {
                    // Si es un string simple
                    errorResponse.put("message", errorNode.asText());
                }
            } else {
                errorResponse.put("message", e.getErrorMessage());
            }

        } catch (Exception ex) {
            errorResponse.put("message", e.getErrorMessage());
        }

        return new ResponseEntity<>(errorResponse, e.getStatusCode());
    }



}
