import React from 'react';

const plans = [
  { tier: 'Basic', price: 'Free', features: ['Virtual trading', 'Limited API access'] },
  { tier: 'Pro', price: '₹199/mo', features: ['Real-time APIs', 'Portfolio analytics'] },
  { tier: 'Elite', price: '₹499/mo', features: ['Priority support', 'Custom reports'] },
];

const Pricing = () => {
  return (
    <section className="px-8 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Choose Your Plan</h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {plans.map((p, i) => (
          <div key={i} className="p-6 shadow-md rounded-lg bg-white w-full max-w-sm text-center">
            <h3 className="text-xl font-bold mb-2">{p.tier}</h3>
            <p className="text-2xl font-semibold mb-4">{p.price}</p>
            <ul className="text-gray-700 mb-6">
              {p.features.map((f, j) => <li key={j}>• {f}</li>)}
            </ul>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">Select</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
