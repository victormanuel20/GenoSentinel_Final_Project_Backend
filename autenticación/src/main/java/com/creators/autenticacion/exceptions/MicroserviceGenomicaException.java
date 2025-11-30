package com.creators.autenticacion.exceptions;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class MicroserviceGenomicaException extends RuntimeException {
    private final HttpStatus statusCode;
    private final String errorMessage;

    public MicroserviceGenomicaException(HttpStatus statusCode, String errorMessage) {
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;

    }
}