from genoma.gateway.clinic_service_client import ClinicServiceClient
from genoma.models import PatientVariantReport, GeneticVariant
from genoma.models.DTOs.create_patient_variant_report_dto import CreatePatientVariantReportDTO
from genoma.models.DTOs.update_patient_variant_report_dto import UpdatePatientVariantReportDTO
from genoma.models.DTOs.patient_variant_report_dto import PatientVariantReportDTO

from genoma.exceptions.not_found_exception import NotFoundException
from genoma.exceptions.bad_request_exception import BadRequestException
from genoma.exceptions.invalid_numeric_value_exception import InvalidNumericValueException
from genoma.exceptions.invalid_type_exception import InvalidTypeException
from genoma.exceptions.duplicate_resource_exception import DuplicateResourceException


class PatientVariantReportService:

    # ---------------------------------------------------
    # VALIDACIÓN CENTRALIZADA (igual que VariantService)
    # ---------------------------------------------------
    @staticmethod
    def validate_positive_int(value, field_name):

        if not isinstance(value, str):
            raise InvalidTypeException(f"{field_name} must be a numeric string")

        if not value.isdigit():
            raise InvalidTypeException(f"{field_name} must contain only digits")

        number = int(value)

        if number < 1:
            raise InvalidNumericValueException(f"{field_name} must be a positive integer")

        return number

    # ---------------------------------------------------
    # CREATE
    # ---------------------------------------------------
    @staticmethod
    def create_report(data):

        # Validar DTO
        try:
            dto = CreatePatientVariantReportDTO(data)
        except ValueError as ve:
            raise BadRequestException(ve.args[0])

        # Validar patient_id
        patient_id = PatientVariantReportService.validate_positive_int(dto.patient_id, "patient_id")

        # Verificar existencia del paciente en NestJS
        patient = ClinicServiceClient.get_patient_by_id(patient_id)
        if patient is None:
            raise NotFoundException("Patient not found in clinical service")

        # Validar variant_id
        variant_id = PatientVariantReportService.validate_positive_int(dto.variant_id, "variant_id")

        try:
            variant = GeneticVariant.objects.get(id=variant_id)
        except GeneticVariant.DoesNotExist:
            raise NotFoundException("Variant not found")

        # Validar duplicado
        if PatientVariantReport.objects.filter(
            patient_id=patient_id,
            variant_id=variant_id,
            detection_date=dto.detection_date,
        ).exists():
            raise DuplicateResourceException("This report already exists")

        # Crear registro
        report = PatientVariantReport.objects.create(
            patient_id=patient_id,
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
    def get_report(report_id_str):

        report_id = PatientVariantReportService.validate_positive_int(report_id_str, "report_id")

        try:
            report = PatientVariantReport.objects.get(id=report_id)
        except PatientVariantReport.DoesNotExist:
            raise NotFoundException("Report not found")

        return PatientVariantReportDTO(report).to_dict()

    # ---------------------------------------------------
    # UPDATE
    # ---------------------------------------------------
    @staticmethod
    def update_report(report_id_str, data):

        report_id = PatientVariantReportService.validate_positive_int(report_id_str, "report_id")

        try:
            report = PatientVariantReport.objects.get(id=report_id)
        except PatientVariantReport.DoesNotExist:
            raise NotFoundException("Report not found")

        # Validar DTO
        try:
            dto = UpdatePatientVariantReportDTO(data)
        except ValueError as ve:
            raise BadRequestException(ve.args[0])

        # Aplicar cambios
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
    def delete_report(report_id_str):

        report_id = PatientVariantReportService.validate_positive_int(report_id_str, "report_id")

        try:
            report = PatientVariantReport.objects.get(id=report_id)
        except PatientVariantReport.DoesNotExist:
            raise NotFoundException("Report not found")

        report.delete()
        return {"message": "Report deleted successfully"}
