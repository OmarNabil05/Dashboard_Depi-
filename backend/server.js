import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'data', 'menu.json');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Support large base64 images

// Helper function to read menu data
async function readMenuData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write menu data
async function writeMenuData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const menuItems = await readMenuData();
    res.json({
      success: true,
      data: menuItems,
      count: menuItems.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading menu data',
      error: error.message
    });
  }
});

// GET menu items by category
app.get('/api/menu/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const menuItems = await readMenuData();
    const filtered = menuItems.filter(item => item.category === category);
    
    res.json({
      success: true,
      data: filtered,
      count: filtered.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error filtering menu data',
      error: error.message
    });
  }
});

// GET single menu item by ID
app.get('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuItems = await readMenuData();
    const item = menuItems.find(item => item.id === parseInt(id));
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reading menu item',
      error: error.message
    });
  }
});

// POST create new menu item
app.post('/api/menu', async (req, res) => {
  try {
    const { name, category, price, description, image, available } = req.body;
    
    // Validation
    if (!name || !category || !price || !description || !image) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, category, price, description, image'
      });
    }

    const menuItems = await readMenuData();
    
    const newItem = {
      id: Date.now(),
      name,
      category,
      price: parseFloat(price),
      description,
      image,
      available: available !== undefined ? available : true,
      createdAt: new Date().toISOString()
    };
    
    menuItems.push(newItem);
    await writeMenuData(menuItems);
    
    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating menu item',
      error: error.message
    });
  }
});

// PUT update menu item
app.put('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, description, image, available } = req.body;
    
    const menuItems = await readMenuData();
    const itemIndex = menuItems.findIndex(item => item.id === parseInt(id));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }
    
    // Update item with new data
    menuItems[itemIndex] = {
      ...menuItems[itemIndex],
      name: name || menuItems[itemIndex].name,
      category: category || menuItems[itemIndex].category,
      price: price !== undefined ? parseFloat(price) : menuItems[itemIndex].price,
      description: description || menuItems[itemIndex].description,
      image: image || menuItems[itemIndex].image,
      available: available !== undefined ? available : menuItems[itemIndex].available,
      updatedAt: new Date().toISOString()
    };
    
    await writeMenuData(menuItems);
    
    res.json({
      success: true,
      message: 'Menu item updated successfully',
      data: menuItems[itemIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating menu item',
      error: error.message
    });
  }
});

// DELETE menu item
app.delete('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuItems = await readMenuData();
    const itemIndex = menuItems.findIndex(item => item.id === parseInt(id));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }
    
    const deletedItem = menuItems.splice(itemIndex, 1)[0];
    await writeMenuData(menuItems);
    
    res.json({
      success: true,
      message: 'Menu item deleted successfully',
      data: deletedItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting menu item',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Spot Menu API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Spot Menu API is running on http://localhost:${PORT}`);
  console.log(`📋 API Documentation: http://localhost:${PORT}/api/health`);
});
