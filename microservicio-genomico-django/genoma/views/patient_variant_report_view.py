from rest_framework import viewsets
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from genoma.models.serializers.patient_variant_report_serializer import PatientVariantReportSerializer
from genoma.services.PatientVariantReportService import PatientVariantReportService


class PatientVariantReportViewSet(viewsets.ModelViewSet):

    serializer_class = PatientVariantReportSerializer
    queryset = []  # DRF lo exige, pero no lo usamos

    @swagger_auto_schema(
        operation_summary="Obtener todos los reportes de variantes del paciente",
        responses={200: "Success"}
    )
    def list(self, request):
        result = PatientVariantReportService.list_reports()
        return Response({"success": True, "data": result})

    @swagger_auto_schema(
        operation_summary="Obtener un reporte específico",
        responses={200: "Success", 404: "Report not found"}
    )
    def retrieve(self, request, pk=None):
        result = PatientVariantReportService.get_report(pk)
        return Response({"success": True, "data": result})

    @swagger_auto_schema(
        operation_summary="Crear un reporte de variante del paciente",
        responses={201: "Created", 400: "Bad request", 404: "Variant not found"}
    )
    def create(self, request, *args, **kwargs):
        result = PatientVariantReportService.create_report(request.data)
        return Response({"success": True, "data": result}, status=201)

    @swagger_auto_schema(
        operation_summary="Actualizar un reporte",
        responses={200: "Success", 400: "Bad request", 404: "Report not found"}
    )
    def update(self, request, *args, **kwargs):
        result = PatientVariantReportService.update_report(kwargs["pk"], request.data)
        return Response({"success": True, "data": result})

    @swagger_auto_schema(
        operation_summary="Eliminar un reporte",
        responses={200: "Success", 404: "Report not found"}
    )
    def destroy(self, request, *args, **kwargs):
        result = PatientVariantReportService.delete_report(kwargs["pk"])
        return Response({"success": True, "data": result})
