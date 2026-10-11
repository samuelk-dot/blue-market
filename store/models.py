from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image_url = models.URLField(blank=True, null=True)
    vendor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def total_price(self):
        return self.product.price * self.quantity

class VendorProfile(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('mpesa', 'M-Pesa Mobile Money'),
        ('paypal', 'PayPal Account'),
        ('card', 'Credit / Debit Card Payout'),
        ('bank', 'Bank Account Transfer'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='vendor_profile')
    store_name = models.CharField(max_length=100, blank=True)
    payout_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='mpesa')

    account_holder_name = models.CharField(max_length=100, blank=True)
    mpesa_phone_number = models.CharField(max_length=20, blank=True, null=True, help_text="Format: 07XXXXXXXX")
    paypal_email = models.EmailField(blank=True, null=True)
    card_or_account_number = models.CharField(max_length=50, blank=True, null=True, help_text="Card number or Bank account")
    bank_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username}'s Payout Info ({self.get_payout_method_display()})"

class Order(models.Model):
    PAYMENT_TYPE_CHOICES = [
        ('mpesa', 'M-Pesa Express'),
        ('paypal', 'PayPal Checkout'),
        ('card', 'Credit / Debit Card (Visa, Mastercard)'),
    ]

    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_type = models.CharField(max_length=20, choices=PAYMENT_TYPE_CHOICES, default='card')
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} - {self.product.name} via {self.get_payment_type_display()}"