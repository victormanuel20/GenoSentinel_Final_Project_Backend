from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema

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
        responses={200: "Success"}
    )
    def list(self, request):
        result = GeneService.list_genes()
        return Response({"success": True, "data": result})

    # ------------------------------
    # RETRIEVE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Obtener un gen por ID",
        responses={200: "Success", 404: "Not found"}
    )
    def retrieve(self, request, pk=None):
        result = GeneService.get_gene(pk)
        return Response({"success": True, "data": result})

    # ------------------------------
    # SEARCH (CUSTOM)
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Buscar genes por símbolo",
        responses={200: "Success", 404: "Not found"}
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
        responses={201: "Created", 400: "Bad request"}
    )
    def create(self, request, *args, **kwargs):
        result = GeneService.create_gene(request.data)
        return Response({"success": True, "data": result}, status=201)

    # ------------------------------
    # UPDATE
    # ------------------------------
    @swagger_auto_schema(
        operation_summary="Actualizar un gen",
        responses={200: "Success", 400: "Bad request", 404: "Not found"}
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
        responses={200: "Success", 404: "Not found"}
    )
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        result = GeneService.delete_gene(str(instance.id))
        return Response({"success": True, "data": result})
