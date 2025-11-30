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

public class ClinicalRecordGatewayService {

    private final RestTemplate restTemplate;

    private static final String CLINICA_URL = "http://localhost:3000/genosentinel/clinica";

    // GET /clinical-records - Listar todas
    public Object getAllClinicalRecords() {
        String url = CLINICA_URL + "/clinical-records";

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

    // GET /clinical-records/:id - Obtener por ID
    public Object getClinicalRecordById(Long id) {
        String url = CLINICA_URL + "/clinical-records/" + id;

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

    // GET /clinical-records/patient/:patientId - Por paciente
    public Object getClinicalRecordsByPatient(Long patientId) {
        String url = CLINICA_URL + "/clinical-records/patient/" + patientId;

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

    // GET /clinical-records/tumor-type/:tumorTypeId - Por tipo de tumor
    public Object getClinicalRecordsByTumorType(Long tumorTypeId) {
        String url = CLINICA_URL + "/clinical-records/tumor-type/" + tumorTypeId;

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



}
