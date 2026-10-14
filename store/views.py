from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from django.http import JsonResponse
from .models import Product

def index(request):
    category = request.GET.get('category')
    query = request.GET.get('q')
    
    try:
        products = Product.objects.all().order_by('-id')
        
        if category:
            # Group filtering for parent tabs
            if category == 'car':
                products = products.filter(
                    Q(name__icontains='sport') | Q(description__icontains='sport') |
                    Q(name__icontains='car') | Q(description__icontains='car') |
                    Q(name__icontains='suv') | Q(description__icontains='suv') |
                    Q(name__icontains='offroad') | Q(description__icontains='offroad')
                )
            elif category == 'bike':
                products = products.filter(
                    Q(name__icontains='bike') | Q(description__icontains='bike') |
                    Q(name__icontains='motorcycle') | Q(description__icontains='motorcycle') |
                    Q(name__icontains='quad') | Q(description__icontains='quad') |
                    Q(name__icontains='scooter') | Q(description__icontains='scooter')
                )
            elif category == 'heavy_fleet':
                products = products.filter(
                    Q(name__icontains='trailer') | Q(description__icontains='trailer') |
                    Q(name__icontains='lorry') | Q(description__icontains='lorry') |
                    Q(name__icontains='truck') | Q(description__icontains='truck') |
                    Q(name__icontains='bus') | Q(description__icontains='bus')
                )
            elif category == 'spare_part':
                products = products.filter(
                    Q(name__icontains='spare') | Q(description__icontains='spare') |
                    Q(name__icontains='engine') | Q(description__icontains='engine') |
                    Q(name__icontains='turbo') | Q(description__icontains='turbo') |
                    Q(name__icontains='panel') | Q(description__icontains='panel')
                )
            else:
                # Specific sub-category match
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

# Delete Product
def delete_product(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        product.delete()
    except Exception:
        pass
    return redirect('vendor_dashboard')