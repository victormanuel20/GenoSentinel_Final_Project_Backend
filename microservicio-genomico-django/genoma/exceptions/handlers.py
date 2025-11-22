from django.http import JsonResponse
from .base_exception import BaseAPIException

class APIExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # simplemente deja pasar la request
        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):

        if isinstance(exception, BaseAPIException):
            return JsonResponse(
                {"error": exception.message},
                status=exception.status_code
            )

        # exceptions inesperadas
        return JsonResponse(
            {"error": "Unexpected server error"},
            status=500
        )
