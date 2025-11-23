from .base_exception import BaseAPIException

class InvalidTypeException(BaseAPIException):
    status_code = 400
    default_message = "Value must be numeric"

    def __init__(self, message=None):
        super().__init__(message or self.default_message)
