from django.urls import path
from .views import *
from .views import (
    ProductListView,
    ProductDetailView,
)

urlpatterns = [
    path('', ProductListView.as_view()),
    path('<int:pk>/', ProductDetailView.as_view()),
]