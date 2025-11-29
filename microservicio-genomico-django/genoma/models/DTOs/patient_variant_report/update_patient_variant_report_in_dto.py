class UpdatePatientVariantReportDTO:

    def __init__(self, data):

        self.detection_date = data.get("detection_date")
        self.allele_frequency = data.get("allele_frequency")

        if self.detection_date is None and self.allele_frequency is None:
            raise ValueError("At least one field must be provided for update")

        # Si el cliente quiere actualizar allele_frequency lo validamos q no sea mayor a 1

        if self.allele_frequency is not None:

            try:
                freq = float(self.allele_frequency)
            except ValueError:
                raise ValueError("allele_frequency must be a numeric value")

            if freq <= 0 or freq > 1:
                raise ValueError("allele_frequency must be a number between 0 and 1")

            self.allele_frequency = freq
