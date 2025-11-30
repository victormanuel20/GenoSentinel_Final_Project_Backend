package com.creators.autenticacion.service;

import com.creators.autenticacion.exceptions.MicroserviceGenomicaException;
import com.creators.autenticacion.models.dto.patients.CreateGeneInDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;



@Service
@RequiredArgsConstructor


public class GeneGatewayService {

    private final RestTemplate restTemplate;

    private static final String GENOMICA_URL = "http://localhost:8000/genomico";

    // GET /genes - Listar todos
    public Object getAllGenes() {
        String url = GENOMICA_URL + "/genes/";

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

    // GET /genes/{id} - Obtener por ID
    public Object getGeneById(Long id) {
        String url = GENOMICA_URL + "/genes/" + id + "/";

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

    // GET /genes/search?symbol=X - Búsqueda
    public Object searchGeneBySymbol(String symbol) {
        String url = GENOMICA_URL + "/genes/search/?symbol=" + symbol;

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

    

    private final ObjectMapper objectMapper = new ObjectMapper();

    public Object createGene(CreateGeneInDto createGeneDto) {
        String url = GENOMICA_URL + "/genes/";

        try {
            // El DTO ya tiene @JsonProperty, así que serializa correctamente
            String jsonBody = objectMapper.writeValueAsString(createGeneDto);

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



}
