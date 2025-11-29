package com.creators.autenticacion.service;

import com.creators.autenticacion.exceptions.MicroserviceException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class PatientGatewayService {

    private final RestTemplate restTemplate;

    private static final String CLINICA_URL = "http://localhost:3000/genosentinel/clinica";

    public Object getAllPatients() {
        String url = CLINICA_URL + "/patients";

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    Object.class
            );

            return response.getBody();

        } catch (HttpClientErrorException e) {
            // Captura errores 4xx (400, 404, 409, etc.)
            throw new MicroserviceException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );

        } catch (HttpServerErrorException e) {
            // Captura errores 5xx (500, 503, etc.)
            throw new MicroserviceException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );

        } catch (Exception e) {
            // Error de conexion (NestJS caido)
            throw new MicroserviceException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "No se pudo conectar con el microservicio de Clinica"
            );
        }
    }

    public Object getPatientById(Long id) {
        String url = CLINICA_URL + "/patients/" + id;

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    Object.class
            );

            return response.getBody();

        } catch (HttpClientErrorException e) {
            // Captura errores 4xx
            throw new MicroserviceException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );

        } catch (HttpServerErrorException e) {
            // Captura errores 5xx
            throw new MicroserviceException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );

        } catch (Exception e) {
            // Error de conexion
            throw new MicroserviceException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "No se pudo conectar con el microservicio de Clinica"
            );
        }
    }

    public Object searchPatients(String firstName, String lastName, String birthDate) {
        // Construir la URL con query parameters
        StringBuilder url = new StringBuilder(CLINICA_URL + "/patients/search?");

        boolean hasParam = false;

        if (firstName != null && !firstName.isEmpty()) {
            url.append("firstName=").append(firstName);
            hasParam = true;
        }

        if (lastName != null && !lastName.isEmpty()) {
            if (hasParam) url.append("&");
            url.append("lastName=").append(lastName);
            hasParam = true;
        }

        if (birthDate != null && !birthDate.isEmpty()) {
            if (hasParam) url.append("&");
            url.append("birthDate=").append(birthDate);
        }

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    url.toString(),
                    HttpMethod.GET,
                    null,
                    Object.class
            );

            return response.getBody();

        } catch (HttpClientErrorException e) {
            throw new MicroserviceException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );

        } catch (HttpServerErrorException e) {
            throw new MicroserviceException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );

        } catch (Exception e) {
            throw new MicroserviceException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "No se pudo conectar con el microservicio de Clinica"
            );
        }
    }

}