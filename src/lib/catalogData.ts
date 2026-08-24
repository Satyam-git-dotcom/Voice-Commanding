export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  description: string;
};

export const catalogCategories = [
  "Produce", "Meat & Seafood", "Dairy & Eggs", "Bakery", 
  "Pantry", "Snacks", "Beverages", "Household"
];

export const catalogData: CatalogItem[] = [
  // Produce
  { id: "p1", name: "Apples", category: "Produce", description: "Fresh crisp apples" },
  { id: "p2", name: "Bananas", category: "Produce", description: "Yellow ripe bananas" },
  { id: "p3", name: "Carrots", category: "Produce", description: "Organic orange carrots" },
  { id: "p4", name: "Spinach", category: "Produce", description: "Fresh baby spinach leaves" },
  { id: "p5", name: "Tomatoes", category: "Produce", description: "Vine-ripened tomatoes" },
  { id: "p6", name: "Onions", category: "Produce", description: "Yellow onions" },
  { id: "p7", name: "Garlic", category: "Produce", description: "Fresh garlic bulbs" },
  { id: "p8", name: "Potatoes", category: "Produce", description: "Russet potatoes" },
  { id: "p9", name: "Lemons", category: "Produce", description: "Fresh lemons" },
  { id: "p10", name: "Avocados", category: "Produce", description: "Ripe Hass avocados" },

  // Meat & Seafood
  { id: "m1", name: "Chicken Breast", category: "Meat & Seafood", description: "Boneless skinless chicken breast" },
  { id: "m2", name: "Ground Beef", category: "Meat & Seafood", description: "80% lean ground beef" },
  { id: "m3", name: "Salmon", category: "Meat & Seafood", description: "Fresh Atlantic salmon fillet" },
  { id: "m4", name: "Bacon", category: "Meat & Seafood", description: "Thick-cut smoked bacon" },
  { id: "m5", name: "Pork Chops", category: "Meat & Seafood", description: "Bone-in pork chops" },

  // Dairy & Eggs
  { id: "d1", name: "Whole Milk", category: "Dairy & Eggs", description: "1 Gallon whole milk" },
  { id: "d2", name: "Eggs", category: "Dairy & Eggs", description: "Dozen large Grade A eggs" },
  { id: "d3", name: "Butter", category: "Dairy & Eggs", description: "Unsalted sweet cream butter" },
  { id: "d4", name: "Cheddar Cheese", category: "Dairy & Eggs", description: "Sharp cheddar cheese block" },
  { id: "d5", name: "Yogurt", category: "Dairy & Eggs", description: "Plain Greek yogurt" },
  { id: "d6", name: "Almond Milk", category: "Dairy & Eggs", description: "Unsweetened almond milk" },

  // Bakery
  { id: "b1", name: "Sliced Bread", category: "Bakery", description: "Whole wheat sliced bread" },
  { id: "b2", name: "Bagels", category: "Bakery", description: "Plain bagels (6 pack)" },
  { id: "b3", name: "Croissants", category: "Bakery", description: "Butter croissants (4 pack)" },
  { id: "b4", name: "Tortillas", category: "Bakery", description: "Flour tortillas" },

  // Pantry
  { id: "pa1", name: "Pasta", category: "Pantry", description: "Spaghetti pasta" },
  { id: "pa2", name: "Rice", category: "Pantry", description: "White basmati rice" },
  { id: "pa3", name: "Olive Oil", category: "Pantry", description: "Extra virgin olive oil" },
  { id: "pa4", name: "Tomato Sauce", category: "Pantry", description: "Marinara pasta sauce" },
  { id: "pa5", name: "Flour", category: "Pantry", description: "All-purpose flour" },
  { id: "pa6", name: "Sugar", category: "Pantry", description: "Granulated white sugar" },
  { id: "pa7", name: "Coffee Beans", category: "Pantry", description: "Whole bean medium roast" },
  { id: "pa8", name: "Peanut Butter", category: "Pantry", description: "Creamy peanut butter" },

  // Snacks
  { id: "s1", name: "Potato Chips", category: "Snacks", description: "Classic salted potato chips" },
  { id: "s2", name: "Tortilla Chips", category: "Snacks", description: "Corn tortilla chips" },
  { id: "s3", name: "Chocolate", category: "Snacks", description: "Dark chocolate bar" },
  { id: "s4", name: "Almonds", category: "Snacks", description: "Roasted salted almonds" },
  { id: "s5", name: "Popcorn", category: "Snacks", description: "Microwave butter popcorn" },

  // Beverages
  { id: "bv1", name: "Water", category: "Beverages", description: "Spring water (24 pack)" },
  { id: "bv2", name: "Orange Juice", category: "Beverages", description: "100% orange juice" },
  { id: "bv3", name: "Soda", category: "Beverages", description: "Cola 12-pack cans" },
  { id: "bv4", name: "Sparkling Water", category: "Beverages", description: "Lemon sparkling water" },

  // Household
  { id: "h1", name: "Paper Towels", category: "Household", description: "2-ply paper towels" },
  { id: "h2", name: "Toilet Paper", category: "Household", description: "Soft bath tissue" },
  { id: "h3", name: "Dish Soap", category: "Household", description: "Liquid dish soap" },
  { id: "h4", name: "Laundry Detergent", category: "Household", description: "Liquid laundry detergent" },
  { id: "h5", name: "Trash Bags", category: "Household", description: "13-gallon tall kitchen bags" }
];
