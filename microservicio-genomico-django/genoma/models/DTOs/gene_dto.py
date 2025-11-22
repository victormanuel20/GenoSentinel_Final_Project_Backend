# convierte la entidad Gene en un objeto DTO

class GeneDTO:
    # Constructor que define que campos va a llevar el DTO
    def __init__(self, id, symbol, full_name, function_summary):
        self.id = id
        self.symbol = symbol
        self.full_name = full_name
        self.function_summary = function_summary

    @staticmethod
    def from_model(gene):
        #Crea el DTO a partir del modelo Gene
        return GeneDTO(
            id=gene.id,
            symbol=gene.symbol,
            full_name=gene.full_name,
            function_summary=gene.function_summary
        )

    def to_dict(self):
        #Convierte el DTO en un diccionario JSON.
        return {
            "id": self.id,
            "symbol": self.symbol,
            "full_name": self.full_name,
            "function_summary": self.function_summary,
        }
