class UpdatePatientVariantReportDTO:

    def __init__(self, data):

        # Prohibido modificar detection_date
        if "detection_date" in data:
            raise ValueError("detection_date cannot be modified")

        self.detection_date = None  # explícitamente no se usa

        self.allele_frequency = data.get("allele_frequency")

        # Validar que venga al menos un campo permitido
        if self.allele_frequency is None:
            raise ValueError("At least one field must be provided for update")

        #vValidacion de allele_frequency
        try:
            freq = float(self.allele_frequency)
        except ValueError:
            raise ValueError("allele_frequency must be a numeric value")

        if freq <= 0 or freq > 1:
            raise ValueError("allele_frequency must be a number between 0 and 1")

        self.allele_frequency = freq
