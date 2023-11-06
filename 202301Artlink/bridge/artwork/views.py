import json
import subprocess

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q

from artwork.models import Artwork, Voronoipoint, Voronoiresult
from artwork.serializers import ArtworkSerializer

from exhibition.models import Exhibition
import exhibition.services as ExhibitionServices
import artwork.services as ArtworkServices


@method_decorator(csrf_exempt, name = 'dispatch')
class ArtworkView(View):
    def post(self, request):
        # 미술품의 좌표, 번호, 전시회 id만 받아 DB 추가
        data = json.loads(request.body)
        print(data)
        try:
            #미술품 저장.
            Artwork.objects.create(artworkid = data['artworkid'],
                                   exhibition = ExhibitionServices.find_by_Id(data['exhibitionid']),
                                   coorx = data['coorx'],
                                   coory = data['coory'])

            #Voronoi diagram을 뽑는 과정
            exhibition = ExhibitionServices.find_by_Id(data['exhibitionid'])
            artworks = Artwork.objects.filter(exhibition = exhibition)

            #Voronoi diagram 돌리기 요청.
            if ArtworkServices.getVoronoi(exhibition):
                return JsonResponse({'msg':'ok'}, status = 201)
        except Exception as e:
            print(e)
            return JsonResponse({'msg': 'fail'}, status = 404)

    def get(self, request):
        #모든 Artwork 조회
        artworks = Artwork.objects.all()
        content = {'artworkList': ArtworkServices.artwork_serializing(artworks)}
        return JsonResponse(content, status = 200)

    def put(self, request): # 미술품 좌표 수정.
        data = json.loads(request.body)

        artwork = ArtworkServices.find_artwork_by_Id(data['artworkid'])
        ArtworkServices.put_artwork(artwork, coorx = data['coorx'], coory = data['coory'])
        artwork.save()

        try:
            # Voronoi diagram을 뽑는 과정
            exhibition = ExhibitionServices.find_by_Id(data['exhibitionid'])
            artworks = ArtworkServices.find_artwork_by_exhibition(exhibition)

            # Voronoi diagram 돌리기 요청.
            if ArtworkServices.getVoronoi(exhibition):
                return JsonResponse({'msg': 'ok'}, status = 200)
        except Exception as e:
            print(e)
            return JsonResponse({'msg': 'fail'}, status = 404)

@method_decorator(csrf_exempt, name = "dispatch")
class ArtworkDetailView(View):
    def delete(self, request, artworkid):
        artwork = ArtworkServices.find_artwork_by_Id(artworkid)
        exhibition = artwork.exhibition
        ArtworkServices.delete_artwork_by_Id(artworkid)
        try:
            artworks = ArtworkServices.find_artwork_by_exhibition(exhibition)

            # Voronoi diagram 돌리기 요청.
            if ArtworkServices.getVoronoi(exhibition):
                return JsonResponse({'msg': 'ok'}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'msg': 'fail'}, status=404)

@method_decorator(csrf_exempt, name = 'dispatch')
class getNearbyArtwork(View):
    def get(self, request, artworkid):
        try:
            artwork = ArtworkServices.find_artwork_by_Id(artworkid)
            exhibition = artwork.exhibition
            count = ArtworkServices.get_artwork_count(exhibition)
            if count <= 1:
                return JsonResponse({'nearby': []}, status = 200)
            elif count == 2:
                other_artwork = ArtworkServices.get_other_artwork(artworkid)
                return JsonResponse({'nearby':[other_artwork.artworkid]}, status=200)
            result = Voronoiresult.objects.filter(Q(cwartworkid = artworkid) | Q(ccwartworkid = artworkid))
            nearby = []
            for line in result:
                if line.cwartworkid == artworkid:
                    nearby.append(line.ccwartworkid)
                else:
                    nearby.append(line.cwartworkid)
            res = {
                'nearby': nearby
            }
            return HttpResponse(status = 200, content = json.dumps(res))
        except Exception as e:
            print(e)
            return HttpResponse(status = 500, content = "Calculation failed")
