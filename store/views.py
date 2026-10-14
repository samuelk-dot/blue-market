from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Q
from .models import Product, CartItem, ProductImage

def index(request):
    category = request.GET.get('category')
    if category:
        products = Product.objects.filter(
            Q(name__icontains=category) | Q(description__icontains=category)
        ).order_by('-id')
    else:
        products = Product.objects.all().order_by('-id')

    cart_count = 0
    if request.user.is_authenticated:
        try:
            cart_count = CartItem.objects.filter(user=request.user).count()
        except Exception:
            cart_count = 0

    return render(request, 'store/index.html', {
        'products': products,
        'cart_count': cart_count
    })