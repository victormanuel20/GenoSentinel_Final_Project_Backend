import uuid
from genoma.gateway.clinic_service_client import ClinicServiceClient
from genoma.models import PatientVariantReport, GeneticVariant
from genoma.models.DTOs.create_patient_variant_report_dto import CreatePatientVariantReportDTO
from genoma.models.DTOs.update_patient_variant_report_dto import UpdatePatientVariantReportDTO
from genoma.models.DTOs.patient_variant_report_dto import PatientVariantReportDTO

from genoma.exceptions.not_found_exception import NotFoundException
from genoma.exceptions.bad_request_exception import BadRequestException


class PatientVariantReportService:

    @staticmethod
    def validate_patient_id(patient_id):
        try:
            int(patient_id)
        except ValueError:
            raise BadRequestException("patientId must be a valid numeric value")
        return True

    # ---------------------------------------------------
    # CREATE (MODIFICADO PARA CONSULTAR NEST)
    # ---------------------------------------------------
    @staticmethod
    def create_report(data):

        try:
            dto = CreatePatientVariantReportDTO(data)
        except ValueError as e:
            raise BadRequestException(str(e))

        # Validación mínima
        PatientVariantReportService.validate_patient_id(dto.patient_id)

        # 🔍 Consultar microservicio clínico (NESTJS)
        patient = ClinicServiceClient.get_patient_by_id(dto.patient_id)

        if patient is None:
            raise NotFoundException("Patient not found in clinical service")

        # Validar existencia de la variante
        try:
            variant = GeneticVariant.objects.get(id=dto.variant_id)
        except GeneticVariant.DoesNotExist:
            raise NotFoundException("Variant not found")

        # Crear ID tipo UUID (como antes)
        generated_id = uuid.uuid4().hex

        report = PatientVariantReport.objects.create(
            id=generated_id,
            patient_id=dto.patient_id,
            variant=variant,
            detection_date=dto.detection_date,
            allele_frequency=dto.allele_frequency
        )

        return PatientVariantReportDTO(report).to_dict()

    # ---------------------------------------------------
    # LIST
    # ---------------------------------------------------
    @staticmethod
    def list_reports():
        reports = PatientVariantReport.objects.all()
        return [PatientVariantReportDTO(r).to_dict() for r in reports]

    # ---------------------------------------------------
    # RETRIEVE
    # ---------------------------------------------------
    @staticmethod
    def get_report(report_id):

        try:
            report = PatientVariantReport.objects.get(id=report_id)
        except PatientVariantReport.DoesNotExist:
            raise NotFoundException("Report not found")

        return PatientVariantReportDTO(report).to_dict()

    # ---------------------------------------------------
    # UPDATE
    # ---------------------------------------------------
    @staticmethod
    def update_report(report_id, data):

        try:
            dto = UpdatePatientVariantReportDTO(data)
        except ValueError as e:
            raise BadRequestException(str(e))

        try:
            report = PatientVariantReport.objects.get(id=report_id)
        except PatientVariantReport.DoesNotExist:
            raise NotFoundException("Report not found")

        if dto.detection_date is not None:
            report.detection_date = dto.detection_date

        if dto.allele_frequency is not None:
            report.allele_frequency = dto.allele_frequency

        report.save()

        return PatientVariantReportDTO(report).to_dict()

    # ---------------------------------------------------
    # DELETE
    # ---------------------------------------------------
    @staticmethod
    def delete_report(report_id):

        try:
            report = PatientVariantReport.objects.get(id=report_id)
        except PatientVariantReport.DoesNotExist:
            raise NotFoundException("Report not found")

        report.delete()
        return {"message": "Report deleted successfully"}
