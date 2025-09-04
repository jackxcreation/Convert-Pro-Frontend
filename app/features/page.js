export default function FeaturesPage() {
  const features = [
    {
      title: "All-in-One File Converter",
      desc: "Convert images, videos, audio, docs, and more with a single click.",
    },
    {
      title: "Fast & Secure",
      desc: "Blazing fast conversions with secure cloud processing.",
    },
    {
      title: "Free & Pro Plans",
      desc: "Enjoy free tools or upgrade to Pro for bulk uploads + storage.",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Features</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white shadow rounded-2xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
