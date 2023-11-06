from django.db import models

# Create your models here.
class Exhibition(models.Model):
    exhibitionid = models.IntegerField(unique = True)

    class Meta:
        db_table = 'exhibition'