from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CategoryViewset,ProductViewset

router=DefaultRouter()

router.register("products",ProductViewset,basename="products")

router.register("categories",CategoryViewset,basename="categories")

urlpatterns=router.urls