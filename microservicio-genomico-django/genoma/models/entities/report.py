from django.db import models

class PatientVariantReport(models.Model):
    id = models.BigAutoField(primary_key=True)

    # No FK real al modelo patient porque está en otro microservicio
    patient_id = models.BigIntegerField()

    variant = models.ForeignKey(
        "GeneticVariant",   # referencia segura
        on_delete=models.CASCADE,
        db_column="variant_id"
    )
    detection_date = models.DateField()
    allele_frequency = models.DecimalField(max_digits=4, decimal_places=3)

    class Meta:
        db_table = "patient_variant_report"

    def __str__(self):
        return f"Report {self.id}"
