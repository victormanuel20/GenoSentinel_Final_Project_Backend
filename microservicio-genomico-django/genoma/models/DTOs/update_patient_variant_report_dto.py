class UpdatePatientVariantReportDTO:

    def __init__(self, data):

        self.detection_date = data.get("detectionDate")
        self.allele_frequency = data.get("alleleFrequency")

        if not self.detection_date and not self.allele_frequency:
            raise ValueError("At least one field must be provided for update")
