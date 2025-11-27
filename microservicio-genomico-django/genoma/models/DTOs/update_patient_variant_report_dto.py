class UpdatePatientVariantReportDTO:

    def __init__(self, data):

        self.detection_date = data.get("detection_date")
        self.allele_frequency = data.get("allele_frequency")

        if not self.detection_date and not self.allele_frequency:
            raise ValueError("At least one field must be provided for update")
