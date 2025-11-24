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
        responses={200: "Success"}
    )
    def list(self, request):
        result = VariantService.list_variants()
        return Response({"success": True, "data": result})

    # ------------------------------
    # RETRIEVE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Obtener una variante por ID",
        responses={200: "Success", 404: "Not found"}
    )
    def retrieve(self, request, pk=None):
        result = VariantService.get_variant(pk)
        return Response({"success": True, "data": result})

    # ------------------------------
    # CREATE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Crear una variante",
        responses={201: "Created", 400: "Bad request", 404: "Gene not found"}
    )
    def create(self, request, *args, **kwargs):
        result = VariantService.create_variant(request.data)
        return Response({"success": True, "data": result}, status=201)

    # ------------------------------
    # UPDATE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Actualizar una variante",
        responses={200: "Success", 400: "Bad request", 404: "Not found"}
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
        responses={200: "Success", 404: "Not found"}
    )
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        result = VariantService.delete_variant(str(instance.id))
        return Response({"success": True, "data": result})
