from django.http import JsonResponse
from genoma.models import Gene
from genoma.models.DTOs.gene_dto import GeneDTO


def get_all_genes(request):
    #GET /genes/
    #Devuelve la lista de todos los genes.
    genes = Gene.objects.all()

    dto_list = [GeneDTO.from_model(g).to_dict() for g in genes]

    return JsonResponse(dto_list, safe=False, status=200)


def get_gene_by_id(request, gene_id):
    #Devuelve un gen especifico
    #GET /genes/<id>/
    try:
        gene = Gene.objects.get(id=gene_id)
    except Gene.DoesNotExist:
        return JsonResponse({"error": "Gene not found"}, status=404)

    dto = GeneDTO.from_model(gene).to_dict()
    return JsonResponse(dto, status=200)


def search_gene_by_symbol(request):
    #GET /genes/search?symbol=BRCA1
    #busqueda por simbolo EXACTO o parcialmente
    symbol = request.GET.get("symbol", "")

    if symbol == "":
        return JsonResponse({"error": "Symbol query parameter is required"}, status=400)

    genes = Gene.objects.filter(symbol__icontains=symbol)

    dto_list = [GeneDTO.from_model(g).to_dict() for g in genes]

    return JsonResponse(dto_list, safe=False, status=200)
