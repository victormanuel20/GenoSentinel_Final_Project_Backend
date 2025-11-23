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
    path("genes/<str:gene_id_str>/", get_gene_by_id, name="get_gene_by_id"),
    path("genes/create/", create_gene, name="create_gene"),
    path("genes/<str:gene_id_str>/update/", update_gene, name="update_gene"),
    path("genes/<str:gene_id_str>/delete/", delete_gene, name="delete_gene"),

    # VARIANTS
    path("variants/", get_all_variants, name="get_all_variants"),
    path("variants/<str:variant_id_str>/", get_variant_by_id, name="get_variant_by_id"),
    path("variants/create/", create_variant, name="create_variant"),
    path("variants/<str:variant_id_str>/update/", update_variant, name="update_variant"),
    path("variants/<str:variant_id_str>/delete/", delete_variant, name="delete_variant"),
]
