package com.creators.autenticacion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class PatientGatewayService {

    private final RestTemplate restTemplate;

    private static final String CLINICA_URL = "http://localhost:3000/genosentinel/clinica";

    public Object getAllPatients() {
        String url = CLINICA_URL + "/patients";

        ResponseEntity<Object> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                Object.class
        );

        return response.getBody();
    }

    public Object getPatientById(Long id) {
        String url = CLINICA_URL + "/patients/" + id;

        ResponseEntity<Object> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                Object.class
        );

        return response.getBody();
    }
}
