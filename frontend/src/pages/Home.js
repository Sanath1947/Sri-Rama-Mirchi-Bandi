import React from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
          Authentic Telangana Street Food at Your Doorstep
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Sri Ram Mirchi Bandi, a beloved Hanamkonda stall serving Telangana's iconic street foods for over a decade.
        </p>
        <Link
          to="/menu"
          className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Order Now
        </Link>
      </section>

      {/* 3D Food Cart Visualization */}
      <section className="h-[500px] relative">
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          {/* 3D Food Cart Model will be added here */}
          <mesh>
            <boxGeometry args={[2, 1, 1]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </Canvas>
      </section>

      {/* Featured Items */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            name: 'Mirchi',
            description: 'Crispy, spicy green chilies stuffed with tangy masala',
            price: '₹20/plate',
          },
          {
            name: 'Egg Bajji',
            description: 'Golden-fried egg slices coated in spiced gram flour batter',
            price: '₹20/plate',
          },
          {
            name: 'Muddha Garelu',
            description: 'Soft, fluffy urad dal vada, fried to golden crisp',
            price: '₹20/plate',
          },
        ].map((item) => (
          <div
            key={item.name}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-bold text-red-600 mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-lg font-semibold text-yellow-600">{item.price}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home; 