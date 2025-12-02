package com.creators.autenticacion.service;

import com.creators.autenticacion.exceptions.MicroserviceException;
import com.creators.autenticacion.models.dto.clinicalRecord.CreateClinicalRecordInDto;
import com.creators.autenticacion.models.dto.clinicalRecord.UpdateClinicalRecordInDto;
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

    //private static final String CLINICA_URL = "http://localhost:3000/genosentinel/clinica";
    @Value("${CLINICA_SERVICE_URL:http://localhost:3000/genosentinel/clinica}")
    private String clinicaUrl;
    
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

    // POST /clinical-records - Crear nueva historia clínica
    public Object createClinicalRecord(CreateClinicalRecordInDto createDto) {
        String url = CLINICA_URL + "/clinical-records";

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<CreateClinicalRecordInDto> request = new HttpEntity<>(createDto, headers);

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

    // PATCH /clinical-records/:id - Actualizar historia clínica
    public Object updateClinicalRecord(Long id, UpdateClinicalRecordInDto updateDto) {
        String url = CLINICA_URL + "/clinical-records/" + id;

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<UpdateClinicalRecordInDto> request = new HttpEntity<>(updateDto, headers);

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


}
