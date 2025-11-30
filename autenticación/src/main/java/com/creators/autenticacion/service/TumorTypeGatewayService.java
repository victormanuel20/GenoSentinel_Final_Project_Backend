package com.creators.autenticacion.service;

import com.creators.autenticacion.exceptions.MicroserviceException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor


public class TumorTypeGatewayService {

    private final RestTemplate restTemplate;

    private static final String CLINICA_URL = "http://localhost:3000/genosentinel/clinica";

    // GET /tumor-types - Listar todos
    public Object getAllTumorTypes() {
        String url = CLINICA_URL + "/tumor-types";

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
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

    // GET /tumor-types/:id - Obtener por ID
    public Object getTumorTypeById(Long id) {
        String url = CLINICA_URL + "/tumor-types/" + id;

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
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

    // GET /tumor-types/search?name=X&systemAffected=Y - Búsqueda
    public Object searchTumorTypes(String name, String systemAffected) {
        StringBuilder url = new StringBuilder(CLINICA_URL + "/tumor-types/search?");

        boolean hasParam = false;

        if (name != null && !name.isEmpty()) {
            url.append("name=").append(name);
            hasParam = true;
        }

        if (systemAffected != null && !systemAffected.isEmpty()) {
            if (hasParam) url.append("&");
            url.append("systemAffected=").append(systemAffected);
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
