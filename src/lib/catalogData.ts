export type CatalogItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
};

export const catalogCategories = [
  "Produce", "Meat & Seafood", "Dairy & Eggs", "Bakery", 
  "Pantry", "Snacks", "Beverages", "Household"
];

export const catalogData: CatalogItem[] = [
  {
    "id": "p1",
    "name": "Apples",
    "category": "Produce",
    "description": "Fresh crisp apples",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/500px-Pink_lady_and_cross_section.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
  },
  {
    "id": "p2",
    "name": "Bananas",
    "category": "Produce",
    "description": "Yellow ripe bananas",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
  },
  {
    "id": "p3",
    "name": "Carrots",
    "category": "Produce",
    "description": "Organic orange carrots",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/500px-Vegetable-Carrot-Bundle-wStalks.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
  },
  {
    "id": "p4",
    "name": "Spinach",
    "category": "Produce",
    "description": "Fresh baby spinach leaves",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Spinacia_oleracea_Spinazie_bloeiend.jpg/500px-Spinacia_oleracea_Spinazie_bloeiend.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
  },
  {
    "id": "p5",
    "name": "Tomatoes",
    "category": "Produce",
    "description": "Vine-ripened tomatoes",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/400px-Tomato_je.jpg"
  },
  {
    "id": "p6",
    "name": "Onions",
    "category": "Produce",
    "description": "Yellow onions",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/400px-Onion_on_White.JPG"
  },
  {
    "id": "p7",
    "name": "Garlic",
    "category": "Produce",
    "description": "Fresh garlic bulbs",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/39/Allium_sativum_Woodwill_1793.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail_unscaled"
  },
  {
    "id": "p8",
    "name": "Potatoes",
    "category": "Produce",
    "description": "Russet potatoes",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/400px-Patates.jpg"
  },
  {
    "id": "p9",
    "name": "Lemons",
    "category": "Produce",
    "description": "Fresh lemons",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/P1030323.JPG/500px-P1030323.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
  },
  {
    "id": "p10",
    "name": "Avocados",
    "category": "Produce",
    "description": "Ripe Hass avocados",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Persea_americana_fruit_2.JPG/500px-Persea_americana_fruit_2.JPG?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
  },
  {
    "id": "m1",
    "name": "Chicken Breast",
    "category": "Meat & Seafood",
    "description": "Boneless skinless chicken breast",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Raw_chicken_breast.jpg/400px-Raw_chicken_breast.jpg"
  },
  {
    "id": "m2",
    "name": "Ground Beef",
    "category": "Meat & Seafood",
    "description": "80% lean ground beef",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ground_beef_2.JPG/400px-Ground_beef_2.JPG"
  },
  {
    "id": "m3",
    "name": "Salmon",
    "category": "Meat & Seafood",
    "description": "Fresh Atlantic salmon fillet",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Salmo_salar.jpg/500px-Salmo_salar.jpg?utm_source=en.wikipedia.org&utm_campaign=api&utm_content=thumbnail"
  },
  {
    "id": "m4",
    "name": "Bacon",
    "category": "Meat & Seafood",
    "description": "Thick-cut smoked bacon",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Made_bacon.JPG/400px-Made_bacon.JPG"
  },
  {
    "id": "m5",
    "name": "Pork Chops",
    "category": "Meat & Seafood",
    "description": "Bone-in pork chops",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pork_chops_%281%29.jpg/400px-Pork_chops_%281%29.jpg"
  },
  {
    "id": "d1",
    "name": "Whole Milk",
    "category": "Dairy & Eggs",
    "description": "1 Gallon whole milk",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Oat_milk_glass_and_bottle.jpg/400px-Oat_milk_glass_and_bottle.jpg"
  },
  {
    "id": "d2",
    "name": "Eggs",
    "category": "Dairy & Eggs",
    "description": "Dozen large Grade A eggs",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Chicken_egg_2009-06-04.jpg/400px-Chicken_egg_2009-06-04.jpg"
  },
  {
    "id": "d3",
    "name": "Butter",
    "category": "Dairy & Eggs",
    "description": "Unsalted sweet cream butter",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Butter_block.JPG/400px-Butter_block.JPG"
  },
  {
    "id": "d4",
    "name": "Cheddar Cheese",
    "category": "Dairy & Eggs",
    "description": "Sharp cheddar cheese block",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Somerset-Cheddar.jpg/400px-Somerset-Cheddar.jpg"
  },
  {
    "id": "d5",
    "name": "Yogurt",
    "category": "Dairy & Eggs",
    "description": "Plain Greek yogurt",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Yogurt_with_strawberry.jpg/400px-Yogurt_with_strawberry.jpg"
  },
  {
    "id": "d6",
    "name": "Almond Milk",
    "category": "Dairy & Eggs",
    "description": "Unsweetened almond milk",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Oat_milk_glass_and_bottle.jpg/400px-Oat_milk_glass_and_bottle.jpg"
  },
  {
    "id": "b1",
    "name": "Sliced Bread",
    "category": "Bakery",
    "description": "Whole wheat sliced bread",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Bread_slices.jpg/400px-Bread_slices.jpg"
  },
  {
    "id": "b2",
    "name": "Bagels",
    "category": "Bakery",
    "description": "Plain bagels (6 pack)",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Bagel-Plain-Alt.jpg/400px-Bagel-Plain-Alt.jpg"
  },
  {
    "id": "b3",
    "name": "Croissants",
    "category": "Bakery",
    "description": "Butter croissants (4 pack)",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Croissant.jpg/400px-Croissant.jpg"
  },
  {
    "id": "b4",
    "name": "Tortillas",
    "category": "Bakery",
    "description": "Flour tortillas",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Tortillas_de_maiz_blanco.jpg/400px-Tortillas_de_maiz_blanco.jpg"
  },
  {
    "id": "pa1",
    "name": "Pasta",
    "category": "Pantry",
    "description": "Spaghetti pasta",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Macaroni_and_cheese_%282%29.jpg/400px-Macaroni_and_cheese_%282%29.jpg"
  },
  {
    "id": "pa2",
    "name": "Rice",
    "category": "Pantry",
    "description": "White basmati rice",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rice_grains_%28IRRI%29.jpg/400px-Rice_grains_%28IRRI%29.jpg"
  },
  {
    "id": "pa3",
    "name": "Olive Oil",
    "category": "Pantry",
    "description": "Extra virgin olive oil",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Olive_oil_from_Oneglia.jpg/400px-Olive_oil_from_Oneglia.jpg"
  },
  {
    "id": "pa4",
    "name": "Tomato Sauce",
    "category": "Pantry",
    "description": "Marinara pasta sauce",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Tomato_sauce.jpg/400px-Tomato_sauce.jpg"
  },
  {
    "id": "pa5",
    "name": "Flour",
    "category": "Pantry",
    "description": "All-purpose flour",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Flour_in_a_bowl.jpg/400px-Flour_in_a_bowl.jpg"
  },
  {
    "id": "pa6",
    "name": "Sugar",
    "category": "Pantry",
    "description": "Granulated white sugar",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Sucre_blanc.jpg/400px-Sucre_blanc.jpg"
  },
  {
    "id": "pa7",
    "name": "Coffee Beans",
    "category": "Pantry",
    "description": "Whole bean medium roast",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/400px-Roasted_coffee_beans.jpg"
  },
  {
    "id": "pa8",
    "name": "Peanut Butter",
    "category": "Pantry",
    "description": "Creamy peanut butter",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/PeanutButter.jpg/400px-PeanutButter.jpg"
  },
  {
    "id": "s1",
    "name": "Potato Chips",
    "category": "Snacks",
    "description": "Classic salted potato chips",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Potato-Chips.jpg/400px-Potato-Chips.jpg"
  },
  {
    "id": "s2",
    "name": "Tortilla Chips",
    "category": "Snacks",
    "description": "Corn tortilla chips",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Tortilla_chips.jpg/400px-Tortilla_chips.jpg"
  },
  {
    "id": "s3",
    "name": "Chocolate",
    "category": "Snacks",
    "description": "Dark chocolate bar",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chocolate_%28blue_background%29.jpg/400px-Chocolate_%28blue_background%29.jpg"
  },
  {
    "id": "s4",
    "name": "Almonds",
    "category": "Snacks",
    "description": "Roasted salted almonds",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Almonds_%28Prunus_dulcis%29.jpg/400px-Almonds_%28Prunus_dulcis%29.jpg"
  },
  {
    "id": "s5",
    "name": "Popcorn",
    "category": "Snacks",
    "description": "Microwave butter popcorn",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Popcorn.jpg/400px-Popcorn.jpg"
  },
  {
    "id": "bv1",
    "name": "Water",
    "category": "Beverages",
    "description": "Spring water (24 pack)",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Water_glass.jpg/400px-Water_glass.jpg"
  },
  {
    "id": "bv2",
    "name": "Orange Juice",
    "category": "Beverages",
    "description": "100% orange juice",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Orange_juice_1.jpg/400px-Orange_juice_1.jpg"
  },
  {
    "id": "bv3",
    "name": "Soda",
    "category": "Beverages",
    "description": "Cola 12-pack cans",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Coca-Cola_glass.jpg/400px-Coca-Cola_glass.jpg"
  },
  {
    "id": "bv4",
    "name": "Sparkling Water",
    "category": "Beverages",
    "description": "Lemon sparkling water",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Glass_of_carbonated_water.jpg/400px-Glass_of_carbonated_water.jpg"
  },
  {
    "id": "h1",
    "name": "Paper Towels",
    "category": "Household",
    "description": "2-ply paper towels",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Paper_towel.jpg/400px-Paper_towel.jpg"
  },
  {
    "id": "h2",
    "name": "Toilet Paper",
    "category": "Household",
    "description": "Soft bath tissue",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Toilet_paper_orientation_over.jpg/400px-Toilet_paper_orientation_over.jpg"
  },
  {
    "id": "h3",
    "name": "Dish Soap",
    "category": "Household",
    "description": "Liquid dish soap",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dishwashing_liquid.jpg/400px-Dishwashing_liquid.jpg"
  },
  {
    "id": "h4",
    "name": "Laundry Detergent",
    "category": "Household",
    "description": "Liquid laundry detergent",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Laundry_detergent.jpg/400px-Laundry_detergent.jpg"
  },
  {
    "id": "h5",
    "name": "Trash Bags",
    "category": "Household",
    "description": "13-gallon tall kitchen bags",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Bin_bag.jpg/400px-Bin_bag.jpg"
  }
];
