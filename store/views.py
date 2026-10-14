from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from django.http import JsonResponse
from .models import Product

# Core Index View
def index(request):
    category = request.GET.get('category')
    query = request.GET.get('q')
    try:
        products = Product.objects.all().order_by('-id')
        if category:
            products = products.filter(
                Q(name__icontains=category) | Q(description__icontains=category)
            )
        if query:
            products = products.filter(
                Q(name__icontains=query) | Q(description__icontains=query)
            )
    except Exception:
        products = []

    return render(request, 'store/index.html', {
        'products': products,
    })

# Product Detail View
def product_detail(request, product_id):
    try:
        product = get_object_or_404(Product, id=product_id)
        return render(request, 'store/detail.html', {'product': product})
    except Exception:
        return redirect('index')

# Vendor Dashboard
def vendor_dashboard(request):
    try:
        products = Product.objects.all().order_by('-id')
        return render(request, 'store/dashboard.html', {'products': products})
    except Exception:
        return render(request, 'store/dashboard.html', {'products': []})

# Cart & Order Handlers
def cart_view(request):
    return render(request, 'store/cart.html')

def add_to_cart(request, product_id):
    return redirect('cart_view')

def place_order(request):
    return redirect('index')

# Auth Handlers
def signup_view(request):
    return render(request, 'store/signup.html')

def login_view(request):
    return render(request, 'store/login.html')

# Search & Autocomplete
def search_products(request):
    query = request.GET.get('q', '')
    return redirect(f'/?q={query}')

def product_autocomplete(request):
    query = request.GET.get('q', '')
    try:
        products = Product.objects.filter(name__icontains=query)[:5]
        results = [{'id': p.id, 'name': p.name} for p in products]
    except Exception:
        results = []
    return JsonResponse({'results': results})

def ai_universal_ingest(request):
    return JsonResponse({'status': 'success'})

# Delete Product
def delete_product(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        product.delete()
    except Exception:
        pass
    return redirect('vendor_dashboard')