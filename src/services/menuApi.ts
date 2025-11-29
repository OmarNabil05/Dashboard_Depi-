const API_URL = 'http://localhost:5000/api';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Backend returns _id and photoUrl, frontend uses id and image
interface BackendMenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  photoUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

// Map backend item to frontend format
function mapToFrontend(item: BackendMenuItem): MenuItem {
  return {
    id: item._id,
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description,
    image: item.photoUrl,
    available: true, // Backend doesn't have this field, default to true
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

// Map frontend item to backend format
function mapToBackend(item: Omit<MenuItem, 'id'>): Omit<BackendMenuItem, '_id'> {
  return {
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description,
    photoUrl: item.image,
  };
}

// Get all menu items
export async function getAllMenuItems(): Promise<MenuItem[]> {
  const response = await fetch(`${API_URL}/menu`);
  const data: BackendMenuItem[] = await response.json();
  return data.map(mapToFrontend);
}

// Get menu items by category
export async function getMenuByCategory(category: string): Promise<MenuItem[]> {
  const response = await fetch(`${API_URL}/menu/category/${category}`);
  const data: BackendMenuItem[] = await response.json();
  return data.map(mapToFrontend);
}

// Add new menu item
export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
  const response = await fetch(`${API_URL}/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mapToBackend(item)),
  });
  const data: BackendMenuItem = await response.json();
  return mapToFrontend(data);
}

// Update menu item
export async function updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem> {
  const backendItem: Partial<BackendMenuItem> = {};
  if (item.name) backendItem.name = item.name;
  if (item.category) backendItem.category = item.category;
  if (item.price) backendItem.price = item.price;
  if (item.description) backendItem.description = item.description;
  if (item.image) backendItem.photoUrl = item.image;

  const response = await fetch(`${API_URL}/menu/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(backendItem),
  });
  const data: BackendMenuItem = await response.json();
  return mapToFrontend(data);
}

// Delete menu item
export async function deleteMenuItem(id: string): Promise<void> {
  await fetch(`${API_URL}/menu/${id}`, {
    method: 'DELETE',
  });
}
