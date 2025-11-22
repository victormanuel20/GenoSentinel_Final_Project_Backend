from django.urls import path
from genoma.views.gene_view import (
    get_all_genes,
    get_gene_by_id,
    search_gene_by_symbol,
    create_gene,
    update_gene,
    delete_gene,
)

urlpatterns = [
    path("genes/", get_all_genes, name="get_all_genes"),
    path("genes/search/", search_gene_by_symbol, name="search_gene_by_symbol"),
    path("genes/<int:gene_id>/", get_gene_by_id, name="get_gene_by_id"),

    path("genes/create/", create_gene, name="create_gene"),
    path("genes/<int:gene_id>/update/", update_gene, name="update_gene"),
    path("genes/<int:gene_id>/delete/", delete_gene, name="delete_gene"),
]
