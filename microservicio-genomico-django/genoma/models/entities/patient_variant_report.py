from django.db import models
from genoma.models import GeneticVariant  # ya existe

class PatientVariantReport(models.Model):
    # FOREIGN KEY to patient.id (bigint)
    patient_id = models.BigIntegerField(db_column='patient_id')

    # FOREIGN KEY to genetic_variant.id
    variant = models.ForeignKey(
        GeneticVariant,
        on_delete=models.CASCADE,
        db_column='variant_id'
    )

    detection_date = models.DateField()
    allele_frequency = models.DecimalField(max_digits=5, decimal_places=3)

    class Meta:
        managed = False
        db_table = 'patient_variant_report'
