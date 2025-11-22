const API_URL = 'http://localhost:5000/api';

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Get all menu items
export async function getAllMenuItems(): Promise<MenuItem[]> {
  const response = await fetch(`${API_URL}/menu`);
  const data = await response.json();
  return data.data;
}

// Get menu items by category
export async function getMenuByCategory(category: string): Promise<MenuItem[]> {
  const response = await fetch(`${API_URL}/menu/category/${category}`);
  const data = await response.json();
  return data.data;
}

// Add new menu item
export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
  const response = await fetch(`${API_URL}/menu`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data.data;
}

// Update menu item
export async function updateMenuItem(id: number, item: Partial<MenuItem>): Promise<MenuItem> {
  const response = await fetch(`${API_URL}/menu/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  });
  const data = await response.json();
  return data.data;
}

// Delete menu item
export async function deleteMenuItem(id: number): Promise<void> {
  await fetch(`${API_URL}/menu/${id}`, {
    method: 'DELETE',
  });
}
