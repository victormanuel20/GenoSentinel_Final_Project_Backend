class CreatePatientVariantReportDTO:

    def __init__(self, data):
        self.patient_id = str(data.get("patient_id")) if data.get("patient_id") is not None else None
        self.variant_id = str(data.get("variant_id")) if data.get("variant_id") is not None else None

        self.detection_date = data.get("detection_date")
        self.allele_frequency = data.get("allele_frequency")

        if not self.patient_id:
            raise ValueError("patient_id is required")

        if not self.variant_id:
            raise ValueError("variant_id is required")

        if not self.detection_date:
            raise ValueError("detection_date is required")

        if self.allele_frequency is None:
            raise ValueError("allele_frequency is required")

        # Validación: 0 ≤ allele_frequency ≤ 1

        try:
            freq = float(self.allele_frequency)
        except ValueError:
            raise ValueError("allele_frequency must be a numeric value")

        if freq <= 0 or freq > 1:
            raise ValueError("allele_frequency must be a number between 0 and 1")

        # Guardamos la versión convertida
        self.allele_frequency = freq
