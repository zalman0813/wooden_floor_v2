# 原緒地板品牌網站 - 規格文件

## 專案概述

為「YUAN XU 原緒地板有限公司」建立品牌官方網站，包含三個主要頁面：首頁、產品目錄搜尋頁面、產品詳情頁面。設計參考冠軍磁磚網站風格，並支援後台產品管理功能。

---

## 公司資訊

| 項目 | 內容 |
|------|------|
| 品牌名稱 | YUAN XU 原緒地板有限公司 |
| 統一編號 | 90506487 |
| 聯絡人 | 陳威仁 |
| 電話 | 0930-111427 |
| Email | yxwoodfloor@gmail.com |
| 倉庫地址 | 新北市板橋區僑中一街168號 |
| 門市地址 | 桃園市桃園區春日路461號 |
| Facebook | https://www.facebook.com/YUANXU.WoodFlooring |

---

## 技術架構

### Phase 1（目前）
- **前端：** 純 HTML5 + CSS3 + Vanilla JavaScript
- **樣式：** 響應式設計，Mobile-first
- **後台：** Firebase Firestore + Firebase Storage + 自建管理介面

### Phase 2（未來）
- 遷移至 Next.js + Tailwind CSS

---

## 頁面規格

### 1. 首頁 (index.html)

#### 1.1 Header 導航列
- Logo（左側）
- 主選單：首頁、產品總覽、聯絡我們
- 社群連結：Facebook、LINE
- 搜尋按鈕

#### 1.2 Hero Banner 區塊
- 全幅輪播圖（展示情境照片）
- 每張輪播可設定：
  - 背景圖片
  - 標題文字
  - 副標題
  - CTA 按鈕連結
- 自動播放 + 手動切換

#### 1.3 產品分類快捷區
- 以卡片形式展示主要產品分類
- 分類項目：
  - 健康環保木地板
  - 無機防水超耐磨
  - SPC 石塑
  - 海島型超耐磨
  - 進口品牌
  - 防水戶外材
  - 獨一無二客製化

#### 1.4 精選產品展示
- 顯示 6-8 個精選產品
- 產品卡片包含：情境圖、系列名稱、品牌

#### 1.5 品牌特色區塊
- 展示公司優勢（如：專業施工、品質保證、售後服務等）

#### 1.6 Footer
- 公司聯絡資訊
- 門市地址（含 Google Map 嵌入）
- 社群連結
- 版權聲明

---

### 2. 產品目錄頁面 (products.html)

#### 2.1 麵包屑導航
- 首頁 > 產品總覽 > [分類名稱]

#### 2.2 篩選區塊（參考冠軍磁磚設計）

| 篩選維度 | 選項 |
|----------|------|
| 產品分類 | 健康環保木地板、無機防水超耐磨、SPC石塑、海島型超耐磨、進口品牌、防水戶外材、客製化 |
| 風格分類 | 現代風格、北歐風格、工業風格、古典風格、鄉村風格 |
| 適用空間 | 客廳、臥室、書房、商業空間、公共空間 |
| 紋理分類 | 橡木紋、胡桃木紋、柚木紋、灰橡紋、原木紋 |

#### 2.3 搜尋功能
- 關鍵字搜尋（搜尋產品名稱、系列名稱、品牌）
- 品牌/系列下拉篩選

#### 2.4 產品列表
- Grid 佈局（桌面 3 欄、平板 2 欄、手機 1 欄）
- 產品卡片包含：
  - 情境圖片（hover 切換色票圖）
  - 系列名稱
  - 品牌名稱
  - 可用顏色數量提示

#### 2.5 分頁功能
- 每頁顯示 12/24/36 筆

---

### 3. 產品詳情頁面 (product.html)

#### 3.1 麵包屑導航
- 首頁 > 產品總覽 > [分類] > [系列名稱]

#### 3.2 產品主區塊（左右分欄）

**左側 - 圖片區：**
- 主圖輪播（情境照片）
- 縮圖導航列

**右側 - 資訊區：**
- 系列名稱（中文）
- 品牌名稱
- 產品描述
- 產品特性圖標（防水、耐磨、環保等）
- 功能按鈕：加入詢價單、型錄下載

#### 3.3 產品型號區塊（顏色選擇）
- 圓形色票縮圖展示
- 每個顏色顯示：
  - 色票圖片
  - 顏色編號
  - 顏色名稱
- 點擊可切換主圖顯示該顏色的裝潢照片

#### 3.4 詳細規格表

| 欄位 | 說明 |
|------|------|
| 尺寸規格 | 長 x 寬 (mm) |
| 厚度 | mm |
| 耐磨等級 | AC3/AC4/AC5 |
| 耐磨係數 | 轉數 |
| 防水等級 | 有/無、保固年限 |
| 包裝規格 | 片/箱、坪/箱 |
| 適用空間 | 多選標籤 |
| 安裝方式 | 卡扣式/膠合式等 |

#### 3.5 紋理變化展示
- 展示同色系的不同紋理變化圖片

#### 3.6 相關產品推薦
- 顯示同分類或同品牌的其他產品

---

## 資料結構設計（Firebase Firestore）

### Collection: `categories`
```javascript
{
  id: "spc-stone",
  name: "SPC 石塑",
  slug: "spc-stone",
  description: "分類描述",
  image: "url",
  order: 1,
  isActive: true
}
```

### Collection: `brands`
```javascript
{
  id: "vitality-belgium",
  name: "(士歐)比利時vitality",
  slug: "vitality-belgium",
  description: "品牌描述",
  logo: "url",
  country: "比利時",
  isActive: true
}
```

### Collection: `productSeries`
```javascript
{
  id: "vitality-6320",
  name: "活力精品系列",
  slug: "vitality-6320",
  brandId: "vitality-belgium",
  categoryId: "imported-brand",
  description: "系列描述",
  seriesImage: "url",

  // 規格資訊
  specs: {
    size: "1212 x 185 mm",
    thickness: "8mm",
    wearClass: "AC4",
    wearRating: "Class 32",
    waterproof: true,
    waterproofWarranty: "3年",
    residentialWarranty: "20年",
    pcsPerBox: 8,
    sqmPerBox: 1.79,
    installation: "卡扣式"
  },

  // 分類標籤
  tags: {
    styles: ["現代風格", "北歐風格"],
    spaces: ["客廳", "臥室", "書房"],
    textures: ["橡木紋"]
  },

  // 產品特性
  features: ["防水", "耐磨", "環保", "靜音"],

  // 型錄 PDF
  catalogUrl: "url",

  isFeatured: true,
  isActive: true,
  order: 1,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Collection: `productVariants`（顏色變體）
```javascript
{
  id: "vitality-6320-135",
  seriesId: "vitality-6320",
  colorCode: "135",
  colorName: "陽光橡木",

  // 圖片
  swatchImage: "url",      // 色票圖片
  galleryImages: ["url"],  // 裝潢實景照片陣列

  isActive: true,
  order: 1
}
```

### Collection: `heroSlides`
```javascript
{
  id: "slide-1",
  title: "標題",
  subtitle: "副標題",
  image: "url",
  ctaText: "了解更多",
  ctaLink: "/products",
  order: 1,
  isActive: true
}
```

### Collection: `siteSettings`
```javascript
{
  id: "general",
  siteName: "原緒地板",
  logo: "url",
  contactPhone: "0930-111427",
  contactEmail: "yxwoodfloor@gmail.com",
  warehouseAddress: "新北市板橋區僑中一街168號",
  storeAddress: "桃園市桃園區春日路461號",
  facebookUrl: "https://www.facebook.com/YUANXU.WoodFlooring",
  lineId: "@yuanxu"
}
```

---

## 後台管理系統

### 後台頁面清單

| 頁面 | 功能 |
|------|------|
| 登入頁 | Firebase Authentication |
| 儀表板 | 統計概覽 |
| 分類管理 | CRUD 產品分類 |
| 品牌管理 | CRUD 品牌 |
| 系列管理 | CRUD 產品系列（主要產品資料） |
| 顏色變體管理 | CRUD 顏色、上傳色票圖及裝潢照片 |
| 首頁輪播管理 | CRUD Hero Slides |
| 網站設定 | 編輯公司資訊、聯絡方式 |

### 後台功能需求

1. **圖片上傳**
   - 支援拖放上傳
   - 自動壓縮/調整尺寸
   - 儲存至 Firebase Storage

2. **產品系列編輯**
   - 基本資訊表單
   - 規格資訊表單
   - 標籤多選（風格、空間、紋理）
   - 特性勾選（防水、耐磨等）

3. **顏色變體編輯**
   - 色票圖片上傳
   - 裝潢照片多圖上傳（可排序）
   - 拖放排序功能

---

## 檔案結構

```
wooden_floor/
├── index.html              # 首頁
├── products.html           # 產品目錄頁
├── product.html            # 產品詳情頁
├── admin/
│   ├── index.html          # 後台首頁/登入
│   ├── dashboard.html      # 儀表板
│   ├── categories.html     # 分類管理
│   ├── brands.html         # 品牌管理
│   ├── series.html         # 系列管理
│   ├── variants.html       # 顏色變體管理
│   ├── slides.html         # 輪播管理
│   └── settings.html       # 網站設定
├── css/
│   ├── style.css           # 主樣式
│   ├── components.css      # 元件樣式
│   └── admin.css           # 後台樣式
├── js/
│   ├── firebase-config.js  # Firebase 設定
│   ├── main.js             # 主程式
│   ├── products.js         # 產品頁邏輯
│   ├── product-detail.js   # 產品詳情頁邏輯
│   └── admin/
│       ├── auth.js         # 登入驗證
│       ├── categories.js
│       ├── brands.js
│       ├── series.js
│       ├── variants.js
│       ├── slides.js
│       └── settings.js
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   └── icons/          # 特性圖標
│   └── fonts/
├── material/               # 現有素材
│   ├── business_card.png
│   └── company_information.md
└── spec.md                 # 本規格文件
```

---

## 實作順序

### Phase 1: 基礎建設
1. 建立專案檔案結構
2. 設定 Firebase 專案
3. 建立基本 CSS 樣式系統
4. 實作共用元件（Header、Footer）

### Phase 2: 前台頁面
1. 首頁 Layout 與 Hero Banner
2. 產品目錄頁面（含篩選功能）
3. 產品詳情頁面
4. 響應式調整

### Phase 3: 後台系統
1. 登入驗證系統
2. 分類/品牌管理
3. 產品系列管理
4. 顏色變體管理（含圖片上傳）
5. 輪播與網站設定

### Phase 4: 整合測試
1. 前後台資料串接
2. 圖片顯示優化
3. 效能優化
4. 跨瀏覽器測試

---

## Google Drive 素材結構

### 素材來源
- **品牌資料夾：** https://drive.google.com/drive/folders/1-leNsE598aD9YnnRIgikrSyIWNayY4k7
- **產品素材：** https://drive.google.com/drive/folders/1679xEckeoMHRqUaRTmGoKbfn80Dgdayw

### 目前已有素材

#### 品牌：(士歐)比利時 Vitality
- **分類：** 進口品牌
- **特性：** AQUA PROTECT 防水技術、3年防水保固、AC4 Class 32 耐磨等級、20年住家保固

| 系列名稱 | 系列代碼 | 顏色數量 | 備註 |
|---------|---------|---------|------|
| 活力新寬版系列 | 6450 | 待確認 | |
| 活力精品系列 | 6320 | 10色 | 淺藍色標籤 |
| 新精選系列 | 6060 | 待確認 | 黃色標籤 |
| 新豪華系列 | 6190 | 待確認 | 深藍色標籤 |
| 極品系列 | - | 待確認 | |

#### 活力精品系列(6320) 顏色清單

| 顏色代碼 | 顏色名稱 | 色票檔案 | 裝潢照片資料夾 |
|---------|---------|---------|--------------|
| 135 | 陽光橡木 | 135-陽光橡木.jpg | 135陽光橡木/ |
| 138 | 自然米橡 | 138-自然米橡.jpg | 138自然米橡/ |
| 145 | 現代白橡 | 145-現代白橡.jpg | 145現代白橡/ |
| 148 | 炭黑橡木 | 148-炭黑橡木.jpg | 148炭黑橡木/ |
| 149 | 海洋灰橡 | 149-海洋灰橡.png | 149海洋灰橡/ |
| 174 | 蜂蜜橡木 | 174蜂蜜橡木.png | 174蜂蜜橡木/ |
| 175 | 布蘭登橡木 | 175布蘭登橡木.png | 175布蘭登橡木/ |
| 176 | 深色橡木 | 176深色橡木.png | 176深色橡木/ |
| 178 | 精練淺橡 | 178精練淺橡.jpg | 178精練淺橡/ |
| 179 | 山脈灰橡 | - | 179山脈灰橡/ |

### 素材資料夾結構
```
Google Drive/
└── (士歐)比利時vitality/
    ├── 2025地板型錄.pdf              # 品牌型錄
    ├── 活力新寬版系列(6450)/
    ├── 活力精品系列(6320)/
    │   ├── 135陽光橡木/              # 顏色裝潢照片資料夾
    │   │   ├── 135-陽光橡木-01.png   # 裝潢實景照
    │   │   ├── 135-陽光橡木-02.png
    │   │   └── LINE_ALBUM_*.jpg      # LINE 相簿照片
    │   ├── 138自然米橡/
    │   ├── ... (其他顏色)
    │   ├── 138-自然米橡.jpg          # 色票圖片（在系列根目錄）
    │   ├── 145-現代白橡.jpg
    │   └── ... (其他色票)
    ├── 新精選系列(6060)/
    ├── 新豪華系列(6190)/
    └── 極品系列/
```

### 素材對應至資料結構

| Google Drive 結構 | Firebase Collection | 欄位對應 |
|------------------|---------------------|---------|
| 品牌資料夾 | `brands` | name, description |
| 系列資料夾 | `productSeries` | name, seriesCode |
| 色票圖片 (xxx-顏色.jpg) | `productVariants.swatchImage` | Firebase Storage URL |
| 顏色資料夾內照片 | `productVariants.galleryImages` | Firebase Storage URL 陣列 |
| 型錄 PDF | `productSeries.catalogUrl` | Firebase Storage URL |

---

## 參考資源

- 設計參考：https://www.champion.com.tw/
- Facebook 粉專：https://www.facebook.com/YUANXU.WoodFlooring
- 產品素材：https://drive.google.com/drive/folders/1679xEckeoMHRqUaRTmGoKbfn80Dgdayw
- 產品資料夾分類：https://drive.google.com/drive/folders/1-leNsE598aD9YnnRIgikrSyIWNayY4k7
