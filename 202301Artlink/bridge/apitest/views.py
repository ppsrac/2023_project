import json

from django.http import HttpResponse
from django.shortcuts import render
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt


@method_decorator(csrf_exempt, name = 'dispatch')
# Create your views here.
class TestView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            res = {"msg": f"Your request is {data.get('num')}"}
            return HttpResponse(status = 200, content = json.dumps(res))
        except Exception as e:
            print(e)
            return HttpResponse(status = 400, content = "Wrong request")
    def get(self, request):
        try:
            res = {"msg": "api test"}
            return HttpResponse(status = 200, content = json.dumps(res))
        except Exception as e:
            print(e)
            return HttpResponse(status = 400, content = "Wrong request")