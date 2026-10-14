from django.db.models import Q

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
        'cart_count': cart_count
    })