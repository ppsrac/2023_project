import json

from rest_framework import serializers

from artwork import models
from device.models import Anchor
from exhibition.models import Exhibition


class AnchorSerializer(serializers.Serializer):
    anchorid = serializers.IntegerField()
    coorx = serializers.FloatField()
    coory = serializers.FloatField()
    exhibition = serializers.IntegerField()

    def to_representation(self, instance):
        print(instance)
        data = {}
        attr = ['anchorid', 'coorx', 'coory', 'exhibition']
        for att in attr:
            data[att] = getattr(instance, att)
        data['exhibition'] = data['exhibition'].exhibitionid
        return data


    def create(self, validated_data):
        exhibition_id = validated_data.get('exhibition')
        try:
            exhibition = Exhibition.objects.get(exhibitionid=exhibition_id)
            validated_data['exhibition'] = exhibition
            print(validated_data)
            Anchor.objects.create(**validated_data)
        except Exception as e:
            print(e)
            raise serializers.ValidationError('Exhibition does not exist')