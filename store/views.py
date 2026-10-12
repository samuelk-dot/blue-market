from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login
from django.db.models import Q
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Product, VendorProfile, CartItem, Order
from .forms import ProductForm, VendorProfileForm

# 1. PUBLIC HOMEPAGE VIEW
def index(request):
    category = request.GET.get('category')
    
    if category:
        products = Product.objects.filter(
            Q(name__icontains=category) | Q(description__icontains=category)
        ).order_by('-id')
    else:
        products = Product.objects.all().order_by('-id')

    if request.user.is_authenticated:
        cart_count = CartItem.objects.filter(user=request.user).count()
    else:
        cart_count = 0
    
    return render(request, 'store/index.html', {
        'products': products, 
        'selected_category': category,
        'cart_count': cart_count
    })

# 2. ADD TO CART VIEW
@login_required
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart_item, created = CartItem.objects.get_or_create(user=request.user, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    return redirect('cart_view')

# 3. CART PAGE VIEW
@login_required
def cart_view(request):
    cart_items = CartItem.objects.filter(user=request.user)
    total = sum(item.total_price() for item in cart_items)
    return render(request, 'store/cart.html', {'cart_items': cart_items, 'total': total})

# 4. PLACE ORDER VIEW
@login_required
def place_order(request):
    cart_items = CartItem.objects.filter(user=request.user)
    if cart_items.exists():
        total = sum(item.total_price() for item in cart_items)
        order = Order.objects.create(buyer=request.user, amount=total, is_paid=True)
        cart_items.delete()
    return redirect('cart_view')

# 5. VENDOR DASHBOARD VIEW
@login_required
def vendor_dashboard(request):
    vendor_profile, created = VendorProfile.objects.get_or_create(user=request.user)
    
    product_form = ProductForm()
    payout_form = VendorProfileForm(instance=vendor_profile)

    if request.method == 'POST':
        if 'add_product' in request.POST:
            product_form = ProductForm(request.POST)
            if product_form.is_valid():
                product = product_form.save(commit=False)
                product.vendor = request.user
                product.save()
                return redirect('vendor_dashboard')
        elif 'update_payout' in request.POST:
            payout_form = VendorProfileForm(request.POST, instance=vendor_profile)
            if payout_form.is_valid():
                payout_form.save()
                return redirect('vendor_dashboard')

    my_products = Product.objects.filter(vendor=request.user)
    
    return render(request, 'store/dashboard.html', {
        'form': product_form,
        'payout_form': payout_form,
        'products': my_products,
        'vendor_profile': vendor_profile,
    })

# 6. SIGNUP VIEW
def signup_view(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'store/signup.html', {'form': form})

# 7. LOGIN VIEW
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('index')
    else:
        form = AuthenticationForm()
    return render(request, 'store/login.html', {'form': form})

def search_products(request):
    query = request.GET.get('q', '').strip()
    products = Product.objects.all()

    if query:
        products = products.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query)
        )

    return render(request, 'store/search_results.html', {
        'products': products,
        'query': query
    })

def product_autocomplete(request):
    query = request.GET.get('term', '')
    results = []
    if query:
        matches = Product.objects.filter(title__icontains=query)[:5]
        results = [{'id': p.id, 'title': p.title, 'price': p.price} for p in matches]
    return JsonResponse(results, safe=False)

@csrf_exempt
def api_add_third_party_vehicle(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product = Product.objects.create(
                name=data.get('title'),
                description=data.get('description'),
                price=data.get('auto_calculated_price')
            )
            return JsonResponse({
                'status': 'success',
                'message': 'Listing posted live to BLUE MARKET',
                'product_id': product.id
            }, status=201)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Only POST requests allowed'}, status=405)