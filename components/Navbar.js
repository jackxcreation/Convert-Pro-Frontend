export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between">
      <a href="/" className="font-bold text-xl">Convert Pro</a>
      <div className="space-x-4">
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
    </nav>
  );
}
