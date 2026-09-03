from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser,AllowAny

from .serializers import CategorySerializer,ProductSerializer
from .models import Category,Product
# Create your views here.

class CategoryViewset(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]

class ProductViewset(viewsets.ModelViewSet):
    queryset=Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer

    def get_permissions(self):

        if self.action in ["list","retrieve"]:

            return [AllowAny()]
        
        return  [IsAdminUser()]