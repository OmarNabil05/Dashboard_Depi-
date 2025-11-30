const API_URL = 'http://localhost:5000/api/menu';

export interface MenuItem {
  id: string; // MongoDB _id
  name: string;
  category: string;
  price: number;
  description: string;
  image: string; // corresponds to photoUrl in backend
  available?: boolean; // frontend only
  createdAt?: string;
  updatedAt?: string;
}

// Get all menu items
export async function getAllMenuItems(): Promise<MenuItem[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch menu items');
  const data = await response.json();
  // map _id to id and photoUrl to image
  return data.map((item: any) => ({
    id: item._id,
    name: item.name,
    category: item.category,
    price: item.price,
    description: item.description,
    image: item.photoUrl,
    available: true,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

// Add new menu item
export async function addMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      photoUrl: item.image, // map image to photoUrl
    }),
  });
  if (!response.ok) throw new Error('Failed to add menu item');
  const data = await response.json();
  return {
    id: data._id,
    name: data.name,
    category: data.category,
    price: data.price,
    description: data.description,
    image: data.photoUrl,
    available: true,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

// Update menu item
export async function updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      photoUrl: item.image,
    }),
  });
  if (!response.ok) throw new Error('Failed to update menu item');
  const data = await response.json();
  return {
    id: data._id,
    name: data.name,
    category: data.category,
    price: data.price,
    description: data.description,
    image: data.photoUrl,
    available: true,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

// Delete menu item
export async function deleteMenuItem(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete menu item');
}
