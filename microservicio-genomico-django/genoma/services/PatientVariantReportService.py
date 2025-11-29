from genoma.gateway.clinic_service_client import ClinicServiceClient
from genoma.models import PatientVariantReport, GeneticVariant
from genoma.models.DTOs.patient_variant_report.create_patient_variant_report_in_dto import CreatePatientVariantReportDTO
from genoma.models.DTOs.patient_variant_report.update_patient_variant_report_in_dto import UpdatePatientVariantReportDTO
from genoma.models.DTOs.patient_variant_report.patient_variant_report_out_dto import PatientVariantReportDTO

from genoma.exceptions.not_found_exception import NotFoundException
from genoma.exceptions.bad_request_exception import BadRequestException
from genoma.exceptions.invalid_numeric_value_exception import InvalidNumericValueException
from genoma.exceptions.invalid_type_exception import InvalidTypeException
from genoma.exceptions.duplicate_resource_exception import DuplicateResourceException


class PatientVariantReportService:

    # ---------------------------------------------------
    # VALIDACIÓN CENTRALIZADA
    # ---------------------------------------------------
    @staticmethod
    def validate_positive_int(value, field_name):
        value_str = str(value)

        if not value_str.isdigit():
            raise InvalidTypeException(f"{field_name} must contain only digits")

        number = int(value_str)

        if number < 1:
            raise InvalidNumericValueException(f"{field_name} must be a positive integer")

        return number

    # ---------------------------------------------------
    # CREATE
    # ---------------------------------------------------
    @staticmethod
    def create_report(data):

        try:
            dto = CreatePatientVariantReportDTO(data)
        except ValueError as ve:
            raise BadRequestException(ve.args[0])

        patient_id = PatientVariantReportService.validate_positive_int(dto.patient_id, "patient_id")

        patient = ClinicServiceClient.get_patient_by_id(patient_id)
        if patient is None:
            raise NotFoundException("Patient not found in clinical service")

        variant_id = PatientVariantReportService.validate_positive_int(dto.variant_id, "variant_id")

        try:
            variant = GeneticVariant.objects.get(id=variant_id)
        except GeneticVariant.DoesNotExist:
            raise NotFoundException("Variant not found")

        # Duplicado exacto
        if PatientVariantReport.objects.filter(
            patient_id=patient_id,
            variant_id=variant_id,
            detection_date=dto.detection_date,
        ).exists():
            raise DuplicateResourceException("This report already exists")

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
    # UPDATE (PUT)
    # ---------------------------------------------------
    @staticmethod
    def update_report(report_id_str, data):

        report_id = PatientVariantReportService.validate_positive_int(report_id_str, "report_id")

        try:
            report = PatientVariantReport.objects.get(id=report_id)
        except PatientVariantReport.DoesNotExist:
            raise NotFoundException("Report not found")

        try:
            dto = UpdatePatientVariantReportDTO(data)
        except ValueError as ve:
            raise BadRequestException(ve.args[0])

        #no se permite modificar detection_date

        # validacion de allele frecuency
        report.allele_frequency = dto.allele_frequency

        report.save()

        return PatientVariantReportDTO(report).to_dict()

    # ---------------------------------------------------
    # PATCH
    # ---------------------------------------------------
    @staticmethod
    def patch_report(report_id_str, data):

        report_id = PatientVariantReportService.validate_positive_int(report_id_str, "report_id")

        try:
            report = PatientVariantReport.objects.get(id=report_id)
        except PatientVariantReport.DoesNotExist:
            raise NotFoundException("Report not found")

        #Si intenta modificar detection_date no se puede
        if "detection_date" in data:
            raise BadRequestException("detection_date cannot be modified")

        # Si viene allele_frequency, validarlo con el DTO
        if "allele_frequency" in data:

            try:
                dto = UpdatePatientVariantReportDTO(data)
            except ValueError as ve:
                raise BadRequestException(ve.args[0])

            report.allele_frequency = dto.allele_frequency

        # Guardar
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
