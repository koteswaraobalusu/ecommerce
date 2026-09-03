from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response

from .serializers import RegisterSerializer
# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class=RegisterSerializer
    permission_classes=[AllowAny]


class ProfileView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):

        user=request.user

        return Response({
            "id": user.id,
            "email": user.email,
        })