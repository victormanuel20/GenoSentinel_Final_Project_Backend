from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from genoma.models import Gene
from genoma.models.serializers.gene_serializer import GeneSerializer
from genoma.services.GeneService import GeneService


class GeneViewSet(viewsets.ModelViewSet):
    serializer_class = GeneSerializer
    queryset = Gene.objects.all()

    # ------------------------------
    # LIST
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Obtener todos los genes",
        operation_description=(
            "Retorna todos los genes registrados.\n\n"
            "Posibles errores:\n"
            "- 500: Unexpected server error"
        ),
        responses={
            200: "Lista de genes obtenida correctamente",
            500: "Unexpected server error"
        }
    )
    def list(self, request):
        result = GeneService.list_genes()
        return Response({"success": True, "data": result})

    # ------------------------------
    # RETRIEVE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Obtener un gen por ID",
        operation_description=(
            "Retorna un gen según su ID.\n\n"
            "Posibles errores:\n"
            "- 400: ID no numérico (InvalidTypeException)\n"
            "- 400: ID numéricamente inválido (InvalidNumericValueException)\n"
            "- 404: Gen no encontrado (NotFoundException)\n"
            "- 500: Unexpected server error"
        ),
        responses={
            200: "Gen encontrado",
            400: "ID inválido",
            404: "Gen no encontrado",
            500: "Unexpected server error"
        }
    )
    def retrieve(self, request, pk=None):
        result = GeneService.get_gene(pk)
        return Response({"success": True, "data": result})

    # ------------------------------
    # SEARCH
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Buscar genes por símbolo",
        operation_description=(
            "Busca genes cuyo símbolo coincida parcial o totalmente.\n\n"
            "Posibles errores:\n"
            "- 400: Falta el parámetro 'symbol'\n"
            "- 404: No se encontraron resultados (NoResultsException)\n"
            "- 500: Unexpected server error"
        ),
        manual_parameters=[
            openapi.Parameter(
                name="symbol",
                in_=openapi.IN_QUERY,
                required=True,
                type=openapi.TYPE_STRING,
                description="Símbolo del gen a buscar (ej: TP53)"
            )
        ],
        responses={
            200: "Genes encontrados",
            400: "symbol es requerido",
            404: "No se encontraron genes",
            500: "Unexpected server error"
        }
    )
    @action(detail=False, methods=["get"], url_path="search")
    def search(self, request):
        symbol = request.GET.get("symbol")
        result = GeneService.search_gene_by_symbol(symbol)
        return Response({"success": True, "data": result})

    # ------------------------------
    # CREATE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Crear un gen",
        operation_description=(
            "Crea un nuevo gen basado en el cuerpo enviado.\n\n"
            "Posibles errores:\n"
            "- 400: Body inválido (BadRequestException)\n"
            "- 409: Símbolo duplicado (DuplicateResourceException)\n"
            "- 500: Unexpected server error"
        ),
        responses={
            201: "Gen creado correctamente",
            400: "Datos inválidos",
            409: "Gen duplicado",
            500: "Unexpected server error"
        }
    )
    def create(self, request, *args, **kwargs):
        result = GeneService.create_gene(request.data)
        return Response({"success": True, "data": result}, status=201)

    # ------------------------------
    # UPDATE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Actualizar un gen",
        operation_description=(
            "Actualiza un gen existente.\n\n"
            "Posibles errores:\n"
            "- 400: Datos inválidos o ID inválido\n"
            "- 404: Gen no encontrado\n"
            "- 409: Símbolo duplicado\n"
            "- 500: Unexpected server error"
        ),
        responses={
            200: "Gen actualizado",
            400: "Datos inválidos / ID inválido",
            404: "Gen no encontrado",
            409: "Símbolo duplicado",
            500: "Unexpected server error"
        }
    )
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        result = GeneService.update_gene(str(instance.id), request.data)
        return Response({"success": True, "data": result})

    # ------------------------------
    # DELETE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Eliminar un gen",
        operation_description=(
            "Elimina un gen por su ID.\n\n"
            "Posibles errores:\n"
            "- 400: ID inválido\n"
            "- 404: Gen no encontrado\n"
            "- 500: Unexpected server error"
        ),
        responses={
            200: "Gen eliminado",
            400: "ID inválido",
            404: "Gen no encontrado",
            500: "Unexpected server error"
        }
    )
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        result = GeneService.delete_gene(str(instance.id))
        return Response({"success": True, "data": result})
