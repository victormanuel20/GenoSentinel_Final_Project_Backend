# documentation/swagger.py

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

GLOBAL_EXCEPTIONS_DESCRIPTION = """
## Excepciones personalizadas usadas por este microservicio

### **400 – BadRequestException**
Petición inválida. Ocurre cuando faltan campos, el formato es incorrecto o el DTO no valida.

### **400 – InvalidTypeException**
Un campo que debía ser numérico fue enviado en formato incorrecto.

### **400 – InvalidNumericValueException**
Un valor numérico es inválido (por ejemplo, se esperaba un entero positivo).

### **404 – NotFoundException**
El recurso no existe.

### **404 – NoResultsException**
Se ejecutó una búsqueda y no se encontraron resultados.

### **409 – DuplicateResourceException**
El recurso que intentas crear ya existe.

### **500 – BaseAPIException / Unexpected server error**
Error no manejado por el servidor.
"""

schema_view = get_schema_view(
    openapi.Info(
        title="Genomic Service API",
        default_version="v1",
        description=(
            "Microservicio para análisis y procesamiento de datos genómicos.\n\n"
            "Este servicio expone endpoints para manejar Genes y Variantes Genéticas.\n"
            "La API utiliza un modelo de arquitectura con DTOs, Services y excepciones personalizadas.\n\n"
            + GLOBAL_EXCEPTIONS_DESCRIPTION
        ),
        terms_of_service="https://example.com/terms/",
        contact=openapi.Contact(
            name="Equipo Genoma",
            email="jacobo.arroyavep@autonoma.edu.co"
        ),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)
