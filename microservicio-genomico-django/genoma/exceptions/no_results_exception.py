from .base_exception import BaseAPIException

class NoResultsException(BaseAPIException):
    status_code = 404
    default_message = "No results found"
