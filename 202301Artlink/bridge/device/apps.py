from django.apps import AppConfig
from django.conf import settings

import paho.mqtt.client as mqtt
import paho.mqtt.publish as publish
import threading
import json

from .signals import mtos_post, mtos_delete


class DeviceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'device'

    MQTT_BROKER_HOST = "mosquitto"
    MQTT_BROKER_PORT = 1883
    MAX_ANCHOR = 3
    PUB_TOPIC = "StoD"
    SUB_TOPIC = "DtoS"

    def on_message(self, client, userdata, message):
        payload = message.payload.decode()
        data = json.loads(payload)
        
        event = data["E"]
        device_id = data["T"]
        pub_topic = self.PUB_TOPIC + "/" + device_id
        print("your message : ", data)
        print("Pub topic : ", pub_topic)
        if event == "R":
            pub_json = dict()
            pub_json["T"] = device_id
            cnt = pub_json["LC"] = int(data["LC"])
            if not cnt >= 3:
                res = 0  # redLED
                publish.single(pub_topic, res, hostname=self.MQTT_BROKER_HOST, port=self.MQTT_BROKER_PORT)
                return
            cnt = min(cnt, self.MAX_ANCHOR)
            child_lst = [None for _ in range(cnt)]
            for i in range(cnt):
                child_lst[i] = {"A": int(data["L"][i]["A"]), "R": float(data["L"][i]["R"])}
            pub_json["L"] = child_lst
            mtos_post.send(sender=self, data=json.dumps(pub_json))

        elif event == "D":
            mtos_delete.send(sender=self, device=device_id)

    def on_connect(self, client, userdata, flags, rc):
        print("Connected with result code " + str(rc))
        client.subscribe(self.SUB_TOPIC)

    def on_disconnect(self, client, userdata, rc):
        print("Disconnected with result code " + str(rc))

    def connect_mqtt(self):
        self.mqtt_client = mqtt.Client()
        self.mqtt_client.on_connect = self.on_connect
        self.mqtt_client.on_message = self.on_message
        self.mqtt_client.on_disconnect = self.on_disconnect
        self.mqtt_client.connect(self.MQTT_BROKER_HOST, self.MQTT_BROKER_PORT, 60)

        self.mqtt_client.loop_start()

    def ready(self):
        import device.signals
        t = threading.Thread(target=self.connect_mqtt)
        t.start()
