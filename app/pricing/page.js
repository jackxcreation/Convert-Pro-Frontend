export default function PricingPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Pricing</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="p-8 border rounded-2xl shadow hover:shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Free Plan</h2>
          <p className="mb-4">Basic conversions with limited file size.</p>
          <p className="text-3xl font-bold mb-6">₹0/month</p>
          <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg">Start Free</button>
        </div>

        {/* Pro Plan */}
        <div className="p-8 border rounded-2xl shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-4">Pro Plan</h2>
          <p className="mb-4">Bulk upload, storage, no ads, premium support.</p>
          <p className="text-3xl font-bold mb-6">₹19/month</p>
          <button className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-lg">Go Pro</button>
        </div>
      </div>
    </main>
  );
}
