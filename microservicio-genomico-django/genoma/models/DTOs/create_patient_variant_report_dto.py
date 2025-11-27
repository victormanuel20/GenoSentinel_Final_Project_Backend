class CreatePatientVariantReportDTO:

    def __init__(self, data):
        self.patient_id = data.get("patient_id")
        self.variant_id = data.get("variant_id")
        self.detection_date = data.get("detection_date")
        self.allele_frequency = data.get("allele_frequency")

        if not self.patient_id:
            raise ValueError("patient_id is required")
        if not self.variant_id:
            raise ValueError("variant_id is required")
        if not self.detection_date:
            raise ValueError("detection_date is required")
        if not self.allele_frequency:
            raise ValueError("allele_frequency is required")
