from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    if response is not None:
        # check if exception has dict items
        if hasattr(exc.detail, 'items'):
            # remove the initial value
            print(exc.detail)
            
            response.data = {}
            errors = []
            for key, value in exc.detail.items():
                # append errors into the list
                errors.append("{} : {}".format(key, " ".join(value)))
            
            print(errors)
            # add property errors to the response
            response.data['errors'] = errors

        # serve status code in the response
        response.data['status_code'] = response.status_code

    return response


from django import http
from django.conf import settings

def bad_request(request, *args, **kwargs):
    
    print(request)
    return http.HttpResponseBadRequest(
        '<h1>Bad Request (400), DEUBG DATA: {}</h1>'.format(settings.ALLOWED_HOSTS),
        content_type='text/html')