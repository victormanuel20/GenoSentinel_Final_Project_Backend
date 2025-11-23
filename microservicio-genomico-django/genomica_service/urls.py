from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from drf_yasg.views import get_schema_view as get_swagger_view
from drf_yasg import openapi
from rest_framework import permissions

# -------------------------
# Swagger Schema Definition
# -------------------------
schema_view = get_swagger_view(
    openapi.Info(
        title="Genomic Microservice API",
        default_version="v1",
        description="API documentation for the genomic microservice",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),

    # Swagger / OpenAPI
    path("swagger/", schema_view.with_ui('swagger', cache_timeout=0), name="swagger-ui"),
    path("redoc/", schema_view.with_ui('redoc', cache_timeout=0), name="redoc-ui"),
    path("openapi.json", schema_view.without_ui(cache_timeout=0), name="schema-json"),

    # APIs del microservicio genómico
    path("api/", include("genoma.urls")),
]
