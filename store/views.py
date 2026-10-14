from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from .models import Product

# Main Storefront
def index(request):
    category = request.GET.get('category')
    try:
        if category:
            products = Product.objects.filter(
                Q(name__icontains=category) | Q(description__icontains=category)
            ).order_by('-id')
        else:
            products = Product.objects.all().order_by('-id')
    except Exception:
        products = []

    return render(request, 'store/index.html', {
        'products': products,
    })

# Product Detail View
def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return render(request, 'store/detail.html', {
        'product': product,
    })

# Vendor Dashboard
def vendor_dashboard(request):
    return render(request, 'store/index.html')

# Cart & Checkout Views
def cart_view(request):
    return render(request, 'store/index.html')

def add_to_cart(request, product_id):
    return redirect('index')

def place_order(request):
    return redirect('index')

# Auth Views
def signup_view(request):
    return render(request, 'store/index.html')

def login_view(request):
    return render(request, 'store/index.html')

# Search & API Views
def search_products(request):
    return redirect('index')

def product_autocomplete(request):
    return redirect('index')

def ai_universal_ingest(request):
    return redirect('index')

# Delete Product
def delete_product(request, product_id):
    return redirect('index')