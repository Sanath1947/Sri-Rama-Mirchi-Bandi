import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Menu = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    {
      id: 1,
      name: 'Mirchi',
      description: 'Crispy, spicy green chilies stuffed with tangy masala, deep-fried to perfection. A Telangana favorite!',
      price: '₹20/plate',
      quantity: 3,
      isVegetarian: true,
    },
    {
      id: 2,
      name: 'Egg Bajji',
      description: 'Golden-fried egg slices coated in a spiced gram flour batter, served piping hot.',
      price: '₹20/plate',
      quantity: 3,
      isVegetarian: false,
    },
    {
      id: 3,
      name: 'Muddha Garelu',
      description: 'Soft, fluffy urad dal vada, fried to a golden crisp, perfect for a hearty snack.',
      price: '₹20/plate',
      quantity: 5,
      isVegetarian: true,
    },
    {
      id: 4,
      name: 'Veg Gaarelu',
      description: 'Crunchy vadas packed with fresh veggies and spices, a wholesome delight.',
      price: '₹20/plate',
      quantity: 3,
      isVegetarian: true,
    },
    {
      id: 5,
      name: 'Punugulu',
      description: 'Bite-sized fermented rice batter fritters, served with zesty tomato chutney.',
      price: '₹20/plate',
      quantity: 7,
      isVegetarian: true,
    },
    {
      id: 6,
      name: 'Gudalu',
      description: 'Spicy, rustic mash of lentils and leafy greens, slow-cooked with native spices. A fiery, flavorful village-style delight!',
      price: '₹20/plate',
      quantity: '2 spoons',
      isVegetarian: true,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-red-600 text-center">Our Menu</h1>
      
      {/* Filters */}
      <div className="flex justify-center space-x-4">
        <button className="px-4 py-2 bg-red-600 text-white rounded-full">
          All Items
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-full">
          Vegetarian
        </button>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <h3 className="text-xl font-bold text-red-600 mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-yellow-600">{item.price}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            {item.isVegetarian && (
              <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Vegetarian
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 3D Model Viewer */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-red-600 mb-4">{selectedItem.name}</h2>
            <div className="h-[400px]">
              <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <OrbitControls />
                {/* 3D Food Model will be added here */}
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="red" />
                </mesh>
              </Canvas>
            </div>
            <button
              onClick={() => setSelectedItem(null)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu; 