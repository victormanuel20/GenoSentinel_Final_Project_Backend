class PatientVariantReportDTO:

    def __init__(self, report):
        self.id = str(report.id)
        self.patient_id = str(report.patient_id)
        self.variant = {
            "id": report.variant.id,
            "chromosome": report.variant.chromosome,
            "position": report.variant.position,
            "referenceBase": report.variant.reference_base,
            "alternateBase": report.variant.alternate_base,
            "impact": report.variant.impact,
        }
        self.detection_date = report.detection_date
        self.allele_frequency = float(report.allele_frequency)

    def to_dict(self):
        return {
            "id": self.id,
            "patientId": self.patient_id,
            "variant": self.variant,
            "detectionDate": str(self.detection_date),
            "alleleFrequency": self.allele_frequency
        }
