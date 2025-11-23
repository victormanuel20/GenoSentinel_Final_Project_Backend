from .base_exception import BaseAPIException

class DuplicateResourceException(BaseAPIException):
    status_code = 409
    default_message = "Resource already exists"
