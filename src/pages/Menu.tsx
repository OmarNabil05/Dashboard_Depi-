"use client";

import { useState, useRef } from "react";
import { ComboBox } from "@/components/shahd_components/ComboBox";
import { Input } from "@/components/ui/input";
import Table from "@/components/shahd_components/Table";
import { Button } from "@/components/ui/button";
import { Delete, Edit, X, Upload } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function MenuPage() {
  const categories = [
    { value: "appetizer", label: "Appetizer" },
    { value: "main", label: "Main Courses" },
    { value: "desserts", label: "Desserts" },
    { value: "drinks", label: "Drinks" },
  ];

  const headers = ["Image", "Name", "Category", "Price", "Description", "Available", "Edit", "Delete"];

  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [available, setAvailable] = useState(true);
  const [warning, setWarning] = useState("");

  // FILTER STATE
  const [filterCategory, setFilterCategory] = useState("");

  // Reference for file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      setWarning("حجم الصورة يجب أن يكون أقل من 5 ميجابايت!");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setWarning("الرجاء اختيار ملف صورة صحيح!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImage(base64String);
      setImagePreview(base64String);
      setWarning("");
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImage("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addItem = () => {
    if (!selectedCategory) return setWarning("الرجاء اختيار فئة للصنف!");
    if (!name.trim()) return setWarning("الرجاء إدخال اسم الصنف!");

    const priceNum = Number(price);
    if (!price || isNaN(priceNum) || priceNum <= 0) {
      return setWarning("الرجاء إدخال سعر صحيح!");
    }

    if (!description.trim()) return setWarning("الرجاء إدخال وصف الصنف!");

    if (!image) return setWarning("الرجاء إضافة صورة للصنف!");

    const newItem: MenuItem = {
      id: Date.now(),
      name: name.trim(),
      category: selectedCategory,
      price: priceNum,
      description: description.trim(),
      image: image,
      available: available,
    };

    setItems([...items, newItem]);
    
    // Reset form
    setName("");
    setPrice("");
    setDescription("");
    setSelectedCategory("");
    clearImage();
    setAvailable(true);
    setWarning("");
  };

  const deleteItem = (id: number) => setItems(items.filter((item) => item.id !== id));

  const editItem = (item: MenuItem) => {
    setName(item.name);
    setSelectedCategory(item.category);
    setPrice(item.price.toString());
    setDescription(item.description);
    setImage(item.image);
    setImagePreview(item.image);
    setAvailable(item.available);
    deleteItem(item.id);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addItem();
  };

  const handleComboChange = (val: string) => {
    if (val === selectedCategory) return setWarning("تم اختيار نفس الفئة مسبقاً!");
    setSelectedCategory(val);
    setWarning("");
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  const getCategoryLabel = (value: string) => {
    return categories.find((cat) => cat.value === value)?.label || value;
  };

  // APPLY FILTER
  const filteredItems = filterCategory
    ? items.filter((item) => item.category === filterCategory)
    : items;

  const tableRows = filteredItems.map((item) => ({
    Image: (
      <div className="flex justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="w-12 h-12 object-cover rounded-md"
        />
      </div>
    ),
    Name: item.name,
    Category: getCategoryLabel(item.category),
    Price: formatPrice(item.price),
    Description: (
      <div className="max-w-xs truncate" title={item.description}>
        {item.description}
      </div>
    ),
    Available: (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          item.available
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {item.available ? "Available" : "Unavailable"}
      </span>
    ),
    Edit: (
      <Button variant="ghost" size="sm" onClick={() => editItem(item)}>
        <Edit className="text-green-500 hover:text-green-700" />
      </Button>
    ),
    Delete: (
      <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)}>
        <Delete className="text-red-500 hover:text-red-700" />
      </Button>
    ),
  }));

  return (
    <div className="p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-white">Manage Menu</h1>

      {/* Inputs */}
      <div className="flex flex-col md:flex-row gap-3 items-center">
        <ComboBox
          items={categories}
          onChange={handleComboChange}
          placeholder="اختر فئة..."
        />

        <Input
          type="text"
          placeholder="اسم الصنف"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <Input
          type="number"
          min={0}
          step="0.01"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onKeyDown={handleKeyPress}
        />

        <Input
          type="text"
          placeholder="وصف الصنف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>

      {/* Image Upload & Availability */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            asChild
          >
            <span className="cursor-pointer">
              <Upload className="mr-2" />
              رفع صورة
            </span>
          </Button>
        </label>

        {imagePreview && (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-md border border-gray-600"
            />
            <Button
              variant="destructive"
              size="icon-sm"
              onClick={clearImage}
              className="absolute -top-2 -right-2 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <label className="flex items-center gap-2 text-white cursor-pointer">
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <span className="text-sm">متاح</span>
        </label>

        <Button onClick={addItem}>Add Item</Button>
      </div>

      {/* Filter */}
      <div className="flex gap-3 items-center">
        <span className="text-white">Filter by category:</span>
        <ComboBox
          items={categories}
          onChange={(v) => setFilterCategory(v)}
          placeholder="اختر فئة للفلترة"
        />
        <Button variant="secondary" onClick={() => setFilterCategory("")}>
          Reset Filter
        </Button>
      </div>

      {/* Warning */}
      {warning && <div className="text-yellow-400 font-medium">{warning}</div>}

      {/* Scrollable Table */}
      <div className="overflow-x-auto max-h-[400px]">
        <Table header={headers} row={tableRows} />
      </div>
    </div>
  );
}
