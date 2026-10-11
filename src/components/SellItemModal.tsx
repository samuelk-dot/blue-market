import React, { useState } from 'react';
import { X, PlusCircle, DollarSign, ShieldCheck, Check, Sparkles, Image as ImageIcon, ExternalLink, Link as LinkIcon, MessageCircle } from 'lucide-react';
import { ProductItem, CommissionSettings } from '../types/marketplace';

interface SellItemModalProps {
  isOpen: boolean;
  settings: CommissionSettings;
  onClose: () => void;
  onAddProduct: (product: ProductItem) => void;
}

const PRESET_IMAGES = [
  { name: 'Headphones', url: '/src/assets/images/product_audio_headphones_1791459197494.jpg' },
  { name: 'Smartwatch', url: '/src/assets/images/product_smartwatch_titanium_1791459209101.jpg' },
  { name: 'Cinema Camera', url: '/src/assets/images/product_dslr_camera_1791459218382.jpg' },
  { name: 'Mechanical Keyboard', url: '/src/assets/images/product_mechanical_keyboard_1791459227368.jpg' },
];

export const SellItemModal: React.FC<SellItemModalProps> = ({
  isOpen,
  settings,
  onClose,
  onAddProduct,
}) => {
  const [listingType, setListingType] = useState<'direct' | 'affiliate'>('direct');
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState<number>(250);
  const [category, setCategory] = useState<ProductItem['category']>('vehicles');
  const [condition, setCondition] = useState<ProductItem['condition']>('Brand New');
  const [description, setDescription] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappContactNumber || '+254712345678');
  
  // Image handling: preset or custom URL
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);

  // Affiliate specific fields
  const [affiliateLink, setAffiliateLink] = useState('');
  const [affiliateRate, setAffiliateRate] = useState<number>(8.0);
  const [affiliatePartner, setAffiliatePartner] = useState('Amazon / Partner Network');

  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const isAffiliate = listingType === 'affiliate';
  const finalImage = customImageUrl.trim() ? customImageUrl.trim() : selectedImage;
  const directCommission = (Number(price || 0) * settings.ratePercentage) / 100;
  const affiliateEarning = (Number(price || 0) * affiliateRate) / 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !sellerName) return;

    const newProduct: ProductItem = {
      id: `listing-${Date.now()}`,
      title,
      brand: brand || (isAffiliate ? 'Affiliate Partner' : 'Verified Seller'),
      price: Number(price),
      originalPrice: Math.round(Number(price) * 1.15),
      category,
      condition,
      description: description || 'High-performance gear verified for immediate purchase and delivery.',
      specs: ['Inspected Quality', 'Direct WhatsApp Orders Supported', isAffiliate ? 'External Affiliate Tracking' : 'Escrow Insured'],
      image: finalImage,
      sellerName,
      sellerRating: 5.0,
      sellerLocation: 'Regional Distribution Hub',
      inStock: true,
      featured: false,
      salesCount: 1,
      isAffiliate,
      affiliateLink: isAffiliate ? (affiliateLink || 'https://partner.example.com/ref') : undefined,
      affiliateRate: isAffiliate ? Number(affiliateRate) : undefined,
      affiliatePartner: isAffiliate ? affiliatePartner : undefined,
      clicksCount: isAffiliate ? 14 : undefined,
      conversionRate: isAffiliate ? 5.0 : undefined,
      whatsappNumber: whatsappNumber || settings.whatsappContactNumber
    };

    onAddProduct(newProduct);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-900 border border-blue-900/60 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Item Listed Successfully!</h3>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto">
              {isAffiliate 
                ? `Affiliate deal live! Track ${affiliateRate}% commission (${settings.currencySymbol}${affiliateEarning.toFixed(2)}) on partner sales.`
                : `Direct escrow listing live on the BlueMarket catalog with WhatsApp order channels.`}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-blue-400 uppercase font-mono-code">
                Product & Commission Management
              </p>
              <h2 className="font-display text-2xl font-bold text-white">
                Add Product or Affiliate Deal
              </h2>

              {/* Type Switcher */}
              <div className="flex p-1 bg-neutral-950 border border-neutral-800 rounded-lg gap-1">
                <button
                  type="button"
                  onClick={() => setListingType('direct')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    listingType === 'direct' ? 'bg-blue-600 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Direct Escrow Product
                </button>
                <button
                  type="button"
                  onClick={() => setListingType('affiliate')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    listingType === 'affiliate' ? 'bg-blue-600 text-white shadow-sm' : 'text-blue-400 hover:text-white'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Affiliate Deal ({affiliateRate}% Comm)</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony Wireless Studio Headphones"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                  Brand
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sony, Apple, Bose"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="vehicles">Vehicles & Cars</option>
                  <option value="motorbikes">Motorbikes & Boda</option>
                  <option value="spare-parts">Car & Bike Spare Parts</option>
                  <option value="electronics">Electronics, Laptops & Phones</option>
                  <option value="fashion">Fashion, Jewelry & Wearables</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                  Item Price ({settings.currencySymbol}) *
                </label>
                <input
                  type="number"
                  min="5"
                  step="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs font-bold font-mono-code rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Affiliate specific parameters */}
            {isAffiliate ? (
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60 space-y-3">
                <div className="flex items-center gap-1.5 text-xs text-blue-300 font-mono-code font-bold">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Affiliate Commission Setup</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1 font-mono-code">
                      Affiliate Commission Rate (%)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      step="0.5"
                      value={affiliateRate}
                      onChange={(e) => setAffiliateRate(Number(e.target.value))}
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-neutral-900 border border-blue-800 text-white font-mono-code"
                    />
                    <p className="text-[10px] text-blue-300 mt-1">
                      You earn {settings.currencySymbol}{affiliateEarning.toFixed(2)} on each sale
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-300 mb-1 font-mono-code">
                      Partner Network Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Amazon, AliExpress, Apple"
                      value={affiliatePartner}
                      onChange={(e) => setAffiliatePartner(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-md bg-neutral-900 border border-blue-800 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-mono-code">
                    Affiliate Referral Link / URL *
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      required={isAffiliate}
                      placeholder="https://partner-network.com/item/ref?aff=samuel_kinguri"
                      value={affiliateLink}
                      onChange={(e) => setAffiliateLink(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-neutral-900 border border-blue-800 text-white font-mono-code focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono-code space-y-1">
                <div className="flex justify-between text-neutral-400">
                  <span>Direct Platform Commission ({settings.ratePercentage}%):</span>
                  <span className="text-blue-400">+{settings.currencySymbol}{directCommission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Seller Net Payout:</span>
                  <span className="text-emerald-400 font-bold">+{settings.currencySymbol}{(price - directCommission).toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* WhatsApp Ordering & Contact Phone */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Order Contact Number</span>
              </label>
              <input
                type="tel"
                placeholder="+254 712 345 678"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500 font-mono-code"
              />
              <p className="text-[10px] text-neutral-500 mt-1">
                Buyers can click &quot;Order via WhatsApp&quot; on the product card to contact this number directly.
              </p>
            </div>

            {/* Custom Image URL or Preset */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-neutral-300 font-mono-code uppercase">
                Product Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/images/my-product.jpg (Optional custom URL)"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500 font-mono-code"
              />

              <p className="text-[11px] text-neutral-400 font-mono-code">Or choose a preset product photo:</p>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_IMAGES.map((img) => (
                  <button
                    key={img.name}
                    type="button"
                    onClick={() => {
                      setSelectedImage(img.url);
                      setCustomImageUrl('');
                    }}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img.url && !customImageUrl ? 'border-blue-500 scale-95 shadow-md shadow-blue-500/30' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Seller Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1 font-mono-code uppercase">
                Merchant / Promoter Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Samuel King'uri"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
            >
              Publish {isAffiliate ? `Affiliate Deal (${affiliateRate}% Commission)` : `Direct Listing`} to BlueMarket
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
