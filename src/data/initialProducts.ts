import { ProductItem, CommissionSettings } from '../types/marketplace';

export const INITIAL_COMMISSION_SETTINGS: CommissionSettings = {
  marketplaceName: "BlueMarket Africa",
  ratePercentage: 5.0, // 5% broker commission
  escrowFeePercentage: 1.0,
  currencySymbol: "KSh",
  currencyCode: "KES",
  deliveryFee: 450, // Standard delivery within Kenya / major towns
  payoutMethod: "M-Pesa Express & Bank Transfer",
  ownerEmail: "samuelkinguri13@gmail.com",
  whatsappContactNumber: "+254712345678",
  mpesaPaybill: "522522",
  mpesaAccount: "BLUEMARKET-SAMUEL"
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  // 1. VEHICLES SECTION
  {
    id: "vehicle-suv-crossover-blue",
    title: "Cobalt Blue Luxury AWD Crossover SUV (2024)",
    brand: "Grecale Modena",
    price: 4250000,
    originalPrice: 4600000,
    category: "vehicles",
    condition: "Foreign Used / Mint",
    description: "Immaculate metallic cobalt blue AWD crossover. Fully loaded with leather panoramic cabin, 360-degree parking cameras, ADAS safety suite, and turbocharged 2.0L mild-hybrid engine. Verified duty paid with clean NTSA logbook.",
    specs: ["2.0L Turbo Mild-Hybrid 300HP", "AWD Intelligent Drivetrain", "Clean Logbook & Duty Paid", "Mileage: 18,400 KM", "Full Panoramic Sunroof"],
    image: "/src/assets/images/vehicle_suv_blue_1791460879808.jpg",
    galleryImages: [
      "/src/assets/images/vehicle_suv_blue_1791460879808.jpg",
      "/src/assets/images/blue_marketplace_hero_1791459186345.jpg"
    ],
    sellerName: "Nairobi Premier Auto Hub",
    sellerRating: 4.9,
    sellerLocation: "Mombasa Road, Nairobi",
    inStock: true,
    featured: true,
    salesCount: 14,
    isAffiliate: false,
    whatsappNumber: "+254712345678",
    reviews: [
      {
        id: "rev-1",
        userName: "Dennis Mwangi",
        userEmail: "dennis@example.com",
        rating: 5,
        comment: "Inspected the vehicle in Nairobi. Immaculate condition and paperwork was 100% verified via NTSA.",
        date: "Oct 2, 2026"
      }
    ]
  },

  // 2. MOTORBIKES SECTION
  {
    id: "motorbike-nexus-250r-blue",
    title: "Nexus 250R Street & Commuter Motorbike",
    brand: "Nexus Moto",
    price: 265000,
    originalPrice: 295000,
    category: "motorbikes",
    condition: "Brand New",
    description: "High-efficiency 250cc liquid-cooled street motorbike. Exceptional fuel economy of 38 km/L, dual-channel ABS disc brakes, inverted front forks, digital TFT speedometer, and heavy-duty chassis suited for urban and rough terrain.",
    specs: ["250cc Liquid-Cooled 4-Stroke", "38 km/L Fuel Efficiency", "Dual-Channel ABS Front/Rear", "Digital TFT Smart Cluster", "Luggage Carrier Ready"],
    image: "/src/assets/images/motorbike_yamaha_blue_1791460891358.jpg",
    galleryImages: [
      "/src/assets/images/motorbike_yamaha_blue_1791460891358.jpg",
      "/src/assets/images/car_spare_parts_engine_1791460902930.jpg"
    ],
    sellerName: "Rift Valley Motors & Boda",
    sellerRating: 5.0,
    sellerLocation: "Industrial Area, Nairobi & Nakuru",
    inStock: true,
    featured: true,
    salesCount: 42,
    isAffiliate: true,
    affiliatePartner: "Nexus East Africa Moto Dealership",
    affiliateRate: 6.0,
    affiliateLink: "https://nexusmoto.africa/partner/samuel?bike=250r",
    clicksCount: 680,
    conversionRate: 8.2,
    whatsappNumber: "+254712345678",
    reviews: [
      {
        id: "rev-2",
        userName: "Kevin Ochieng",
        userEmail: "kevin.o@example.com",
        rating: 5,
        comment: "Excellent bike for daily commutes in Nairobi traffic. Low fuel consumption and very solid build.",
        date: "Sep 28, 2026"
      }
    ]
  },

  // 3. SPARE PARTS SECTION (CARS & MOTORBIKES)
  {
    id: "spare-parts-brembo-suspension-kit",
    title: "High Performance Brake Disc & Shock Absorber Upgrade Kit",
    brand: "Apex Performance Parts",
    price: 48500,
    originalPrice: 56000,
    category: "spare-parts",
    condition: "Brand New",
    description: "Heavy-duty ventilated cross-drilled rotor, powder-coated blue caliper, Öhlins adjustable damper coilover, and high-flow air filter. Direct fit for popular Japanese and European vehicles & sport bikes.",
    specs: ["Ventilated Cross-Drilled Rotor", "High-Temp Ceramic Brake Pads", "Adjustable Monotube Coilover", "High-Flow Washable Air Filter", "Universal Bracket Adapters"],
    image: "/src/assets/images/car_spare_parts_engine_1791460902930.jpg",
    galleryImages: [
      "/src/assets/images/car_spare_parts_engine_1791460902930.jpg",
      "/src/assets/images/vehicle_suv_blue_1791460879808.jpg"
    ],
    sellerName: "Autospares Kenya Direct",
    sellerRating: 4.8,
    sellerLocation: "Kirinyaga Road, Nairobi",
    inStock: true,
    featured: true,
    salesCount: 88,
    isAffiliate: false,
    whatsappNumber: "+254712345678",
    reviews: [
      {
        id: "rev-3",
        userName: "Brian Kimani",
        userEmail: "brian.k@example.com",
        rating: 5,
        comment: "Fitted on my Subaru Forester. Stopping power is night and day compared to stock brakes.",
        date: "Oct 1, 2026"
      }
    ]
  },

  // 4. ELECTRONICS SECTION (LAPTOPS, COMPUTERS, PHONES)
  {
    id: "electronics-macbook-pro-m3-bundle",
    title: "Pro Ultrabook 14-inch & Flagship 5G Smartphone Workstation",
    brand: "TechBlue Pro",
    price: 185000,
    originalPrice: 210000,
    category: "electronics",
    condition: "Brand New",
    description: "High-performance ultrabook featuring Liquid Retina XDR display, 18-hour all-day battery life, 16GB Unified RAM, and 512GB SSD alongside high-res flagship 5G OLED smartphone for seamless mobile productivity.",
    specs: ["14.2-inch Liquid Retina XDR (120Hz)", "16GB Unified RAM · 512GB NVMe", "Thunderbolt 4 / HDMI / MagSafe", "Includes 6.7-inch 5G OLED Phone", "1-Year Official Warranty"],
    image: "/src/assets/images/laptop_electronics_mac_1791460913881.jpg",
    galleryImages: [
      "/src/assets/images/laptop_electronics_mac_1791460913881.jpg",
      "/src/assets/images/product_mechanical_keyboard_1791459227368.jpg",
      "/src/assets/images/product_audio_headphones_1791459197494.jpg"
    ],
    sellerName: "Silicon Savannah Electronics",
    sellerRating: 4.9,
    sellerLocation: "Kimathi Street, Nairobi CBD",
    inStock: true,
    featured: true,
    salesCount: 56,
    isAffiliate: true,
    affiliatePartner: "East Africa Tech Distributors",
    affiliateRate: 7.0,
    affiliateLink: "https://techdistributors.example.com/partner/samuel?mac=m3pro",
    clicksCount: 920,
    conversionRate: 6.5,
    whatsappNumber: "+254712345678",
    reviews: [
      {
        id: "rev-4",
        userName: "Faith Chebet",
        userEmail: "faith.c@example.com",
        rating: 5,
        comment: "Delivered to Westlands within 2 hours of M-Pesa escrow order. Genuine sealed box with warranty.",
        date: "Oct 5, 2026"
      }
    ]
  },

  // 5. FASHION & WEARABLES SECTION (CLOTHING, JEWELRY, WATCHES)
  {
    id: "fashion-lorenzo-varesi-navy-set",
    title: "Italian Bespoke Navy Wool Blazer & Sapphire Chronograph Set",
    brand: "Lorenzo Varesi",
    price: 45000,
    originalPrice: 52000,
    category: "fashion",
    condition: "Brand New",
    description: "Handcrafted 100% fine Italian merino wool single-breasted navy blazer with brass crest buttons, paired with a precision Swiss-movement blue sapphire dial chronograph watch, full-grain woven leather belt, and matching cardholder.",
    specs: ["100% Italian Super 120s Wool", "Swiss Movement Chronograph Watch", "Hand-Polished Brass Crest Buttons", "Genuine Full-Grain Woven Leather", "Tailored Regular & Slim Fit"],
    image: "/src/assets/images/fashion_luxury_jewelry_1791460925984.jpg",
    galleryImages: [
      "/src/assets/images/fashion_luxury_jewelry_1791460925984.jpg",
      "/src/assets/images/product_smartwatch_titanium_1791459209101.jpg"
    ],
    sellerName: "Sartorial Nairobi Sartoria",
    sellerRating: 5.0,
    sellerLocation: "Village Market, Gigiri, Nairobi",
    inStock: true,
    featured: true,
    salesCount: 31,
    isAffiliate: false,
    whatsappNumber: "+254712345678",
    reviews: [
      {
        id: "rev-5",
        userName: "Marcus Otieno",
        userEmail: "marcus@example.com",
        rating: 5,
        comment: "Fit was impeccable for my graduation and wedding. The chronograph watch looks like a million bucks.",
        date: "Sep 20, 2026"
      }
    ]
  },

  // 6. AUDIO & STUDIO GADGETS
  {
    id: "blue-studio-headphones-v1",
    title: "Aura Pro Wireless Studio Headphones",
    brand: "SonicBlue",
    price: 38500,
    originalPrice: 44000,
    category: "electronics",
    condition: "Brand New",
    description: "Audiophile-grade acoustic drivers with hybrid active noise cancellation, custom cobalt alloy arms, 45-hour battery longevity, and low-latency Bluetooth 5.4.",
    specs: ["40mm Beryllium Drivers", "Hybrid Active Noise Cancellation", "45-hour Playback", "Multipoint Audio Pairing"],
    image: "/src/assets/images/product_audio_headphones_1791459197494.jpg",
    galleryImages: [
      "/src/assets/images/product_audio_headphones_1791459197494.jpg"
    ],
    sellerName: "Nairobi Audio Labs",
    sellerRating: 4.9,
    sellerLocation: "Westlands, Nairobi",
    inStock: true,
    featured: false,
    salesCount: 38,
    isAffiliate: false,
    whatsappNumber: "+254712345678"
  }
];
