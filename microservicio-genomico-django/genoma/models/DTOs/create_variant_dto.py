from genoma.models import Gene

class CreateVariantDTO:

    def __init__(self, data):
        # Convertimos gene_id a string SIEMPRE
        raw_gene_id = data.get("gene_id")
        self.gene_id = str(raw_gene_id) if raw_gene_id is not None else None

        self.chromosome = data.get("chromosome")
        self.position = data.get("position")
        self.reference_base = data.get("reference_base")
        self.alternate_base = data.get("alternate_base")
        self.impact = data.get("impact")

        self.validate()

    def validate(self):
        errors = {}

        # gene_id requerido
        if not self.gene_id:
            errors["gene_id"] = "Gene ID is required."
        else:
            # Debe ser dígito
            if not self.gene_id.isdigit():
                errors["gene_id"] = "gene_id must contain only digits."
            # Si es número válido, entonces verificar existencia
            else:
                if not Gene.objects.filter(id=int(self.gene_id)).exists():
                    errors["gene_id"] = "Gene with given ID does not exist."

        if not self.chromosome or self.chromosome.strip() == "":
            errors["chromosome"] = "Chromosome is required."

        if self.position is None:
            errors["position"] = "Position is required."

        if not self.reference_base:
            errors["reference_base"] = "Reference base is required."

        if not self.alternate_base:
            errors["alternate_base"] = "Alternate base is required."

        if not self.impact:
            errors["impact"] = "Impact is required."

        if errors:
            raise ValueError(errors)
