import React, { useState } from 'react';
import { Search, ShoppingBag, ArrowUpRight, Star, SlidersHorizontal, Check, ExternalLink, MessageCircle, Share2, Heart, Car, Bike, Wrench, Laptop, Shirt } from 'lucide-react';
import { ProductItem, CommissionSettings, ProductCategory, CustomerUser } from '../types/marketplace';

interface ProductCatalogProps {
  products: ProductItem[];
  settings: CommissionSettings;
  currentUser: CustomerUser | null;
  savedProductIds: string[];
  onToggleSaved: (product: ProductItem) => void;
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onTrackAffiliateClick: (product: ProductItem) => void;
  onShareProduct: (product: ProductItem) => void;
  addedProductId: string | null;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  settings,
  currentUser,
  savedProductIds,
  onToggleSaved,
  onSelectProduct,
  onAddToCart,
  onTrackAffiliateClick,
  onShareProduct,
  addedProductId,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [marketTypeFilter, setMarketTypeFilter] = useState<'all' | 'affiliate' | 'direct'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'under50k' | '50k-250k' | '250k-1m' | 'over1m'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating-desc'>('featured');

  // Filter and sort products
  const filteredProducts = products.filter((p) => {
    // Corner / category match
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    
    // Type match (all vs affiliate vs direct)
    const matchesMarketType = 
      marketTypeFilter === 'all' 
        ? true 
        : marketTypeFilter === 'affiliate' 
          ? Boolean(p.isAffiliate) 
          : !p.isAffiliate;

    // Price range match
    let matchesPrice = true;
    if (priceRange === 'under50k') matchesPrice = p.price < 50000;
    else if (priceRange === '50k-250k') matchesPrice = p.price >= 50000 && p.price <= 250000;
    else if (priceRange === '250k-1m') matchesPrice = p.price > 250000 && p.price <= 1000000;
    else if (priceRange === 'over1m') matchesPrice = p.price > 1000000;

    // Search query match
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.title.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.affiliatePartner && p.affiliatePartner.toLowerCase().includes(query));

    return matchesCategory && matchesMarketType && matchesPrice && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating-desc') return b.sellerRating - a.sellerRating;
    return (b.salesCount || 0) - (a.salesCount || 0);
  });

  const handleWhatsAppOrder = (product: ProductItem) => {
    const phone = product.whatsappNumber || settings.whatsappContactNumber || '+254712345678';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const town = currentUser?.deliveryTown || 'Nairobi';
    const text = encodeURIComponent(
      `Hello! I want to order/inquire about "${product.title}" (${settings.currencySymbol} ${product.price.toLocaleString()}) on ${settings.marketplaceName}.\nSeller: ${product.sellerName}\nCategory: ${product.category}\nDelivery Town: ${town}\nIs this in stock for delivery?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleAffiliateBuy = (product: ProductItem) => {
    onTrackAffiliateClick(product);
    if (product.affiliateLink) {
      window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    }
  };

  const corners: { id: ProductCategory; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'all', label: 'All Corners', icon: SlidersHorizontal },
    { id: 'vehicles', label: 'Vehicles & Cars', icon: Car },
    { id: 'motorbikes', label: 'Motorbikes & Boda', icon: Bike },
    { id: 'spare-parts', label: 'Car & Bike Spare Parts', icon: Wrench },
    { id: 'electronics', label: 'Electronics & Laptops', icon: Laptop },
    { id: 'fashion', label: 'Fashion & Jewelry', icon: Shirt },
  ];

  return (
    <section id="store" className="py-16 md:py-24 border-t border-blue-950/60 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 font-mono-code">
              African Multi-Corner Commerce Exchange
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Vehicles, Motorbikes, Spares, Electronics & Fashion.
            </h2>
            <p className="text-sm text-neutral-400">
              Browse verified items with Kenya delivery, M-Pesa escrow protection, and external affiliate deals with transparent commissions.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cars, bikes, spares, laptops..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Primary Corner Navigation Buttons with Icons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {corners.map((corner) => {
            const Icon = corner.icon;
            const count = corner.id === 'all' 
              ? products.length 
              : products.filter(p => p.category === corner.id).length;

            return (
              <button
                key={corner.id}
                onClick={() => setActiveCategory(corner.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between gap-2 cursor-pointer ${
                  activeCategory === corner.id
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                    : 'bg-neutral-900/80 border-neutral-800/80 text-neutral-300 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${activeCategory === corner.id ? 'text-white' : 'text-blue-400'}`} />
                  <span className={`text-[10px] font-mono-code px-1.5 py-0.5 rounded ${
                    activeCategory === corner.id ? 'bg-blue-800 text-blue-100' : 'bg-neutral-950 text-neutral-400'
                  }`}>
                    {count}
                  </span>
                </div>
                <span className="text-xs font-semibold truncate">{corner.label}</span>
              </button>
            );
          })}
        </div>

        {/* Filters Bar: Market Type, Price Range, and Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs">
          
          {/* Subtype Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setMarketTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                marketTypeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setMarketTypeFilter('direct')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                marketTypeFilter === 'direct' ? 'bg-blue-600 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Direct Escrow ({products.filter(p => !p.isAffiliate).length})
            </button>
            <button
              onClick={() => setMarketTypeFilter('affiliate')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                marketTypeFilter === 'affiliate' ? 'bg-blue-600 text-white' : 'text-blue-400 hover:text-blue-300'
              }`}
            >
              <ExternalLink className="w-3 h-3" />
              <span>Affiliate Deals ({products.filter(p => p.isAffiliate).length})</span>
            </button>
          </div>

          {/* Price Range & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Price Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400 font-mono-code text-[11px]">Price:</span>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
              >
                <option value="all">All Prices</option>
                <option value="under50k">Under {settings.currencySymbol} 50,000</option>
                <option value="50k-250k">{settings.currencySymbol} 50k - 250k</option>
                <option value="250k-1m">{settings.currencySymbol} 250k - 1 Million</option>
                <option value="over1m">Over {settings.currencySymbol} 1 Million</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-400 font-mono-code text-[11px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
              >
                <option value="featured">Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* 3-Column Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-neutral-400 border border-dashed border-neutral-800 rounded-2xl">
            <p className="text-base font-medium text-white">No products found matching your filter</p>
            <p className="text-xs text-neutral-500 mt-1">Try switching categories or clearing the price range filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product) => {
              const isAffiliate = Boolean(product.isAffiliate);
              const affiliateCommissionCut = (product.price * (product.affiliateRate || 5)) / 100;
              const directCommissionCut = (product.price * settings.ratePercentage) / 100;
              const isAdded = addedProductId === product.id;
              const isSaved = savedProductIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className={`group rounded-2xl bg-neutral-900/60 border transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-xl ${
                    isAffiliate 
                      ? 'border-blue-800/80 hover:border-blue-500 hover:shadow-blue-900/30' 
                      : 'border-neutral-800 hover:border-blue-900 hover:shadow-blue-950/30'
                  }`}
                >
                  {/* Lead with Imagery */}
                  <div 
                    onClick={() => onSelectProduct(product)}
                    className="relative w-full aspect-[4/3] bg-neutral-950 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Condition / Affiliate Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono-code text-neutral-300 border border-neutral-800">
                        {product.condition}
                      </span>
                      {isAffiliate && (
                        <span className="bg-blue-950/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono-code text-blue-300 border border-blue-700/80 font-semibold flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" />
                          <span>AFFILIATE</span>
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart & Social Share triggers */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSaved(product);
                        }}
                        className={`p-2 rounded-lg backdrop-blur-md border transition-colors cursor-pointer ${
                          isSaved 
                            ? 'bg-rose-950/90 text-rose-400 border-rose-800' 
                            : 'bg-neutral-950/80 text-neutral-300 hover:text-rose-400 border-neutral-800'
                        }`}
                        title={isSaved ? 'Remove from saved' : 'Save to wishlist'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onShareProduct(product);
                        }}
                        className="p-2 rounded-lg bg-neutral-950/80 backdrop-blur-md text-neutral-300 hover:text-white border border-neutral-800 hover:border-blue-600 transition-colors cursor-pointer"
                        title="Share product & referral link"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick view prompt */}
                    <div className="absolute inset-0 bg-neutral-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3.5 py-1.5 rounded-lg bg-neutral-900/95 text-white text-xs font-semibold backdrop-blur-md border border-neutral-700 shadow-lg flex items-center gap-1.5">
                        <span>Inspect Gallery & Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Metadata & Commission Callouts */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      
                      {/* Brand & Seller Score */}
                      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono-code">
                        <span>{product.brand.toUpperCase()} · {product.category.toUpperCase()}</span>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{product.sellerRating.toFixed(1)}</span>
                          <span className="text-neutral-500">({product.reviews?.length || 1})</span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <h3 
                        onClick={() => onSelectProduct(product)}
                        className="font-display text-lg font-bold text-white group-hover:text-blue-300 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Commission & Conversion Stats Badge */}
                    {isAffiliate ? (
                      <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 space-y-1.5 text-[11px] font-mono-code">
                        <div className="flex items-center justify-between text-blue-300 font-semibold">
                          <span>Affiliate Commission:</span>
                          <span className="text-white font-bold">+{product.affiliateRate || 5}% per sale</span>
                        </div>
                        <div className="flex items-center justify-between text-neutral-400 pt-1 border-t border-blue-900/40">
                          <span>Broker Cut: {settings.currencySymbol} {affiliateCommissionCut.toLocaleString()}</span>
                          <span className="text-emerald-400">{product.conversionRate || 6}% CVR · {product.clicksCount || 100} Clicks</span>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] font-mono-code text-neutral-300 flex items-center justify-between">
                        <span>Direct Broker Fee: {settings.ratePercentage}% ({settings.currencySymbol} {directCommissionCut.toLocaleString()})</span>
                        <span className="text-emerald-400">M-Pesa Escrow</span>
                      </div>
                    )}

                    {/* Pricing, WhatsApp Order & Buy Buttons */}
                    <div className="pt-3 border-t border-neutral-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold font-mono-code text-white tabular-nums">
                            {settings.currencySymbol} {product.price.toLocaleString()}
                          </p>
                          {product.originalPrice && (
                            <p className="text-[11px] text-neutral-500 line-through font-mono-code">
                              {settings.currencySymbol} {product.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>

                        {/* WhatsApp Direct Order Button */}
                        <button
                          onClick={() => handleWhatsAppOrder(product)}
                          className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 transition-colors cursor-pointer"
                          title="Order or inquire directly on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                      </div>

                      {/* Primary Action Button (Affiliate partner link vs Direct Cart) */}
                      {isAffiliate ? (
                        <button
                          onClick={() => handleAffiliateBuy(product)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer"
                        >
                          <span>Buy on Partner Store & Track Commission</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onAddToCart(product)}
                          className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added to Bag</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5 text-blue-400" />
                              <span>Add to Bag ({settings.currencySymbol} {product.price.toLocaleString()})</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
