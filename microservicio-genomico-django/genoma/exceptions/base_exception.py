class BaseAPIException(Exception):
    status_code = 500
    default_message = "Internal server error"

    def __init__(self, message=None, status_code=None):
        self.message = message or self.default_message

        super().__init__(self.message)

        if status_code is not None:
            self.status_code = status_code
