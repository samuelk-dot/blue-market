from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from .models import Product

def index(request):
    category = request.GET.get('category')
    if category:
        products = Product.objects.filter(
            Q(name__icontains=category) | Q(description__icontains=category)
        ).order_by('-id')
    else:
        products = Product.objects.all().order_by('-id')

    return render(request, 'store/index.html', {
        'products': products,
    })

def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return render(request, 'store/detail.html', {
        'product': product,
    })