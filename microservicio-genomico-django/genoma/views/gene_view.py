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
from genoma.exceptions.invalid_numeric_value_exception import InvalidNumericValueException
from genoma.exceptions.invalid_type_exception import InvalidTypeException


# -----------------------------------------------------------
# VALIDACIÓN CENTRALIZADA: ENTERO POSITIVO
# -----------------------------------------------------------
def validate_positive_int(value, field_name):

    # 1. Debe llegar como string
    if not isinstance(value, str):
        raise InvalidTypeException(f"{field_name} must be a numeric string")

    # 2. Intentar convertir a entero
    try:
        number = int(value)
    except ValueError:
        raise InvalidTypeException(f"{field_name} must be an integer number")

    # 3. Debe ser entero positivo
    if number < 1:
        raise InvalidNumericValueException(f"{field_name} must be a positive integer")

    return number


# -----------------------------------------------------------
# ENDPOINTS GENE
# -----------------------------------------------------------

def get_all_genes(request):
    genes = Gene.objects.all()
    dto_list = [GeneDTO.from_model(g).to_dict() for g in genes]
    return JsonResponse(dto_list, safe=False, status=200)


def get_gene_by_id(request, gene_id_str):

    gene_id = validate_positive_int(gene_id_str, "gene_id")

    try:
        gene = Gene.objects.get(id=gene_id)
    except Gene.DoesNotExist:
        raise NotFoundException("Gene not found")

    dto = GeneDTO.from_model(gene).to_dict()
    return JsonResponse(dto, status=200)


def search_gene_by_symbol(request):
    symbol = request.GET.get("symbol", "")

    if symbol == "":
        raise BadRequestException("Symbol query parameter is required")

    genes = Gene.objects.filter(symbol__icontains=symbol)
    dto_list = [GeneDTO.from_model(g).to_dict() for g in genes]

    return JsonResponse(dto_list, safe=False, status=200)


@csrf_exempt
def create_gene(request):
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
def update_gene(request, gene_id_str):

    gene_id = validate_positive_int(gene_id_str, "gene_id")

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
def delete_gene(request, gene_id_str):

    gene_id = validate_positive_int(gene_id_str, "gene_id")

    if request.method != "DELETE":
        raise BadRequestException("Method not allowed")

    try:
        gene = Gene.objects.get(id=gene_id)
    except Gene.DoesNotExist:
        raise NotFoundException("Gene not found")

    gene.delete()

    return JsonResponse({"message": "Gene deleted successfully"}, status=200)
