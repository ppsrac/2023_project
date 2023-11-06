import json

from rest_framework import serializers

from artwork.models import Artwork
from exhibition.models import Exhibition

class ArtworkSerializer(serializers.Serializer):
    artworkid = serializers.IntegerField()
    coorx = serializers.FloatField()
    coory = serializers.FloatField()
    exhibition = serializers.IntegerField()

    def to_representation(self, instance):
        print(instance)
        data = {}
        attr = ['artworkid', 'coorx', 'coory', 'exhibition']
        for att in attr:
            data[att] = getattr(instance, att)
        print(data)
        data['exhibition'] = data['exhibition'].exhibitionid
        return data


    def create(self, validated_data):
        exhibition_id = validated_data.get('exhibition')
        try:
            exhibition = Exhibition.objects.get(exhibitionid=exhibition_id)
            validated_data['exhibition'] = exhibition
            print(validated_data)
            Artwork.objects.create(**validated_data)
        except Exception as e:
            print(e)
            raise serializers.ValidationError('Exhibition does not exist')
    def update(self, validated_data):
        artwork_id = validated_data.get('artworkid')
        exhibition_id = validated_data.get('exhibition')
        try:
            artwork = Artwork.objects.get(artworkid=artwork_id)
            exhibition = Exhibition.objects.get(exhibitionid=exhibition_id)
            validated_data['exhibition'] = exhibition
            print(validated_data)
            for key, value in validated_data.items():
                artwork.__setattr__(key, value)
            artwork.save()
        except Exception as e:
            print(e)
            raise serializers.ValidationError('Anchor does not exist')