from rest_framework import serializers
from genoma.models import PatientVariantReport


class PatientVariantReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientVariantReport
        fields = "__all__"
