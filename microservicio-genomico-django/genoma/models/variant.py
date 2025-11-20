from django.db import models

class GeneticVariant(models.Model):
    id = models.BigAutoField(primary_key=True)
    gene = models.ForeignKey(
        "Gene",  # referencia por nombre del modelo → evita import circular
        on_delete=models.CASCADE,
        db_column="gene_id"
    )
    chromosome = models.CharField(max_length=10)
    position = models.IntegerField()
    reference_base = models.CharField(max_length=1)
    alternate_base = models.CharField(max_length=1)
    impact = models.CharField(max_length=20)

    class Meta:
        db_table = "genetic_variant"

    def __str__(self):
        return f"{self.gene.symbol} {self.chromosome}:{self.position}"
