package com.creators.autenticacion.service;

import com.creators.autenticacion.exceptions.MicroserviceGenomicaException;
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






}
