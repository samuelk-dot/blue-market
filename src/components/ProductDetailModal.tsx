import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, ShieldCheck, Star, Truck, Check, ArrowRight, ExternalLink, MessageCircle, Share2, Copy, Heart, Plus } from 'lucide-react';
import { ProductItem, CommissionSettings, ProductReview, CustomerUser } from '../types/marketplace';

interface ProductDetailModalProps {
  product: ProductItem | null;
  settings: CommissionSettings;
  currentUser: CustomerUser | null;
  isSaved: boolean;
  onToggleSaved: (product: ProductItem) => void;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
  onDirectCheckout: (product: ProductItem) => void;
  onTrackAffiliateClick: (product: ProductItem) => void;
  onShareProduct: (product: ProductItem) => void;
  onOpenAddReview: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  settings,
  currentUser,
  isSaved,
  onToggleSaved,
  onClose,
  onAddToCart,
  onDirectCheckout,
  onTrackAffiliateClick,
  onShareProduct,
  onOpenAddReview,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const gallery = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.image];

  const isAffiliate = Boolean(product.isAffiliate);
  const directCommission = (product.price * settings.ratePercentage) / 100;
  const sellerNet = product.price - directCommission;
  const affiliateCommission = (product.price * (product.affiliateRate || 5)) / 100;

  const handleWhatsAppOrder = () => {
    const phone = product.whatsappNumber || settings.whatsappContactNumber || '+254712345678';
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const town = currentUser?.deliveryTown || 'Nairobi';
    const text = encodeURIComponent(
      `Hello! I would like to order "${product.title}" (${settings.currencySymbol} ${product.price.toLocaleString()}) on ${settings.marketplaceName}.\nSeller: ${product.sellerName}\nCategory: ${product.category}\nDelivery Location: ${town}\nIs this unit available for delivery via M-Pesa / Cash on Delivery?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank');
  };

  const handleAffiliateBuy = () => {
    onTrackAffiliateClick(product);
    if (product.affiliateLink) {
      window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopyLink = () => {
    const link = product.isAffiliate && product.affiliateLink ? product.affiliateLink : window.location.href;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-neutral-900 border border-blue-900/60 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Visual Showcase & Multi-Image Gallery */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4 bg-neutral-950/80 md:rounded-l-2xl border-b md:border-b-0 md:border-r border-neutral-800">
            <div className="space-y-4">
              
              {/* Main Image */}
              <div className="relative aspect-[4/3] w-full bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800">
                <img
                  src={selectedImage || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all duration-300"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono-code text-white border border-neutral-800">
                    {product.condition}
                  </span>
                  {isAffiliate && (
                    <span className="bg-blue-950/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono-code text-blue-300 border border-blue-700 font-bold">
                      AFFILIATE DEAL
                    </span>
                  )}
                </div>

                {/* Wishlist Heart */}
                <button
                  onClick={() => onToggleSaved(product)}
                  className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md border transition-colors cursor-pointer ${
                    isSaved
                      ? 'bg-rose-950/80 text-rose-400 border-rose-800'
                      : 'bg-neutral-950/80 text-neutral-300 hover:text-rose-400 border-neutral-800'
                  }`}
                  title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Multi-Image Gallery Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        selectedImage === imgUrl ? 'border-blue-500 scale-95 shadow-md shadow-blue-500/40' : 'border-neutral-800 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Delivery info tag */}
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                <p className="font-semibold text-white flex items-center gap-1.5 font-mono-code text-[11px]">
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  <span>KENYA COURIER & M-PESA DELIVERY</span>
                </p>
                <p className="text-neutral-400 text-[11px]">
                  Pay on delivery or M-Pesa escrow. Courier dispatched from {product.sellerLocation}.
                </p>
              </div>
            </div>

            {/* Social Share & Copy Link */}
            <div className="pt-2 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-900">
              <button
                onClick={() => onShareProduct(product)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Share & Refer</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied' : 'Copy Direct Link'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Specifications, Reviews & Purchase Module */}
          <div className="p-6 md:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="space-y-1">
                <p className="text-xs font-semibold text-blue-400 uppercase font-mono-code">
                  {product.brand} · {product.category.toUpperCase()}
                </p>
                <h2 className="font-display text-2xl font-bold text-white">
                  {product.title}
                </h2>
              </div>

              {/* Price display with Tabular numerals */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-mono-code text-white tabular-nums">
                  {settings.currencySymbol} {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono-code text-neutral-500 line-through">
                    {settings.currencySymbol} {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Commission Breakdown depending on Affiliate vs Direct */}
              {isAffiliate ? (
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono-code text-blue-300">
                    <span>Affiliate Partner Network:</span>
                    <span className="text-white font-semibold">{product.affiliatePartner || 'Partner Merchant'}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono-code text-blue-400">
                    <span>Broker External Commission ({product.affiliateRate || 5}%):</span>
                    <span className="font-bold text-white">+{settings.currencySymbol} {affiliateCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between font-mono-code text-neutral-400 pt-1 border-t border-blue-900/40 text-[11px]">
                    <span>Performance Metrics:</span>
                    <span className="text-emerald-400">{product.clicksCount || 140} clicks · {product.conversionRate || 6}% CVR</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-neutral-950 border border-blue-900/50 space-y-1.5 text-xs font-mono-code">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Direct Escrow Price:</span>
                    <span className="text-white font-semibold">{settings.currencySymbol} {product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-blue-400">
                    <span>Broker Commission ({settings.ratePercentage}%):</span>
                    <span>+{settings.currencySymbol} {directCommission.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-400 pt-1 border-t border-neutral-900">
                    <span>Seller Net Payout:</span>
                    <span>{settings.currencySymbol} {sellerNet.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-neutral-300 leading-relaxed">
                {product.description}
              </p>

              {/* Technical Specifications */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono-code">
                  Technical Specifications
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="truncate">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews & Ratings Section */}
              <div className="pt-3 border-t border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-amber-400 font-mono-code text-xs">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-bold">{product.sellerRating.toFixed(1)} / 5.0</span>
                    <span className="text-neutral-500">({product.reviews?.length || 1} verified ratings)</span>
                  </div>

                  <button
                    onClick={() => onOpenAddReview(product)}
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Rate Product</span>
                  </button>
                </div>

                {/* Show recent reviews */}
                {product.reviews && product.reviews.length > 0 && (
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-1">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs space-y-1">
                        <div className="flex justify-between items-center text-neutral-400 text-[11px]">
                          <span className="font-semibold text-white">{rev.userName}</span>
                          <span>{rev.date}</span>
                        </div>
                        <p className="text-neutral-300 text-[11px]">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Action Buttons: WhatsApp + Buy/Checkout */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              
              {/* WhatsApp direct order / inquiry button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-emerald-950"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order / Inquire via WhatsApp (Kenya Delivery)</span>
              </button>

              {/* Buy Options */}
              {isAffiliate ? (
                <button
                  onClick={handleAffiliateBuy}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <span>Buy on Partner Store & Track Commission</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs border border-neutral-700 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 text-blue-400" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => {
                      onDirectCheckout(product);
                      onClose();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
                  >
                    <span>Escrow Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 font-mono-code pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by BlueMarket Escrow Guarantee</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
