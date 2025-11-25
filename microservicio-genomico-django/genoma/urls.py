from django.urls import path, include
from rest_framework.routers import DefaultRouter

from genoma.views.patient_variant_report_view import PatientVariantReportViewSet
from genoma.views.gene_view import GeneViewSet
from genoma.views.variant_view import VariantViewSet

router = DefaultRouter()

router.register(r'genes', GeneViewSet, basename="genes")
router.register(r'variants', VariantViewSet, basename="variants")
router.register(r'patient-reports', PatientVariantReportViewSet, basename="patient-reports")

urlpatterns = [
    path("", include(router.urls)),
]
