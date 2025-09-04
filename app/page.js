export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-5xl font-bold mb-6">🚀 Convert Pro</h1>
      <p className="text-lg mb-8">
        Fast, Secure & Free File Conversion. Upgrade to Pro for more power.
      </p>
      <a href="/pricing" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
        See Plans
      </a>
    </section>
  );
}
