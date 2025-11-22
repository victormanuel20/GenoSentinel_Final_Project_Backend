from .base_exception import BaseAPIException

class InternalErrorException(BaseAPIException):
    status_code = 500
    default_message = "Internal server error"
