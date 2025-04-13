# 🛒 Amazon Product Scraper API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)

واجهة برمجة تطبيقات قوية للبحث عن منتجات Amazon واسترجاع تفاصيلها مع دعم التصفية حسب السعر، العلامة التجارية، التقييم والمزيد.

---

## 🚀 الميزات

- 🔍 **بحث متقدم** حسب السعر، التقييم، Amazon Choice، Best Seller، والماركة
- 🌍 **دعم لعدة نطاقات** (com, ae, sa, eg)
- ⚡ **أداء سريع** مع تخزين مؤقت للنتائج
- 🔒 **حماية بمفتاح API**
- 📄 **توثيق شامل** باستخدام OpenAPI 3.0

---

## 🛠️ البدء السريع

### 1. التثبيت

```bash
git clone https://github.com/yourrepo/amazon-scraper-api.git
cd amazon-scraper-api
npm install
```

### 2. إعداد ملف البيئة

```bash
cp .env.example .env
```

قم بتعديل القيم حسب الإعدادات الخاصة بك:

```
PORT=3000
NODE_ENV=development
API_KEY=your_api_key_here
API_TIMEOUT=5000
```

### 3. تشغيل الخادم

```bash
npm run dev
```

---

## 📬 أمثلة على الطلبات

### 🔹 البحث عن منتجات

`GET /api/search/laptop?minPrice=100&maxPrice=1000&brand=HP&amazonChoice=true`

### 🔹 استرجاع تفاصيل منتج

`GET /api/products/B08N5WRWNW`

---

## 📝 التوثيق الكامل للمسارات

### GET `/api/products/{asin}`

استرجاع تفاصيل المنتج عبر رقم ASIN.

**المعاملات:**
- `asin` (Path): رقم تعريف المنتج في أمازون (Amazon Standard Identification Number)

**الردود:**
- `200`: تفاصيل المنتج
- `400`: ASIN غير صالح
- `404`: لم يتم العثور على المنتج
- `500`: خطأ في الخادم

---

### GET `/api/search/{keyword}`

البحث عن المنتجات باستخدام كلمة مفتاحية.

**المعاملات:**
- `keyword` (Path): الكلمة المفتاحية
- `domain` (Query): نطاق أمازون (مثل com، sa، ae) *(افتراضي: com)*
- `minPrice` / `maxPrice`: السعر الأدنى والأعلى *(افتراضي: 0 - 100000)*
- `rating`: الحد الأدنى للتقييم *(افتراضي: 0)*
- `prime`: تصفية حسب Prime *(true/false)*
- `brand`: اسم الماركة
- `amazonChoice`: فقط منتجات Amazon Choice *(true/false)*
- `bestSeller`: فقط منتجات Best Seller *(true/false)*
- `onsale`: المنتجات المخفضة فقط *(true/false)*
- `minDiscount`: أقل نسبة خصم *(افتراضي: 0)*

**الردود:**
- `200`: قائمة بالمنتجات المطابقة
- `400`: طلب غير صالح
- `404`: لا توجد نتائج
- `500`: خطأ داخلي

---

## 📃 نموذج الاستجابة

```json
{
  "name": "Product Name",
  "price": 199.99,
  "original_price": 249.99,
  "discountPercentage": 20.0,
  "isOnSale": true
}
```

---

## 📎 بنية المشروع

```
.
├── config/              إعدادات التطبيق
├── controllers/         منطق التحكم (product/search)
├── routes/              المسارات
├── utils/               أدوات التحقق ومعالجة الأخطاء
├── app.js               الملف الرئيسي لتشغيل Express
└── openAPI.yaml         التوثيق باستخدام Swagger
```

---

## 📚 التوثيق

تم توثيق كافة المسارات والمعاملات في ملف [`openAPI.yaml`](./openAPI.yaml)
يمكن عرض التوثيق من خلال Swagger UI.

---

## 🧑‍💻 معايير التطوير

- 🩺 ESLint لتنسيق الكود
- ✅ اختبارات لكل ميزة جديدة
- 📆 نمط التسمية:
  - المتغيرات: `camelCase`
  - الثوابت: `UPPER_CASE`

---

## 🛠️ الإبلاغ عن مشاكل

يرجى تضمين المعلومات التالية:

```
## الوصف
أدخل وصفًا مختصرًا للمشكلة

## خطوات إعادة الإنتاج
1. ...
2. ...
```

---

## 🤝 المساهمة

مرحبًا بأي مساهمة!  
افتح Pull Request أو Issue لتحسين المشروع ✨

---

## 📄 الترخيص

MIT License

