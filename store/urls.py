from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/', views.vendor_dashboard, name='vendor_dashboard'),
    path('cart/', views.cart_view, name='cart_view'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('place-order/', views.place_order, name='place_order'),
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('search/', views.search_products, name='search_products'),
    path('api/autocomplete/', views.product_autocomplete, name='product_autocomplete'),
    path('api/ai-ingest/', views.ai_universal_ingest, name='ai_universal_ingest'),
    path('delete-product/<int:product_id>/', views.delete_product, name='delete_product'),
]