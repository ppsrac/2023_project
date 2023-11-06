from django.db import models

from exhibition.models import Exhibition


# Create your models here.
class Artwork(models.Model):
    artworkid = models.IntegerField()
    exhibition = models.ForeignKey(Exhibition, on_delete=models.CASCADE)
    coorx = models.FloatField()
    coory = models.FloatField()
    class Meta:
        db_table = 'artwork'

class Voronoiresult(models.Model):
    exhibition = models.ForeignKey(Exhibition, on_delete=models.CASCADE)
    point1id = models.IntegerField()
    point2id = models.IntegerField()
    cwartworkid = models.IntegerField()
    ccwartworkid = models.IntegerField()
    class Meta:
        db_table = 'voronoiresult'

class Voronoipoint(models.Model):
    exhibition = models.ForeignKey(Exhibition, on_delete=models.CASCADE)
    pointid = models.IntegerField()
    coorx = models.FloatField()
    coory = models.FloatField()
    class Meta:
        db_table = 'voronoipoint'
