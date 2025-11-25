class CreatePatientVariantReportDTO:

    def __init__(self, data):
        self.patient_id = data.get("patientId")
        self.variant_id = data.get("variantId")
        self.detection_date = data.get("detectionDate")
        self.allele_frequency = data.get("alleleFrequency")

        if not self.patient_id:
            raise ValueError("patientId is required")
        if not self.variant_id:
            raise ValueError("variantId is required")
        if not self.detection_date:
            raise ValueError("detectionDate is required")
        if not self.allele_frequency:
            raise ValueError("alleleFrequency is required")
