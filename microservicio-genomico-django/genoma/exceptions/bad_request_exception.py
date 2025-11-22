from .base_exception import BaseAPIException

class BadRequestException(BaseAPIException):
    status_code = 400
    default_message = "Bad request"
