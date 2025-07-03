import React from 'react';

const features = [
  { title: 'Real-time Prices', desc: 'Get instant stock prices using our live API feed.' },
  { title: 'Profit Charts', desc: 'Visualize your portfolio with intuitive graphs.' },
  { title: 'Virtual Trading', desc: 'Practice trading without financial risk.' },
  { title: 'Secure & Fast', desc: 'Built with JWT, Express, and MongoDB.' }
];

const Features = () => {
  return (
    <section className="px-8 py-16 bg-white text-center">
      <h2 className="text-3xl font-bold mb-10">Platform Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-6 shadow-md rounded border">
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
