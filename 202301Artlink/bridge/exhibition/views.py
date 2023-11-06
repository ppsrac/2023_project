from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import json
from exhibition.models import Exhibition
from exhibition.services import *

# Create your views here.
@method_decorator(csrf_exempt, name = 'dispatch')
class ExhibitionView(View):
    @method_decorator(csrf_exempt)
    def post(self, request):
        data = json.loads(request.body)
        print(data)
        id = data.get('id')
        try:
            create_by_Id(id)
            return HttpResponse(status=201, content = 'Exhibition created successfully')
        except Exception as e:
            print(e)
            return HttpResponse(status=404, content='It is already created.')

    def get(self, request):
        try:
            res = {'Exhibition_List' : get_all_exhibitions()}
            return JsonResponse(res, status=200)
        except:
            return JsonResponse({'msg': 'Failed to get list'}, status=404)


@method_decorator(csrf_exempt, name = 'dispatch')
class ExhibitionDetailView(View):
    @method_decorator(csrf_exempt)
    def delete(self, request, exhibitionid):
        try:
            delete_by_Id(exhibitionid)
            return JsonResponse({'msg': 'Successfully deleted'}, status = 200)
        except:
            return JsonResponse({'msg': 'Failed deletion'}, status = 404)