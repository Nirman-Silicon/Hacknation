from django.http import JsonResponse
# from ....index import test_takeoff

def arm(request):
    print("drone armed")
    # test_takeoff()

    print(request)
    return JsonResponse("motors started", safe=False)