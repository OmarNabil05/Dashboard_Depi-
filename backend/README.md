# Spot Restaurant - Menu API

REST API للتحكم في قائمة الطعام الخاصة بمطعم Spot

## 📋 المتطلبات

- Node.js (v18 أو أحدث)
- npm

## 🚀 التشغيل

### 1. تثبيت الحزم المطلوبة

```bash
cd backend
npm install
```

### 2. تشغيل السيرفر

```bash
npm start
```

السيرفر سيعمل على: `http://localhost:5000`

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

### 1. جلب جميع الأصناف
**GET** `/menu`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1732234567890,
      "name": "Grilled Chicken",
      "category": "main",
      "price": 120.50,
      "description": "Delicious grilled chicken with special sauce",
      "image": "data:image/jpeg;base64,...",
      "available": true,
      "createdAt": "2025-11-22T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

---

### 2. جلب صنف معين
**GET** `/menu/:id`

**مثال:**
```
GET /menu/1732234567890
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1732234567890,
    "name": "Grilled Chicken",
    "category": "main",
    "price": 120.50,
    "description": "Delicious grilled chicken",
    "image": "data:image/jpeg;base64,...",
    "available": true
  }
}
```

---

### 3. فلترة حسب الفئة
**GET** `/menu/category/:category`

**الفئات المتاحة:**
- `appetizer` - المقبلات
- `main` - الأطباق الرئيسية
- `desserts` - الحلويات
- `drinks` - المشروبات

**مثال:**
```
GET /menu/category/appetizer
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 3
}
```

---

### 4. إضافة صنف جديد
**POST** `/menu`

**Request Body:**
```json
{
  "name": "Caesar Salad",
  "category": "appetizer",
  "price": 45.00,
  "description": "Fresh caesar salad with parmesan",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "available": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Menu item created successfully",
  "data": {
    "id": 1732234567890,
    "name": "Caesar Salad",
    "category": "appetizer",
    "price": 45.00,
    "description": "Fresh caesar salad with parmesan",
    "image": "data:image/jpeg;base64,...",
    "available": true,
    "createdAt": "2025-11-22T10:30:00.000Z"
  }
}
```

---

### 5. تعديل صنف
**PUT** `/menu/:id`

**Request Body:** (أرسل فقط الحقول التي تريد تعديلها)
```json
{
  "price": 50.00,
  "available": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Menu item updated successfully",
  "data": {
    "id": 1732234567890,
    "name": "Caesar Salad",
    "price": 50.00,
    "available": false,
    "updatedAt": "2025-11-22T11:00:00.000Z"
  }
}
```

---

### 6. حذف صنف
**DELETE** `/menu/:id`

**مثال:**
```
DELETE /menu/1732234567890
```

**Response:**
```json
{
  "success": true,
  "message": "Menu item deleted successfully",
  "data": {
    "id": 1732234567890,
    "name": "Caesar Salad"
  }
}
```

---

### 7. فحص حالة API
**GET** `/health`

**Response:**
```json
{
  "success": true,
  "message": "Spot Menu API is running",
  "timestamp": "2025-11-22T10:30:00.000Z"
}
```

---

## 📝 ملاحظات مهمة

### تنسيق البيانات:

**Categories (الفئات):**
- `appetizer` - المقبلات
- `main` - الأطباق الرئيسية  
- `desserts` - الحلويات
- `drinks` - المشروبات

**Image Format:**
- الصور يجب أن تكون بصيغة Base64
- Format: `data:image/jpeg;base64,YOUR_BASE64_STRING`
- الحد الأقصى: 10MB

**Required Fields للإضافة:**
- `name` (string)
- `category` (string)
- `price` (number)
- `description` (string)
- `image` (base64 string)

**Optional Fields:**
- `available` (boolean) - default: `true`

---

## 🗂️ هيكل المشروع

```
backend/
├── server.js          # الملف الرئيسي للسيرفر
├── package.json       # معلومات المشروع والحزم
├── data/
│   └── menu.json     # قاعدة البيانات (JSON file)
└── README.md         # هذا الملف
```

---

## 🧪 اختبار API

### باستخدام Postman:

1. افتح Postman
2. اختر HTTP Method (GET, POST, PUT, DELETE)
3. أدخل URL: `http://localhost:5000/api/menu`
4. للـ POST و PUT: اختر Body > raw > JSON وأدخل البيانات

### مثال POST باستخدام cURL:

```bash
curl -X POST http://localhost:5000/api/menu \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pizza Margherita",
    "category": "main",
    "price": 85.00,
    "description": "Classic Italian pizza",
    "image": "data:image/jpeg;base64,/9j/4AAQ...",
    "available": true
  }'
```

---

## ⚠️ معالجة الأخطاء

جميع الـ responses تحتوي على:
- `success`: `true` أو `false`
- `message`: رسالة توضيحية
- `data`: البيانات المطلوبة (في حالة النجاح)
- `error`: تفاصيل الخطأ (في حالة الفشل)

**أكواد HTTP:**
- `200` - نجاح العملية
- `201` - تم الإنشاء بنجاح
- `400` - بيانات خاطئة
- `404` - العنصر غير موجود
- `500` - خطأ في السيرفر

---

## 📦 الحزم المستخدمة

- **express** - إطار عمل Node.js
- **cors** - للسماح بالطلبات من مصادر مختلفة
- **fs/promises** - للتعامل مع الملفات

---

## 👨‍💻 المطور

تم تطوير الـ API بواسطة: **Shahd**  
المشروع: **Spot Restaurant Dashboard**

---

## 📞 الدعم

في حالة وجود أي مشاكل:
1. تأكد من تشغيل السيرفر بنجاح
2. تحقق من صحة البيانات المرسلة
3. راجع console.log للأخطاء

---

**تم بنجاح! 🎉**
