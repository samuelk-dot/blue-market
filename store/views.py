from django.shortcuts import render, redirect, get_object_or_404
from django.db.models import Q
from django.http import JsonResponse
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .models import Product, ProductImage

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

@login_required(login_url='login')
def vendor_dashboard(request):
    if request.method == 'POST' and 'add_product' in request.POST:
        # Build a rich description combining all the wizard details
        make = request.POST.get('make', '')
        model = request.POST.get('model', '')
        year = request.POST.get('year', '')
        mileage = request.POST.get('mileage', '')
        price = request.POST.get('price') or 0
        body_type = request.POST.get('body_type', '')
        fuel_type = request.POST.get('fuel_type', '')
        transmission = request.POST.get('transmission', '')
        engine_cc = request.POST.get('engine_cc', '')
        condition = request.POST.get('usage_condition', '')
        
        name = request.POST.get('name') or f"{year} {make} {model}".strip()
        
        detailed_description = f"""
        Make: {make}
        Model: {model}
        Year: {year}
        Mileage: {mileage} km
        Body Type: {body_type}
        Fuel: {fuel_type}
        Transmission: {transmission}
        Engine CC: {engine_cc}
        Condition: {condition}
        
        {request.POST.get('description', '')}
        """.strip()

        # Store the created product in a variable named 'product'
        product = Product.objects.create(
            name=name,
            price=price,
            description=detailed_description,
            image_url=request.POST.get('image_url', ''),
        )

        # 1. Handle Multiple Uploaded Image Files (up to 15 images)
        images = request.FILES.getlist('images')
        for img in images:
            ProductImage.objects.create(product=product, image=img)

        # 2. Handle Image URL Link if provided
        image_url = request.POST.get('image_url')
        if image_url:
            # Connect image link if you have a field for it in ProductImage
            ProductImage.objects.create(product=product, image_url=image_url)

        return redirect('vendor_dashboard')

    try:
        products = Product.objects.all().order_by('-id')
    except Exception:
        products = []
        
    return render(request, 'store/dashboard.html', {'products': products})

def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return render(request, 'store/product_detail.html', {'product': product})

def cart_view(request):
    return render(request, 'store/cart.html')

def add_to_cart(request, product_id):
    return redirect('cart_view')

def place_order(request, product_id):
    if request.method == 'POST':
        product = get_object_or_404(Product, id=product_id)
        
        buyer_name = request.POST.get('name', request.user.username if request.user.is_authenticated else 'Guest Buyer')
        buyer_phone = request.POST.get('phone', 'N/A')
        buyer_email = request.POST.get('email', request.user.email if request.user.is_authenticated else 'N/A')
        
        # 1. Email Alert to Admin/Owner
        subject = f"🚨 NEW ORDER ALERT: {product.title}"
        message = (
            f"You received a new purchase order/inquiry on Vanguard Motors!\n\n"
            f"🚗 Vehicle: {product.title}\n"
            f"💰 Listed Price: KES {product.price}\n\n"
            f"👤 Buyer Details:\n"
            f"Name: {buyer_name}\n"
            f"Phone: {buyer_phone}\n"
            f"Email: {buyer_email}\n"
        )
        
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_ALERT_EMAIL],
            fail_silently=False,
        )
        
        messages.success(request, "Your order/inquiry has been received! Vanguard Motors will contact you shortly.")
        return redirect('product_detail', product_id=product.id)

def signup_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        account_type = request.POST.get('account_type', 'buyer')
        
        if User.objects.filter(username=username).exists():
            return render(request, 'store/signup.html', {'error': 'Username already taken.'})
            
        user = User.objects.create_user(username=username, email=email, password=password)
        login(request, user)
        
        if account_type == 'seller':
            return redirect('vendor_dashboard')
        return redirect('index')
        
    return render(request, 'store/signup.html')

def login_view(request):
    if request.method == 'POST':
        username_input = request.POST.get('username')
        password_input = request.POST.get('password')
        
        # Check if user provided email or username
        user_obj = User.objects.filter(email=username_input).first()
        username = user_obj.username if user_obj else username_input
        
        user = authenticate(request, username=username, password=password_input)
        if user is not None:
            login(request, user)
            return redirect('vendor_dashboard')
        else:
            return render(request, 'store/login.html', {'error': 'Invalid credentials.'})
            
    return render(request, 'store/login.html')

def logout_view(request):
    logout(request)
    return redirect('index')

def dealers_directory(request):
    dealers = User.objects.all()
    return render(request, 'store/dealers.html', {'dealers': dealers})

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