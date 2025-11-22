from django.urls import path
from genoma.views.gene_view import (
    get_all_genes,
    get_gene_by_id,
    search_gene_by_symbol,
)

urlpatterns = [
    path("genes/", get_all_genes, name="get_all_genes"),
    path("genes/<int:gene_id>/", get_gene_by_id, name="get_gene_by_id"),
    path("genes/search/", search_gene_by_symbol, name="search_gene_by_symbol"),
]
