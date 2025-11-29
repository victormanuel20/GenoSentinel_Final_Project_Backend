class CreateGeneDTO:

    #Valida que el cuerpo del request tenga los campos necesarios
    def __init__(self, data):
        self.symbol = data.get("symbol")
        self.full_name = data.get("full_name")
        self.function_summary = data.get("function_summary")

        self.validate()

    def validate(self):
        errors = {}

        if not self.symbol or self.symbol.strip() == "":
            errors["symbol"] = "Symbol is required."

        if not self.full_name or self.full_name.strip() == "":
            errors["full_name"] = "Full name is required."

        if not self.function_summary or self.function_summary.strip() == "":
            errors["function_summary"] = "Function summary is required."

        if errors:
            raise ValueError(errors)
