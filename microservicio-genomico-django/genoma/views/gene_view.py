from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from genoma.models import Gene
from genoma.models.DTOs.gene_dto import GeneDTO
from genoma.models.DTOs.create_gene_dto import CreateGeneDTO
from genoma.models.DTOs.update_gene_dto import UpdateGeneDTO

# Excepciones personalizadas
from genoma.exceptions.not_found_exception import NotFoundException
from genoma.exceptions.bad_request_exception import BadRequestException
from genoma.exceptions.base_exception import BaseAPIException


def get_all_genes(request):
    # GET /genes/
    # Devuelve la lista de todos los genes.
    genes = Gene.objects.all()

    dto_list = [GeneDTO.from_model(g).to_dict() for g in genes]

    return JsonResponse(dto_list, safe=False, status=200)


def get_gene_by_id(request, gene_id):
    # GET /genes/<id>/
    # Devuelve un gen específico.
    try:
        gene = Gene.objects.get(id=gene_id)
    except Gene.DoesNotExist:
        raise NotFoundException("Gene not found")

    dto = GeneDTO.from_model(gene).to_dict()
    return JsonResponse(dto, status=200)


def search_gene_by_symbol(request):
    # GET /genes/search?symbol=BRCA1
    # Búsqueda por símbolo EXACTO o parcialmente.
    symbol = request.GET.get("symbol", "")

    if symbol == "":
        raise BadRequestException("Symbol query parameter is required")

    genes = Gene.objects.filter(symbol__icontains=symbol)

    dto_list = [GeneDTO.from_model(g).to_dict() for g in genes]

    return JsonResponse(dto_list, safe=False, status=200)


@csrf_exempt
def create_gene(request):
    # POST /genes/
    # Crea un nuevo gen.
    if request.method != "POST":
        raise BadRequestException("Method not allowed")

    try:
        data = json.loads(request.body)
        dto = CreateGeneDTO(data)
    except ValueError as ve:
        raise BadRequestException(ve.args[0])
    except Exception:
        raise BadRequestException("Invalid JSON format")

    gene = Gene.objects.create(
        symbol=dto.symbol,
        full_name=dto.full_name,
        function_summary=dto.function_summary
    )

    return JsonResponse(GeneDTO.from_model(gene).to_dict(), status=201)


@csrf_exempt
def update_gene(request, gene_id):
    # PUT /genes/<id>/
    # Actualiza un gen existente.
    if request.method != "PUT":
        raise BadRequestException("Method not allowed")

    try:
        gene = Gene.objects.get(id=gene_id)
    except Gene.DoesNotExist:
        raise NotFoundException("Gene not found")

    try:
        data = json.loads(request.body)
        dto = UpdateGeneDTO(data)
    except ValueError as ve:
        raise BadRequestException(ve.args[0])
    except Exception:
        raise BadRequestException("Invalid JSON format")

    gene.symbol = dto.symbol
    gene.full_name = dto.full_name
    gene.function_summary = dto.function_summary
    gene.save()

    return JsonResponse(GeneDTO.from_model(gene).to_dict(), status=200)


@csrf_exempt
def delete_gene(request, gene_id):
    # DELETE /genes/<id>/
    # Elimina un gen.
    if request.method != "DELETE":
        raise BadRequestException("Method not allowed")

    try:
        gene = Gene.objects.get(id=gene_id)
    except Gene.DoesNotExist:
        raise NotFoundException("Gene not found")

    gene.delete()

    return JsonResponse({"message": "Gene deleted successfully"}, status=200)
