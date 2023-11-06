from enum import unique

from django.db import models

from exhibition.models import Exhibition


# Create your models here.
class Anchor(models.Model):
    anchorid = models.IntegerField()
    coorx = models.FloatField()
    coory = models.FloatField()
    exhibition = models.ForeignKey(Exhibition, on_delete = models.CASCADE)
    class Meta:
        db_table = 'anchor'