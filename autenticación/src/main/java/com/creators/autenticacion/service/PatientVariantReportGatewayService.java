package com.creators.autenticacion.service;

import com.creators.autenticacion.exceptions.MicroserviceGenomicaException;
import com.creators.autenticacion.models.dto.PatientVariantReportInDto.CreatePatientVariantReportInDto;
import com.creators.autenticacion.models.dto.PatientVariantReportInDto.UpdatePatientVariantReportInDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;


@Service
@RequiredArgsConstructor
public class PatientVariantReportGatewayService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String GENOMICA_URL = "http://django-genomica:8000/genomico";

    // GET /patient-variant-reports - Listar todos
    public Object getAllPatientVariantReports() {
        String url = GENOMICA_URL + "/patient-reports/";

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

    // GET /patient-variant-reports/{id} - Obtener por ID
    public Object getPatientVariantReportById(Long id) {
        String url = GENOMICA_URL + "/patient-reports/" + id + "/";

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

    // POST /patient-variant-reports - Crear
    public Object createPatientVariantReport(CreatePatientVariantReportInDto createDto) {
        String url = GENOMICA_URL + "/patient-reports/";

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

    // PUT /patient-reports/{id} - Actualizar (solo allele_frequency)
    public Object updatePatientVariantReport(Long id, UpdatePatientVariantReportInDto updateDto) {
        String url = GENOMICA_URL + "/patient-reports/" + id + "/";

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


    // DELETE /patient-reports/{id} - Eliminar
    public Object deletePatientVariantReport(Long id) {
        String url = GENOMICA_URL + "/patient-reports/" + id + "/";

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
