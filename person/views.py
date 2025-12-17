from rest_framework import viewsets
from .models import Person
from .serializers import PersonSerializers

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all().order_by("-id")
    serializer_class = PersonSerializers
