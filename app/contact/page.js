"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Save to Supabase "contact" table
    setSent(true);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      {sent ? (
        <p className="text-green-600">✅ Message sent successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border p-3 rounded-lg"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Message"
            className="border p-3 rounded-lg"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
            Send Message
          </button>
        </form>
      )}
    </main>
  );
              }
