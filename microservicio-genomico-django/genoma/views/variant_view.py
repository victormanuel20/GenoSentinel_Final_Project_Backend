from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

from genoma.models import GeneticVariant, Gene
from genoma.models.DTOs.variant_dto import VariantDTO
from genoma.models.DTOs.create_variant_dto import CreateVariantDTO
from genoma.models.DTOs.update_variant_dto import UpdateVariantDTO

from genoma.exceptions.not_found_exception import NotFoundException
from genoma.exceptions.bad_request_exception import BadRequestException
from genoma.exceptions.base_exception import BaseAPIException


def get_all_variants(request):
    # GET /variants/
    variants = GeneticVariant.objects.all()
    dto_list = [VariantDTO.from_model(v).to_dict() for v in variants]
    return JsonResponse(dto_list, safe=False, status=200)


def get_variant_by_id(request, variant_id):
    #GET /variants/<id>/
    try:
        variant = GeneticVariant.objects.get(id=variant_id)
    except GeneticVariant.DoesNotExist:
        raise NotFoundException("Variant not found")

    dto = VariantDTO.from_model(variant).to_dict()
    return JsonResponse(dto, status=200)


def get_variants_by_gene(request):
    # GET /variants/by-gene?gene_id=<id>
    gene_id = request.GET.get("gene_id")

    if not gene_id:
        raise BadRequestException("gene_id query parameter is required")

    try:
        Gene.objects.get(id=gene_id)
    except Gene.DoesNotExist:
        raise NotFoundException("Gene not found")

    variants = GeneticVariant.objects.filter(gene_id=gene_id)
    dto_list = [VariantDTO.from_model(v).to_dict() for v in variants]

    return JsonResponse(dto_list, safe=False, status=200)


@csrf_exempt
def create_variant(request):
    # POST /variants/create/
    if request.method != "POST":
        raise BadRequestException("Method not allowed")

    try:
        data = json.loads(request.body)
        dto = CreateVariantDTO(data)
    except ValueError as ve:
        raise BadRequestException(ve.args[0])
    except Exception:
        raise BadRequestException("Invalid JSON format")

    # validar que el gene exista
    try:
        gene = Gene.objects.get(id=dto.gene_id)
    except Gene.DoesNotExist:
        raise NotFoundException("Gene not found")

    variant = GeneticVariant.objects.create(
        gene=gene,
        chromosome=dto.chromosome,
        position=dto.position,
        reference_base=dto.reference_base,
        alternate_base=dto.alternate_base,
        impact=dto.impact,
    )

    return JsonResponse(VariantDTO.from_model(variant).to_dict(), status=201)


@csrf_exempt
def update_variant(request, variant_id):
    # PUT/variants/<id>/update/
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
    except Exception:
        raise BadRequestException("Invalid JSON format")

    #validar gene opcional
    if dto.gene_id is not None:
        try:
            variant.gene = Gene.objects.get(id=dto.gene_id)
        except Gene.DoesNotExist:
            raise NotFoundException("Gene not found")

    variant.chromosome = dto.chromosome
    variant.position = dto.position
    variant.reference_base = dto.reference_base
    variant.alternate_base = dto.alternate_base
    variant.impact = dto.impact

    variant.save()

    return JsonResponse(VariantDTO.from_model(variant).to_dict(), status=200)


@csrf_exempt
def delete_variant(request, variant_id):
    # DELETE /variants/<id>/delete/
    if request.method != "DELETE":
        raise BadRequestException("Method not allowed")

    try:
        variant = GeneticVariant.objects.get(id=variant_id)
    except GeneticVariant.DoesNotExist:
        raise NotFoundException("Variant not found")

    variant.delete()

    return JsonResponse({"message": "Variant deleted successfully"}, status=200)
