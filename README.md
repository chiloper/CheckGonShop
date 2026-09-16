# CheckGonShop (เช็คก่อนช้อป)

ระบบค้นหาและเปรียบเทียบราคาสินค้า Multi-Platform จาก **Shopee, Lazada และ TikTok Shop** (CheckGonShop - เช็คก่อนช้อป) พัฒนาด้วยสถาปัตยกรรม **Monorepo (Next.js + NestJS)** รองรับการแสดงผลทั้งบนคอมพิวเตอร์และมือถืออย่างสมบูรณ์แบบ

---

## 🌟 ฟีเจอร์หลัก (Key Features)

1. **Multi-Platform Price Comparison (Shopee, Lazada, TikTok Shop):**
   - ค้นหาสินค้าชิ้นเดียว ระบบจะเปรียบเทียบราคาจากทั้ง 3 แพลตฟอร์มทันที
   - ไฮไลท์ป้าย **"ถูกที่สุด (Best Price)"** และแพลตฟอร์มที่ขายราคาดีที่สุด
   - คำนวณส่วนต่างราคา ค่าจัดส่ง และ % ส่วนลด (Savings Difference)
   - มีปุ่ม **"ไปที่ร้านค้า"** ลิงก์ตรงไปยังสินค้าของแต่ละแพลตฟอร์ม

2. **Similar Products Matching (แนะนำสินค้าใกล้เคียง):**
   - แสดงรายการสินค้าที่ใกล้เคียงกันหรืออยู่ในหมวดเดียวกัน
   - แสดงราคาเริ่มต้นที่ถูกที่สุดจาก 3 แพลตฟอร์มสำหรับสินค้าแต่ละชิ้น เพื่อให้ผู้ใช้มีทางเลือกเปรียบเทียบ

3. **30-Day Price Trend History:**
   - กราฟเส้นแบบโต้ตอบ (Interactive SVG Chart) แสดงประวัติและแนวโน้มราคาย้อนหลัง 30 วัน แยกตามสี Shopee (ส้ม), Lazada (น้ำเงิน), และ TikTok Shop (ดำ)

4. **Responsive Mobile-First Design:**
   - รองรับหน้าจอมือถือ (Sticky search, Drawer filter sheet, Compact cards)
   - รองรับหน้าจอเดสก์ท็อป (Side-by-side comparison tables, Multi-column layout)

5. **Flexible Database Architecture (MongoDB / In-Memory Cache):**
   - รองรับการเชื่อมต่อ **MongoDB** (Local หรือ MongoDB Atlas) ผ่าน Mongoose
   - หากยังไม่ได้ตั้งค่า MongoDB ระบบมี **In-Memory Caching** ในตัว สามารถรันและใช้งานได้ทันทีโดยไม่เกิด Error

---

## 📁 โครงสร้างโปรเจกต์ (Monorepo Layout)

```
ComparePrice/
├── apps/
│   ├── api/                     # NestJS Backend (Port 4000)
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── search/      # รวมผลลัพธ์และ REST Endpoints
│   │   │   │   ├── comparison/  # อัลกอริทึมจับคู่สินค้า & คำนวณราคาถูกสุด
│   │   │   │   ├── providers/   # Adapters สำหรับ Shopee, Lazada, TikTok
│   │   │   │   ├── database/    # Mongoose Schema & In-Memory fallback
│   │   │   │   └── products/    # DTOs & Interfaces
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── package.json
│   │
│   └── web/                     # Next.js 14 Frontend (Port 3000)
│       ├── src/
│       │   ├── app/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx     # หน้าหลัก (Hero Search + Trending Deals)
│       │   │   ├── search/      # หน้าผลการค้นหา & เปรียบเทียบ
│       │   │   └── product/[id] # หน้ารายละเอียด & กราฟราคา
│       │   ├── components/
│       │   │   ├── Navbar.tsx
│       │   │   ├── SearchBar.tsx
│       │   │   ├── PriceComparisonCard.tsx
│       │   │   ├── SimilarProductsSection.tsx
│       │   │   ├── PriceTrendChart.tsx
│       │   │   ├── FilterSidebar.tsx
│       │   │   └── PlatformBadge.tsx
│       │   └── lib/             # API client & types
│       └── package.json
│
├── package.json                 # Monorepo Root (npm workspaces)
└── README.md
```

---

## 🚀 วิธีการติดตั้งและรันระบบ (Quick Start)

### 1. ติดตั้ง Dependencies
```powershell
npm install
```

### 2. เริ่มรันระบบทั้ง API และ Web พร้อมกัน
```powershell
npm run dev
```
คำสั่งนี้จะรันทั้ง:
- **Backend API:** `http://localhost:4000/api`
- **Frontend Web:** `http://localhost:3000`

หรือสามารถแยกรันแต่ละส่วนได้:
```powershell
# รันเฉพาะ Backend API
npm run dev:api

# รันเฉพาะ Frontend Web
npm run dev:web
```

---

## 🗄️ การตั้งค่า Database (MongoDB)

ระบบถูกออกแบบให้รันได้ทันทีโดยไม่ต้องมี MongoDB ติดตั้งไว้ในเครื่อง (ใช้ In-Memory Cache) แต่หากต้องการต่อเข้า MongoDB:

1. เปิดไฟล์ `apps/api/.env` (หรือคัดลอกมาจาก `apps/api/.env.example`)
2. ใส่ Connection String ของ MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/compare_price
# หรือ MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/compare_price
```
3. รีสตาร์ท API ระบบจะตรวจพบและบันทึกประวัติการค้นหาลง MongoDB อัตโนมัติ

---

## 📡 REST API Endpoints

- `GET /api/health`: ตรวจสอบสถานะการทำงานของ API Server (Health Check)
- `GET /api/search?q={keyword}&platform={all|shopee|lazada|tiktok}&sort={cheapest|savings|rating|popular}`: ค้นหาและเปรียบเทียบราคา
- `GET /api/search/trending`: ดึงรายการคำค้นหายอดนิยม
- `GET /api/search/suggestions?q={keyword}`: Auto-complete แนะนำคำค้นหา
- `GET /api/products/:id`: ดูรายละเอียดสินค้า การเปรียบเทียบ และสินค้าใกล้เคียง
- `GET /api/products/:id/history`: ดูประวัติราคาย้อนหลัง 30 วัน

---

## 🌐 การ Deploy & Production Environments

ระบบถูกแยก Deploy ตามสถาปัตยกรรม Microservices / Monorepo ดังนี้:

| ส่วนของระบบ | Platform / Hosting | Production URL / Endpoint | Branch ที่ใช้ Deploy | หมายเหตุ |
| :--- | :--- | :--- | :--- | :--- |
| **Backend API** | **[Render](https://render.com)** (Web Service) | [`https://checkgonshop-api.onrender.com/api`](https://checkgonshop-api.onrender.com/api) | `render-api` | ภูมิภาค Singapore, Auto-deploy ผ่าน Blueprint (`render.yaml`) |
| **API Health Check** | Render | [`https://checkgonshop-api.onrender.com/api/health`](https://checkgonshop-api.onrender.com/api/health) | `render-api` | ใช้ตรวจสอบสถานะ Uptime และ Live Probe |
| **Frontend Web** | **[GitHub Pages](https://pages.github.com/)** | [`https://chiloper.github.io/CheckGonShop/`](https://chiloper.github.io/CheckGonShop/) | `deploy-gh-pages` | Next.js Static Export ผ่าน GitHub Actions Workflow |

> **หมายเหตุสำหรับ Render Free Tier:** หากไม่มี Request เป็นเวลานาน Server จะเข้าสู่ Sleep Mode และจะใช้เวลาประมาณ 30-50 วินาทีในการตื่นขึ้นมาตอบสนองใน Request แรก

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

### 1. Backend API (`apps/api`)
- **Runtime:** Node.js (v20+ LTS)
- **Framework:** **NestJS 10** (สถาปัตยกรรม Modular, Controllers, Services, Dependency Injection)
- **Language:** **TypeScript 5**
- **HTTP Server:** `@nestjs/platform-express`, Express
- **Database & ODM:** 
  - **MongoDB** / **MongoDB Atlas**
  - **Mongoose 8** (`@nestjs/mongoose`)
  - **In-Memory Cache Fallback:** สำหรับกรณีไม่ได้เชื่อมต่อ DB
- **Validation & Transformation:** `class-validator`, `class-transformer`
- **Configuration:** `@nestjs/config` (Environment Variables)
- **Product Matching & Comparison:**
  - `string-similarity`: คำนวณค่าความคล้ายของชื่อสินค้าข้ามแพลตฟอร์ม (Shopee, Lazada, TikTok Shop)
  - Custom Rule-based Normalization & Best Price Scoring Algorithm
- **HTTP Client:** `axios`, `rxjs`

### 2. Frontend Web (`apps/web`)
- **Framework:** **Next.js 14** (App Router, SSG / Static Export สำหรับ GitHub Pages)
- **Library:** **React 18**
- **Language:** **TypeScript 5**
- **Styling:** **Tailwind CSS 3**, `clsx`, `tailwind-merge`
- **UI Components & Icons:** **Lucide React**
- **Data Visualization:** **Recharts** (กราฟแนวโน้มราคา Interactive 30 วัน)

### 3. DevOps, Tooling & Infrastructure
- **Monorepo Management:** npm Workspaces (จัดการ dependencies และ scripts ข้าม packages)
- **Process Orchestrator:** `concurrently` (รัน Web และ API พร้อมกันในโหมด Development)
- **Backend Hosting:** **Render** (Node.js Web Service ในสิงคโปร์ พร้อม `render.yaml`)
- **Frontend Hosting:** **GitHub Pages** (รองรับ Client-side routing และ dynamic product view)
- **CI/CD:** **GitHub Actions** (Automated build & deploy สำหรับ GitHub Pages)
- **Version Control:** Git / GitHub

