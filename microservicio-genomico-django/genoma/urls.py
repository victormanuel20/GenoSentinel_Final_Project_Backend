from django.urls import path

from genoma.views.gene_view import (
    get_all_genes,
    get_gene_by_id,
    search_gene_by_symbol,
    create_gene,
    update_gene,
    delete_gene,
)

from genoma.views.variant_view import (
    get_all_variants,
    get_variant_by_id,
    create_variant,
    update_variant,
    delete_variant
)

urlpatterns = [

    # GENES
    path("genes/", get_all_genes, name="get_all_genes"),
    path("genes/search/", search_gene_by_symbol, name="search_gene_by_symbol"),
    path("genes/<int:gene_id>/", get_gene_by_id, name="get_gene_by_id"),
    path("genes/create/", create_gene, name="create_gene"),
    path("genes/<int:gene_id>/update/", update_gene, name="update_gene"),
    path("genes/<int:gene_id>/delete/", delete_gene, name="delete_gene"),

    # VARIANTS
    path("variants/", get_all_variants, name="get_all_variants"),
    path("variants/<int:variant_id>/", get_variant_by_id, name="get_variant_by_id"),
    path("variants/create/", create_variant, name="create_variant"),
    path("variants/<int:variant_id>/update/", update_variant, name="update_variant"),
    path("variants/<int:variant_id>/delete/", delete_variant, name="delete_variant"),
]

