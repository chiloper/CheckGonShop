export interface MockProductSeed {
  id: string;
  canonicalTitle: string;
  category: string;
  brand: string;
  imageUrl: string;
  basePrice: number;
  keywords: string[];
}

export const SEED_PRODUCTS: MockProductSeed[] = [
  // --- หมวดหมู่: เฟอร์นิเจอร์และของแต่งบ้าน ---
  {
    id: 'prod-vanity-dressing-table-led',
    canonicalTitle: 'โต๊ะเครื่องแป้งมินิมอล กระจกไฟ LED ปรับแสงได้ 3 สี พร้อมลิ้นชักเก็บเครื่องสำอางและเก้าอี้สตูล',
    category: 'เฟอร์นิเจอร์และของใช้ในบ้าน',
    brand: 'Index Living Mall',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    basePrice: 2490,
    keywords: ['โต๊ะเครื่องแป้ง', 'โต๊ะแต่งหน้า', 'โต๊ะเครื่องแป้ง led', 'dressing table', 'vanity', 'โต๊ะแป้ง', 'โต๊ะ'],
  },
  {
    id: 'prod-vanity-nordic-wood',
    canonicalTitle: 'โต๊ะเครื่องแป้งไม้แท้ สไตล์มินิมอลนอร์ดิก พร้อมกระจกกลมและช่องเก็บของอเนกประสงค์',
    category: 'เฟอร์นิเจอร์และของใช้ในบ้าน',
    brand: 'SB Design Square',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    basePrice: 3890,
    keywords: ['โต๊ะเครื่องแป้ง', 'โต๊ะเครื่องแป้งไม้', 'โต๊ะแต่งตัว', 'เฟอร์นิเจอร์'],
  },
  {
    id: 'prod-vanity-condo-compact',
    canonicalTitle: 'โต๊ะเครื่องแป้งบานเปิดซ่อนกระจก ขนาดกะทัดรัด ประหยัดพื้นที่ เหมาะสำหรับห้องนอนคอนโด',
    category: 'เฟอร์นิเจอร์และของใช้ในบ้าน',
    brand: 'Koncept Furniture',
    imageUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80',
    basePrice: 1590,
    keywords: ['โต๊ะเครื่องแป้ง', 'โต๊ะเครื่องแป้งคอนโด', 'โต๊ะแป้งขนาดเล็ก', 'โต๊ะแต่งหน้า'],
  },
  {
    id: 'prod-ergonomic-chair',
    canonicalTitle: 'เก้าอี้ทำงานเพื่อสุขภาพ Ergonomic Chair ปรับระดับได้ รองรับสรีระแผ่นหลัง ระบายอากาศดีเยี่ยม',
    category: 'เฟอร์นิเจอร์และของใช้ในบ้าน',
    brand: 'Bewell',
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c3a82145d875?auto=format&fit=crop&w=800&q=80',
    basePrice: 4590,
    keywords: ['เก้าอี้', 'เก้าอี้สุขภาพ', 'เก้าอี้ทำงาน', 'เก้าอี้เพื่อสุขภาพ', 'เก้าอี้เกมมิ่ง', 'ergonomic'],
  },

  // --- หมวดหมู่: สมาร์ทโฟนและอุปกรณ์ไอที ---
  {
    id: 'prod-iphone-16-pro-max',
    canonicalTitle: 'Apple iPhone 16 Pro Max (256GB) เครื่องศูนย์ไทย ประกันศูนย์ 1 ปี',
    category: 'สมาร์ทโฟน',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    basePrice: 48900,
    keywords: ['iphone', 'iphone 16', 'iphone 16 pro max', 'ไอโฟน', 'ไอโฟน 16', 'apple', 'มือถือ', 'smartphone'],
  },
  {
    id: 'prod-iphone-17-pro-max',
    canonicalTitle: 'Apple iPhone 17 Pro Max (256GB) เครื่องศูนย์ไทย ประกันศูนย์ 1 ปี (Pre-Order)',
    category: 'สมาร์ทโฟน',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    basePrice: 51900,
    keywords: ['iphone 17', 'iphone 17 pro max', 'ไอโฟน 17', 'apple', 'smartphone'],
  },
  {
    id: 'prod-iphone-18-pro-max',
    canonicalTitle: 'Apple iPhone 18 Pro Max (256GB) ล่วงหน้า พร้อมรับประกันศูนย์ไทย',
    category: 'สมาร์ทโฟน',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
    basePrice: 54900,
    keywords: ['iphone 18', 'iphone 18 pro max', 'ไอโฟน 18', 'apple', 'smartphone'],
  },
  {
    id: 'prod-samsung-s24-ultra',
    canonicalTitle: 'Samsung Galaxy S24 Ultra 5G (12GB/256GB) พร้อมปากกา S-Pen ประกันศูนย์',
    category: 'สมาร์ทโฟน',
    brand: 'Samsung',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    basePrice: 46900,
    keywords: ['samsung', 's24', 's24 ultra', 'galaxy s24', 'ซัมซุง', 'มือถือ'],
  },
  {
    id: 'prod-ipad-air-m2',
    canonicalTitle: 'Apple iPad Air 11 นิ้ว ชิป M2 (Wi-Fi 128GB) ประกันศูนย์',
    category: 'แท็บเล็ต',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    basePrice: 23900,
    keywords: ['ipad', 'ipad air', 'ipad air m2', 'ไอแพด', 'แท็บเล็ต', 'tablet', 'apple'],
  },

  // --- หมวดหมู่: หูฟังและเครื่องเสียง ---
  {
    id: 'prod-sony-wh1000xm5',
    canonicalTitle: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones หูฟังไร้สายตัดเสียงรบกวน',
    category: 'หูฟังและเครื่องเสียง',
    brand: 'Sony',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    basePrice: 12990,
    keywords: ['sony', 'wh-1000xm5', 'wh1000xm5', 'หูฟัง', 'หูฟังบลูทูธ', 'หูฟังตัดเสียง', 'โซนี่', 'headphones'],
  },
  {
    id: 'prod-airpods-pro-2',
    canonicalTitle: 'Apple AirPods Pro 2 (USB-C) ประกันศูนย์ไทย หูฟังไร้สายพร้อมเคสชาร์จ MagSafe',
    category: 'หูฟังและเครื่องเสียง',
    brand: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    basePrice: 8990,
    keywords: ['airpods', 'airpods pro', 'airpods pro 2', 'แอร์พอด', 'หูฟัง apple'],
  },

  // --- หมวดหมู่: เครื่องใช้ไฟฟ้าในบ้าน ---
  {
    id: 'prod-dyson-v12',
    canonicalTitle: 'Dyson V12 Detect Slim Total Clean เครื่องดูดฝุ่นไร้สาย พร้อมหัวดูดเลเซอร์ตรวจจับฝุ่น',
    category: 'เครื่องใช้ไฟฟ้าในบ้าน',
    brand: 'Dyson',
    imageUrl: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80',
    basePrice: 24900,
    keywords: ['dyson', 'v12', 'เครื่องดูดฝุ่น', 'ไดสัน', 'เครื่องดูดฝุ่นไร้สาย'],
  },
  {
    id: 'prod-xiaomi-air-purifier-4',
    canonicalTitle: 'Xiaomi Smart Air Purifier 4 เครื่องฟอกอากาศอัจฉริยะ กรองฝุ่น PM2.5 ประกันศูนย์ไทย',
    category: 'เครื่องใช้ไฟฟ้าในบ้าน',
    brand: 'Xiaomi',
    imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80',
    basePrice: 4290,
    keywords: ['xiaomi', 'air purifier', 'เครื่องฟอกอากาศ', 'pm2.5', 'เสียวหมี่'],
  },
  {
    id: 'prod-philips-airfryer',
    canonicalTitle: 'Philips Essential Airfryer หม้อทอดไร้น้ำมัน ขนาด 4.1 ลิตร รุ่น HD9200/91',
    category: 'เครื่องใช้ไฟฟ้าในบ้าน',
    brand: 'Philips',
    imageUrl: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    basePrice: 2790,
    keywords: ['philips', 'airfryer', 'หม้อทอด', 'หม้อทอดไร้น้ำมัน', 'ฟิลิปส์'],
  },

  // --- หมวดหมู่: ไลฟ์สไตล์ แฟชั่น ของเล่น ---
  {
    id: 'prod-nike-dunk-low-panda',
    canonicalTitle: 'Nike Dunk Low Retro "White/Black" (Panda) รองเท้าสนีกเกอร์ ลิขสิทธิ์แท้ 100%',
    category: 'แฟชั่นและรองเท้า',
    brand: 'Nike',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    basePrice: 4300,
    keywords: ['nike', 'dunk', 'dunk low', 'panda', 'รองเท้า', 'สนีกเกอร์', 'ไนกี้'],
  },
  {
    id: 'prod-popmart-labubu',
    canonicalTitle: 'POP MART The Monsters - "Exciting Macaron" Labubu Vinyl Face กล่องสุ่ม พวงกุญแจ แท้ 100%',
    category: 'ของเล่นและของสะสม',
    brand: 'POP MART',
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80',
    basePrice: 1890,
    keywords: ['labubu', 'pop mart', 'ลาบูบู้', 'กล่องสุ่ม', 'art toy', 'popmart'],
  },
  {
    id: 'prod-stanley-cup-40oz',
    canonicalTitle: 'Stanley Quencher H2.0 FlowState Tumbler แก้วเก็บความเย็น 40oz ของแท้',
    category: 'เครื่องใช้ในบ้าน',
    brand: 'Stanley',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    basePrice: 1850,
    keywords: ['stanley', 'quencher', 'แก้วเก็บความเย็น', 'แก้วสแตนเลย์', 'แก้วน้ำ'],
  }
];

export function normalizeQuery(rawQuery: string): string {
  let q = rawQuery.trim().toLowerCase();
  q = q.replace(/iphoe|iphne|ifone|ipon|ไอโฟน/gi, 'iphone');
  q = q.replace(/samsug|ซัมซุง/gi, 'samsung');
  q = q.replace(/soby|โซนี่/gi, 'sony');
  q = q.replace(/airpod\b|แอร์พอด/gi, 'airpods');
  return q;
}

export interface CategoryContext {
  category: string;
  brand: string;
  imageUrl: string;
  basePrice: number;
  shopNames: {
    shopee: string;
    lazada: string;
    tiktok: string;
  };
}

export function detectCategoryContext(query: string): CategoryContext {
  const q = query.toLowerCase();

  // 1. เฟอร์นิเจอร์ & ของแต่งบ้าน (โต๊ะเครื่องแป้ง, โต๊ะ, เก้าอี้, ตู้, เตียง, โซฟา)
  if (/โต๊ะเครื่องแป้ง|โต๊ะแป้ง|โต๊ะแต่งหน้า|vanity|dressing/i.test(q)) {
    return {
      category: 'เฟอร์นิเจอร์และของใช้ในบ้าน',
      brand: 'Index Living Mall',
      imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
      basePrice: 2490,
      shopNames: {
        shopee: 'Index Living Mall Official Store',
        lazada: 'SB Design Square LazMall',
        tiktok: 'HomePro Official TikTok Shop',
      },
    };
  }

  if (/โต๊ะ|เก้าอี้|เตียง|ตู้|โซฟา|ชั้นวาง|เฟอร์นิเจอร์|เบาะ/i.test(q)) {
    return {
      category: 'เฟอร์นิเจอร์และของใช้ในบ้าน',
      brand: 'HomePro',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      basePrice: 3200,
      shopNames: {
        shopee: 'HomePro Official Store',
        lazada: 'Index Living Mall LazMall',
        tiktok: 'SB Furniture TikTok Shop',
      },
    };
  }

  // 2. ความงาม & สกินแคร์ (ครีม, เซรั่ม, ลิป, สบู่, กันแดด, น้ำหอม)
  if (/ครีม|เซรั่ม|ลิป|กันแดด|น้ำหอม|สกินแคร์|แป้ง|รองพื้น|โฟมล้างหน้า/i.test(q)) {
    return {
      category: 'ความงามและของใช้ส่วนตัว',
      brand: 'L\'Oreal Paris',
      imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
      basePrice: 890,
      shopNames: {
        shopee: 'Watsons Official Store (Shopee Mall)',
        lazada: 'Beautrium Flagship Store',
        tiktok: 'EVEANDBOY Official TikTok Shop',
      },
    };
  }

  // 3. แฟชั่น & เครื่องแต่งกาย (เสื้อ, กางเกง, กระเป๋า, รองเท้า, แว่น)
  if (/เสื้อ|กางเกง|รองเท้า|กระเป๋า|แว่นตา|หมวก|ถุงเท้า|ผ้าพันคอ/i.test(q)) {
    return {
      category: 'แฟชั่นและเครื่องแต่งกาย',
      brand: 'Uniqlo',
      imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
      basePrice: 1290,
      shopNames: {
        shopee: 'Uniqlo Partner Store (Shopee Mall)',
        lazada: 'Pomelo Official Flagship',
        tiktok: 'ZARA Style TikTok Shop',
      },
    };
  }

  // 4. สัตว์เลี้ยง (อาหารแมว, อาหารหมา, ทรายแมว, คอนโดแมว)
  if (/แมว|หมา|สุนัข|สัตว์เลี้ยง|ทรายแมว|อาหารแมว|อาหารสุนัข/i.test(q)) {
    return {
      category: 'สินค้าสัตว์เลี้ยง',
      brand: 'Kaniva',
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      basePrice: 650,
      shopNames: {
        shopee: 'Pet Safari Official Store',
        lazada: 'PetLovers Centre LazMall',
        tiktok: 'Cat & Dog Club TikTok Shop',
      },
    };
  }

  // 5. คอมพิวเตอร์ & เกมมิ่ง (จอ, คอม, โน้ตบุ๊ค, เมาส์, คีย์บอร์ด, หูฟัง)
  if (/คอม|จอ|โน้ตบุ๊ค|แล็ปท็อป|เมาส์|คีย์บอร์ด|การ์ดจอ|ram|ssd/i.test(q)) {
    return {
      category: 'คอมพิวเตอร์และอุปกรณ์ไอที',
      brand: 'Asus',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      basePrice: 15900,
      shopNames: {
        shopee: 'Advice IT Official Store',
        lazada: 'JIB Online Official LazMall',
        tiktok: 'BaNANA IT TikTok Shop',
      },
    };
  }

  // Default General Category
  return {
    category: 'สินค้าทั่วไปและไลฟ์สไตล์',
    brand: 'Official Brand',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    basePrice: 1490,
    shopNames: {
      shopee: 'Shopee Mall Official Store',
      lazada: 'LazMall Flagship Store',
      tiktok: 'TikTok Shop Verified Partner',
    },
  };
}

export function findOrGenerateSeeds(query: string): MockProductSeed[] {
  const normalized = normalizeQuery(query);
  if (!normalized) return SEED_PRODUCTS.slice(0, 8);

  // 1. Direct or partial keyword match in catalog
  const matches = SEED_PRODUCTS.filter(item => {
    const inTitle = item.canonicalTitle.toLowerCase().includes(normalized);
    const inBrand = item.brand.toLowerCase().includes(normalized);
    const inCategory = item.category.toLowerCase().includes(normalized);
    const inKeywords = item.keywords.some(k => k.toLowerCase().includes(normalized) || normalized.includes(k.toLowerCase()));
    return inTitle || inBrand || inCategory || inKeywords;
  });

  if (matches.length > 0) return matches;

  // 2. Dynamic matching for ANY iPhone version
  const iphoneMatch = normalized.match(/iphone\s*(\d+)/i);
  if (iphoneMatch) {
    const version = iphoneMatch[1];
    const numVersion = Number(version);
    const estPrice = numVersion > 16 ? 48900 + (numVersion - 16) * 3000 : 38900;
    return [
      {
        id: `prod-iphone-${version}-pro-max`,
        canonicalTitle: `Apple iPhone ${version} Pro Max (256GB) เครื่องศูนย์ไทย ประกันศูนย์ 1 ปี`,
        category: 'สมาร์ทโฟน',
        brand: 'Apple',
        imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
        basePrice: estPrice,
        keywords: [`iphone ${version}`, `iphone ${version} pro max`, 'apple', 'smartphone'],
      },
      {
        id: `prod-iphone-${version}-standard`,
        canonicalTitle: `Apple iPhone ${version} (128GB) เครื่องศูนย์ไทย ประกันศูนย์ 1 ปี`,
        category: 'สมาร์ทโฟน',
        brand: 'Apple',
        imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
        basePrice: Math.round(estPrice * 0.72 / 100) * 100,
        keywords: [`iphone ${version}`, 'apple', 'smartphone'],
      }
    ];
  }

  // 3. Category Context Aware Generator with matching images and realistic stores!
  const ctx = detectCategoryContext(query);
  const safeId = `dynamic-${encodeURIComponent(normalized).replace(/%/g, '_').slice(0, 24)}`;

  return [
    {
      id: safeId,
      canonicalTitle: `${query} ดีไซน์มินิมอลโมเดิร์น พร้อมรับประกันศูนย์ไทย`,
      category: ctx.category,
      brand: ctx.brand,
      imageUrl: ctx.imageUrl,
      basePrice: ctx.basePrice,
      keywords: [normalized, query],
    },
    {
      id: `${safeId}-alt`,
      canonicalTitle: `${query} รุ่นพรีเมียม ฟังก์ชันครบครัน เกรดคุณภาพสูง`,
      category: ctx.category,
      brand: ctx.brand,
      imageUrl: ctx.imageUrl,
      basePrice: Math.round(ctx.basePrice * 1.35 / 10) * 10,
      keywords: [normalized, query],
    }
  ];
}
