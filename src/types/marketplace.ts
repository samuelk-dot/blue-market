export type ProductCategory = 
  | 'all' 
  | 'vehicles' 
  | 'motorbikes' 
  | 'spare-parts' 
  | 'electronics' 
  | 'fashion';

export interface ProductReview {
  id: string;
  userName: string;
  userEmail: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface ProductItem {
  id: string;
  title: string;
  brand: string;
  price: number; // Primary numeric value in KES or USD
  originalPrice?: number;
  category: 'vehicles' | 'motorbikes' | 'spare-parts' | 'electronics' | 'fashion';
  condition: 'Brand New' | 'Foreign Used / Mint' | 'Locally Used / Good' | 'Refurbished Grade A';
  description: string;
  specs: string[];
  image: string;
  galleryImages?: string[]; // Multi-image gallery
  sellerName: string;
  sellerRating: number;
  sellerLocation: string;
  inStock: boolean;
  featured: boolean;
  salesCount: number;
  
  // Reviews & ratings
  reviews?: ProductReview[];
  
  // Affiliate & WhatsApp features
  isAffiliate?: boolean;
  affiliateLink?: string;
  affiliateRate?: number; // e.g. 5%, 8% affiliate commission
  affiliatePartner?: string;
  clicksCount?: number;
  conversionRate?: number;
  whatsappNumber?: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface CustomerUser {
  email: string;
  name: string;
  phone: string;
  deliveryTown: string;
  deliveryAddress: string;
  savedProductIds: string[];
}

export interface CommissionSettings {
  ratePercentage: number;
  escrowFeePercentage: number;
  currencySymbol: string; // "KSh" or "$"
  currencyCode: string; // "KES" or "USD"
  deliveryFee: number; // e.g. 450 KSh for Nairobi / Kenya
  payoutMethod: string;
  ownerEmail: string;
  marketplaceName: string;
  whatsappContactNumber: string;
  mpesaPaybill: string;
  mpesaAccount: string;
}

export interface MarketplaceOrder {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  commissionAmount: number;
  sellerPayout: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryTown: string;
  paymentMethod: 'M-Pesa (Lipa na M-Pesa)' | 'Pay on Delivery (COD)' | 'Bank Transfer (KCB / Equity)' | 'PayPal' | 'Card';
  status: 'Order Placed · Awaiting Dispatch' | 'In Transit via Courier' | 'Delivered & Escrow Released';
}
