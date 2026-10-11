import React, { useState, useEffect } from 'react';
import { MarketplaceNavbar } from './components/MarketplaceNavbar';
import { MarketplaceHero } from './components/MarketplaceHero';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SellItemModal } from './components/SellItemModal';
import { CommissionCalculatorSection } from './components/CommissionCalculatorSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { MarketplaceDevStudio } from './components/MarketplaceDevStudio';
import { MarketplaceFooter } from './components/MarketplaceFooter';
import { ShareModal } from './components/ShareModal';
import { CustomerDashboardModal } from './components/CustomerDashboardModal';
import { AddReviewModal } from './components/AddReviewModal';
import { INITIAL_COMMISSION_SETTINGS, INITIAL_PRODUCTS } from './data/initialProducts';
import { ProductItem, CartItem, CommissionSettings, MarketplaceOrder, CustomerUser, ProductReview } from './types/marketplace';
import { Sliders, PlusCircle, User } from 'lucide-react';

const SETTINGS_KEY = 'bluemarket_settings_v3';
const PRODUCTS_KEY = 'bluemarket_products_v3';
const ORDERS_KEY = 'bluemarket_orders_v3';
const USER_KEY = 'bluemarket_user_v3';
const SAVED_KEY = 'bluemarket_saved_v3';

export default function App() {
  // Settings
  const [settings, setSettings] = useState<CommissionSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (saved) return { ...INITIAL_COMMISSION_SETTINGS, ...JSON.parse(saved) };
    } catch (e) {
      console.warn('Could not read cached settings');
    }
    return INITIAL_COMMISSION_SETTINGS;
  });

  // Products
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(PRODUCTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not read cached products');
    }
    return INITIAL_PRODUCTS;
  });

  // Orders
  const [orders, setOrders] = useState<MarketplaceOrder[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cached orders');
    }
    return [];
  });

  // Customer User Authentication
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cached user');
    }
    return {
      email: 'samuelkinguri13@gmail.com',
      name: "Samuel King'uri",
      phone: '+254 712 345 678',
      deliveryTown: 'Nairobi',
      deliveryAddress: 'Westlands Commercial Hub, Floor 2',
      savedProductIds: []
    };
  });

  // Saved / Wishlist Items
  const [savedProductIds, setSavedProductIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SAVED_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read cached saved items');
    }
    return ['vehicle-suv-crossover-blue', 'motorbike-nexus-250r-blue'];
  });

  // Cart
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // UI Modals
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [sharingProduct, setSharingProduct] = useState<ProductItem | null>(null);
  const [reviewingProduct, setReviewingProduct] = useState<ProductItem | null>(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDevStudioOpen, setIsDevStudioOpen] = useState(false);
  const [isCustomerDashboardOpen, setIsCustomerDashboardOpen] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Sync settings
  const handleUpdateSettings = (newSettings: CommissionSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error(e);
    }
  };

  // Sync products
  const handleUpdateProducts = (newProducts: ProductItem[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
    } catch (e) {
      console.error(e);
    }
  };

  // User login
  const handleLogin = (user: CustomerUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  };

  // User logout
  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle Saved / Wishlist item
  const handleToggleSaved = (product: ProductItem) => {
    setSavedProductIds(prev => {
      const next = prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id];

      try {
        localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Track affiliate click
  const handleTrackAffiliateClick = (product: ProductItem) => {
    const updated = products.map(p => {
      if (p.id === product.id) {
        return {
          ...p,
          clicksCount: (p.clicksCount || 0) + 1
        };
      }
      return p;
    });
    handleUpdateProducts(updated);
  };

  // Add review to product
  const handleSubmitReview = (productId: string, review: ProductReview) => {
    const updated = products.map(p => {
      if (p.id === productId) {
        const existingReviews = p.reviews || [];
        const newReviews = [review, ...existingReviews];
        const avgRating = newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length;

        return {
          ...p,
          reviews: newReviews,
          sellerRating: Number(avgRating.toFixed(1))
        };
      }
      return p;
    });

    handleUpdateProducts(updated);
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(updated.find(p => p.id === productId) || null);
    }
  };

  // Reset defaults
  const handleResetDefaults = () => {
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(SAVED_KEY);
    setSettings(INITIAL_COMMISSION_SETTINGS);
    setProducts(INITIAL_PRODUCTS);
    setOrders([]);
    setCartItems([]);
    setSavedProductIds([]);
  };

  // Add to cart
  const handleAddToCart = (product: ProductItem) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  // Update quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove item
  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  // Direct checkout from product detail
  const handleDirectCheckout = (product: ProductItem) => {
    setCartItems([{ product, quantity: 1 }]);
    setIsCheckoutOpen(true);
  };

  // Order success
  const handleOrderSuccess = (order: MarketplaceOrder) => {
    const updatedOrders = [order, ...orders];
    setOrders(updatedOrders);
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
    } catch (e) {
      console.error(e);
    }
    setCartItems([]);
  };

  // Shortcut key (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsDevStudioOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const savedProducts = products.filter(p => savedProductIds.includes(p.id));

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Navigation */}
      <MarketplaceNavbar
        settings={settings}
        cartCount={totalCartCount}
        savedCount={savedProductIds.length}
        currentUser={currentUser}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
        onOpenDevStudio={() => setIsDevStudioOpen(true)}
        onOpenCustomerDashboard={() => setIsCustomerDashboardOpen(true)}
      />

      {/* Main Storefront & Multi-Corner Workflow */}
      <main className="flex-1">
        {/* 1. Hero Campaign Banner */}
        <MarketplaceHero
          settings={settings}
          onOpenSellModal={() => setIsSellModalOpen(true)}
        />

        {/* 2. Multi-Corner Verified Product Catalog (Vehicles, Bikes, Spares, Electronics, Fashion) */}
        <ProductCatalog
          products={products}
          settings={settings}
          currentUser={currentUser}
          savedProductIds={savedProductIds}
          onToggleSaved={handleToggleSaved}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={handleAddToCart}
          onTrackAffiliateClick={handleTrackAffiliateClick}
          onShareProduct={(p) => setSharingProduct(p)}
          addedProductId={addedProductId}
        />

        {/* 3. Commission Engine & Live Earnings Calculator */}
        <CommissionCalculatorSection
          settings={settings}
          onOpenSellModal={() => setIsSellModalOpen(true)}
          onOpenDevStudio={() => setIsDevStudioOpen(true)}
        />
      </main>

      {/* Quiet Footer */}
      <MarketplaceFooter
        settings={settings}
        onOpenDevStudio={() => setIsDevStudioOpen(true)}
        onOpenSellModal={() => setIsSellModalOpen(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5">
        <button
          onClick={() => setIsCustomerDashboardOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-blue-300 border border-blue-800/80 shadow-xl transition-all cursor-pointer hover:text-white"
          title="Customer Dashboard & Wishlist"
        >
          <User className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">My Account</span>
          {savedProductIds.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-mono-code text-[10px] font-bold flex items-center justify-center">
              {savedProductIds.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsSellModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-blue-300 border border-blue-800/80 shadow-xl transition-all cursor-pointer hover:text-white"
          title="List an item or affiliate deal"
        >
          <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
          <span>List Item</span>
        </button>

        <button
          onClick={() => setIsDevStudioOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all cursor-pointer border border-blue-400/30"
          title="Open Developer & Product Studio (Shortcut: Ctrl+K / ⌘K)"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Admin</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-blue-950 font-mono-code ml-0.5 text-blue-200">
            ⌘K
          </span>
        </button>
      </div>

      {/* Product Detail Modal (Galleries, Reviews, WhatsApp Channel) */}
      <ProductDetailModal
        product={selectedProduct}
        settings={settings}
        currentUser={currentUser}
        isSaved={selectedProduct ? savedProductIds.includes(selectedProduct.id) : false}
        onToggleSaved={handleToggleSaved}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectCheckout={handleDirectCheckout}
        onTrackAffiliateClick={handleTrackAffiliateClick}
        onShareProduct={(p) => setSharingProduct(p)}
        onOpenAddReview={(p) => setReviewingProduct(p)}
      />

      {/* Customer Dashboard & Wishlist Modal */}
      <CustomerDashboardModal
        isOpen={isCustomerDashboardOpen}
        onClose={() => setIsCustomerDashboardOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        savedProducts={savedProducts}
        orders={orders}
        settings={settings}
        onRemoveSaved={(id) => setSavedProductIds(prev => prev.filter(i => i !== id))}
        onAddToCart={handleAddToCart}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Add Review & Rating Modal */}
      <AddReviewModal
        isOpen={Boolean(reviewingProduct)}
        product={reviewingProduct}
        currentUser={currentUser}
        onClose={() => setReviewingProduct(null)}
        onSubmitReview={handleSubmitReview}
      />

      {/* Sell an Item or Add Affiliate Deal Modal */}
      <SellItemModal
        isOpen={isSellModalOpen}
        settings={settings}
        onClose={() => setIsSellModalOpen(false)}
        onAddProduct={(newProd) => handleUpdateProducts([newProd, ...products])}
      />

      {/* Social & WhatsApp Referral Sharing Modal */}
      <ShareModal
        product={sharingProduct}
        settings={settings}
        onClose={() => setSharingProduct(null)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        settings={settings}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Escrow Checkout Modal (M-Pesa, COD, Bank, PayPal, Kenya Delivery) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        settings={settings}
        currentUser={currentUser}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Dev / Admin Studio Drawer */}
      <MarketplaceDevStudio
        isOpen={isDevStudioOpen}
        onClose={() => setIsDevStudioOpen(false)}
        settings={settings}
        products={products}
        orders={orders}
        onUpdateSettings={handleUpdateSettings}
        onUpdateProducts={handleUpdateProducts}
        onResetDefaults={handleResetDefaults}
      />

    </div>
  );
}
