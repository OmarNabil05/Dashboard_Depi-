import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, '..', 'menu-images');
const OUTPUT_FILE = path.join(__dirname, 'data', 'menu.json');

// Menu data with names and descriptions for each category
const menuData = {
  appetizer: [
    { name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with sweet chili sauce', price: 45 },
    { name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes, garlic, and basil', price: 38 },
    { name: 'Chicken Wings', description: 'Spicy buffalo wings with blue cheese dip', price: 52 },
    { name: 'Mozzarella Sticks', description: 'Fried mozzarella with marinara sauce', price: 48 },
    { name: 'Hummus Plate', description: 'Traditional hummus with warm pita bread', price: 35 },
    { name: 'Caesar Salad', description: 'Crisp romaine lettuce with Caesar dressing and croutons', price: 42 },
    { name: 'Stuffed Mushrooms', description: 'Mushrooms filled with cheese and herbs', price: 50 },
    { name: 'Calamari Rings', description: 'Crispy fried calamari with lemon aioli', price: 58 },
    { name: 'Greek Salad', description: 'Fresh vegetables with feta cheese and olives', price: 40 },
    { name: 'Nachos Supreme', description: 'Tortilla chips with cheese, jalapeños, and salsa', price: 55 },
    { name: 'Garlic Bread', description: 'Toasted bread with garlic butter and parsley', price: 28 },
    { name: 'Onion Rings', description: 'Golden crispy onion rings with ranch dip', price: 32 },
    { name: 'Spinach Dip', description: 'Creamy spinach and artichoke dip with chips', price: 46 },
    { name: 'Shrimp Cocktail', description: 'Chilled shrimp with tangy cocktail sauce', price: 65 },
    { name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil with balsamic', price: 44 },
    { name: 'Chicken Quesadilla', description: 'Grilled tortilla with chicken and melted cheese', price: 48 },
    { name: 'Potato Skins', description: 'Crispy potato shells with cheese and bacon', price: 42 },
    { name: 'Tuna Tartare', description: 'Fresh tuna with avocado and sesame seeds', price: 68 },
    { name: 'Falafel Plate', description: 'Crispy chickpea fritters with tahini sauce', price: 38 },
    { name: 'Beef Carpaccio', description: 'Thinly sliced beef with arugula and parmesan', price: 72 }
  ],
  main: [
    { name: 'Grilled Chicken', description: 'Juicy grilled chicken breast with herbs and spices', price: 120 },
    { name: 'Beef Steak', description: 'Premium beef steak cooked to perfection', price: 185 },
    { name: 'Salmon Fillet', description: 'Pan-seared salmon with lemon butter sauce', price: 165 },
    { name: 'Lamb Chops', description: 'Tender lamb chops with rosemary and garlic', price: 195 },
    { name: 'Pasta Carbonara', description: 'Creamy pasta with bacon and parmesan cheese', price: 95 },
    { name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and basil', price: 85 },
    { name: 'Fish and Chips', description: 'Crispy battered fish with golden fries', price: 110 },
    { name: 'Chicken Alfredo', description: 'Fettuccine pasta with creamy alfredo sauce and chicken', price: 105 },
    { name: 'BBQ Ribs', description: 'Slow-cooked ribs with smoky BBQ sauce', price: 155 },
    { name: 'Shrimp Scampi', description: 'Garlic butter shrimp with pasta', price: 145 },
    { name: 'Beef Burger', description: 'Juicy beef patty with cheese, lettuce, and tomato', price: 88 },
    { name: 'Chicken Shawarma', description: 'Marinated chicken with tahini and vegetables', price: 78 },
    { name: 'Vegetable Stir Fry', description: 'Fresh vegetables with soy sauce and ginger', price: 75 },
    { name: 'Beef Lasagna', description: 'Layered pasta with beef, cheese, and tomato sauce', price: 98 },
    { name: 'Grilled Prawns', description: 'Jumbo prawns with garlic and herbs', price: 175 },
    { name: 'Mushroom Risotto', description: 'Creamy arborio rice with mixed mushrooms', price: 92 },
    { name: 'Duck Breast', description: 'Pan-seared duck with orange glaze', price: 168 },
    { name: 'Seafood Paella', description: 'Spanish rice with mixed seafood and saffron', price: 158 },
    { name: 'Chicken Teriyaki', description: 'Grilled chicken with teriyaki sauce and vegetables', price: 115 },
    { name: 'Mixed Grill Platter', description: 'Assorted grilled meats with sides', price: 210 }
  ],
  desserts: [
    { name: 'Chocolate Cake', description: 'Rich chocolate layer cake with ganache', price: 55 },
    { name: 'Tiramisu', description: 'Classic Italian dessert with coffee and mascarpone', price: 62 },
    { name: 'Cheesecake', description: 'Creamy New York style cheesecake', price: 58 },
    { name: 'Apple Pie', description: 'Warm apple pie with cinnamon and vanilla ice cream', price: 48 },
    { name: 'Crème Brûlée', description: 'Vanilla custard with caramelized sugar topping', price: 52 },
    { name: 'Brownie Sundae', description: 'Warm chocolate brownie with ice cream and sauce', price: 50 },
    { name: 'Panna Cotta', description: 'Italian cream dessert with berry compote', price: 46 },
    { name: 'Lemon Tart', description: 'Tangy lemon filling in buttery pastry', price: 44 },
    { name: 'Ice Cream Trio', description: 'Three scoops of premium ice cream', price: 42 },
    { name: 'Molten Lava Cake', description: 'Chocolate cake with liquid chocolate center', price: 58 },
    { name: 'Fruit Salad', description: 'Fresh seasonal fruits with honey drizzle', price: 38 },
    { name: 'Baklava', description: 'Middle Eastern pastry with nuts and honey', price: 45 },
    { name: 'Strawberry Shortcake', description: 'Sponge cake with strawberries and cream', price: 52 },
    { name: 'Chocolate Mousse', description: 'Light and airy chocolate mousse', price: 48 },
    { name: 'Carrot Cake', description: 'Moist carrot cake with cream cheese frosting', price: 50 },
    { name: 'Profiteroles', description: 'Choux pastry filled with cream and chocolate sauce', price: 54 },
    { name: 'Banoffee Pie', description: 'Banana and toffee pie with whipped cream', price: 56 },
    { name: 'Raspberry Sorbet', description: 'Refreshing raspberry ice dessert', price: 40 },
    { name: 'Chocolate Fondue', description: 'Melted chocolate with fresh fruits for dipping', price: 65 },
    { name: 'Vanilla Crème Caramel', description: 'Silky custard with caramel sauce', price: 46 }
  ],
  drinks: [
    { name: 'Fresh Orange Juice', description: 'Freshly squeezed orange juice', price: 25 },
    { name: 'Lemonade', description: 'Homemade lemonade with fresh mint', price: 22 },
    { name: 'Cappuccino', description: 'Italian coffee with steamed milk and foam', price: 28 },
    { name: 'Espresso', description: 'Strong Italian coffee shot', price: 20 },
    { name: 'Iced Coffee', description: 'Cold coffee with ice and milk', price: 26 },
    { name: 'Mint Mojito', description: 'Refreshing mint drink with lime and soda', price: 32 },
    { name: 'Mango Smoothie', description: 'Creamy mango smoothie with yogurt', price: 35 },
    { name: 'Green Tea', description: 'Premium green tea leaves', price: 18 },
    { name: 'Hot Chocolate', description: 'Rich chocolate drink with whipped cream', price: 30 },
    { name: 'Strawberry Milkshake', description: 'Thick strawberry milkshake with ice cream', price: 38 },
    { name: 'Apple Juice', description: 'Pure apple juice', price: 22 },
    { name: 'Iced Tea', description: 'Refreshing iced tea with lemon', price: 24 },
    { name: 'Cola', description: 'Chilled cola drink', price: 18 },
    { name: 'Sparkling Water', description: 'Carbonated mineral water', price: 15 },
    { name: 'Pineapple Juice', description: 'Tropical pineapple juice', price: 24 },
    { name: 'Turkish Coffee', description: 'Traditional Turkish coffee', price: 25 },
    { name: 'Vanilla Latte', description: 'Coffee with vanilla syrup and steamed milk', price: 32 },
    { name: 'Berry Smoothie', description: 'Mixed berries smoothie with honey', price: 36 },
    { name: 'Mineral Water', description: 'Still mineral water', price: 12 },
    { name: 'Energy Drink', description: 'Refreshing energy boost drink', price: 28 }
  ]
};

async function convertImageToBase64(imagePath) {
  const imageBuffer = await fs.readFile(imagePath);
  return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
}

async function generateMenuData() {
  const menuItems = [];
  let id = 1732300000000; // Starting timestamp

  const categories = ['Appetizer', 'main course', 'dessert', 'drink'];
  const categoryKeys = ['appetizer', 'main', 'desserts', 'drinks'];

  for (let i = 0; i < categories.length; i++) {
    const categoryFolder = categories[i];
    const categoryKey = categoryKeys[i];
    const categoryPath = path.join(IMAGES_DIR, categoryFolder);
    
    console.log(`Processing ${categoryFolder}...`);
    
    const files = await fs.readdir(categoryPath);
    const imageFiles = files.filter(f => f.endsWith('.jpg')).sort((a, b) => {
      const numA = parseInt(a.replace('.jpg', ''));
      const numB = parseInt(b.replace('.jpg', ''));
      return numA - numB;
    });

    for (let j = 0; j < imageFiles.length; j++) {
      const file = imageFiles[j];
      const imagePath = path.join(categoryPath, file);
      const imageBase64 = await convertImageToBase64(imagePath);
      
      const itemData = menuData[categoryKey][j];
      
      menuItems.push({
        id: id++,
        name: itemData.name,
        category: categoryKey,
        price: itemData.price,
        description: itemData.description,
        image: imageBase64,
        available: true,
        createdAt: new Date().toISOString()
      });
      
      console.log(`  ✓ Added: ${itemData.name}`);
    }
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(menuItems, null, 2));
  console.log(`\n✅ Successfully created menu.json with ${menuItems.length} items!`);
}

generateMenuData().catch(console.error);
