from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=20)
    age = models.IntegerField()
    place = models.CharField(max_length=120, blank=True, null=True)
    image = models.ImageField(upload_to='persons/', blank=True)


    def __str__(self):
        return self.name

