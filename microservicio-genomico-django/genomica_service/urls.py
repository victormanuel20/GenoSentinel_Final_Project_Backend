from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # APIs del microservicio genómico
    path("api/", include("genoma.urls")),
]
