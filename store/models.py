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

from django.db import models

class VehicleProduct(models.Model):
    title = models.CharField(max_length=200)
    base_cif_usd = models.DecimalField(max_digits=10, decimal_places=2)  # Overseas CIF cost (USD)
    crsp_kes = models.DecimalField(max_digits=12, decimal_places=2)      # KRA CRSP retail value (KES)
    engine_cc = models.IntegerField()
    year_of_first_reg = models.IntegerField()
    is_motorcycle = models.BooleanField(default=False)
    
    # Custom hot deal profit target (KSh 100k - 500k)
    target_profit_kes = models.DecimalField(max_digits=10, decimal_places=2, default=150000.00)

    @property
    def calculate_landed_price(self):
        usd_to_kes = 130.00  # Exchange rate multiplier
        base_cost_kes = float(self.base_cif_usd) * usd_to_kes
        
        # 1. KRA Age Depreciation
        age = 2026 - self.year_of_first_reg
        depreciation = min(0.65, age * 0.10)  # Max 65% depreciation
        customs_value = float(self.crsp_kes) * (1 - depreciation) / 1.5
        
        # 2. Dynamic Rates for Motorcycles vs Cars
        if self.is_motorcycle:
            import_duty_rate = 0.25
            excise_duty = 12950.00  # KRA flat motorcycle excise tax
            shipping_clearing_kes = 35000.00  # Lower shipping cost for bikes
            ntsa_fee_kes = 1850.00
        else:
            # Passenger vehicles
            import_duty_rate = 0.35
            
            # Excise duty bands based on Engine CC
            if self.engine_cc <= 1500:
                excise_rate = 0.20
            elif self.engine_cc <= 3000:
                excise_rate = 0.25
            else:
                excise_rate = 0.35
                
            excise_duty = (customs_value * (1 + import_duty_rate)) * excise_rate
            shipping_clearing_kes = 120000.00
            ntsa_fee_kes = 3500.00
        
        # 3. KRA Import Duty, VAT, IDF, and RDL
        import_duty = customs_value * import_duty_rate
        vat = (customs_value + import_duty + excise_duty) * 0.16
        idf_rdl = customs_value * 0.045  # 2.5% IDF + 2.0% RDL
        
        total_kra_taxes = import_duty + excise_duty + vat + idf_rdl
        
        # 4. Final Total Calculated Price
        final_price = base_cost_kes + total_kra_taxes + shipping_clearing_kes + ntsa_fee_kes + float(self.target_profit_kes)
        
        return round(final_price, -3)  # Rounded to nearest 1,000 KSh