import requests
from genoma.exceptions.not_found_exception import NotFoundException

class ClinicServiceClient:

    BASE_URL = "http://localhost:3000/genosentinel/clinica"

    @staticmethod
    def get_patient_by_id(patient_id):

        url = f"{ClinicServiceClient.BASE_URL}/patients/{patient_id}"

        try:
            response = requests.get(url, timeout=5)

            if response.status_code == 200:
                return response.json()     # Paciente encontrado

            if response.status_code == 404:
                return None                # Paciente no existe

            raise Exception(
                f"Unexpected status from clinic service: {response.status_code}"
            )

        except requests.exceptions.RequestException as e:
            raise Exception(f"Error communicating with clinic service: {str(e)}")
