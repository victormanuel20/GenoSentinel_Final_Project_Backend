package com.creators.autenticacion.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class MicroserviceException extends RuntimeException {

    private final HttpStatus statusCode;
    private final String errorMessage;

    public MicroserviceException(HttpStatus statusCode, String errorMessage) {
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
    }
}