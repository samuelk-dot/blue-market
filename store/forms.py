from django import forms
from .models import Product, VendorProfile

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'description', 'price', 'image_url']

class VendorProfileForm(forms.ModelForm):
    class Meta:
        model = VendorProfile
        fields = [
            'store_name', 
            'payout_method', 
            'account_holder_name', 
            'mpesa_phone_number', 
            'paypal_email', 
            'card_or_account_number', 
            'bank_name'
        ]