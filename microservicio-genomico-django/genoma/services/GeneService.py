from genoma.models import Gene
from genoma.models.DTOs.gene.gene_out_dto import GeneDTO
from genoma.models.DTOs.gene.create_gene_in_dto import CreateGeneDTO
from genoma.models.DTOs.gene.update_gene_in_dto import UpdateGeneDTO

from genoma.exceptions.not_found_exception import NotFoundException
from genoma.exceptions.bad_request_exception import BadRequestException
from genoma.exceptions.invalid_numeric_value_exception import InvalidNumericValueException
from genoma.exceptions.invalid_type_exception import InvalidTypeException
from genoma.exceptions.duplicate_resource_exception import DuplicateResourceException
from genoma.exceptions.no_results_exception import NoResultsException


class GeneService:

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
    def list_genes():
        genes = Gene.objects.all()
        return [GeneDTO.from_model(g).to_dict() for g in genes]

    # ------------------------------
    # RETRIEVE
    # ------------------------------
    @staticmethod
    def get_gene(gene_id_str):

        gene_id = GeneService.validate_positive_int(gene_id_str, "gene_id")

        try:
            gene = Gene.objects.get(id=gene_id)
        except Gene.DoesNotExist:
            raise NotFoundException("Gene not found")

        return GeneDTO.from_model(gene).to_dict()

    # ------------------------------
    # CREATE
    # ------------------------------
    @staticmethod
    def create_gene(data):

        try:
            dto = CreateGeneDTO(data)
        except ValueError as ve:
            raise BadRequestException(ve.args[0])

        if Gene.objects.filter(symbol=dto.symbol).exists():
            raise DuplicateResourceException("A gene with this symbol already exists")

        gene = Gene.objects.create(
            symbol=dto.symbol,
            full_name=dto.full_name,
            function_summary=dto.function_summary
        )

        return GeneDTO.from_model(gene).to_dict()

    # ------------------------------
    # UPDATE
    # ------------------------------
    @staticmethod
    def update_gene(gene_id_str, data):

        gene_id = GeneService.validate_positive_int(gene_id_str, "gene_id")

        try:
            gene = Gene.objects.get(id=gene_id)
        except Gene.DoesNotExist:
            raise NotFoundException("Gene not found")

        try:
            dto = UpdateGeneDTO(data)
        except ValueError as ve:
            raise BadRequestException(ve.args[0])

        if Gene.objects.filter(symbol=dto.symbol).exclude(id=gene_id).exists():
            raise DuplicateResourceException("A gene with this symbol already exists")

        gene.symbol = dto.symbol
        gene.full_name = dto.full_name
        gene.function_summary = dto.function_summary
        gene.save()

        return GeneDTO.from_model(gene).to_dict()

    # ------------------------------
    # DELETE
    # ------------------------------
    @staticmethod
    def delete_gene(gene_id_str):

        gene_id = GeneService.validate_positive_int(gene_id_str, "gene_id")

        try:
            gene = Gene.objects.get(id=gene_id)
        except Gene.DoesNotExist:
            raise NotFoundException("Gene not found")

        gene.delete()
        return {"message": "Gene deleted successfully"}
    # ------------------------------
    # SEARCH
    # ------------------------------
    @staticmethod
    def search_gene_by_symbol(symbol):

        if not symbol or symbol.strip() == "":
            raise BadRequestException("symbol query parameter is required")

        genes = Gene.objects.filter(symbol__icontains=symbol)

        if not genes.exists():
            raise NoResultsException("No genes found for this symbol")

        return [GeneDTO.from_model(g).to_dict() for g in genes]
