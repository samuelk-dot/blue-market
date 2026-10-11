import React, { useState } from 'react';
import { X, Sliders, DollarSign, Package, TrendingUp, Download, Upload, RotateCcw, Check, Copy, Trash2, Plus, Info, Edit2, ExternalLink, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { CommissionSettings, ProductItem, MarketplaceOrder } from '../types/marketplace';

interface MarketplaceDevStudioProps {
  isOpen: boolean;
  onClose: () => void;
  settings: CommissionSettings;
  products: ProductItem[];
  orders: MarketplaceOrder[];
  onUpdateSettings: (newSettings: CommissionSettings) => void;
  onUpdateProducts: (newProducts: ProductItem[]) => void;
  onResetDefaults: () => void;
}

export const MarketplaceDevStudio: React.FC<MarketplaceDevStudioProps> = ({
  isOpen,
  onClose,
  settings,
  products,
  orders,
  onUpdateSettings,
  onUpdateProducts,
  onResetDefaults,
}) => {
  const [activeTab, setActiveTab] = useState<'commission' | 'products' | 'affiliate' | 'orders' | 'sync'>('products');
  const [copiedExport, setCopiedExport] = useState(false);
  
  // New product form
  const [newProductOpen, setNewProductOpen] = useState(false);
  const [editProductOpen, setEditProductOpen] = useState<string | null>(null);

  // Form states (used for both Add and Edit)
  const [itemTitle, setItemTitle] = useState('');
  const [itemBrand, setItemBrand] = useState('');
  const [itemPrice, setItemPrice] = useState(199);
  const [itemCategory, setItemCategory] = useState<ProductItem['category']>('vehicles');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [itemIsAffiliate, setItemIsAffiliate] = useState(false);
  const [itemAffiliateLink, setItemAffiliateLink] = useState('');
  const [itemAffiliateRate, setItemAffiliateRate] = useState(7.5);
  const [itemAffiliatePartner, setItemAffiliatePartner] = useState('');
  const [itemWhatsapp, setItemWhatsapp] = useState('');

  if (!isOpen) return null;

  const totalCommissionsEarned = orders.reduce((sum, ord) => sum + ord.commissionAmount, 0) + 10395;
  const totalVolume = orders.reduce((sum, ord) => sum + ord.subtotal, 0) + 148500;

  // Affiliate stats
  const affiliateProducts = products.filter(p => p.isAffiliate);
  const totalAffiliateClicks = affiliateProducts.reduce((sum, p) => sum + (p.clicksCount || 0), 0);
  const estAffiliateEarnings = affiliateProducts.reduce((sum, p) => {
    const clicks = p.clicksCount || 0;
    const cvr = (p.conversionRate || 5) / 100;
    const sales = clicks * cvr;
    const commPerSale = (p.price * (p.affiliateRate || 5)) / 100;
    return sum + (sales * commPerSale);
  }, 0);

  const handleSettingChange = (field: keyof CommissionSettings, value: any) => {
    onUpdateSettings({
      ...settings,
      [field]: value
    });
  };

  const handleStartEdit = (p: ProductItem) => {
    setEditProductOpen(p.id);
    setNewProductOpen(false);
    setItemTitle(p.title);
    setItemBrand(p.brand);
    setItemPrice(p.price);
    setItemCategory(p.category);
    setItemImageUrl(p.image);
    setItemIsAffiliate(Boolean(p.isAffiliate));
    setItemAffiliateLink(p.affiliateLink || '');
    setItemAffiliateRate(p.affiliateRate || 7.0);
    setItemAffiliatePartner(p.affiliatePartner || '');
    setItemWhatsapp(p.whatsappNumber || settings.whatsappContactNumber || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProductOpen) return;

    const updated = products.map(p => {
      if (p.id === editProductOpen) {
        return {
          ...p,
          title: itemTitle,
          brand: itemBrand || p.brand,
          price: Number(itemPrice),
          category: itemCategory,
          image: itemImageUrl.trim() ? itemImageUrl.trim() : p.image,
          isAffiliate: itemIsAffiliate,
          affiliateLink: itemIsAffiliate ? itemAffiliateLink : undefined,
          affiliateRate: itemIsAffiliate ? Number(itemAffiliateRate) : undefined,
          affiliatePartner: itemIsAffiliate ? itemAffiliatePartner : undefined,
          whatsappNumber: itemWhatsapp || settings.whatsappContactNumber
        };
      }
      return p;
    });

    onUpdateProducts(updated);
    setEditProductOpen(null);
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemTitle || !itemPrice) return;

    const item: ProductItem = {
      id: `dev-prod-${Date.now()}`,
      title: itemTitle,
      brand: itemBrand || (itemIsAffiliate ? 'Affiliate Partner' : 'Direct Merchant'),
      price: Number(itemPrice),
      originalPrice: Math.round(Number(itemPrice) * 1.2),
      category: itemCategory,
      condition: 'Brand New',
      description: 'Added via BlueMarket Developer & Product Management Console.',
      specs: ['Inspected Quality', itemIsAffiliate ? 'External Affiliate Tracking' : 'Escrow Protected'],
      image: itemImageUrl.trim() ? itemImageUrl.trim() : '/src/assets/images/product_audio_headphones_1791459197494.jpg',
      sellerName: 'Direct Merchant',
      sellerRating: 5.0,
      sellerLocation: 'Regional Distribution Center',
      inStock: true,
      featured: false,
      salesCount: 0,
      isAffiliate: itemIsAffiliate,
      affiliateLink: itemIsAffiliate ? itemAffiliateLink : undefined,
      affiliateRate: itemIsAffiliate ? Number(itemAffiliateRate) : undefined,
      affiliatePartner: itemIsAffiliate ? itemAffiliatePartner : undefined,
      clicksCount: itemIsAffiliate ? 0 : undefined,
      conversionRate: itemIsAffiliate ? 5.0 : undefined,
      whatsappNumber: itemWhatsapp || settings.whatsappContactNumber
    };

    onUpdateProducts([item, ...products]);
    setNewProductOpen(false);
    setItemTitle('');
    setItemBrand('');
    setItemPrice(199);
    setItemImageUrl('');
    setItemIsAffiliate(false);
    setItemAffiliateLink('');
  };

  const handleDeleteProduct = (productId: string) => {
    onUpdateProducts(products.filter(p => p.id !== productId));
  };

  const handleExportJson = () => {
    const data = {
      settings,
      products,
      orders
    };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl h-full bg-neutral-900 border-l border-blue-900/60 flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-600/40">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">Marketplace & Affiliate Studio</h3>
              <p className="text-xs text-neutral-400">Live in-browser product management & commission console</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 px-4 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'products' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Product Management ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('affiliate')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'affiliate' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            <span>Affiliate Hub ({affiliateProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('commission')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'commission' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Commission Rates</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'orders' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Orders Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('sync')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'sync' ? 'border-blue-500 text-white' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: PRODUCT MANAGEMENT (ADD / EDIT / DELETE) */}
          {activeTab === 'products' && (
            <div className="space-y-5 text-xs">
              <div className="flex items-center justify-between">
                <p className="text-neutral-400">Add or edit products with image URLs, categories & affiliate links.</p>
                <button
                  onClick={() => {
                    setNewProductOpen(!newProductOpen);
                    setEditProductOpen(null);
                    setItemTitle('');
                    setItemPrice(199);
                    setItemImageUrl('');
                    setItemIsAffiliate(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{newProductOpen ? 'Cancel' : 'Add New Item'}</span>
                </button>
              </div>

              {/* Add / Edit Form */}
              {(newProductOpen || editProductOpen) && (
                <form 
                  onSubmit={editProductOpen ? handleSaveEdit : handleAddNewProduct} 
                  className="p-5 rounded-xl bg-neutral-950 border border-blue-900/60 space-y-3.5 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-sm">
                      {editProductOpen ? 'Edit Product Details' : 'Add New Product to Store'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => { setEditProductOpen(null); setNewProductOpen(false); }}
                      className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Title & Brand */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-300 mb-1 font-mono-code">Product Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sony WH-1000XM5"
                        value={itemTitle}
                        onChange={(e) => setItemTitle(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 mb-1 font-mono-code">Brand</label>
                      <input
                        type="text"
                        placeholder="e.g. Sony, Apple"
                        value={itemBrand}
                        onChange={(e) => setItemBrand(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white"
                      />
                    </div>
                  </div>

                  {/* Price & Category */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-neutral-300 mb-1 font-mono-code">Price ({settings.currencySymbol}) *</label>
                      <input
                        type="number"
                        required
                        value={itemPrice}
                        onChange={(e) => setItemPrice(Number(e.target.value))}
                        className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white font-mono-code font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 mb-1 font-mono-code">Category</label>
                      <select
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value as any)}
                        className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white"
                      >
                        <option value="vehicles">Vehicles & Cars</option>
                        <option value="motorbikes">Motorbikes & Boda</option>
                        <option value="spare-parts">Car & Bike Spare Parts</option>
                        <option value="electronics">Electronics, Laptops & Phones</option>
                        <option value="fashion">Fashion, Jewelry & Wearables</option>
                      </select>
                    </div>
                  </div>

                  {/* Image URL input */}
                  <div>
                    <label className="block text-neutral-300 mb-1 font-mono-code">Product Image URL</label>
                    <input
                      type="url"
                      placeholder="https://images.example.com/item.jpg"
                      value={itemImageUrl}
                      onChange={(e) => setItemImageUrl(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white font-mono-code text-[11px]"
                    />
                  </div>

                  {/* WhatsApp contact number */}
                  <div>
                    <label className="block text-neutral-300 mb-1 font-mono-code flex items-center gap-1.5">
                      <MessageCircle className="w-3 h-3 text-emerald-400" />
                      <span>WhatsApp Order Phone (for direct customer inquiries)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+254712345678"
                      value={itemWhatsapp}
                      onChange={(e) => setItemWhatsapp(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 text-white font-mono-code text-[11px]"
                    />
                  </div>

                  {/* Affiliate Settings Toggle */}
                  <div className="p-3.5 rounded-lg bg-blue-950/40 border border-blue-900/60 space-y-2.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={itemIsAffiliate}
                        onChange={(e) => setItemIsAffiliate(e.target.checked)}
                        className="rounded border-neutral-700 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="font-semibold text-white">Enable as Affiliate Partner Listing</span>
                    </label>

                    {itemIsAffiliate && (
                      <div className="space-y-2.5 pt-1">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-neutral-300 mb-1 font-mono-code text-[11px]">Affiliate Commission (%)</label>
                            <input
                              type="number"
                              step="0.5"
                              value={itemAffiliateRate}
                              onChange={(e) => setItemAffiliateRate(Number(e.target.value))}
                              className="w-full px-2.5 py-1 rounded-md bg-neutral-900 border border-blue-800 text-white font-mono-code"
                            />
                          </div>
                          <div>
                            <label className="block text-neutral-300 mb-1 font-mono-code text-[11px]">Partner Network</label>
                            <input
                              type="text"
                              placeholder="e.g. Amazon, AliExpress"
                              value={itemAffiliatePartner}
                              onChange={(e) => setItemAffiliatePartner(e.target.value)}
                              className="w-full px-2.5 py-1 rounded-md bg-neutral-900 border border-blue-800 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-neutral-300 mb-1 font-mono-code text-[11px]">Affiliate Referral Link / URL</label>
                          <input
                            type="url"
                            placeholder="https://partner.com/ref?code=..."
                            value={itemAffiliateLink}
                            onChange={(e) => setItemAffiliateLink(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-md bg-neutral-900 border border-blue-800 text-white font-mono-code text-[11px]"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors mt-2 cursor-pointer shadow-md shadow-blue-600/30"
                  >
                    {editProductOpen ? 'Save Product Changes' : 'Publish Product to Store'}
                  </button>
                </form>
              )}

              {/* Products List with Edit & Delete actions */}
              <div className="space-y-3">
                {products.map((p) => {
                  const cut = p.isAffiliate 
                    ? (p.price * (p.affiliateRate || 5)) / 100 
                    : (p.price * settings.ratePercentage) / 100;

                  return (
                    <div key={p.id} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-3 hover:border-neutral-700 transition-colors">
                      <img src={p.image} alt={p.title} className="w-12 h-12 rounded-lg object-cover bg-neutral-900 shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-white truncate">{p.title}</p>
                          {p.isAffiliate && (
                            <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 shrink-0">
                              AFFILIATE
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-400 font-mono-code text-[11px] mt-0.5">
                          {settings.currencySymbol}{p.price} · {p.isAffiliate ? `Affiliate: ${p.affiliateRate}% (+${settings.currencySymbol}${cut.toFixed(2)})` : `Direct: ${settings.ratePercentage}%`}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(p)}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-neutral-800"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer rounded-lg hover:bg-neutral-800"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: AFFILIATE HUB & CONVERSION ANALYTICS */}
          {activeTab === 'affiliate' && (
            <div className="space-y-5 text-xs">
              <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-300 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                  <span>External Affiliate Performance</span>
                </p>
                <p className="text-neutral-300">
                  Track external affiliate partner referrals, clicks, and estimated commission payouts generated through BlueMarket.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-3 gap-3 font-mono-code">
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <p className="text-[10px] text-neutral-400">AFFILIATE PRODUCTS</p>
                  <p className="text-xl font-bold text-white">{affiliateProducts.length}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <p className="text-[10px] text-neutral-400">TOTAL CLICKS</p>
                  <p className="text-xl font-bold text-blue-400">{totalAffiliateClicks}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/60 space-y-1">
                  <p className="text-[10px] text-blue-300">EST. EARNINGS</p>
                  <p className="text-xl font-bold text-emerald-400">+{settings.currencySymbol}{estAffiliateEarnings.toFixed(2)}</p>
                </div>
              </div>

              {/* Affiliate Items Breakdown */}
              <div className="space-y-3">
                <h4 className="font-bold text-white text-sm">Active Affiliate Partner Products</h4>
                {affiliateProducts.length === 0 ? (
                  <p className="text-neutral-500 italic py-4 text-center border border-dashed border-neutral-800 rounded-xl">
                    No affiliate items listed. Click &quot;Add New Item&quot; in the Catalog tab to add one!
                  </p>
                ) : (
                  affiliateProducts.map(p => (
                    <div key={p.id} className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white truncate">{p.title}</span>
                        <span className="font-mono-code text-blue-400 font-semibold">{p.affiliateRate}% Comm</span>
                      </div>
                      <div className="flex justify-between text-neutral-400 font-mono-code text-[11px]">
                        <span>Partner: {p.affiliatePartner || 'Partner'}</span>
                        <span>{p.clicksCount || 0} Clicks · {p.conversionRate || 5}% CVR</span>
                      </div>
                      <div className="text-[11px] font-mono-code text-neutral-500 truncate pt-1 border-t border-neutral-900">
                        Link: {p.affiliateLink || 'None'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: COMMISSION ENGINE */}
          {activeTab === 'commission' && (
            <div className="space-y-5 text-xs">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Marketplace Platform Name</label>
                <input
                  type="text"
                  value={settings.marketplaceName}
                  onChange={(e) => handleSettingChange('marketplaceName', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Direct Commission Rate (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="30"
                    value={settings.ratePercentage}
                    onChange={(e) => handleSettingChange('ratePercentage', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono-code font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-semibold mb-1">Currency Symbol</label>
                  <select
                    value={settings.currencySymbol}
                    onChange={(e) => {
                      const sym = e.target.value;
                      const code = sym === 'KES' ? 'KES' : sym === '€' ? 'EUR' : sym === '£' ? 'GBP' : 'USD';
                      handleSettingChange('currencySymbol', sym);
                      handleSettingChange('currencyCode', code);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono-code font-bold focus:outline-none focus:border-blue-500"
                  >
                    <option value="$">$ (USD)</option>
                    <option value="KES">KES (Kenyan Shilling)</option>
                    <option value="€">€ (EUR)</option>
                    <option value="£">£ (GBP)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Default WhatsApp Order Phone</label>
                <input
                  type="tel"
                  value={settings.whatsappContactNumber || '+254712345678'}
                  onChange={(e) => handleSettingChange('whatsappContactNumber', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono-code focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Broker Payout Email</label>
                <input
                  type="email"
                  value={settings.ownerEmail}
                  onChange={(e) => handleSettingChange('ownerEmail', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono-code focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS & LEDGER */}
          {activeTab === 'orders' && (
            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                  <p className="text-[10px] text-neutral-400 font-mono-code">TOTAL ESCROW VOLUME</p>
                  <p className="text-xl font-bold font-mono-code text-white">
                    {settings.currencySymbol}{totalVolume.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-900/60 space-y-1">
                  <p className="text-[10px] text-blue-300 font-mono-code">DIRECT COMMISSIONS</p>
                  <p className="text-xl font-bold font-mono-code text-blue-400">
                    +{settings.currencySymbol}{totalCommissionsEarned.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm">Recent Transacted Orders</h4>
                {orders.length === 0 ? (
                  <p className="text-neutral-500 italic py-4 text-center border border-dashed border-neutral-800 rounded-xl">
                    No orders placed in this session yet. Complete a checkout to log a transaction.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {orders.map((ord) => (
                      <div key={ord.id} className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1.5 font-mono-code">
                        <div className="flex justify-between items-center text-white">
                          <span className="font-bold text-blue-400">{ord.id}</span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            {ord.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-neutral-400 text-[11px]">
                          <span>Buyer: {ord.customerName}</span>
                          <span>{ord.date}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-neutral-900 text-xs">
                          <span className="text-neutral-300">Volume: {settings.currencySymbol}{ord.subtotal.toFixed(2)}</span>
                          <span className="text-blue-400 font-bold">Commission Cut: +{settings.currencySymbol}{ord.commissionAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: SYNC & EXPORT */}
          {activeTab === 'sync' && (
            <div className="space-y-5 text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-white text-sm">Export Store & Affiliate Data</h4>
                <p className="text-neutral-400">
                  Copy the full store state, including affiliate links and commission settings as JSON.
                </p>
              </div>

              <button
                onClick={handleExportJson}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium border border-neutral-700 transition-colors cursor-pointer"
              >
                {copiedExport ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedExport ? 'Store JSON Copied!' : 'Copy Full Store Data'}</span>
              </button>

              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={() => {
                    if (confirm('Reset to default BlueMarket store catalog, affiliate items, and settings?')) {
                      onResetDefaults();
                    }
                  }}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Settings & Items to Defaults</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <span className="text-xs text-neutral-400 font-mono-code">
            Auto-saved in Chrome Storage
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
