from django.urls import path
from .views import (
    CartItemListCreateView,
    CartItemDeleteView,
    CartItemUpdateView,
    PlaceOrderView,
)

urlpatterns = [
    path(
        "cart-items/",
        CartItemListCreateView.as_view()
    ),

    path(
        "cart-items/<int:pk>/",
        CartItemDeleteView.as_view()
    ),

    path(
        "cart-items/<int:pk>/update/",
        CartItemUpdateView.as_view()
    ),

    path(
        "place-order/",
        PlaceOrderView.as_view()
    ),
]