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