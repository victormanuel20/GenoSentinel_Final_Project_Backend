import axios from 'axios';

/**
 * Cliente para comunicarse con el microservicio de Genómica (Django)
 */
export class GenomicServiceClient {
  private static readonly BASE_URL = 'http://localhost:8000/genomico';

  /**
   * Elimina todos los reportes genómicos de un paciente
   * @param patientId - ID del paciente
   * @returns Número de reportes eliminados (0 si Django no está disponible)
   */
  static async deleteReportsByPatient(patientId: number): Promise<number> {
    try {
      console.log(`Intentando eliminar reportes genómicos del paciente ${patientId}...`);

      const response = await axios.delete(
        `${this.BASE_URL}/patient-reports/by-patient/${patientId}`,
        { timeout: 5000 }
      );

      if (response.data?.success) {
        const deleted = response.data.data.deleted || 0;
        console.log(` ${deleted} reporte(s) genómico(s) eliminados`);
        return deleted;
      }

      return 0;

    } catch (error) {
      console.warn(` No se pudieron eliminar reportes genómicos: ${error.message}`);
      return 0;
    }
  }
}