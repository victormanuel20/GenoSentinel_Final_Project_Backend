from django.db import models


class Gene(models.Model):
    id = models.BigAutoField(primary_key=True)
    symbol = models.CharField(max_length=50)
    full_name = models.CharField(max_length=200)
    function_summary = models.TextField()

    class Meta:
        db_table = "gene"

    def __str__(self):
        return self.symbol


class GeneticVariant(models.Model):
    id = models.BigAutoField(primary_key=True)
    gene = models.ForeignKey(Gene, on_delete=models.CASCADE, db_column="gene_id")
    chromosome = models.CharField(max_length=10)
    position = models.IntegerField()
    reference_base = models.CharField(max_length=1)
    alternate_base = models.CharField(max_length=1)
    impact = models.CharField(max_length=20)

    class Meta:
        db_table = "genetic_variant"

    def __str__(self):
        return f"{self.gene.symbol} {self.chromosome}:{self.position}"


class PatientVariantReport(models.Model):
    id = models.BigAutoField(primary_key=True)
    patient_id = models.BigIntegerField()  # Solo el ID del paciente, sin FK real
    variant = models.ForeignKey(GeneticVariant, on_delete=models.CASCADE, db_column="variant_id")
    detection_date = models.DateField()
    allele_frequency = models.DecimalField(max_digits=4, decimal_places=3)

    class Meta:
        db_table = "patient_variant_report"

    def __str__(self):
        return f"Report {self.id}"
