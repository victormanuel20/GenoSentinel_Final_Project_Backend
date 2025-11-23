from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from genoma.models import GeneticVariant, Gene
from genoma.models.DTOs.variant_dto import VariantDTO
from genoma.models.DTOs.create_variant_dto import CreateVariantDTO
from genoma.models.DTOs.update_variant_dto import UpdateVariantDTO

# Excepciones personalizadas
from genoma.exceptions.not_found_exception import NotFoundException
from genoma.exceptions.bad_request_exception import BadRequestException
from genoma.exceptions.invalid_numeric_value_exception import InvalidNumericValueException
from genoma.exceptions.invalid_type_exception import InvalidTypeException
from genoma.exceptions.duplicate_resource_exception import DuplicateResourceException


# -----------------------------------------------------------
# VALIDACIÓN CENTRALIZADA
# -----------------------------------------------------------
def validate_positive_int(value, field_name):

    if not isinstance(value, str):
        raise InvalidTypeException(f"{field_name} must be a numeric string")

    if not value.isdigit():
        raise InvalidTypeException(f"{field_name} must contain only digits")

    number = int(value)

    if number < 1:
        raise InvalidNumericValueException(f"{field_name} must be a positive integer")

    return number


# -----------------------------------------------------------
# ENDPOINTS
# -----------------------------------------------------------
def get_all_variants(request):
    variants = GeneticVariant.objects.all()
    dto_list = [VariantDTO.from_model(v).to_dict() for v in variants]
    return JsonResponse(dto_list, safe=False, status=200)


def get_variant_by_id(request, variant_id_str):

    variant_id = validate_positive_int(variant_id_str, "variant_id")

    try:
        variant = GeneticVariant.objects.get(id=variant_id)
    except GeneticVariant.DoesNotExist:
        raise NotFoundException("Variant not found")

    return JsonResponse(VariantDTO.from_model(variant).to_dict(), status=200)


# -----------------------------------------------------------
# CREATE
# -----------------------------------------------------------
@csrf_exempt
def create_variant(request):

    if request.method != "POST":
        raise BadRequestException("Method not allowed")

    try:
        data = json.loads(request.body)
        dto = CreateVariantDTO(data)
    except ValueError as ve:
        raise BadRequestException(ve.args[0])
    except:
        raise BadRequestException("Invalid JSON format")

    gene_id = validate_positive_int(dto.gene_id, "gene_id")

    try:
        gene = Gene.objects.get(id=gene_id)
    except Gene.DoesNotExist:
        raise NotFoundException("Gene not found")

    # --- validar duplicado ---
    if GeneticVariant.objects.filter(
        gene_id=gene_id,
        chromosome=dto.chromosome,
        position=dto.position,
        reference_base=dto.reference_base,
        alternate_base=dto.alternate_base
    ).exists():
        raise DuplicateResourceException("This variant already exists")

    variant = GeneticVariant.objects.create(
        gene=gene,
        chromosome=dto.chromosome,
        position=dto.position,
        reference_base=dto.reference_base,
        alternate_base=dto.alternate_base,
        impact=dto.impact,
    )

    return JsonResponse(VariantDTO.from_model(variant).to_dict(), status=201)


# -----------------------------------------------------------
# UPDATE
# -----------------------------------------------------------
@csrf_exempt
def update_variant(request, variant_id_str):

    variant_id = validate_positive_int(variant_id_str, "variant_id")

    if request.method != "PUT":
        raise BadRequestException("Method not allowed")

    try:
        variant = GeneticVariant.objects.get(id=variant_id)
    except GeneticVariant.DoesNotExist:
        raise NotFoundException("Variant not found")

    try:
        data = json.loads(request.body)
        dto = UpdateVariantDTO(data)
    except ValueError as ve:
        raise BadRequestException(ve.args[0])
    except:
        raise BadRequestException("Invalid JSON format")

    # Si se quiere cambiar el gene_id:
    if dto.gene_id is not None:
        gene_id = validate_positive_int(dto.gene_id, "gene_id")

        try:
            variant.gene = Gene.objects.get(id=gene_id)
        except Gene.DoesNotExist:
            raise NotFoundException("Gene not found")

    # --- validar duplicado ---
    if GeneticVariant.objects.filter(
        gene_id=variant.gene_id,
        chromosome=dto.chromosome,
        position=dto.position,
        reference_base=dto.reference_base,
        alternate_base=dto.alternate_base
    ).exclude(id=variant_id).exists():
        raise DuplicateResourceException("This variant already exists")

    variant.chromosome = dto.chromosome
    variant.position = dto.position
    variant.reference_base = dto.reference_base
    variant.alternate_base = dto.alternate_base
    variant.impact = dto.impact

    variant.save()

    return JsonResponse(VariantDTO.from_model(variant).to_dict(), status=200)


# -----------------------------------------------------------
# DELETE
# -----------------------------------------------------------
@csrf_exempt
def delete_variant(request, variant_id_str):

    variant_id = validate_positive_int(variant_id_str, "variant_id")

    if request.method != "DELETE":
        raise BadRequestException("Method not allowed")

    try:
        variant = GeneticVariant.objects.get(id=variant_id)
    except GeneticVariant.DoesNotExist:
        raise NotFoundException("Variant not found")

    variant.delete()

    return JsonResponse({"message": "Variant deleted successfully"}, status=200)
