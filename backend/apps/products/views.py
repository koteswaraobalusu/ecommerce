from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.permissions import IsAdminUser,AllowAny
from rest_framework.filters import SearchFilter,OrderingFilter
from django_filters.rest_framework import (
    DjangoFilterBackend,
)
from .serializers import CategorySerializer,ProductSerializer,SubCategorySerializer
from .models import Category,Product,SubCategory
# Create your views here.

class CategoryViewset(viewsets.ModelViewSet):
    queryset=Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]

class SubCategoryViewset(viewsets.ModelViewSet):
    queryset=SubCategory.objects.all()
    serializer_class=SubCategorySerializer
    permission_classes=[IsAdminUser]


class ProductViewset(viewsets.ModelViewSet):
    queryset=Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    parser_classes = [
        MultiPartParser,
        FormParser,
    ]
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "category",
        "is_active",
        "name",
        "description",
    ]

    ordering_fields = [
        "price",
        "created_at",
        "name",
    ]

    ordering = [
        "-created_at"
    ]

    

    def get_permissions(self):
        print("ACTION:", self.action)


        if self.action in ["list","retrieve"]:

            return [AllowAny()]
        print("ADMIN ONLY")
        return  [IsAdminUser()]