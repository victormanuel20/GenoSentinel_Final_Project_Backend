package com.creators.autenticacion.service;


import com.creators.autenticacion.exceptions.MicroserviceGenomicaException;
import com.creators.autenticacion.models.dto.GeneticVariant.CreateGeneticVariantInDto;
import com.creators.autenticacion.models.dto.GeneticVariant.PatchGeneticVariantInDto;
import com.creators.autenticacion.models.dto.GeneticVariant.UpdateGeneticVariantInDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
public class GeneticVariantGatewayService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String GENOMICA_URL = "http://django-genomica:8000/genomico";

    // GET /variants - Listar todas
    public Object getAllGeneticVariants() {
        String url = GENOMICA_URL + "/variants/";

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    Object.class
            );
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );
        } catch (Exception e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "No se pudo conectar con el microservicio de Genomica"
            );
        }
    }

    // GET /variants/{id} - Obtener por ID
    public Object getGeneticVariantById(Long id) {
        String url = GENOMICA_URL + "/variants/" + id + "/";

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    null,
                    Object.class
            );
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );
        } catch (Exception e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "No se pudo conectar con el microservicio de Genomica"
            );
        }
    }

    // POST /variants - Crear
    public Object createGeneticVariant(CreateGeneticVariantInDto createDto) {
        String url = GENOMICA_URL + "/variants/";

        try {
            String jsonBody = objectMapper.writeValueAsString(createDto);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    request,
                    Object.class
            );
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );
        } catch (Exception e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "No se pudo conectar con el microservicio de Genomica"
            );
        }
    }

    // PUT /variants/{id} - Actualizar completo
    public Object updateGeneticVariant(Long id, UpdateGeneticVariantInDto updateDto) {
        String url = GENOMICA_URL + "/variants/" + id + "/";

        try {
            String jsonBody = objectMapper.writeValueAsString(updateDto);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.PUT,
                    request,
                    Object.class
            );
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );
        } catch (Exception e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "No se pudo conectar con el microservicio de Genomica"
            );
        }
    }

    // PATCH /variants/{id} - Actualizar parcial
    public Object patchGeneticVariant(Long id, PatchGeneticVariantInDto patchDto) {
        String url = GENOMICA_URL + "/variants/" + id + "/";

        try {
            String jsonBody = objectMapper.writeValueAsString(patchDto);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> request = new HttpEntity<>(jsonBody, headers);

            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.PATCH,
                    request,
                    Object.class
            );
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );
        } catch (Exception e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "No se pudo conectar con el microservicio de Genomica"
            );
        }
    }

    // DELETE /variants/{id} - Eliminar
    public Object deleteGeneticVariant(Long id) {
        String url = GENOMICA_URL + "/variants/" + id + "/";

        try {
            ResponseEntity<Object> response = restTemplate.exchange(
                    url,
                    HttpMethod.DELETE,
                    null,
                    Object.class
            );
            return response.getBody();

        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.valueOf(e.getStatusCode().value()),
                    e.getResponseBodyAsString()
            );
        } catch (Exception e) {
            throw new MicroserviceGenomicaException(
                    HttpStatus.SERVICE_UNAVAILABLE,
                    "No se pudo conectar con el microservicio de Genomica"
            );
        }
    }



}
