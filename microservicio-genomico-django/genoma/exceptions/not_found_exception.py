from .base_exception import BaseAPIException

class NotFoundException(BaseAPIException):
    status_code = 404
    default_message = "Resource not found"
