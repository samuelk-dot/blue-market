from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from django.http import JsonResponse
from .models import Product

def index(request):
    category = request.GET.get('category', '')
    query = request.GET.get('q', '')
    budget = request.GET.get('budget', '')
    year_filter = request.GET.get('year', '')
    location = request.GET.get('location', '')
    sort_by = request.GET.get('sort', '')

    try:
        products = Product.objects.all()

        if category:
            products = products.filter(category=category)

        if query:
            products = products.filter(
                Q(name__icontains=query) | Q(description__icontains=query)
            )

        # Budget filtering
        if budget == 'under_1m':
            products = products.filter(price__lt=1000000)
        elif budget == '1m_2m':
            products = products.filter(price__gte=1000000, price__lte=2000000)
        elif budget == '2m_5m':
            products = products.filter(price__gte=2000000, price__lte=5000000)
        elif budget == 'over_5m':
            products = products.filter(price__gt=5000000)

        # Year filtering
        if year_filter == '2022_newer':
            products = products.filter(year__gte=2022)
        elif year_filter == '2019_2021':
            products = products.filter(year__gte=2019, year__lte=2021)
        elif year_filter == '2015_2018':
            products = products.filter(year__gte=2015, year__lte=2018)
        elif year_filter == 'older':
            products = products.filter(year__lt=2015)

        # Location filtering
        if location:
            products = products.filter(location__icontains=location)

        # Sorting
        if sort_by == 'price_low':
            products = products.order_by('price')
        elif sort_by == 'price_high':
            products = products.order_by('-price')
        elif sort_by == 'newest':
            products = products.order_by('-id')
        else:
            products = products.order_by('-id')

    except Exception:
        products = []

    return render(request, 'store/index.html', {
        'products': products,
        'current_category': str(category) if category else '',
    })

def vendor_dashboard(request):
    try:
        products = Product.objects.all().order_by('-id')
    except Exception:
        products = []
    return render(request, 'store/vendor_dashboard.html', {'products': products})

def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return render(request, 'store/product_detail.html', {'product': product})

def cart_view(request):
    return render(request, 'store/cart.html')

def add_to_cart(request, product_id):
    return redirect('cart_view')

def place_order(request):
    return redirect('index')

def signup_view(request):
    return render(request, 'store/signup.html')

def login_view(request):
    return render(request, 'store/login.html')

def search_products(request):
    query = request.GET.get('q', '')
    try:
        products = Product.objects.filter(
            Q(name__icontains=query) | Q(description__icontains=query)
        )
    except Exception:
        products = []
    return render(request, 'store/index.html', {'products': products})

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

def delete_product(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        product.delete()
    except Exception:
        pass
    return redirect('vendor_dashboard')