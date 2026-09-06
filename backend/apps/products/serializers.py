from rest_framework import serializers
from .models import Category,Product,SubCategory

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model=Category
        fields=["id","name","slug",]

class SubCategorySerializer(serializers.ModelSerializer):

    category=CategorySerializer(read_only=True)

    class Meta:
        model=SubCategory
        fields=["id","name","slug"]

class ProductSerializer(serializers.ModelSerializer):

    category=CategorySerializer(read_only=True)
    subcategory=SubCategorySerializer(read_only=True)

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )

    sub_category_id =serializers.PrimaryKeyRelatedField(
        queryset=SubCategory.objects.all(),
        source="sub_category",
        write_only=True
    )
    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "price",
            "stock",
            "image",
            "is_active",
            "category",
            "category_id",
            "subcategory",
            "sub_category_id",
            "created_at",
            "updated_at",
        ]