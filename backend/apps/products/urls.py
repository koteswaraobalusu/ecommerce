from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CategoryViewset,ProductViewset,SubCategoryViewset

router=DefaultRouter()

router.register("products",ProductViewset,basename="products")

router.register("categories",CategoryViewset,basename="categories")

router.register("sub-categories",SubCategoryViewset,basename='subcategories')

urlpatterns=router.urls