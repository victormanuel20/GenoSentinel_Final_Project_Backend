from rest_framework import viewsets
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema

from genoma.models import GeneticVariant
from genoma.models.serializers.variant_serializer import VariantSerializer
from genoma.services.VariantService import VariantService


class VariantViewSet(viewsets.ModelViewSet):
    serializer_class = VariantSerializer
    queryset = GeneticVariant.objects.all()

    # ------------------------------
    # LIST
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Obtener todas las variantes",
        operation_description=(
            "Retorna todas las variantes registradas.\n\n"
            "Posibles errores:\n"
            "- 500: Unexpected server error"
        ),
        responses={
            200: "Success",
            500: "Unexpected server error"
        }
    )
    def list(self, request):
        result = VariantService.list_variants()
        return Response({"success": True, "data": result})

    # ------------------------------
    # RETRIEVE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Obtener una variante por ID",
        operation_description=(
            "Obtiene una variante según su ID.\n\n"
            "Posibles errores:\n"
            "- 400: ID inválido\n"
            "- 404: Variante no encontrada\n"
            "- 500: Unexpected server error"
        ),
        responses={
            200: "Success",
            400: "Invalid ID",
            404: "Variant not found",
            500: "Unexpected server error"
        }
    )
    def retrieve(self, request, pk=None):
        result = VariantService.get_variant(pk)
        return Response({"success": True, "data": result})

    # ------------------------------
    # CREATE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Crear una variante",
        operation_description=(
            "Crea una variante genética.\n\n"
            "Posibles errores:\n"
            "- 400: Datos inválidos\n"
            "- 404: Gene not found\n"
            "- 409: La variante ya existe\n"
            "- 500: Unexpected server error"
        ),
        responses={
            201: "Created",
            400: "Bad request",
            404: "Gene not found",
            409: "Variant already exists",
            500: "Unexpected server error"
        }
    )
    def create(self, request, *args, **kwargs):
        result = VariantService.create_variant(request.data)
        return Response({"success": True, "data": result}, status=201)

    # ------------------------------
    # UPDATE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Actualizar una variante",
        operation_description=(
            "Actualiza una variante genética.\n\n"
            "Posibles errores:\n"
            "- 400: Datos inválidos o ID inválido\n"
            "- 404: Variante o gen no encontrado\n"
            "- 409: Variante duplicada\n"
            "- 500: Unexpected server error"
        ),
        responses={
            200: "Success",
            400: "Bad request / Invalid ID",
            404: "Variant or gene not found",
            409: "Duplicate variant",
            500: "Unexpected server error",
        }
    )
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        result = VariantService.update_variant(str(instance.id), request.data)
        return Response({"success": True, "data": result})

    # ------------------------------
    # DELETE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Eliminar una variante",
        operation_description=(
            "Elimina una variante genética por ID.\n\n"
            "Posibles errores:\n"
            "- 400: ID inválido\n"
            "- 404: Variante no encontrada\n"
            "- 500: Unexpected server error"
        ),
        responses={
            200: "Success",
            400: "Invalid ID",
            404: "Variant not found",
            500: "Unexpected server error"
        }
    )
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        result = VariantService.delete_variant(str(instance.id))
        return Response({"success": True, "data": result})
