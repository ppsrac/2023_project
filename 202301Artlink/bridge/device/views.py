import json, random
import math
import requests

from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

import artwork.services as ArtworkService
import device.services
from artwork.models import Voronoipoint, Voronoiresult, Artwork
from device.models import Anchor
from device.serializers import AnchorSerializer

from exhibition.models import Exhibition
from helper.helper import rotation, get_coord, dist, center_rotation

from django.dispatch import receiver
from .signals import mtos_delete, mtos_post, stom_delete, stom_post
import paho.mqtt.publish as publish




@method_decorator(csrf_exempt, name='dispatch')
class AnchorView(View):
    def post(self, request):
        data = json.loads(request.body)
        try:
            device.services.create_anchor_by_input(data)
            return JsonResponse({'msg': 'Well created'}, status=201)
        except Exception as e:
            print(e)
            return JsonResponse({'msg': 'Failed to create'}, status=404)

    def get(self, request):
        stdout = device.services.create_output_by_anchorList(Anchor.objects.all())
        return JsonResponse({'anchorList': stdout}, status=200)


@method_decorator(csrf_exempt, name='dispatch')
class AnchorDetailView(View):
    def put(self, request, anchorid):
        try:
            data = json.loads(request.body)
            device.services.modify_anchor(anchorid, data)
        except Exception as e:
            print(e)
            raise Exception

    def delete(self, request, anchorid):
        try:
            device.services.delete_anchor(anchorid)
        except Exception as e:
            print(e)
            raise Exception


# use signal method
@receiver(mtos_post)
def post(sender, **kwargs):
    try:
        # MQTT단에서 보내준 데이터를 통한 좌표 추출
        data = json.loads(kwargs.get('data'))
        print(data, flush = True)
        deviceid = data["T"]
        data = data['L']
        R = device.services.get_coordination_by_input(deviceid, data)


        pub_topic = f'StoD/{deviceid}'
        MQTT_BROKER_HOST = 'mosquitto'
        MQTT_BROKER_PORT = 1883

        coor, exhibition = R[0], R[1]
        print(coor, exhibition, flush = True)
        count = ArtworkService.get_artwork_count(exhibition)
        print('count', count, flush = True)
        if count == 1:
            return JsonResponse({'drawingId': Artwork.objects.filter(exhibition=exhibition).first().artworkid},
                                status=200)

        # 랜덤 기울기를 가진 직선

#         artworks = Artwork.objects.filter(exhibition = exhibition)
#         id = -1
#         D = 10**8
#         x, y = coor[0], coor[1]
#         for artwork in artworks:
#             DD = (artwork.coorx - x) ** 2. + (artwork.coory - y) ** 2.
#             if DD < D:
#                 D = DD
#                 id = artwork.artworkid
#         print(id, flush = True)

        slope = math.tan((random.random() - 0.5) * math.pi)
        intersections, edges = device.services.get_intersection_with_edge_by_exhibition(exhibition)

        points = {}

        # 모든 선분들을 현재 device 위치 coor 중심으로 -slope의 기울기만큼 회전
        for intersection in intersections:
            x, y = intersection.coorx, intersection.coory
            n_coor = center_rotation([x,y], coor, slope)
            nx, ny = n_coor[0], n_coor[1]
            nx += coor[0]
            ny += coor[1]
            idx = intersection.pointid
            points[idx] = [nx, ny]


        # 선분의 한 쪽 y좌표가 0이상, 한쪽은 반드시 0 이하여야 하므로 이를 기준으로 선분과 위의 slope 기울기를 가진 직선과의 교점을 구함.
        # xx는 교점의 x좌표, area1, area2는 각각 시계방향, 반시계방향에 위치한 점의 인덱스
        res = []
        for edge in edges:
            point1, point2 = edge.point1id, edge.point2id
            area1, area2 = edge.cwartworkid, edge.ccwartworkid
            print("ID", area1, area2 , flush = True)
            artwork1, artwork2 = ArtworkService.find_artwork_by_Id(area1), ArtworkService.find_artwork_by_Id(area2)
            midpoint_x, midpoint_y = (artwork1.coorx + artwork2.coorx)/2. , (artwork1.coory + artwork2.coory)/2.
            if point1 != -1: x1, y1 = points[point1][0], points[point1][1]
            else: x1, y1 = midpoint_x, midpoint_y
            if point2 != -1: x2, y2 = points[point2][0], points[point2][1]
            else: x2, y2 = midpoint_x, midpoint_y
            print(x1, y1, x2, y2, flush = True)
            x1 -= coor[0]
            y1 -= coor[1]
            x2 -= coor[0]
            y2 -= coor[1]
            print(x1, y1, x2, y2, flush = True)
            if (y1 * y2 > 0):
                continue
            xx = 0
            if x1 == x2:
                xx = abs(x1)
            elif y1 == y2:
                xx = abs(min(x1, x2))
            else:
                k = (y2 - y1) / (x2 - x1)
                xx = abs(x1 - (y1 / k))
            res.append([xx, area1, area2])

        res.sort()  # 적어도 하나는 만나기 때문에 res[0]가 있음은 보장되어야 한다. => 만일 미술품이 오로지 한개 뿐이라면 에러.
        print(res , flush = True)
        rres = res[0]
        p1, p2 = rres[1], rres[2]
        print(p1, p2)
        print(points)
        print('Total # of points', len(points) , flush = True)
        artwork1, artwork2 = ArtworkService.find_artwork_by_Id(p1), ArtworkService.find_artwork_by_Id(p2)
        ans = p1 if dist([artwork1.coorx, artwork1.coory], coor) < dist([artwork2.coorx, artwork2.coory], coor) else p2  # 더 가까운 것의 인덱스가 ans에 저장.

        # Response 예상 : {"drawingId" : 2}
        JSON = {}
        try:
            JSON['drawingId'] = ans
            print('JSON', JSON , flush = True)
            # Spring Server에 요청을 보냄.
            spring_server_path = getattr(settings, 'SPRING_SERVER_PATH', 'None')
            target = f'/selections/devices/{deviceid}'
            print(target, flush = True)

            try:
                print(spring_server_path + target)
                response = requests.post(spring_server_path + target, json=JSON)
            except Exception as e:
                print(e)
                print('No Spring connection')
                raise Exception
            print(response.status_code)
            # Spring Server의 응답을 반환.
            if response.status_code != 200:
                return publish.single(pub_topic, 1, hostname=MQTT_BROKER_HOST, port=MQTT_BROKER_PORT)
                # return HttpResponse(status=200, content=response.content)
        except Exception as e:
            print(e)
            msg = {"msg": "No valid url"}
            # return JsonResponse(msg, status=400)
            return publish.single(pub_topic, 0, hostname=MQTT_BROKER_HOST, port=MQTT_BROKER_PORT)

            # return HttpResponse(status = 404, content = "No valid url")
    except Exception as e:
        print(e)
        # msg = {"msg": "Calculation failed"}
        # return JsonResponse(msg, status=404)
        # return HttpResponse(status = 404, content = "Calculation failed")
        return publish.single(pub_topic, 0, hostname=MQTT_BROKER_HOST, port=MQTT_BROKER_PORT)


@receiver(mtos_delete)
def delete(sender, **kwargs):
    try:
        deviceid = kwargs.get('device')
        spring_server_path = getattr(settings, 'SPRING_SERVER_PATH', 'None')
        target = f'/selections/devices/{deviceid}'

        pub_topic = f'StoD/{deviceid}'
        MQTT_BROKER_HOST = "mosquitto"
        MQTT_BROKER_PORT = 1883

        response = requests.delete(spring_server_path + target)
        if response.status_code != 200:

            # return HttpResponse(status=200, content=response.content)
            return publish.single(pub_topic, 2, hostname=MQTT_BROKER_HOST, port=MQTT_BROKER_PORT)
            
        else:
            return publish.single(pub_topic, 0, hostname=MQTT_BROKER_HOST, port=MQTT_BROKER_PORT)
            # return HttpResponse(status=404, content="Calculation failed")
    except Exception as e:
        print(e)
        # msg = {"msg": "Deletion failed"}
        # return JsonResponse(msg, status=400)
        return publish.single(pub_topic, 0, hostname=MQTT_BROKER_HOST, port=MQTT_BROKER_PORT)

