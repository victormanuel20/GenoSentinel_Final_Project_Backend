package com.creators.autenticacion.service;

import com.creators.autenticacion.exceptions.MicroserviceException;
import com.creators.autenticacion.models.dto.TumorType.CreateTumorTypeInDto;
import com.creators.autenticacion.models.dto.TumorType.UpdateTumorTypeInDto;
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

    private static final String CLINICA_URL = "http://nestjs-clinica:3000/genosentinel/clinica";

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

    // POST /tumor-types - Crear nuevo tipo de tumor
    public Object createTumorType(CreateTumorTypeInDto createTumorTypeDto) {
        String url = CLINICA_URL + "/tumor-types";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<CreateTumorTypeInDto> request = new HttpEntity<>(createTumorTypeDto, headers);

            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    request,
                    Object.class
            );
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
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

    // PATCH /tumor-types/:id - Actualizar tipo de tumor
    public Object updateTumorType(Long id, UpdateTumorTypeInDto updateTumorTypeDto) {
        String url = CLINICA_URL + "/tumor-types/" + id;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<UpdateTumorTypeInDto> request = new HttpEntity<>(updateTumorTypeDto, headers);

            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.PATCH,
                    request,
                    Object.class
            );

            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
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

    // DELETE /tumor-types/:id - Eliminar tipo de tumor
    public Object deleteTumorType(Long id) {
        String url = CLINICA_URL + "/tumor-types/" + id;

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.DELETE,
                    null,
                    Object.class
            );

            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
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
