class UpdateVariantDTO:

    def __init__(self, data):
        self.chromosome = data.get("chromosome")
        self.position = data.get("position")
        self.reference_base = data.get("reference_base")
        self.alternate_base = data.get("alternate_base")
        self.impact = data.get("impact")

        self.validate()

    def validate(self):
        errors = {}

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
