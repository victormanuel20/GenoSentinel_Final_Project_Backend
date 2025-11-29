from genoma.models import GeneticVariant, Gene
from genoma.models.DTOs.variant.variant_out_dto import VariantDTO
from genoma.models.DTOs.variant.create_variant_in_dto import CreateVariantDTO
from genoma.models.DTOs.variant.update_variant_in_dto import UpdateVariantDTO

from genoma.exceptions.not_found_exception import NotFoundException
from genoma.exceptions.bad_request_exception import BadRequestException
from genoma.exceptions.invalid_numeric_value_exception import InvalidNumericValueException
from genoma.exceptions.invalid_type_exception import InvalidTypeException
from genoma.exceptions.duplicate_resource_exception import DuplicateResourceException


class VariantService:

    # ------------------------------
    # VALIDACIÓN CENTRALIZADA
    # ------------------------------
    @staticmethod
    def validate_positive_int(value, field_name):

        if not isinstance(value, str):
            raise InvalidTypeException(f"{field_name} must be a numeric string")

        if not value.isdigit():
            raise InvalidTypeException(f"{field_name} must contain only digits")

        number = int(value)

        if number < 1:
            raise InvalidNumericValueException(f"{field_name} must be a positive integer")

        return number

    # ------------------------------
    # LIST
    # ------------------------------
    @staticmethod
    def list_variants():
        variants = GeneticVariant.objects.all()
        return [VariantDTO.from_model(v).to_dict() for v in variants]

    # ------------------------------
    # RETRIEVE
    # ------------------------------
    @staticmethod
    def get_variant(variant_id_str):

        variant_id = VariantService.validate_positive_int(variant_id_str, "variant_id")

        try:
            variant = GeneticVariant.objects.get(id=variant_id)
        except GeneticVariant.DoesNotExist:
            raise NotFoundException("Variant not found")

        return VariantDTO.from_model(variant).to_dict()

    # ------------------------------
    # CREATE
    # ------------------------------
    @staticmethod
    def create_variant(data):

        try:
            dto = CreateVariantDTO(data)
        except ValueError as ve:
            raise BadRequestException(ve.args[0])

        gene_id = VariantService.validate_positive_int(dto.gene_id, "gene_id")

        try:
            gene = Gene.objects.get(id=gene_id)
        except Gene.DoesNotExist:
            raise NotFoundException("Gene not found")

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

        return VariantDTO.from_model(variant).to_dict()

    # ------------------------------
    # UPDATE (PUT)
    # ------------------------------
    @staticmethod
    def update_variant(variant_id_str, data):

        variant_id = VariantService.validate_positive_int(variant_id_str, "variant_id")

        try:
            variant = GeneticVariant.objects.get(id=variant_id)
        except GeneticVariant.DoesNotExist:
            raise NotFoundException("Variant not found")

        try:
            dto = UpdateVariantDTO(data)
        except ValueError as ve:
            raise BadRequestException(ve.args[0])

        if dto.gene_id is not None:
            gene_id = VariantService.validate_positive_int(dto.gene_id, "gene_id")

            try:
                variant.gene = Gene.objects.get(id=gene_id)
            except Gene.DoesNotExist:
                raise NotFoundException("Gene not found")

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

        return VariantDTO.from_model(variant).to_dict()

    # ------------------------------
    # PATCH (nuevo)
    # ------------------------------
    @staticmethod
    def patch_variant(variant_id_str, data):

        variant_id = VariantService.validate_positive_int(variant_id_str, "variant_id")

        try:
            variant = GeneticVariant.objects.get(id=variant_id)
        except GeneticVariant.DoesNotExist:
            raise NotFoundException("Variant not found")

        # Obtener valores actuales si no se envían
        gene_id_raw = data.get("gene_id")
        chromosome = data.get("chromosome", variant.chromosome)
        position = data.get("position", variant.position)
        reference_base = data.get("reference_base", variant.reference_base)
        alternate_base = data.get("alternate_base", variant.alternate_base)
        impact = data.get("impact", variant.impact)

        # Si se envía gene_id, validarlo y asignarlo
        if gene_id_raw is not None:
            gene_id = VariantService.validate_positive_int(str(gene_id_raw), "gene_id")
            try:
                variant.gene = Gene.objects.get(id=gene_id)
            except Gene.DoesNotExist:
                raise NotFoundException("Gene not found")

        # Validar duplicado
        if GeneticVariant.objects.filter(
            gene_id=variant.gene_id,
            chromosome=chromosome,
            position=position,
            reference_base=reference_base,
            alternate_base=alternate_base
        ).exclude(id=variant_id).exists():
            raise DuplicateResourceException("This variant already exists")

        # Guardar cambios
        variant.chromosome = chromosome
        variant.position = position
        variant.reference_base = reference_base
        variant.alternate_base = alternate_base
        variant.impact = impact
        variant.save()

        return VariantDTO.from_model(variant).to_dict()

    # ------------------------------
    # DELETE
    # ------------------------------
    @staticmethod
    def delete_variant(variant_id_str):

        variant_id = VariantService.validate_positive_int(variant_id_str, "variant_id")

        try:
            variant = GeneticVariant.objects.get(id=variant_id)
        except GeneticVariant.DoesNotExist:
            raise NotFoundException("Variant not found")

        variant.delete()
        return {"message": "Variant deleted successfully"}
