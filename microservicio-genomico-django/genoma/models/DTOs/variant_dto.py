class VariantDTO:
    def __init__(self, id, gene_id, chromosome, position, reference_base, alternate_base, impact):
        self.id = id
        self.gene_id = gene_id
        self.chromosome = chromosome
        self.position = position
        self.reference_base = reference_base
        self.alternate_base = alternate_base
        self.impact = impact

    @staticmethod
    def from_model(variant):
        return VariantDTO(
            id=variant.id,
            gene_id=variant.gene.id,
            chromosome=variant.chromosome,
            position=variant.position,
            reference_base=variant.reference_base,
            alternate_base=variant.alternate_base,
            impact=variant.impact
        )

    def to_dict(self):
        return {
            "id": self.id,
            "gene_id": self.gene_id,
            "chromosome": self.chromosome,
            "position": self.position,
            "reference_base": self.reference_base,
            "alternate_base": self.alternate_base,
            "impact": self.impact,
        }
