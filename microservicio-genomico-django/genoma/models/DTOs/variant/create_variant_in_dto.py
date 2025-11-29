from genoma.models import Gene

class CreateVariantDTO:

    # ENUM permitido por la BD
    VALID_IMPACTS = {"Missense", "Frameshift", "Nonsense", "Synonymous", "Unknown"}

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

        # chromosome requerido
        if not self.chromosome or self.chromosome.strip() == "":
            errors["chromosome"] = "Chromosome is required."

        # position requerida
        if self.position is None:
            errors["position"] = "Position is required."

        # bases requeridas
        if not self.reference_base:
            errors["reference_base"] = "Reference base is required."

        if not self.alternate_base:
            errors["alternate_base"] = "Alternate base is required."

        # VALIDACIÓN DEL ENUM IMPACT
        if not self.impact:
            errors["impact"] = "Impact is required."
        elif self.impact not in self.VALID_IMPACTS:
            errors["impact"] = (
                f"Impact must be one of: {', '.join(self.VALID_IMPACTS)}"
            )

        if errors:
            raise ValueError(errors)
